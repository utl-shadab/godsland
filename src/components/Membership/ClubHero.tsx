// import { useRef, useMemo, Suspense } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { Float, PerspectiveCamera, Environment, OrbitControls } from '@react-three/drei';
// import * as THREE from 'three';
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';

// const RotatingHeadset = ({ color = '#00d32c' }) => {
//     const meshRef = useRef<THREE.Mesh>(null);

//     useFrame((state) => {
//         if (!meshRef.current) return;
//         const t = state.clock.getElapsedTime();
//         // Subtle base rotation
//         meshRef.current.rotation.y += 0.005;
//         meshRef.current.rotation.x = Math.cos(t * 0.3) * 0.1;
//     });

//     return (
//         <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
//             <mesh ref={meshRef}>
//                 <torusKnotGeometry args={[1, 0.3, 128, 32]} />
//                 <meshStandardMaterial
//                     color={color}
//                     metalness={0.9}
//                     roughness={0.1}
//                     emissive={color}
//                     emissiveIntensity={0.5}
//                 />
//             </mesh>
//         </Float>
//     );
// };

// const BackgroundParticles = () => {
//     const points = useMemo(() => {
//         const p = new Float32Array(500 * 3);
//         for (let i = 0; i < 500; i++) {
//             p[i * 3] = (Math.random() - 0.5) * 15;
//             p[i * 3 + 1] = (Math.random() - 0.5) * 15;
//             p[i * 3 + 2] = (Math.random() - 0.5) * 15;
//         }
//         return p;
//     }, []);

//     return (
//         <points>
//             <bufferGeometry>
//                 <bufferAttribute
//                     attach="attributes-position"
//                     args={[points, 3]}
//                 />
//             </bufferGeometry>
//             <pointsMaterial size={0.05} color="#00d32c" transparent opacity={0.3} />
//         </points>
//     );
// };

// const ClubHero = () => {
//     const containerRef = useRef<HTMLDivElement>(null);
//     const textRef = useRef<HTMLDivElement>(null);

//     useGSAP(() => {
//         if (!textRef.current) return;

//         const tl = gsap.timeline();

//         tl.from('.hero-label-tag', {
//             x: -30,
//             opacity: 0,
//             duration: 1,
//             ease: 'expo.out',
//         })
//             .from('.hero-main-title span', {
//                 y: 50,
//                 opacity: 0,
//                 duration: 1.5,
//                 ease: 'expo.out',
//                 stagger: 0.1
//             }, '-=0.8')
//             .from('.hero-divider', {
//                 scaleX: 0,
//                 duration: 1,
//                 ease: 'power4.inOut'
//             }, '-=1')
//             .from('.hero-tagline-item', {
//                 y: 20,
//                 opacity: 0,
//                 duration: 0.8,
//                 ease: 'power3.out',
//                 stagger: 0.1
//             }, '-=0.6')
//             .from('.hero-btn', {
//                 y: 30,
//                 opacity: 0,
//                 duration: 1,
//                 ease: 'expo.out',
//                 stagger: 0.2
//             }, '-=0.6')
//             .from('.hero-decorative-tag', {
//                 opacity: 0,
//                 duration: 1.5,
//                 ease: 'power2.out'
//             }, '-=1');

//         // Mouse parallax effect for text content
//         const handleMouseMove = (e: MouseEvent) => {
//             if (!textRef.current) return;
//             const { clientX, clientY } = e;
//             const xPos = (clientX / window.innerWidth - 0.5) * 20;
//             const yPos = (clientY / window.innerHeight - 0.5) * 20;

//             gsap.to(textRef.current, {
//                 x: xPos,
//                 y: yPos,
//                 duration: 1.5,
//                 ease: 'power2.out'
//             });
//         };

//         window.addEventListener('mousemove', handleMouseMove);
//         return () => window.removeEventListener('mousemove', handleMouseMove);

//     }, { scope: containerRef });

//     return (
//         <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black flex items-center">
//             {/* Background Grain/Noise Overlay */}
//             <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

//             {/* Split Layout Container */}
//             <div className="max-w-7xl h-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">

//                 {/* Left Side: Content */}
//                 <div ref={textRef} className="text-left max-w-2xl order-2 lg:order-1 relative">
//                     {/* Decorative Serial Tag */}
//                     <div className="hero-decorative-tag absolute -left-12 top-0 hidden xl:flex flex-col items-center gap-4 text-[10px] tracking-[0.3em] font-mono text-white/20 uppercase vertical-text">
//                         <span>ACCESS_ID: GL-2026.001</span>
//                         <div className="w-px h-12 bg-white/10"></div>
//                     </div>

