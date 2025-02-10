import { ScrollControls } from '@react-three/drei';
import MouseTracker from './components/MouseTracker';
import System from './components/SolarSystem/System';
import './styles/App.css';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import Sun from './components/SolarSystem/Sun';

function App() {
    return (
        <div id='canvas-container'>
            <Canvas camera={{ fov: 60, zoom: 1, position: [0, 0, 35] }}>
                <pointLight color='white' position={[0, 0, 25]} castShadow={false} power={5000} />
                <pointLight color='white' position={[0, 0, 0]} castShadow={false} power={100} />
                <Sun size={25}/>
                <ScrollControls pages={3} damping={0.3} horizontal>
                    <System numOfPlanets={4} radius={30}/>
                </ScrollControls>
                <MouseTracker />
                <Perf />
            </Canvas>
        </div>
    );
}

export default App;
