import React from 'react';
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei"
import { A11yAnnouncer } from '@react-three/a11y'
import Scene from "./components/Scene";

function App() {
    return (
        <>
            <Canvas shadows dpr={ 2 }>
                <PerspectiveCamera
                    makeDefault
                    fov={ 25 }
                    position={[0, 20, 20]}
                    rotation={[Math.PI / -4.5, 0, 0]}
                >
                </PerspectiveCamera>
                <Scene />
            </Canvas>
            <A11yAnnouncer />
        </>
);
}

export default App;
