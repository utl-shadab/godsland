import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Environment, MeshTransmissionMaterial, Sparkles, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Box, Code, Layers, Rocket } from 'lucide-react';

const items = [
    { title: 'Planning', desc: 'Map the crypto projects scope with framer template', icon: <Box size={24} />, angle: 0 },
    { title: 'Prototype', desc: 'Build crypto website test for your product', icon: <Code size={24} />, angle: Math.PI / 2 },
    { title: 'Refinement', desc: 'Refine & improve your crypto landing page', icon: <Layers size={24} />, angle: Math.PI },
    { title: 'Scale & Support', desc: 'Deploy product live and ensure expert support', icon: <Rocket size={24} />, angle: -Math.PI / 2 },
];

const TechRing = ({ radius, width, speed, color = "#00d32c", dashed = false, opacity = 0.8 }: { radius: number; width: number; speed: number; color?: string; dashed?: boolean; opacity?: number }) => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.z += delta * speed;
            ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        }
    });

    return (
        <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, width, 16, 100]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={dashed ? 0.5 : 2}
                transparent
                opacity={dashed ? 0.3 : opacity}
                wireframe={dashed}
                toneMapped={false}
            />
        </mesh>
    );
};

const ConnectionLine = ({ start, end, color = "#00d32c" }: { start: [number, number, number]; end: [number, number, number]; color?: string }) => {
    const points = useMemo(() => {
        const p1 = new THREE.Vector3(...start);
        const p2 = new THREE.Vector3(...end);
        const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
        mid.y += 2; // Arc height
        return new THREE.QuadraticBezierCurve3(p1, mid, p2).getPoints(20);
    }, [start, end]);

    const lineGeometry = useMemo(() => {
        return new THREE.BufferGeometry().setFromPoints(points);
    }, [points]);

    return (
        <primitive object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4, linewidth: 1 }))} />
    );
}

const EcosystemScene = () => {
    const groupRef = useRef<THREE.Group>(null);

    return (
        <group ref={groupRef} rotation={[0.2, 0, 0]}>
            {/* Realistic Environment Lighting */}
            <Environment preset="city" />
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d32c" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d32c" />

            {/* Background Stars */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh>
                    <icosahedronGeometry args={[1.8, 0]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={8}
                        resolution={512}
                        transmission={1}
                        roughness={0.1}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        thickness={2}
                        ior={1.5}
                        chromaticAberration={0.04}
                        anisotropy={0.1}
                        distortion={0.1}
                        distortionScale={0.3}
                        temporalDistortion={0.5}
                        color="#ffffff"
                        background={new THREE.Color("#00d32c")}
                        toneMapped={false}
                    />
                </mesh>


                <mesh scale={[0.8, 0.8, 0.8]}>
                    <icosahedronGeometry args={[1.5, 1]} />
                    <meshBasicMaterial color="#00d32c" wireframe transparent opacity={0.2} />
                </mesh>
            </Float>

            {/* Floating Tech Particles */}
            <Sparkles count={100} scale={8} size={2} speed={0.4} opacity={0.5} color="#00d32c" />

            {/* Tech Rings */}
            <TechRing radius={4} width={0.03} speed={0.1} color="#00d32c" opacity={0.8} />
            <TechRing radius={6} width={0.02} speed={-0.05} dashed color="#00d32c" />
            <TechRing radius={8} width={0.05} speed={0.02} color="#00d32c" />

            {/* Items & Connections */}
            {items.map((item, i) => {
                const radius = 7;
                const angle = item.angle + Math.PI / 4;
                const x = Math.sin(angle) * radius;
                const z = Math.cos(angle) * radius;

                return (
                    <group key={i}>
                        <ConnectionLine start={[0, 0, 0]} end={[x, 0, z]} />

                        <group position={[x, 0, z]}>
                            <Html center distanceFactor={15} zIndexRange={[100, 0]}>
                                <div className="flex items-start gap-4 w-[280px] pointer-events-none select-none group">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-[#00d32c] blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full"></div>
                                        <div className="relative z-10 w-12 h-12 rounded-full bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#00d32c]/30 flex items-center justify-center text-[#00d32c] shadow-[0_0_15px_rgba(0,211,44,0.3)] transition-transform duration-300 group-hover:scale-110">
                                            {item.icon}
                                        </div>
                                    </div>

                                    <div className="flex-1 text-left transform transition-all duration-300 group-hover:translate-x-2">
                                        <h3 className="text-white font-bold text-lg leading-tight mb-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{item.title}</h3>
                                        <p className="text-gray-400 text-sm leading-snug">{item.desc}</p>
                                    </div>
                                </div>
                            </Html>


                            <mesh>
                                <sphereGeometry args={[0.15, 16, 16]} />
                                <meshStandardMaterial color="#00d32c" emissive="#00d32c" emissiveIntensity={2} />
                            </mesh>
                        </group>
                    </group>
                )
            })}
        </group>
    );
};

export default EcosystemScene;
