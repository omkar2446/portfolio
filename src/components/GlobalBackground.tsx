import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { usePerformanceMode } from '../hooks/usePerformanceMode';

/**
 * GlobalBackground Component
 * Renders a 3D reactive particle field using Three.js as a global background.
 */
const GlobalBackground: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const isLowPerf = usePerformanceMode();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (isLowPerf || !mountRef.current) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // More particles for global coverage
        const particlesCount = 5000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 20;
        }

        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.008,
            color: '#8b5cf6', // Indigo-violet
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending,
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        gsap.to(particlesMaterial, {
            opacity: 0.4,
            duration: 3,
            ease: 'power2.inOut',
            onComplete: () => setIsLoaded(true)
        });

        const mouse = { x: 0, y: 0 };
        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = (event.clientX / window.innerWidth) - 0.5;
            mouse.y = (event.clientY / window.innerHeight) - 0.5;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        window.addEventListener('resize', handleResize);

        const animate = () => {
            const time = Date.now() * 0.0001;
            particlesMesh.rotation.y = time;
            particlesMesh.rotation.x = time * 0.5;

            gsap.to(particlesMesh.position, {
                x: mouse.x * 2,
                y: -mouse.y * 2,
                duration: 2,
                ease: 'power1.out'
            });

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            renderer.dispose();
        };
    }, [isLowPerf]);

    return (
        <div 
            ref={mountRef} 
            className={`fixed inset-0 -z-20 pointer-events-none transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} bg-[#0a0a0f]`}
        />
    );
};

export default GlobalBackground;
