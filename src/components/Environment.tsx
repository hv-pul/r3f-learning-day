import { softShadows } from "@react-three/drei"
import Floor from "./Floor";

function Environment(props: { children: any; }) {
    softShadows({
        frustum: 2.75, // Frustum width (default: 3.75) must be a float
        size: 0.005, // World size (default: 0.005) must be a float
        near: 9.5, // Near plane (default: 9.5) must be a float
        samples: 17, // Samples (default: 17) must be a int
        rings: 11, // Rings (default: 11) must be a int
    });

    return (
        <>
            <fog attach="fog" args={["rgba(250,249,245)", 28, 33.5]} />
            <ambientLight intensity={0.6} />
            <directionalLight
                castShadow
                position={[2.5, 8, 5]}
                intensity={1.5}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />
            <pointLight position={[-10, 0, 5]} color="red" intensity={2.5} />
            <pointLight position={[0, -10, 0]} intensity={1.5} />

            { props.children }

            <Floor receiveShadow
                   rotation={ [ Math.PI / -2, 0, 0 ]}
                   position={[0, -2, 0]}
            >
                <shadowMaterial attach="material" opacity={0.6}/>
            </Floor>

            <Floor rotation={ [ Math.PI / -2, 0, 0 ]} position={[0, -2, 0]}>
                <meshStandardMaterial color="rgb(230,225,230)" />
            </Floor>
        </>
    )
}

export default Environment;
