'use client';

import { useEffect, useState } from 'react';

export function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const updateCursor = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            const target = e.target as HTMLElement;
            setIsPointer(
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') !== null ||
                target.closest('button') !== null
            );
        };

        window.addEventListener('mousemove', updateCursor);
        return () => window.removeEventListener('mousemove', updateCursor);
    }, []);

    return (
        <>
            <style jsx global>{`
                body {
                    cursor: none;
                }
                a, button, [role="button"] {
                    cursor: none;
                }
            `}</style>
            <div
                className="fixed top-0 left-0 w-4 h-4 bg-black border border-white pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 ease-out flex items-center justify-center"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) ${isPointer ? 'scale(2.5)' : 'scale(1)'}`,
                }}
            >
                {isPointer && <div className="w-1 h-1 bg-white" />}
            </div>

            <div
                className="fixed top-0 left-0 w-2 h-2 bg-neo-yellow pointer-events-none z-[9999] mix-blend-exclusion transition-all duration-300 ease-out"
                style={{
                    transform: `translate(${position.x + 8}px, ${position.y + 8}px)`,
                    opacity: isPointer ? 0 : 1
                }}
            />
        </>
    );
}
