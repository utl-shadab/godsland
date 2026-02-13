import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Custom hook for controls state
interface ControlState {
    rotation: { x: number; y: number; z: number };
    setRotation: React.Dispatch<React.SetStateAction<{ x: number; y: number; z: number }>>;
    autoRotate: boolean;
    setAutoRotate: React.Dispatch<React.SetStateAction<boolean>>;
    speed: number;
    setSpeed: React.Dispatch<React.SetStateAction<number>>;
    metalness: number;
    setMetalness: React.Dispatch<React.SetStateAction<number>>;
    roughness: number;
    setRoughness: React.Dispatch<React.SetStateAction<number>>;
}

const useControlState = (): ControlState => {
    const [rotation, setRotation] = useState({ x: 0, y: 0.5, z: 0 });
    const [autoRotate, setAutoRotate] = useState(true);
    const [speed, setSpeed] = useState(1);
    const [metalness, setMetalness] = useState(0.6);
    const [roughness, setRoughness] = useState(0.3);

    return { rotation, setRotation, autoRotate, setAutoRotate, speed, setSpeed, metalness, setMetalness, roughness, setRoughness };
};

// Main curved shape component
const CurvedShape = ({ controls }: { controls: ControlState }) => {
    const meshRef = useRef<THREE.Group>(null);

    // Create the custom geometry using bezier curves
    const geometry = useMemo(() => {
        const curves: THREE.CatmullRomCurve3[] = [];

        // Create 3 interlocking curved paths (like the design)
        // Path 1 - Top left to bottom right
        const curve1Points = [
            new THREE.Vector3(-1.5, 1.5, 0),
            new THREE.Vector3(-0.5, 1.2, 0.3),
            new THREE.Vector3(0.5, 0.8, 0.4),
            new THREE.Vector3(1.5, -0.5, 0.3),
            new THREE.Vector3(1.2, -1.5, -0.2),
        ];

        // Path 2 - Right to left flowing
        const curve2Points = [
            new THREE.Vector3(1.8, 0.5, 0),
            new THREE.Vector3(1.0, 1.5, 0.2),
            new THREE.Vector3(-0.3, 1.3, 0.4),
            new THREE.Vector3(-1.5, 0, 0.3),
            new THREE.Vector3(-1.2, -1.8, -0.1),
        ];

        // Path 3 - Bottom to top flowing
        const curve3Points = [
            new THREE.Vector3(0, -1.8, 0),
            new THREE.Vector3(0.8, -1.2, 0.3),
            new THREE.Vector3(1.2, 0.5, 0.4),
            new THREE.Vector3(0.2, 1.5, 0.3),
            new THREE.Vector3(-1.0, 0.8, 0),
        ];

        curves.push(new THREE.CatmullRomCurve3(curve1Points));
        curves.push(new THREE.CatmullRomCurve3(curve2Points));
        curves.push(new THREE.CatmullRomCurve3(curve3Points));

        return { curves };
    }, []);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Auto rotation logic
        if (controls.autoRotate) {
            meshRef.current.rotation.x += delta * 0.3 * controls.speed;
            meshRef.current.rotation.y += delta * 0.5 * controls.speed;
            meshRef.current.rotation.z += delta * 0.1 * controls.speed;
        } else {
            meshRef.current.rotation.x = controls.rotation.x;
            meshRef.current.rotation.y = controls.rotation.y;
            meshRef.current.rotation.z = controls.rotation.z;
        }

        // Subtle floating animation
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    });

    return (
        <group ref={meshRef} position={[0, 0, 0]}>
            {geometry.curves.map((curve, idx) => (
                <TubeSegment
                    key={idx}
                    curve={curve}
                    color={idx % 2 === 0 ? '#00d32c' : '#ffffff'}
                    metalness={controls.metalness}
                    roughness={controls.roughness}
                />
            ))}
        </group>
    );
};

// Individual tube segment following a curve
interface TubeSegmentProps {
    curve: THREE.Curve<THREE.Vector3>;
    color: string;
    metalness: number;
    roughness: number;
}

const TubeSegment = ({ curve, color, metalness, roughness }: TubeSegmentProps) => {
    const ref = useRef<THREE.Mesh>(null);

    const tubeGeometry = useMemo(() => {
        const geometry = new THREE.TubeGeometry(curve, 20, 0.25, 8, false);
        return geometry;
    }, [curve]);

    return (
        <mesh ref={ref} geometry={tubeGeometry} castShadow receiveShadow>
            <meshStandardMaterial
                color={color}
                metalness={metalness}
                roughness={roughness}
                emissive={color}
                emissiveIntensity={color === '#00d32c' ? 0.3 : 0.1}
                toneMapped={false}
            />
        </mesh>
    );
};





// Main scene component
const CurvedShapeScene = ({ className = "w-full h-full min-h-[500px]" }: { className?: string }) => {
    const controls = useControlState();

    return (
        <div className={`relative bg-[#0a0a0a] rounded-2xl overflow-hidden ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 4], fov: 50 }}
                dpr={[1, 1.5]}
                performance={{ min: 0.5 }}
                className="w-full h-full"
            >
                <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />

                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d32c" castShadow />
                <pointLight position={[-10, -10, 5]} intensity={1} color="#ffffff" castShadow />
                <pointLight position={[0, 0, 10]} intensity={0.8} color="#00a8ff" />

                {/* Environment */}
                <Environment preset="night" />

                {/* Particles */}
                <Sparkles count={60} scale={6} size={1.5} speed={0.3} opacity={0.4} color="#00d32c" />

                {/* Main shape */}
                <CurvedShape controls={controls} />

                {/* Controls */}
                <OrbitControls
                    enableZoom={true}
                    autoRotate={false}
                    autoRotateSpeed={2}
                    enablePan={true}
                />
            </Canvas>

            {/* UI Panels */}
            {/* <ControlPanel controls={controls} /> */}
        </div>
    );
};

export default CurvedShapeScene;