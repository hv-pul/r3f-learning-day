import {useEffect, useRef, useState} from "react";
import { useSpring, animated, config } from '@react-spring/three'
import { useA11y } from "@react-three/a11y";

function Sphere(props: JSX.IntrinsicElements['mesh']) {
    const mesh = useRef<THREE.Mesh>(null!)
    const [hovered, setHover] = useState(false)

    const a11y = useA11y()

    useEffect(() => {
        setHover(a11y.hover);
    }, [a11y])

    const { scale } = useSpring({
        // @ts-ignore
        scale: props.active ? 1.5 : 1,
        config: config.wobbly
    })

    const { color } = useSpring({
        color: hovered ? 'rgb(230,180,160)' : 'rgb(173,216,230)',
        config: config.slow
    })

    return (
        <animated.mesh
            {...props}
            ref={mesh}
            scale={scale}
        >
            <sphereBufferGeometry args={[1, 32, 32]} />
            <animated.meshStandardMaterial attach="material" color={color} roughness={0} metalness={0.1} />
        </animated.mesh>
    )
}

export default Sphere;
