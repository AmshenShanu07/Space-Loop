
import Rocket from './Rocket';
import Ground from './Ground';
import { OrbitControls } from '@react-three/drei';

const Experience = () => {
  return (
    <>
    {/* <Perf position='top-left' /> */}
      <OrbitControls/>
      <ambientLight/>
      <directionalLight
        castShadow
        position={[0,3,-3]}
        scale={3}
      />
      <Rocket/>
      <Ground/>
    </>
  )
}

export default Experience