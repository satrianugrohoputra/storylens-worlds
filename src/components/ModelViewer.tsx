
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

type ModelViewerProps = {
  variant: "cube" | "sphere" | "torus";
};

export const ModelViewer: React.FC<ModelViewerProps> = ({ variant }) => {
  return (
    <div className="w-full h-full min-h-[16rem] bg-black/70 rounded-xl shadow-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 3.2], fov: 54 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3,4,5]} intensity={0.64} />
        <Suspense fallback={null}>
          {variant === "cube" && (
            <mesh rotation={[0.5, 0.4, 0]}>
              <boxGeometry args={[1.16, 1.16, 1.16]} />
              <meshStandardMaterial color="#7cc3ff" metalness={0.33} roughness={0.47} />
            </mesh>
          )}
          {variant === "sphere" && (
            <mesh rotation={[0.2, 0.35, 0]}>
              <sphereGeometry args={[0.93, 64, 48]} />
              <meshStandardMaterial color="#efdeff" metalness={0.58} roughness={0.32} />
            </mesh>
          )}
          {variant === "torus" && (
            <mesh rotation={[0.7, 0.37, 0]}>
              <torusGeometry args={[0.77, 0.28, 32, 90]} />
              <meshStandardMaterial color="#b5fffc" metalness={0.7} roughness={0.23} />
            </mesh>
          )}
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} minDistance={1.3} maxDistance={8} />
      </Canvas>
    </div>
  );
};
