import { Canvas } from '@react-three/fiber';
import './App.css';
import { Color, Vector3 } from 'three';

import Experience from './Experience';

function App() {

  function toggleFullscreen() {
    if (document.fullscreenEnabled) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
}

  return (
    <>
      <Canvas shadows camera={{position: new Vector3(0,2,5) }} onDoubleClick={toggleFullscreen} >
        <Experience/>
        <color attach='background' args={[new Color('black')]}/>
      </Canvas>
    </>
    );
}

export default App;
