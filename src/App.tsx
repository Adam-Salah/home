import { ScrollControls } from '@react-three/drei';
import MouseTracker from './components/MouseTracker';
import System from './components/SolarSystem/System';
import './styles/App.css';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';

function App() {
    return (
        <div id='canvas-container'>
            <Canvas camera={{ fov: 90, zoom: 1, position: [0, 0, 15] }}>
                <pointLight color='white' position={[0, 0, 0]} castShadow={false} power={100} />
                <pointLight color='white' position={[0, 0, 10]} castShadow={false} power={500} />
                <ScrollControls pages={4} damping={0.3} infinite>
                    <System numOfPlanets={4} radius={10}/>
                </ScrollControls>
                <MouseTracker />
                <Perf />
            </Canvas>
        </div>
    );
}

export default App;
