import { type ReactNode, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';

interface ThreeContainerProps {
    children: ReactNode;
    className?: string;
    cameraPosition?: [number, number, number];
    fov?: number;
    controls?: boolean;
}

const ThreeContainer = ({
    children,
    className = "w-full h-full",
    cameraPosition = [0, 0, 5],
    fov = 45,
    controls = true
}: ThreeContainerProps) => {
    return (
        <div className={className}>
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={cameraPosition} fov={fov} />
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ff00" />

                    {children}

                    <Environment preset="city" />
                    {controls && <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />}
                </Suspense>
            </Canvas>
        </div>
    );
};

export default ThreeContainer;
