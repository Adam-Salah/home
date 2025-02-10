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
            planetId={position}
            size={1}
            position={{
                x: 0,
                y: 0,
                z: 0,
            }}
        />
    ));

    let newOffset;
    let steepness;
    let smoothOffset;
    let offset;
    useFrame((_state) => {
        newOffset = scroll.offset % 0.25 * 4
        steepness = 2.3;
        //Smooth step function by Inigo Quilez https://iquilezles.org/articles/smoothsteps/
        smoothOffset = newOffset**steepness / (newOffset**steepness + (1 - newOffset**steepness));
        offset = (smoothOffset / props.numOfPlanets + Math.floor(scroll.offset * props.numOfPlanets) / props.numOfPlanets) % 1;
        if (offset >= 0){
            // ref.current.rotation.y = Math.PI * 2 * -offset;
            let planet;
            for (let i = 0; i < ref.current.children.length; i++) {
                planet = ref.current.children[i];
                planet.position.x = props.radius * Math.cos(2 * Math.PI * (offset + (planet.userData.planetId + 1) / props.numOfPlanets));
                planet.position.z = props.radius * Math.sin(2 * Math.PI * (offset + (planet.userData.planetId + 1) / props.numOfPlanets));
            }
        } 
    });

    return <group ref={ref}>{planetsList}</group>;
}

interface SystemProps {
    numOfPlanets: number,
    radius: number
}
