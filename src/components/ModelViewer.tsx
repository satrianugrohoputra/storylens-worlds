
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import { Suspense } from "react";

type ModelViewerProps = {
  modelUrl: string;
  hint?: boolean;
};

function ModelInner({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrl, hint }) => {
  return (
    <div className="w-full h-80 md:h-[28rem] bg-black/70 rounded-xl overflow-hidden shadow-xl relative">
      <Canvas camera={{ position: [0, 0, 2.5], fov: 55 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3,4,5]} intensity={0.65} />
        <Suspense fallback={<Html center className="text-xl text-white">Loading 3D…</Html>}>
          <ModelInner url={modelUrl} />
        </Suspense>
        <Environment preset="warehouse" />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={1.2}
          maxDistance={8}
        />
      </Canvas>
      {hint && (
        <div className="absolute bottom-2 right-2 bg-black/60 text-xs md:text-sm text-white px-3 py-1 rounded-lg pointer-events-none select-none shadow">
          Drag to rotate, scroll to zoom
        </div>
      )}
    </div>
  );
};

// Required by drei's useGLTF:
useGLTF.preload("/src/assets/models/sample-cube.glb");
