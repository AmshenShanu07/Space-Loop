import { Mesh } from 'three';
import { Sparkles, useTexture } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber';

const Ground = () => {
  const envGroundRef = useRef<Mesh>(null);

  const [colorMap, normalMap, roughnessMap, aoMap] = useTexture([
    'texture/basecolor.jpg',
    'texture/normal.jpg',
    'texture/roughness.jpg',
    'texture/ambientOcclusion.jpg',
  ])
  

  useFrame(()=>{
    if(envGroundRef.current)
      envGroundRef.current.rotation.x -= 0.003
  })


  return (
    <group >
      <mesh
        position={[0, 12.5, 0]}
        rotation-y={Math.PI*0.5}
        scale={[25,25,25]}
        receiveShadow
        ref={envGroundRef}
      >
        <Sparkles
        scale={8}
        size={15}
        count={2000}
      />
        <torusGeometry/>
        {/* <meshStandardMaterial/> */}
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          aoMap={aoMap}
        />
      </mesh>
    </group>
  )
}

export default Ground