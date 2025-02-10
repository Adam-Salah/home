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
            uTime: { value: 0.0 },
        }),
        []
    );

    useFrame((_state, delta) => {
        (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value += delta;
        mesh.current.rotation.x += 1 * delta;
        mesh.current.rotation.y += 0.5 * delta;
    });

    return (
        <mesh ref={mesh}>
            <sphereGeometry args={[props.size, 64, 64]} />
            <shaderMaterial vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
        </mesh>
    );
}

interface PlanetProps {
    size: number,
    position: { x: number; y: number; z: number }
}

