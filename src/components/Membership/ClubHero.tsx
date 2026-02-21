import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const RotatingHeadset = ({ color = '#00d32c' }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();
        // Subtle base rotation
        meshRef.current.rotation.y += 0.005;
        meshRef.current.rotation.x = Math.cos(t * 0.3) * 0.1;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef}>
                <torusKnotGeometry args={[1, 0.3, 128, 32]} />
                <meshStandardMaterial
                    color={color}
                    metalness={0.9}
                    roughness={0.1}
                    emissive={color}
                    emissiveIntensity={0.5}
                />
            </mesh>
        </Float>
    );
};

const BackgroundParticles = () => {
    const points = useMemo(() => {
        const p = new Float32Array(500 * 3);
        for (let i = 0; i < 500; i++) {
            p[i * 3] = (Math.random() - 0.5) * 15;
            p[i * 3 + 1] = (Math.random() - 0.5) * 15;
            p[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
        return p;
    }, []);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[points, 3]}
                />
            </bufferGeometry>
            <pointsMaterial size={0.05} color="#00d32c" transparent opacity={0.3} />
        </points>
    );
};

const ClubHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!textRef.current) return;

        const tl = gsap.timeline();

        tl.from('.hero-label-tag', {
            x: -30,
            opacity: 0,
            duration: 1,
            ease: 'expo.out',
        })
            .from('.hero-main-title span', {
                y: 50,
                opacity: 0,
                duration: 1.5,
                ease: 'expo.out',
                stagger: 0.1
            }, '-=0.8')
            .from('.hero-divider', {
                scaleX: 0,
                duration: 1,
                ease: 'power4.inOut'
            }, '-=1')
            .from('.hero-tagline-item', {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.1
            }, '-=0.6')
            .from('.hero-btn', {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: 'expo.out',
                stagger: 0.2
            }, '-=0.6')
            .from('.hero-decorative-tag', {
                opacity: 0,
                duration: 1.5,
                ease: 'power2.out'
            }, '-=1');

        // Mouse parallax effect for text content
        const handleMouseMove = (e: MouseEvent) => {
            if (!textRef.current) return;
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 20;
            const yPos = (clientY / window.innerHeight - 0.5) * 20;

            gsap.to(textRef.current, {
                x: xPos,
                y: yPos,
                duration: 1.5,
                ease: 'power2.out'
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black flex items-center">
            {/* Background Grain/Noise Overlay */}
            <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* Split Layout Container */}
            <div className="max-w-7xl h-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">

                {/* Left Side: Content */}
                <div ref={textRef} className="text-left max-w-2xl order-2 lg:order-1 relative">
                    {/* Decorative Serial Tag */}
                    <div className="hero-decorative-tag absolute -left-12 top-0 hidden xl:flex flex-col items-center gap-4 text-[10px] tracking-[0.3em] font-mono text-white/20 uppercase vertical-text">
                        <span>ACCESS_ID: GL-2026.001</span>
                        <div className="w-px h-12 bg-white/10"></div>
                    </div>

                    <div className="hero-label-tag flex items-center gap-4 mb-8">
                        <div className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_10px_#00d32c] animate-pulse"></div>
                        <span className="text-xs md:text-sm font-bold tracking-[0.5em] text-neon-green/80 uppercase">
                            Supreme Metaverse Membership
                        </span>
                    </div>

                    <h1 className="hero-main-title mb-10 overflow-hidden text-left">
                        <span className="block text-[10vw] md:text-[6vw] lg:text-[5.5vw] font-black leading-[0.9] text-white tracking-[-0.04em] uppercase italic select-none mb-2">
                            GODS<span className="text-neon-green drop-shadow-[0_0_15px_rgba(0,211,44,0.3)]">LAND</span>
                        </span>
                        <span className="block text-[5vw] md:text-[3vw] lg:text-[2.2vw] font-light tracking-[0.6em] text-white/30 uppercase text-left">
                            THE NEW ELITE
                        </span>
                    </h1>

                    <div className="hero-tagline-container mb-12">
                        <div className="hero-divider h-px bg-gradient-to-r from-white/40 to-transparent w-full mb-8 origin-left"></div>
                        <div className="flex flex-wrap gap-x-8 gap-y-4">
                            {[
                                { title: 'Luxe Wellness', value: 'Private Spa' },
                                { title: 'Digital Assets', value: 'Rare Tier' },
                                { title: 'Privilege', value: 'VVIP Access' }
                            ].map((item, i) => (
                                <div key={i} className="hero-tagline-item group">
                                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1 group-hover:text-neon-green/50 transition-colors">
                                        {item.title}
                                    </p>
                                    <p className="text-sm font-medium text-white/70 tracking-widest uppercase">
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="hero-buttons flex flex-wrap gap-6">
                        <button className="hero-btn group relative px-10 py-5 bg-neon-green overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95">
                            <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out opacity-20"></div>
                            <span className="relative z-10 text-black font-black uppercase tracking-[0.2em] text-sm">
                                Join Private Mint
                            </span>
                        </button>

                        <button className="hero-btn group relative px-10 py-5 border border-white/10 backdrop-blur-sm bg-white/5 overflow-hidden transition-all duration-500 hover:border-white/30 hover:scale-105 active:scale-95">
                            <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
                            <span className="relative z-10 text-white font-bold uppercase tracking-[0.2em] text-sm flex items-center gap-3">
                                Explore Vision
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>

                {/* Right Side: 3D Model Interaction */}
                <div className="relative h-[50vh] cursor-grab lg:h-[80vh] w-full order-1 lg:order-2 hero-3d-bg group">
                    {/* Floating HUD Elements */}
                    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-8 opacity-40">
                        <div className="flex justify-between items-start">
                            <div className="w-16 h-[1px] bg-white/40"></div>
                            <div className="w-[1px] h-16 bg-white/40"></div>
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="w-[1px] h-16 bg-white/40"></div>
                            <div className="w-16 h-[1px] bg-white/40"></div>
                        </div>
                    </div>

                    <Canvas shadows>
                        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1} color="#00d32c" />
                        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#00d32c" />

                        <Suspense fallback={null}>
                            <RotatingHeadset />
                            <BackgroundParticles />
                            <Environment preset="night" />
                        </Suspense>

                        <OrbitControls
                            enableZoom={true}
                            enablePan={true}
                            autoRotate
                            autoRotateSpeed={1}
                            minPolarAngle={Math.PI / 3}
                            maxPolarAngle={Math.PI / 1.5}
                        />
                    </Canvas>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-10 left-10 hidden lg:block tracking-widest text-[10px] text-white/20 uppercase vertical-text">
                GL_INFRASTRUCTURE • V2.0.26
            </div>
            <div className="absolute bottom-10 right-10 hidden lg:block tracking-widest text-[10px] text-white/20 uppercase vertical-text">
                GODSLAND PRIVATE SECTOR
            </div>
        </div>
    );
};

export default ClubHero;
