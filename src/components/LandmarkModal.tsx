
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
  if (!landmark) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`
          p-0 w-full max-w-md bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl border-0 transition-transform duration-300 relative
          flex flex-col items-center justify-center
          ${isMobile 
            ? "fixed bottom-0 top-auto left-0 right-0 mx-auto rounded-t-2xl animate-slide-in-right"
            : "md:scale-100"
          }
        `}
        style={isMobile ? { borderRadius: "1.3rem 1.3rem 0 0" } : {}}
      >
        <div className="w-full flex flex-col gap-4 items-center justify-center px-5 pt-6 pb-7">
          {/* Accessible, visible title */}
          <DialogTitle asChild>
            <h2 className="font-extrabold text-2xl text-indigo-900 drop-shadow tracking-wide text-center mb-1 flex items-center justify-center gap-2">
              {landmark.title}
              {landmark.unlocked && (
                <span className="inline-flex items-center gap-1 text-green-700 font-medium rounded px-2 py-0.5 bg-green-100">
                  <Check className="w-4 h-4" /> Visited
                </span>
              )}
            </h2>
          </DialogTitle>
          {/* Main hero image */}
          <div className="w-full flex justify-center items-center">
            <img
              src={landmark.img}
              alt={landmark.title}
              loading="lazy"
              className="
                rounded-xl shadow-xl border border-indigo-200
                object-cover mx-auto 
                w-full max-w-[420px] max-h-[44vh] min-h-[180px]
                aspect-[16/10]
                "
              draggable={false}
              style={{
                maxWidth: isMobile ? '92vw' : '420px',
                maxHeight: isMobile ? '32vh' : '44vh',
                width: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          {/* Country and description (with accessible description component) */}
          <div className="flex flex-col gap-2 w-full items-center text-center">
            <div className="text-indigo-700 font-medium text-sm mb-1">
              {landmark.country}
            </div>
            <DialogDescription asChild>
              <p className="text-gray-700 text-base">{landmark.description}</p>
            </DialogDescription>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
