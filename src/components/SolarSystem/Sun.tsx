import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';

import vertex from '../../shaders/sun.vert?raw';
import fragment from '../../shaders/sun.frag?raw';

export default function Sun(props: SunProps) {
    const mesh = useRef<THREE.Mesh>(new THREE.Mesh());

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0.0 },
        }),
        []
    );

    useFrame((_state, delta) => {
        (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value += delta / 2;
    });

    return (
        <mesh ref={mesh}>
            <sphereGeometry args={[props.size, 64, 64]} />
            <shaderMaterial vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
        </mesh>
    );
}

interface SunProps {
    size: number;
}