//                     <div className="hero-label-tag flex items-center gap-4 mb-8">
//                         <div className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_10px_#00d32c] animate-pulse"></div>
//                         <span className="text-xs md:text-sm font-bold tracking-[0.5em] text-neon-green/80 uppercase">
//                             Supreme Metaverse Membership
//                         </span>
//                     </div>

//                     <h1 className="hero-main-title mb-10 overflow-hidden text-left">
//                         <span className="block text-[10vw] md:text-[6vw] lg:text-[5.5vw] font-black leading-[0.9] text-white tracking-[-0.04em] uppercase italic select-none mb-2">
//                             GODS<span className="text-neon-green drop-shadow-[0_0_15px_rgba(0,211,44,0.3)]">LAND</span>
//                         </span>
//                         <span className="block text-[5vw] md:text-[3vw] lg:text-[2.2vw] font-light tracking-[0.6em] text-white/30 uppercase text-left">
//                             THE NEW ELITE
//                         </span>
//                     </h1>

//                     <div className="hero-tagline-container mb-12">
//                         <div className="hero-divider h-px bg-gradient-to-r from-white/40 to-transparent w-full mb-8 origin-left"></div>
//                         <div className="flex flex-wrap gap-x-8 gap-y-4">
//                             {[
//                                 { title: 'Luxe Wellness', value: 'Private Spa' },
//                                 { title: 'Digital Assets', value: 'Rare Tier' },
//                                 { title: 'Privilege', value: 'VVIP Access' }
//                             ].map((item, i) => (
//                                 <div key={i} className="hero-tagline-item group">
//                                     <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1 group-hover:text-neon-green/50 transition-colors">
//                                         {item.title}
//                                     </p>
//                                     <p className="text-sm font-medium text-white/70 tracking-widest uppercase">
//                                         {item.value}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="hero-buttons flex flex-wrap gap-6">
//                         <button className="hero-btn group relative px-10 py-5 bg-neon-green overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95">
//                             <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out opacity-20"></div>
//                             <span className="relative z-10 text-black font-black uppercase tracking-[0.2em] text-sm">
//                                 Join Private Mint
//                             </span>
//                         </button>

//                         <button className="hero-btn group relative px-10 py-5 border border-white/10 backdrop-blur-sm bg-white/5 overflow-hidden transition-all duration-500 hover:border-white/30 hover:scale-105 active:scale-95">
//                             <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
//                             <span className="relative z-10 text-white font-bold uppercase tracking-[0.2em] text-sm flex items-center gap-3">
//                                 Explore Vision
//                                 <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
//                                     <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor"></path>
//                                 </svg>
//                             </span>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Right Side: 3D Model Interaction */}
//                 <div className="relative h-[50vh] cursor-grab lg:h-[80vh] w-full order-1 lg:order-2 hero-3d-bg group">
//                     {/* Floating HUD Elements */}
//                     <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-8 opacity-40">
//                         <div className="flex justify-between items-start">
//                             <div className="w-16 h-[1px] bg-white/40"></div>
//                             <div className="w-[1px] h-16 bg-white/40"></div>
//                         </div>
//                         <div className="flex justify-between items-end">
//                             <div className="w-[1px] h-16 bg-white/40"></div>
//                             <div className="w-16 h-[1px] bg-white/40"></div>
//                         </div>
//                     </div>

//                     <Canvas shadows>
//                         <PerspectiveCamera makeDefault position={[0, 0, 6]} />
//                         <ambientLight intensity={0.5} />
//                         <pointLight position={[10, 10, 10]} intensity={1} color="#00d32c" />
//                         <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#00d32c" />

//                         <Suspense fallback={null}>
//                             <RotatingHeadset />
//                             <BackgroundParticles />
//                             <Environment preset="night" />
//                         </Suspense>

//                         <OrbitControls
//                             enableZoom={true}
//                             enablePan={true}
//                             autoRotate
//                             autoRotateSpeed={1}
//                             minPolarAngle={Math.PI / 3}
//                             maxPolarAngle={Math.PI / 1.5}
//                         />
//                     </Canvas>
//                 </div>
//             </div>

//             {/* Decorative elements */}
//             <div className="absolute bottom-10 left-10 hidden lg:block tracking-widest text-[10px] text-white/20 uppercase vertical-text">
//                 GL_INFRASTRUCTURE • V2.0.26
//             </div>
//             <div className="absolute bottom-10 right-10 hidden lg:block tracking-widest text-[10px] text-white/20 uppercase vertical-text">
//                 GODSLAND PRIVATE SECTOR
//             </div>
//         </div>
//     );
// };

// export default ClubHero;


