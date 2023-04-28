import { Group, Mesh, MeshStandardMaterial } from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    Plane_1: Mesh
    Plane_2: Mesh
    Plane_3: Mesh
    Circle: Mesh
    Circle001: Mesh
  }
  materials: {
    SpaceShipBody: MeshStandardMaterial
    Bonnet: MeshStandardMaterial
    SpaceShipOrange: MeshStandardMaterial
    ['Material.001']: MeshStandardMaterial
  }
}

function Rocket(props: JSX.IntrinsicElements['group']) {

  const rocket = useRef<Group>(null);
  const { nodes, materials } = useGLTF('model/rocket.glb') as GLTFResult;

  const [keyState, setKeyState] = useState({ right: false, left:false });


  useEffect(() => {

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(()=>{
    const { left, right } = keyState;

    // rocket.current?.position.set(0,0,0)

    if(right && rocket.current && rocket?.current.rotation.z < 0.5 )
      rocket.current.rotation.z +=  0.05;
    

    if(left && rocket.current && rocket?.current.rotation.z > -0.5)
      rocket.current.rotation.z -=  0.05;
    

    if(!right && rocket.current && rocket?.current.rotation.z > 0 )
      rocket.current.rotation.z -=  0.05;
  

    if(!left && rocket.current && rocket?.current.rotation.z < 0)
      rocket.current.rotation.z +=  0.05
    
  })
  
  
  useFrame(({ camera })=>{
    camera.lookAt(0,0,0);
    const { left, right } = keyState;

    //Camera Motion
    if(right && rocket.current && camera.position.x < 1)
      camera.position.x += 0.05
    
  
    if(!right && rocket.current && camera.position.x > 0)
      camera.position.x -= 0.05
    
  
    if(left && rocket.current && camera.position.x > -1)
      camera.position.x -= 0.05
  
  
    if(!left && rocket.current && camera.position.x < 0)
      camera.position.x += 0.05
    
  })

  useFrame(()=>{
    const { left, right } = keyState;

    if(right && rocket.current && rocket.current.position.x < 1)
      rocket.current.position.x += 0.03
    
  
    if(!right && rocket.current && rocket.current.position.x > 0)
      rocket.current.position.x -= 0.03
    
  
    if(left && rocket.current && rocket.current.position.x > -1)
      rocket.current.position.x -= 0.03
  
  
    if(!left && rocket.current && rocket.current.position.x < 0)
      rocket.current.position.x += 0.03
    
  })


  useFrame(({clock})=>{
    const { right, left  } = keyState;

    if(rocket.current && !right && !left)
    rocket.current.rotation.z = Math.sin(clock.elapsedTime  * 2 ) * 0.15;
  })
  
  const handleKeyDown = (event:any) => {
    if(event.key === "ArrowRight" && rocket.current)
      setKeyState({ left:false, right:true });
    else if(event.key === "ArrowLeft" && rocket.current)
      setKeyState({ right:false, left:true })
    
    // rocket.current.rotation.z =  - Math.PI * 0.25;
    // rocket.current.rotation.z = Math.PI * 0.25;

  };

  const handleKeyUp = (event:any) => {
    if(event.key === "ArrowRight" && rocket.current )
      setKeyState({ left:false, right:false })
    else if(event.key === "ArrowLeft" && rocket.current )
      setKeyState({ right:false, left:false })
  };


  return (
    <>
      <group {...props} dispose={null} ref={rocket} castShadow rotation-y={Math.PI} >
        <mesh geometry={nodes.Plane_1.geometry} castShadow material={materials.SpaceShipBody} />
        <mesh geometry={nodes.Plane_2.geometry} castShadow material={materials.Bonnet} />
        <mesh geometry={nodes.Plane_3.geometry} castShadow material={materials.SpaceShipOrange} />
        <mesh geometry={nodes.Circle.geometry} castShadow material={materials['Material.001']} position={[0, 0.18, -1]} rotation={[Math.PI / 2, -0.38, 0]} scale={0.12} />
        <mesh geometry={nodes.Circle001.geometry} castShadow material={materials['Material.001']} position={[0.52, 0.15, -1]} rotation={[Math.PI / 2, -0.38, 0]} scale={0.09} />
      </group>
    </>
  )
}

useGLTF.preload('model/rocket.glb')


export default Rocket;