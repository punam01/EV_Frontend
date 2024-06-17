import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PresentationControls, Stage, Environment } from '@react-three/drei';
import Bmw_m4_f82 from './Bmw_m4_f82';

const Experience = ({ color, interiorColor, wheelColor, windowGlass }) => {
    return (
        <Canvas shadows camera={{ position: [0, 0, 2], fov: 50 }} style={{ width: '100vw', height: '120vh', border: '1px solid black' }}>
            <ambientLight intensity={0.5} />
            <directionalLight
                position={[5, 5, 5]}
                intensity={0.8}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
                shadow-bias={-0.001}
                shadow-radius={2}
            />
            <pointLight position={[0, 0, 0]} intensity={0.2} />

            <Suspense fallback={null}>
                <PresentationControls speed={1.5} global zoom={1} polar={[0, Math.PI / 10]}>
                    <Stage environment={null} intensity={1} contactShadow={false}>
                        <Bmw_m4_f82 exteriorColor={color} interiorColor={interiorColor} rimColor={wheelColor} windowGlass={windowGlass} />
                    </Stage>
                    <mesh rotation={[-Math.PI / 4, 0, 0]} position={[0, 1, 0]} />
                    <Environment preset="city" />
                </PresentationControls>
            </Suspense>
        </Canvas>
    );
};

export default Experience;
