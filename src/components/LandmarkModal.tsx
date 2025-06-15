
import React, { useState } from "react";
import { LandmarkImage } from "./LandmarkImage";

type Landmark = {
  id: number;
  name: string;
  image: string;
  description: string;
};

type LandmarkModalProps = {
  open: boolean;
  onClose: () => void;
  landmark: Landmark | null;
};

export const LandmarkModal: React.FC<LandmarkModalProps> = ({
  open,
  onClose,
  landmark,
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  React.useEffect(() => {
    setImgFailed(false);
  }, [landmark, open]);

  if (!open || !landmark) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-600 hover:text-indigo-600 font-bold text-lg z-10 rounded-full bg-white/70 p-2 border border-gray-200"
        >
          &times;
        </button>
        <div className="aspect-[5/4] w-full rounded-lg overflow-hidden flex items-center justify-center mb-3 bg-gray-200 relative">
          <LandmarkImage
            imageUrl={landmark.image}
            alt={landmark.name}
            className="object-contain object-center w-full h-full select-none rounded-lg"
            style={{
              maxHeight: 300,
              maxWidth: "100%",
              zIndex: 1,
              background: "transparent",
              margin: "auto",
              display: "block",
            }}
            onFallback={() => setImgFailed(true)}
            retryLabel="Trying fallback…"
          />
        </div>
        <h2 className="font-bold text-2xl text-indigo-900 mb-2 text-center">
          {landmark.name}
        </h2>
        <p className="text-gray-800 text-base text-center">{landmark.description}</p>
      </div>
    </div>
  );
};
