import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';

import vertex from '../../shaders/planet1.vert?raw';
import fragment from '../../shaders/planet1.frag?raw';

export default function Planet(props: PlanetProps) {
    const mesh = useRef<THREE.Mesh>(new THREE.Mesh());
    useEffect(() => {
        mesh.current.position.set(props.position.x, props.position.y, props.position.z);
    }, [])

    const uniforms = useMemo(
        () => ({
            planetId: { value: props.planetId },
        }),
        []
    );

    useFrame((_state, delta) => {
        mesh.current.rotation.x += 1 * delta;
        mesh.current.rotation.y += 0.5 * delta;
    });

    return (
        <mesh ref={mesh} userData={{planetId: props.planetId}}>
            <sphereGeometry args={[props.size, 64, 64]} />
            <shaderMaterial vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
        </mesh>
    );
}

interface PlanetProps {
    planetId: number,
    size: number,
    position: { x: number; y: number; z: number }
}

