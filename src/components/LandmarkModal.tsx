
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

type Landmark = {
  title: string;
  location: string;
  img: string;
  description: string;
};

type LandmarkModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  landmark: Landmark | null;
};

export const LandmarkModal: React.FC<LandmarkModalProps> = ({
  open,
  onOpenChange,
  landmark,
}) => {
  if (!landmark) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-md w-full bg-white/90 backdrop-blur-md rounded-xl shadow-2xl border-0 overflow-hidden transition-transform duration-300 md:scale-100">
        <div className="relative flex flex-col items-stretch md:rounded-xl">
          <button
            className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-indigo-100 rounded-full p-1 ring-2 ring-indigo-200 shadow transition"
            aria-label="Close"
            onClick={() => onOpenChange(false)}
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
          <img
            src={landmark.img}
            alt={landmark.title}
            loading="lazy"
            className="w-full h-56 object-cover rounded-t-xl"
          />
          <div className="p-6 pt-4 flex flex-col gap-2">
            <div className="font-extrabold text-xl text-indigo-800 drop-shadow-sm tracking-wide">
              {landmark.title}
            </div>
            <div className="text-indigo-600 font-medium text-sm mb-1">
              {landmark.location}
            </div>
            <p className="text-gray-700 text-base">{landmark.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
