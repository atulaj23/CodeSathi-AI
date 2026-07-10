import { Canvas } from "@react-three/fiber";
import {
  Float,
  Environment,
  OrbitControls
} from "@react-three/drei";

import "./Avatar3D.css";


function AIAvatar() {

  return (

    <group>


      {/* Head */}

      <mesh
        position={[0, 1.2, 0]}
      >

        <sphereGeometry
          args={[0.45, 64, 64]}
        />


        <meshStandardMaterial

          color="#60a5fa"

          emissive="#2563eb"

          emissiveIntensity={3}

          transparent

          opacity={0.85}

        />


      </mesh>



      {/* Body */}

      <mesh
        position={[0, 0, 0]}
      >

        <capsuleGeometry
          args={[
            0.5,
            1.2,
            32,
            64
          ]}
        />


        <meshStandardMaterial

          color="#9333ea"

          emissive="#7c3aed"

          emissiveIntensity={3}

          transparent

          opacity={0.55}

        />


      </mesh>



      {/* Core Energy */}

      <mesh
        position={[0,0,0.45]}
      >

        <sphereGeometry
          args={[0.12,32,32]}
        />


        <meshStandardMaterial

          color="#22d3ee"

          emissive="#22d3ee"

          emissiveIntensity={5}

        />


      </mesh>



      {/* Energy Ring */}

      <mesh
        rotation={[
          Math.PI / 2,
          0,
          0
        ]}
      >

        <torusGeometry
          args={[
            1,
            0.025,
            32,
            100
          ]}
        />


        <meshStandardMaterial

          color="#38bdf8"

          emissive="#38bdf8"

          emissiveIntensity={5}

        />


      </mesh>


    </group>

  );

}



export default function Avatar3D(){


  return (

    <div className="avatar-container">


      <Canvas

        camera={{
          position:[
            0,
            0.5,
            4
          ],

          fov:45

        }}

      >


        <ambientLight
          intensity={1}
        />



        <directionalLight

          position={[
            3,
            4,
            3
          ]}

          intensity={3}

        />



        <pointLight

          position={[
            0,
            2,
            2
          ]}

          color="#60a5fa"

          intensity={5}

        />



        <Float

          speed={2}

          floatIntensity={0.8}

          rotationIntensity={0.3}

        >

          <AIAvatar />

        </Float>



        <Environment
          preset="city"
        />


        <OrbitControls

          enableZoom={false}

          enablePan={false}

        />


      </Canvas>


    </div>

  );

}