/* eslint-disable react/no-unknown-property */
import { Center, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import CameraRig from "./CameraRig";
import BackDrop from "./BackDrop";
import Shirt from "./Shirt";

const CanvasWrapper = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <CameraRig>
        <BackDrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasWrapper;
