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
            size={(position + 1) / 2}
            position={{
                x: Math.sin(2 * Math.PI * (position / props.numOfPlanets)) * props.radius,
                y: 0,
                z: Math.cos(2 * Math.PI * (position / props.numOfPlanets)) * props.radius,
            }}
        />
    ));

    let newOffset;
    let steepness;
    let smoothOffset;
    let offset;
    useFrame((_state) => {
        newOffset = scroll.offset % 0.25 * 4
        steepness = 3;
        //Smooth step function by Inigo Quilez https://iquilezles.org/articles/smoothsteps/
        smoothOffset = newOffset**steepness / (newOffset**steepness + (1 - newOffset**steepness));
        offset = (smoothOffset / props.numOfPlanets + Math.floor(scroll.offset * props.numOfPlanets) / props.numOfPlanets) % 1;
        if (offset >= 0) ref.current.rotation.y = Math.PI * 2 * -offset;
        console.log(offset);
    });

    return <group ref={ref}>{planetsList}</group>;
}

interface SystemProps {
    numOfPlanets: number,
    radius: number
}
