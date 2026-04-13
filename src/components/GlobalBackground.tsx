import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * GlobalBackground - The 3D Infinite Grid Edition
 * Renders a high-performance 3D perspective grid with theme-reactive colors.
 */
const GlobalBackground: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 10, 20);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // Infinite Grid
        const gridSize = 100;
        const gridDivisions = 50;
        const grid = new THREE.GridHelper(gridSize, gridDivisions, 0xef4444, 0x222222);
        
        // Custom Grid Material to support color themes
        const isDark = document.documentElement.classList.contains('dark');
        const gridColor = isDark ? 0xef4444 : 0x3b82f6; // Red in dark, Blue in light
        
        (grid.material as THREE.LineBasicMaterial).color.setHex(gridColor);
        (grid.material as THREE.LineBasicMaterial).transparent = true;
        (grid.material as THREE.LineBasicMaterial).opacity = 0.2;
        
        scene.add(grid);

        // Ground Glow
        const geometry = new THREE.PlaneGeometry(gridSize, gridSize);
        const material = new THREE.MeshBasicMaterial({
            color: gridColor,
            transparent: true,
            opacity: 0.05,
            side: THREE.DoubleSide
        });
        const ground = new THREE.Mesh(geometry, material);
        ground.rotation.x = Math.PI / 2;
        scene.add(ground);

        // Animation
        let frame = 0;
        const animate = () => {
            frame = requestAnimationFrame(animate);
            
            // Subtle movement
            grid.position.z = (grid.position.z + 0.1) % (gridSize / gridDivisions);
            
            // Mouse Interaction Parallax
            const targetX = (window as any).mouseX || 0;
            const targetY = (window as any).mouseY || 0;
            camera.position.x += (targetX * 0.05 - camera.position.x) * 0.05;
            camera.position.y += (10 - targetY * 0.05 - camera.position.y) * 0.05;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
        };

        const handleMouseMove = (e: MouseEvent) => {
            (window as any).mouseX = (e.clientX - window.innerWidth / 2) * 0.1;
            (window as any).mouseY = (e.clientY - window.innerHeight / 2) * 0.1;
        };

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);
        animate();

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <>
            <div className="fixed inset-0 -z-50 bg-background transition-colors duration-1000" />
            <div ref={mountRef} className="fixed inset-0 -z-40 pointer-events-none opacity-40 mix-blend-screen dark:mix-blend-normal" />
            <div className="fixed inset-0 -z-30 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-background" />
        </>
    );
};

export default GlobalBackground;
