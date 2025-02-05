import * as THREE from 'three';
import { useRef } from 'react';

import Planet from './Planet';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';

export default function System() {
    const ref = useRef(new THREE.Group());
    const state = useThree();
    const scroll = useScroll();

    const numOfPlanets = 3;

    const positions: number[] = [];
    for (let i = 0; i < numOfPlanets; i++) {
        positions.push(i);
    }

    const planetsList = positions.map((position) => (
        <Planet
            key={position}
            position={{
                x: Math.sin(2 * Math.PI * (position / numOfPlanets)) * 5,
                y: 0,
                z: Math.cos(2 * Math.PI * (position / numOfPlanets)) * 5,
            }}
        />
    ));

    useFrame((_state) => {
        ref.current.rotation.y = Math.PI * 2 * -scroll.offset;
    });

    return <group ref={ref}>{planetsList}</group>;
}
