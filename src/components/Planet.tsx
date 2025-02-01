import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';

import vertex from '../shaders/planet.vert?raw';
import fragment from '../shaders/planet.frag?raw';

export default function Planet() {
    const mesh = useRef<THREE.Mesh>(new THREE.Mesh());

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
            <sphereGeometry args={[1, 64, 64]} />
            <shaderMaterial vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
        </mesh>
    );
}
