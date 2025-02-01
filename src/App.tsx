import MouseTracker from './components/MouseTracker';
import Planet from './components/Planet';
import './styles/App.css';
import { Canvas } from '@react-three/fiber';

function App() {
    return (
        <div id='canvas-container'>
            <Canvas camera={{fov: 75, zoom: 2}}>
                <pointLight color='white' position={[0, 0, 5]} castShadow={true} power={100}/>
                <Planet />
                <MouseTracker />
            </Canvas>
        </div>
    );
}

export default App;
