import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PresentationControls, Stage, Environment, MeshReflectorMaterial } from '@react-three/drei';
import Bmw_m4_f82 from './Bmw_m4_f82';

const Experience = ({ color, interiorColor, wheelColor, windowGlass,autoRotate,autoRotateSpeed }) => {
    return (
        <Canvas shadows camera={{ position: [0, 0, 2], fov: 50 }} style={{ width: '100vw', height: '120vh' ,backgroundColor:'#f3f2f2'}}>
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
                <PresentationControls speed={1.5} global zoom={1} polar={[0, Math.PI / 10]} autoRotate={autoRotate}
                    autoRotateSpeed={autoRotateSpeed}>
                    <Stage environment={null} intensity={1} contactShadow={false}>
                        <Bmw_m4_f82 exteriorColor={color} interiorColor={interiorColor} rimColor={wheelColor} windowGlass={windowGlass} />
                    </Stage>
                    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -1, 0]}>
                        <planeGeometry args={[200, 200]} />
                        <MeshReflectorMaterial
                            color="#000"
                            blur={[300, 100]}
                            resolution={2048}
                            mixBlur={0.5}
                            metalness={0.2}
                            mixStrength={40}
                            roughness={0.5}
                            depthScale={1.2}
                            minDepthThreshold={0.4}
                            maxDepthThreshold={1.4}
                            reflectorOffset={0.02}
                        />
                    </mesh>
                    <Environment preset="city" />
                </PresentationControls>
            </Suspense>
        </Canvas>
    );
};

export default Experience;
