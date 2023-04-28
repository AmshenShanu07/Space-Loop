
import Rocket from './Rocket';
import Ground from './Ground';

const Experience = () => {
  return (
    <>
    {/* <Perf position='top-left' /> */}
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