import { useRef, useMemo, Suspense, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, OrbitControls, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/* ─── Color Palette ─── */
const GOLD = '#d4a843';
const GOLD_LIGHT = '#f5d98a';
const GOLD_DARK = '#a67c2e';
const GOLD_GLOW = 'rgba(212, 168, 67, 0.35)';

/* ─── 3D Rotating Model ─── */
const RotatingHeadset = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const wireRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.003;
            meshRef.current.rotation.x = Math.cos(t * 0.25) * 0.08;
            meshRef.current.rotation.z = Math.sin(t * 0.15) * 0.04;
        }
        if (wireRef.current) {
            wireRef.current.rotation.y -= 0.002;
            wireRef.current.rotation.z = Math.sin(t * 0.2) * 0.06;
        }
        if (ringRef.current) {
            ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.1;
            ringRef.current.rotation.z += 0.004;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
            <group>
                {/* Core Torus Knot – golden metallic */}
                <mesh ref={meshRef}>
                    <torusKnotGeometry args={[1, 0.35, 256, 64]} />
                    <meshPhysicalMaterial
                        color={GOLD}
                        metalness={1}
                        roughness={0.15}
                        emissive={GOLD_DARK}
                        emissiveIntensity={0.3}
                        clearcoat={1}
                        clearcoatRoughness={0.05}
                        reflectivity={1}
                        envMapIntensity={2}
                    />
                </mesh>

                {/* Wireframe ghost layer for depth */}
                <mesh ref={wireRef} scale={1.15}>
                    <torusKnotGeometry args={[1, 0.35, 64, 16]} />
                    <meshStandardMaterial
                        color={GOLD_LIGHT}
                        wireframe
                        transparent
                        opacity={0.06}
                    />
                </mesh>

                {/* Orbiting ring accent */}
                <mesh ref={ringRef} scale={2.2}>
                    <torusGeometry args={[1, 0.008, 16, 100]} />
                    <meshStandardMaterial
                        color={GOLD_LIGHT}
                        emissive={GOLD}
                        emissiveIntensity={0.6}
                        transparent
                        opacity={0.4}
                    />
                </mesh>

                {/* Second orbiting ring */}
                <mesh rotation={[Math.PI / 3, 0, Math.PI / 6]} scale={2.6}>
                    <torusGeometry args={[1, 0.005, 16, 100]} />
                    <meshStandardMaterial
                        color={GOLD_LIGHT}
                        emissive={GOLD}
                        emissiveIntensity={0.4}
                        transparent
                        opacity={0.2}
                    />
                </mesh>
            </group>
        </Float>
    );
};

