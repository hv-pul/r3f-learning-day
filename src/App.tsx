import React from 'react';
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei"
import Scene from "./components/Scene";

function App() {
    return (
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
    );
}

export default App;
