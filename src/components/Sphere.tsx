import {useEffect, useRef, useState} from "react";
import { useSpring, animated, config } from '@react-spring/three'
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events";
import {Color} from "three";

function Sphere(props: JSX.IntrinsicElements['mesh']) {
    const mesh = useRef<THREE.Mesh>(null!)
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    useEffect(() => {
        return () => {
            document.body.classList.remove('is-hovered');
        }
    }, [])

    useEffect(() => {
        if (hovered) {
            document.body.classList.add('is-hovered');
        } else {
            document.body.classList.remove('is-hovered');
        }
    }, [hovered])

    const { scale } = useSpring({
        scale: active ? 1.5 : 1,
        config: config.wobbly
    })

    const { color } = useSpring({
        color: hovered ? 'rgb(230,180,160)' : 'rgb(173,216,230)',
        config: config.slow
    })

    function onOver(event: ThreeEvent<PointerEvent>) {
        event.stopPropagation();
        setHover(true);
    }

    function onvOut() {
        setHover(false);
    }

    return (
        <animated.mesh
            {...props}
            ref={mesh}
            scale={scale}
            onClick={(event) => setActive(!active)}
            onPointerOver={onOver}
            onPointerOut={onvOut}
        >
            <sphereBufferGeometry args={[1, 32, 32]} />
            <animated.meshStandardMaterial attach="material" color={color} roughness={0} metalness={0.1} />
        </animated.mesh>
    )
}

export default Sphere;
