import {useRef, useState} from 'react';
import { useFrame } from "@react-three/fiber";
import { A11y } from "@react-three/a11y";
import Environment from "./Environment";
import Sphere from "./Sphere";

function App() {
    const group = useRef<THREE.Group>(null!)
    useFrame((state) => (group.current.rotation.y = Math.sin(state.clock.getElapsedTime() / 4) * Math.PI))

    const [sphere1Active, setSphere1Active] = useState(false)
    const [sphere2Active, setSphere2Active] = useState(false)

    return (
        <Environment>
            <group ref={group}>
                <A11y role="button"
                      description="Sphere 1"
                      actionCall={() => setSphere1Active(!sphere1Active)}
                >
                    {/*
 // @ts-ignore */}
                    <Sphere active={sphere1Active} castShadow receiveShadow position={[-1.8, 4, 0.5]} />
                </A11y>
                <A11y role="button"
                      description="Sphere 2"
                      actionCall={() => setSphere2Active(!sphere2Active)}
                >
                    {/*
 // @ts-ignore */}
                    <Sphere active={sphere2Active} castShadow receiveShadow position={[1.8, 2.5, -0.5]} />
                </A11y>
            </group>
        </Environment>
    );
}

export default App;
