import * as THREE from 'three';
import { useRef } from 'react';

import Planet from './Planet';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';

export default function System(props: SystemProps) {
    const ref = useRef(new THREE.Group());
    const scroll = useScroll();

    const positions: number[] = [];
    for (let i = 0; i < props.numOfPlanets; i++) {
        positions.push(i);
    }

    const planetsList = positions.map((position) => (
        <Planet
            key={position}
            position={{
                x: Math.sin(2 * Math.PI * (position / props.numOfPlanets)) * props.radius,
                y: 0,
                z: Math.cos(2 * Math.PI * (position / props.numOfPlanets)) * props.radius,
            }}
        />
    ));

    useFrame((_state) => {
        ref.current.rotation.y = Math.PI * 2 * -scroll.offset;
    });

    return <group ref={ref}>{planetsList}</group>;
}

interface SystemProps {
    numOfPlanets: number,
    radius: number
}
