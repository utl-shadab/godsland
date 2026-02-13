import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, TorusKnot, Float, Stars } from '@react-three/drei';
import { Mesh } from 'three';

const AbstractShape = () => {
    const meshRef = useRef<Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Complex rotation
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            {/* Main Golden Artifact */}
            <TorusKnot args={[1, 0.3, 128, 32]} position={[0, 0, 0]} ref={meshRef}>
                <MeshDistortMaterial
                    color="#FFD700" // Gold
                    envMapIntensity={1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    metalness={1}
                    roughness={0.1}
                    distort={0.3}
                    speed={2}
                />
            </TorusKnot>

            {/* Inner Glow/Structure */}
            <TorusKnot args={[0.8, 0.1, 64, 16]} position={[0, 0, 0]}>
                <meshBasicMaterial color="#ffaa00" wireframe transparent opacity={0.1} />
            </TorusKnot>

            {/* Background Ambience */}
            <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        </Float>
    );
};

export default AbstractShape;
