
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface AstroGalleryModalProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  image: string;
  title: string;
  quote: string;
  description?: string;
}

export const AstroGalleryModal: React.FC<AstroGalleryModalProps> = ({
  open,
  onOpenChange,
  image,
  title,
  quote,
  description,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-xl bg-gradient-to-b from-indigo-900/90 to-black/90 border-indigo-700 shadow-2xl animate-scale-in">
      <div className="flex flex-col items-center gap-4">
        <div className="w-full aspect-square rounded-lg overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-indigo-200 font-semibold text-xl text-center">{title}</div>
        <div className="italic text-indigo-300 text-lg text-center leading-snug">{`“${quote}”`}</div>
        {description && (
          <div className="text-sm text-indigo-100/80 text-center mt-2">{description}</div>
        )}
      </div>
    </DialogContent>
  </Dialog>
);
