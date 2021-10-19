import { useRef } from 'react';
import { useFrame } from "@react-three/fiber";
import Environment from "./Environment";
import Sphere from "./Sphere";

function App() {
    const group = useRef<THREE.Group>(null!)
    useFrame((state) => (group.current.rotation.y = Math.sin(state.clock.getElapsedTime() / 4) * Math.PI))

    return (
        <Environment>
            <group ref={group}>
                <Sphere castShadow receiveShadow position={[-1.8, 4, 0.5]} />
                <Sphere castShadow receiveShadow position={[1.8, 2.5, -0.5]} />
            </group>
        </Environment>
    );
}

export default App;
