
import React, { useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AstroAddInspirationModalProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
}

export const AstroAddInspirationModal: React.FC<AstroAddInspirationModalProps> = ({
  open,
  onOpenChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6 bg-gradient-to-b from-indigo-800/90 to-black/95 border-indigo-700">
        <DialogTitle className="text-indigo-200 text-lg mb-2 text-center">Add Your Inspiration</DialogTitle>
        <form className="flex flex-col gap-3">
          <label className="text-indigo-300 text-sm font-medium mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="file:rounded-lg file:bg-indigo-600 file:text-indigo-50 text-indigo-100 px-2 py-2 border border-indigo-700 rounded transition focus:outline-none"
            disabled
          />
          <label className="text-indigo-300 text-sm font-medium mt-2 mb-1">Your Quote</label>
          <input
            type="text"
            placeholder="Type your cosmic thought…"
            className="bg-black/65 text-indigo-100 border border-indigo-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-indigo-400"
            disabled
          />
          <label className="text-indigo-300 text-sm font-medium mt-2 mb-1">Description</label>
          <textarea
            placeholder="Add details (credit, origin, etc)"
            className="bg-black/65 text-indigo-100 border border-indigo-700 rounded px-3 py-2 min-h-[64px] focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-indigo-400 resize-none"
            disabled
          ></textarea>
          <Button variant="default" className="mt-3 bg-indigo-600 shadow-glow hover:bg-indigo-500 disabled:opacity-60" disabled>
            Save (Coming Soon)
          </Button>
        </form>
        <div className="text-indigo-400 text-xs text-center mt-1 opacity-80">Feature coming soon!</div>
      </DialogContent>
    </Dialog>
  );
};
