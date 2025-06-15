
import React, { useState } from "react";

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
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  React.useEffect(() => {
    setIsImageLoading(true);
    setImgError(false);
  }, [landmark, open]);

  if (!open || !landmark) return null;

  const handleImgError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setImgError(true);
    e.currentTarget.src = "/placeholder.svg";
  };

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
          {/* Skeleton Loader saat loading, fallback jika error */}
          {landmark.image && !imgError ? (
            <>
              {isImageLoading && (
                <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-300 animate-pulse z-0">
                  <span className="text-xs text-gray-400">Loading...</span>
                </div>
              )}
              <img
                src={landmark.image}
                alt={landmark.name}
                className="object-contain object-center w-full h-full select-none rounded-lg transition"
                loading="lazy"
                draggable={false}
                style={{
                  maxHeight: 300,
                  maxWidth: "100%",
                  zIndex: 1,
                  background: "transparent",
                  margin: "auto",
                  display: "block",
                }}
                onLoad={() => setIsImageLoading(false)}
                onError={handleImgError}
              />
            </>
          ) : (
            <img
              src="/placeholder.svg"
              alt="Placeholder"
              className="object-contain w-4/5 h-4/5 opacity-60"
              draggable={false}
              style={{ maxHeight: 220, margin: "auto", display: "block" }}
            />
          )}
        </div>
        <h2 className="font-bold text-2xl text-indigo-900 mb-2 text-center">
          {landmark.name}
        </h2>
        <p className="text-gray-800 text-base text-center">{landmark.description}</p>
      </div>
    </div>
  );
};
