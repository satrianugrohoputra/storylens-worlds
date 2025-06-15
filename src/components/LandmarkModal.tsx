
import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Check } from "lucide-react";

type Landmark = {
  title: string;
  country: string;
  img: string;
  description: string;
  unlocked?: boolean;
};

type LandmarkModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  landmark: Landmark | null;
  isMobile?: boolean;
};

export const LandmarkModal: React.FC<LandmarkModalProps> = ({
  open,
  onOpenChange,
  landmark,
  isMobile
}) => {
  const [isPortrait, setIsPortrait] = React.useState(false);

  React.useEffect(() => {
    setIsPortrait(false); // reset state when opening new modal
  }, [landmark?.img]);

  // This fn is called when the image loads to detect natural orientation
  const handleImgLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setIsPortrait(img.naturalHeight > img.naturalWidth);
  };

  if (!landmark) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`
          max-w-xl
          p-0
          border-2 border-indigo-700
          bg-gradient-to-b from-indigo-900/90 to-black/90
          shadow-2xl
          animate-scale-in
          rounded-2xl
          flex flex-col items-center
        `}
        style={{
          boxShadow: "0 0 40px 6px #6366f177, 0 3px 30px 2px #312e8144",
        }}
      >
        <div className="flex flex-col items-center w-full px-0 pt-0 pb-5 gap-0">
          {/* Hero image: show whole photo, never distort/crop tall images */}
          <div className="w-full aspect-[5/4] rounded-t-2xl overflow-hidden bg-black/80 flex items-center justify-center border-b-2 border-indigo-800">
            <img
              src={landmark.img}
              alt={landmark.title}
              loading="lazy"
              className={`
                w-full h-full
                ${
                  isPortrait
                    ? "object-contain"
                    : "object-cover"
                }
                object-center
                bg-black
                transition-all
                duration-200
                rounded-t-2xl
                select-none
                mx-auto
                block
              `}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectPosition: "center",
                backgroundColor: "#000",
              }}
              draggable={false}
              onLoad={handleImgLoad}
            />
          </div>
          {/* Content below image */}
          <div className="w-full flex flex-col items-center py-4 px-6 gap-1">
            <DialogTitle asChild>
              <h2 className="font-bold text-2xl text-indigo-100 text-center mt-1 mb-2 drop-shadow flex items-center justify-center gap-2">
                {landmark.title}
                {landmark.unlocked && (
                  <span className="inline-flex items-center gap-1 text-green-300 font-medium rounded px-2 py-0.5 bg-green-900/60">
                    <Check className="w-4 h-4" /> Visited
                  </span>
                )}
              </h2>
            </DialogTitle>
            <div className="text-indigo-300 font-medium text-base text-center mb-1">{landmark.country}</div>
            <DialogDescription asChild>
              <p className="text-indigo-100/90 text-sm text-center mt-1">{landmark.description}</p>
            </DialogDescription>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

