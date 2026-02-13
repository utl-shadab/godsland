import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import EcosystemScene from './3d/EcosystemScene';

const EcosystemSection = () => {
    return (
        <section className="py-24 bg-[#020403] relative overflow-hidden h-[150vh] flex flex-col items-center justify-center">

            {/* Background Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,50,20,0.3),transparent_70%)] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay"></div>

            <div className="relative z-10 w-full w-full mx-auto px-6 h-full flex flex-col">

                {/* Header */}
                <div className="text-center mb-8 relative z-20">
                    <p className="text-[#00d32c] text-xs md:text-sm uppercase tracking-widest mb-4 font-bold">Our Ecosystem Built for You</p>
                    <h2 className="text-3xl md:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight">
                        One application with multiple options to give you freedom of buying & selling
                    </h2>
                </div>

                {/* 3D Scene */}
                <div className="flex-grow w-full h-full min-h-[300px]">
                    <Canvas camera={{ position: [0, 4, 12], fov: 85 }}>
                        <EcosystemScene />
                        <OrbitControls
                            enableZoom={false}
                            enablePan={true}
                            autoRotate
                            autoRotateSpeed={0.5}
                            minPolarAngle={Math.PI / 3}
                            maxPolarAngle={Math.PI / 2}
                        />
                    </Canvas>
                </div>
            </div>
        </section>
    );
};

export default EcosystemSection;
