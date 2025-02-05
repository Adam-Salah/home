import { ScrollControls } from '@react-three/drei';
import MouseTracker from './components/MouseTracker';
import System from './components/SolarSystem/System';
import './styles/App.css';
import { Canvas } from '@react-three/fiber';

function App() {
    return (
        <div id='canvas-container'>
            <Canvas camera={{ fov: 75, zoom: 1, position: [0, 0, 10] }}>
                <pointLight color='white' position={[0, 0, 0]} castShadow={false} power={100} />
                <pointLight color='white' position={[0, 0, 10]} castShadow={false} power={500} />
                <ScrollControls pages={1} damping={0.1} infinite>
                    <System />
                </ScrollControls>
                <MouseTracker />
            </Canvas>
        </div>
    );
}

export default App;
