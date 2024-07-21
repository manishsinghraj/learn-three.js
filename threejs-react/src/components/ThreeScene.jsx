import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

const ThreeScene = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Set up the scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Load environment texture
        new RGBELoader()
            .setPath('textures/equirectangular/')
            .load('royal_esplanade_1k.hdr', function (texture) {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                scene.background = texture;
                scene.environment = texture;
            });

        // Create the gradient texture
        const createGradientTexture = () => {
            const size = 512;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;

            const context = canvas.getContext('2d');

            // Create gradient
            const gradient = context.createLinearGradient(0, 0, size, size);
            gradient.addColorStop(0, '#ff0000'); // Red
            gradient.addColorStop(0.5, '#00ff00'); // Green
            gradient.addColorStop(1, '#0000ff'); // Blue

            // Fill with gradient
            context.fillStyle = gradient;
            context.fillRect(0, 0, size, size);

            // Create texture
            const texture = new THREE.CanvasTexture(canvas);
            return texture;
        };

        const gradientTexture = createGradientTexture();

        // Create the material for the glass cube
        const material = new THREE.MeshPhysicalMaterial({
            map: gradientTexture,
            color: 0xffffff,
            metalness: 0.25,
            roughness: 0.1,
            transparent: true,
            opacity: 0.75,
            side: THREE.DoubleSide,
            envMapIntensity: 1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
        });

        // Create the cube geometry and mesh
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Create and add a hemisphere light
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000);
        hemiLight.position.set(0, 20, 0);
        scene.add(hemiLight);

        // Create and add a directional light
        const dirLight = new THREE.DirectionalLight(0xffffff);
        dirLight.position.set(3, 10, 10);
        dirLight.castShadow = true;
        scene.add(dirLight);

        // Set the camera position
        camera.position.z = 5;

        // Function to animate the scene
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotating the cube for animation
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        // Start the animation loop
        animate();

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup on component unmount
        return () => {
            mountRef.current.removeChild(renderer.domElement);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <div ref={mountRef} />;
};

export default ThreeScene;
