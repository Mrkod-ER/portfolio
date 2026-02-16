'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function WireframeCore() {
    const meshRef = useRef<THREE.Mesh>(null!)
    const wireRef = useRef<THREE.LineSegments>(null!)

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (meshRef.current) {
            meshRef.current.rotation.x = t * 0.15
            meshRef.current.rotation.y = t * 0.2
        }
        if (wireRef.current) {
            wireRef.current.rotation.x = t * 0.15
            wireRef.current.rotation.y = t * 0.2
        }
    })

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <group>
                {/* Inner solid mesh with very subtle opacity */}
                <mesh ref={meshRef}>
                    <icosahedronGeometry args={[1.6, 1]} />
                    <meshStandardMaterial
                        color="#1a1a2e"
                        transparent
                        opacity={0.15}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* Wireframe overlay */}
                <lineSegments ref={wireRef}>
                    <edgesGeometry args={[new THREE.IcosahedronGeometry(1.6, 1)]} />
                    <lineBasicMaterial color="#404060" transparent opacity={0.6} />
                </lineSegments>

                {/* Inner glow sphere */}
                <mesh>
                    <sphereGeometry args={[0.3, 16, 16]} />
                    <meshStandardMaterial
                        color="#6366f1"
                        emissive="#6366f1"
                        emissiveIntensity={2}
                        transparent
                        opacity={0.4}
                    />
                </mesh>
            </group>
        </Float>
    )
}

function OrbitRing({ radius, speed, opacity }: { radius: number; speed: number; opacity: number }) {
    const ref = useRef<THREE.Mesh>(null!)

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        ref.current.rotation.z = t * speed
    })

    return (
        <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.005, 8, 100]} />
            <meshBasicMaterial color="#3f3f5f" transparent opacity={opacity} />
        </mesh>
    )
}

function FloatingParticles({ count = 80 }: { count?: number }) {
    const ref = useRef<THREE.Points>(null!)

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            // Distribute in a sphere
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)
            const r = 2 + Math.random() * 2.5
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
            pos[i * 3 + 2] = r * Math.cos(phi)
        }
        return pos
    }, [count])

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (ref.current) {
            ref.current.rotation.y = t * 0.03
            ref.current.rotation.x = t * 0.01
        }
    })

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color="#555577"
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    )
}

function Scene() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.15} />
            <pointLight position={[5, 5, 5]} intensity={0.3} color="#6366f1" />
            <pointLight position={[-5, -3, -5]} intensity={0.15} color="#818cf8" />

            {/* Main geometry */}
            <WireframeCore />

            {/* Orbit rings */}
            <OrbitRing radius={2.4} speed={0.3} opacity={0.2} />
            <OrbitRing radius={3.0} speed={-0.15} opacity={0.1} />

            {/* Particles */}
            <FloatingParticles count={60} />
        </>
    )
}

export function HeroScene() {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 5.5], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                style={{ background: 'transparent' }}
            >
                <Scene />
            </Canvas>
        </div>
    )
}
