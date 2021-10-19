function Floor(props: JSX.IntrinsicElements['mesh']) {
    return (
        <mesh
            {...props}
        >
            <planeBufferGeometry args={[32, 8, 1, 1]} />
            {props.children}
        </mesh>
    )
}

export default Floor;
