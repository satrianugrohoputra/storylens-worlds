
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
          p-0 w-full max-w-md bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl border-0 overflow-hidden transition-transform duration-300 relative
          ${isMobile ? "fixed bottom-0 top-auto left-0 right-0 mx-auto rounded-t-2xl animate-slide-in-right" : "md:scale-100"}
        `}
        style={isMobile ? { borderRadius: "1.3rem 1.3rem 0 0" } : {}}
      >
        <div className="relative flex flex-col items-stretch w-full">
          {/* Close button can be added here if not using dialog close */}
          <img
            src={landmark.img}
            alt={landmark.title}
            loading="lazy"
            className="w-full h-56 object-cover rounded-t-xl"
            draggable={false}
          />
          <div className="p-6 pt-4 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-xl text-indigo-900 drop-shadow tracking-wide">
                {landmark.title}
              </h2>
              {landmark.unlocked && (
                <span className="inline-flex items-center gap-1 text-green-700 font-medium rounded px-2 py-0.5 bg-green-100">
                  <Check className="w-4 h-4" /> Visited
                </span>
              )}
            </div>
            <div className="text-indigo-700 font-medium text-sm mb-1">
              {landmark.country}
            </div>
            <p className="text-gray-700 text-base">{landmark.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
