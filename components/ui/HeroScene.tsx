'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, PerspectiveCamera, Stars, Tube, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Custom random generator (reused to avoid external deps)
const inSphere = (buffer: Float32Array, sphere: { radius: number }) => {
    const { radius } = sphere
    for (let i = 0; i < buffer.length; i += 3) {
        const u = Math.random()
        const v = Math.random()
        const theta = 2 * Math.PI * u
        const phi = Math.acos(2 * v - 1)
        const r = Math.cbrt(Math.random()) * radius

        buffer[i] = r * Math.sin(phi) * Math.cos(theta)
        buffer[i + 1] = r * Math.sin(phi) * Math.sin(theta)
        buffer[i + 2] = r * Math.cos(phi)
    }
    return buffer
}

function InfinityLoop() {
    const group = useRef<THREE.Group>(null!)
    const { viewport } = useThree()
    const scale = Math.max(viewport.width, viewport.height) / 5

    // Generate Infinity Path (Lemniscate-ish)
    const curve = useMemo(() => {
        const points = []
        for (let i = 0; i <= 100; i++) {
            const t = (i / 100) * Math.PI * 2
            // Parametric equations for a 3D Lemniscate
            const a = 3
            const denom = 1 + Math.sin(t) * Math.sin(t)
            const x = (a * Math.cos(t)) / denom
            const y = (a * Math.sin(t) * Math.cos(t)) / denom
            const z = Math.sin(t) * 1.5 // Add depth
            points.push(new THREE.Vector3(x, y, z))
        }
        return new THREE.CatmullRomCurve3(points, true)
    }, [])

    useFrame((state, delta) => {
        if (group.current) {
            // Slow complex rotation
            group.current.rotation.y += delta * 0.1
            group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.2
        }
    })

    return (
        <group ref={group} scale={scale}>
            {/* The Main Glowing Tube */}
            <Tube args={[curve, 64, 0.4, 16, true]}>
                <MeshDistortMaterial
                    color="#06b6d4" // Cyan
                    emissive="#0891b2"
                    emissiveIntensity={2}
                    roughness={0.1}
                    metalness={1}
                    distort={0.4}
                    speed={2}
                />
            </Tube>

            {/* An Inner/Core Line for definition */}
            <Tube args={[curve, 64, 0.1, 8, true]}>
                <meshBasicMaterial color="#ffffff" />
            </Tube>

            {/* Floating Particles for Ambiance */}
            <Particles count={150} color="#a855f7" radius={6} />
        </group>
    )
}

function Particles({ count, color, radius }: { count: number, color: string, radius: number }) {
    const ref = useRef<THREE.Points>(null!)
    const positions = useMemo(() => {
        const p = new Float32Array(count * 3)
        return inSphere(p, { radius })
    }, [count, radius])

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 15
            ref.current.rotation.y -= delta / 20
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color={color}
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    )
}


function Scene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />

            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />

            <InfinityLoop />

            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        </>
    )
}

export function HeroScene() {
    return (
        <div className="w-full h-full relative z-10">
            <Canvas
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                    toneMapping: THREE.ACESFilmicToneMapping,
                }}
                style={{ background: 'transparent' }}
            >
                <Scene />
            </Canvas>
        </div>
    )
}