/* ─── Floating Particles ─── */
const BackgroundParticles = () => {
    const pointsRef = useRef<THREE.Points>(null);

    const { positions, sizes } = useMemo(() => {
        const count = 600;
        const pos = new Float32Array(count * 3);
        const sz = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 18;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 18;
            sz[i] = Math.random() * 0.04 + 0.01;
        }
        return { positions: pos, sizes: sz };
    }, []);

    useFrame((state) => {
        if (!pointsRef.current) return;
        pointsRef.current.rotation.y += 0.0003;
        pointsRef.current.rotation.x += 0.0001;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                color={GOLD_LIGHT}
                transparent
                opacity={0.35}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

/* ─── Main Hero Component ─── */
const ClubHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!textRef.current) return;

        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

        tl.from('.hero-label-tag', {
            x: -40,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
        })
            .from('.hero-main-title span', {
                y: 80,
                opacity: 0,
                duration: 1.8,
                ease: 'expo.out',
                stagger: 0.12,
                rotateX: 15,
            }, '-=0.9')
            .from('.hero-divider', {
                scaleX: 0,
                duration: 1.2,
                ease: 'power4.inOut',
            }, '-=1.2')
            .from('.hero-tagline-item', {
                y: 25,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                stagger: 0.12,
            }, '-=0.8')
            .from('.hero-btn', {
                y: 40,
                opacity: 0,
                duration: 1.2,
                ease: 'expo.out',
                stagger: 0.15,
            }, '-=0.7')
            .from('.hero-decorative-tag', {
                opacity: 0,
                y: -20,
                duration: 1.8,
                ease: 'power2.out',
            }, '-=1.2')
            .from('.hero-hud-line', {
                opacity: 0,
                scale: 0,
                duration: 1,
                ease: 'power2.out',
                stagger: 0.1,
            }, '-=1.5')
            .from('.hero-bottom-tag', {
                opacity: 0,
                y: 15,
                duration: 1,
                ease: 'power2.out',
                stagger: 0.15,
            }, '-=1');

        // Smooth parallax
        const handleMouseMove = (e: MouseEvent) => {
            if (!textRef.current) return;
            const xPos = (e.clientX / window.innerWidth - 0.5) * 15;
            const yPos = (e.clientY / window.innerHeight - 0.5) * 10;

            gsap.to(textRef.current, {
                x: xPos,
                y: yPos,
                duration: 2,
                ease: 'power3.out',
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);

    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden flex items-center"
            style={{
                background: 'radial-gradient(ellipse 80% 60% at 65% 50%, rgba(45, 35, 15, 0.6) 0%, #050505 70%, #000 100%)',
            }}
        >
            {/* Noise Grain Overlay */}
            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    opacity: 0.035,
                    backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
                }}
            />

            {/* Subtle gold ambient glow */}
            <div
                className="absolute z-[1] pointer-events-none"
                style={{
                    width: '50vw',
                    height: '50vw',
                    right: '-5vw',
                    top: '10%',
                    background: `radial-gradient(circle, ${GOLD_GLOW} 0%, transparent 70%)`,
                    filter: 'blur(60px)',
                }}
            />

            {/* Grid Container */}
            <div className="max-w-7xl h-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center z-10 w-full">

                {/* ─── Left: Text Content ─── */}
                <div ref={textRef} className="text-left max-w-2xl order-2 lg:order-1 relative">
                    {/* Vertical decorative tag */}
                    <div className="hero-decorative-tag absolute -left-14 top-0 hidden xl:flex flex-col items-center gap-4 font-mono uppercase"
                        style={{
                            fontSize: '9px',
                            letterSpacing: '0.35em',
                            color: 'rgba(212,168,67,0.15)',
                            writingMode: 'vertical-rl',
                            textOrientation: 'mixed',
                        }}
                    >
                        <span>ACCESS_ID: GL-2026.001</span>
                        <div style={{ width: 1, height: 48, background: 'rgba(212,168,67,0.1)' }} />
                    </div>

                    {/* Status badge */}
                    <div className="hero-label-tag flex items-center gap-4 mb-8">
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{
                                background: GOLD,
                                boxShadow: `0 0 10px ${GOLD}, 0 0 25px ${GOLD_GLOW}`,
                                animation: 'pulse 2s ease-in-out infinite',
                            }}
                        />
                        <span
                            className="font-bold uppercase"
                            style={{
                                fontSize: 'clamp(10px, 1.2vw, 13px)',
                                letterSpacing: '0.5em',
                                color: GOLD,
                                opacity: 0.8,
                            }}
                        >
                            Supreme Metaverse Membership
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="hero-main-title mb-10 overflow-hidden text-left" style={{ perspective: '600px' }}>
                        <span
                            className="block font-black leading-[0.88] text-white uppercase italic select-none mb-3"
                            style={{ fontSize: 'clamp(48px, 7.5vw, 96px)', letterSpacing: '-0.04em' }}
                        >
                            GODS
                            <span
                                style={{
                                    color: GOLD,
                                    textShadow: `0 0 30px ${GOLD_GLOW}, 0 4px 20px rgba(0,0,0,0.5)`,
                                }}
                            >
                                LAND
                            </span>
                        </span>
                        <span
                            className="block font-extralight uppercase text-left"
                            style={{
                                fontSize: 'clamp(14px, 2.5vw, 26px)',
                                letterSpacing: '0.6em',
                                color: 'rgba(255,255,255,0.2)',
                            }}
                        >
                            THE NEW ELITE
                        </span>
                    </h1>

                    {/* Tagline Items */}
                    <div className="hero-tagline-container mb-12">
                        <div
                            className="hero-divider w-full mb-8 origin-left"
                            style={{
                                height: 1,
                                background: `linear-gradient(to right, ${GOLD}66, transparent)`,
                            }}
                        />
                        <div className="flex flex-wrap gap-x-10 gap-y-4">
                            {[
                                { title: 'Luxe Wellness', value: 'Private Spa' },
                                { title: 'Digital Assets', value: 'Rare Tier' },
                                { title: 'Privilege', value: 'VVIP Access' },
                            ].map((item, i) => (
                                <div key={i} className="hero-tagline-item group cursor-default">
                                    <p
                                        className="uppercase mb-1 transition-colors duration-500"
                                        style={{
                                            fontSize: '10px',
                                            letterSpacing: '0.2em',
                                            color: 'rgba(255,255,255,0.25)',
                                        }}
                                    >
                                        {item.title}
                                    </p>
                                    <p
                                        className="font-medium uppercase tracking-widest"
                                        style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}
                                    >
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="hero-buttons flex flex-wrap gap-5">
                        <button
                            className="hero-btn group relative overflow-hidden transition-all duration-500 hover:scale-[1.03] active:scale-95"
                            style={{
                                padding: '18px 44px',
                                background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DARK} 100%)`,
                                border: 'none',
                            }}
                        >
                            <div
                                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 100%)' }}
                            />
                            <span
                                className="relative z-10 font-black uppercase"
                                style={{ fontSize: '12px', letterSpacing: '0.25em', color: '#0a0a0a' }}
                            >
                                Join Private Mint
                            </span>
                        </button>

                        <button
                            className="hero-btn group relative overflow-hidden backdrop-blur-sm transition-all duration-500 hover:scale-[1.03] active:scale-95"
                            style={{
                                padding: '18px 44px',
                                border: `1px solid rgba(212,168,67,0.15)`,
                                background: 'rgba(212,168,67,0.04)',
                            }}
                        >
                            <div
                                className="absolute inset-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                                style={{ background: 'rgba(212,168,67,0.08)' }}
                            />
                            <span
                                className="relative z-10 font-bold uppercase flex items-center gap-3"
                                style={{ fontSize: '12px', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.8)' }}
                            >
                                Explore Vision
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="group-hover:translate-x-1.5 transition-transform duration-500"
                                >
                                    <path
                                        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>

                {/* ─── Right: 3D Canvas ─── */}
                <div className="relative h-[50vh] cursor-grab lg:h-[80vh] w-full order-1 lg:order-2 group">
                    {/* Corner HUD brackets */}
                    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-8" style={{ opacity: 0.3 }}>
                        <div className="flex justify-between items-start">
                            <div className="hero-hud-line" style={{ width: 40, height: 1, background: `linear-gradient(to right, ${GOLD}88, transparent)` }} />
                            <div className="hero-hud-line" style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${GOLD}88, transparent)` }} />
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="hero-hud-line" style={{ width: 1, height: 40, background: `linear-gradient(to top, ${GOLD}88, transparent)` }} />
                            <div className="hero-hud-line" style={{ width: 40, height: 1, background: `linear-gradient(to left, ${GOLD}88, transparent)` }} />
                        </div>
                    </div>

                    <Canvas shadows gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}>
                        <PerspectiveCamera makeDefault position={[0, 0, 5.5]} fov={55} />

                        {/* Lighting – warm golden setup */}
                        <ambientLight intensity={0.3} color="#ffeedd" />
                        <pointLight position={[8, 8, 8]} intensity={1.5} color={GOLD_LIGHT} />
                        <pointLight position={[-6, -4, 6]} intensity={0.6} color={GOLD_DARK} />
                        <spotLight
                            position={[-8, 10, 8]}
                            angle={0.2}
                            penumbra={1}
                            intensity={2.5}
                            color={GOLD}
                            castShadow
                        />
                        <spotLight
                            position={[5, -8, 5]}
                            angle={0.3}
                            penumbra={1}
                            intensity={1}
                            color="#fff5e0"
                        />

                        <Suspense fallback={null}>
                            <RotatingHeadset />
                            <BackgroundParticles />
                            <Environment preset="night" />
                        </Suspense>

                        <OrbitControls
                            enableZoom={false}
                            enablePan={false}
                            autoRotate
                            autoRotateSpeed={0.8}
                            minPolarAngle={Math.PI / 3}
                            maxPolarAngle={Math.PI / 1.5}
                        />
                    </Canvas>
                </div>
            </div>

            {/* ─── Bottom decorative tags ─── */}
            <div
                className="hero-bottom-tag absolute bottom-10 left-10 hidden lg:block uppercase font-mono"
                style={{
                    fontSize: '9px',
                    letterSpacing: '0.3em',
                    color: 'rgba(212,168,67,0.12)',
                    writingMode: 'vertical-rl',
                }}
            >
                GL_INFRASTRUCTURE • V2.0.26
            </div>
            <div
                className="hero-bottom-tag absolute bottom-10 right-10 hidden lg:block uppercase font-mono"
                style={{
                    fontSize: '9px',
                    letterSpacing: '0.3em',
                    color: 'rgba(212,168,67,0.12)',
                    writingMode: 'vertical-rl',
                }}
            >
                GODSLAND PRIVATE SECTOR
            </div>

            {/* Pulse keyframe */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; box-shadow: 0 0 10px ${GOLD}, 0 0 25px ${GOLD_GLOW}; }
                    50% { opacity: 0.6; box-shadow: 0 0 5px ${GOLD}, 0 0 12px ${GOLD_GLOW}; }
                }
            `}</style>
        </div>
    );
};

export default ClubHero;