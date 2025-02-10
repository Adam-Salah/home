import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';

export default function MouseTracker() {
    const state = useThree();
    state.camera.layers.enable(31);
    const pointer = useRef<THREE.Mesh>(new THREE.Mesh());
    pointer.current.layers.set(31);
    const raycaster = useRef<THREE.Raycaster>(new THREE.Raycaster());

    let vec = new THREE.Vector3();
    let pos = new THREE.Vector3();
    let mouse = new THREE.Vector2();
    let closestPos = new THREE.Vector3();

    useFrame(() => {
        vec.set(state.pointer.x, state.pointer.y, 0.5);
        vec.unproject(state.camera);
        vec.sub(state.camera.position).normalize();
        pos.copy(state.camera.position).add(vec.multiplyScalar(-state.camera.position.z / vec.z));

        mouse.set(state.pointer.x, state.pointer.y);
        raycaster.current.setFromCamera(mouse, state.camera);

        const intersects = raycaster.current.intersectObjects(state.scene.children);
        let closest = intersects[0];
        for (let i = 1; i < intersects.length; i++) {
            if (intersects[i].distance < closest.distance) {
                closest = intersects[i];
            }
        }
        if (closest) {
            closest.object.getWorldPosition(closestPos);
            let camDirection = new THREE.Vector3();
            camDirection.copy(state.camera.position).sub(closest.point).normalize();
            let pointElevation = closest.point.sub(closestPos);
            let hover = Math.min(pointElevation.add(pointElevation.multiplyScalar(0.5)).length(), 1);
            let newPos = closest.point.add(camDirection.multiplyScalar(hover)).add(closestPos);
            pos.copy(newPos);
            console.log(closest.object.userData.planetId);
        }
        pointer.current.position.copy(pos);
    });

    return (
        <mesh ref={pointer} scale={0.1} position={[100, 100, 100]}>
            <sphereGeometry />
            <meshStandardMaterial />
        </mesh>
    );
}
