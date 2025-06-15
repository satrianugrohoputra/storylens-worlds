
import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";

interface AstroAddInspirationModalProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
}

export const AstroAddInspirationModal: React.FC<AstroAddInspirationModalProps> = ({
  open,
  onOpenChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [quote, setQuote] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = e => setPreviewUrl(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setPreviewUrl(null);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleClose = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setQuote("");
    setDescription("");
    onOpenChange(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Could save data here (if backend/DB available)
    toast({
      title: "Inspiration saved!",
      description: `Your cosmic inspiration has been added (for this session only)!`,
      duration: 2500,
    });
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={val => {
      if (!val) handleClose();
      else onOpenChange(val);
    }}>
      <DialogContent className="max-w-md p-6 bg-gradient-to-b from-indigo-800/90 to-black/95 border-indigo-700">
        <DialogTitle className="text-indigo-200 text-lg mb-2 text-center">Add Your Inspiration</DialogTitle>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <label className="text-indigo-300 text-sm font-medium mb-1">Upload Image</label>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              className="flex items-center gap-2 px-3 py-2"
              onClick={handleUploadClick}
            >
              <Upload className="w-5 h-5" />
              <span>Choose Image</span>
            </Button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-16 h-16 object-cover rounded shadow-md border border-indigo-600"
                style={{ minWidth: 64, minHeight: 64 }}
              />
            )}
          </div>
          <label className="text-indigo-300 text-sm font-medium mt-2 mb-1">Your Quote</label>
          <input
            type="text"
            placeholder="Type your cosmic thought…"
            className="bg-black/65 text-indigo-100 border border-indigo-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-indigo-400"
            value={quote}
            onChange={e => setQuote(e.target.value)}
          />
          <label className="text-indigo-300 text-sm font-medium mt-2 mb-1">Description</label>
          <textarea
            placeholder="Add details (credit, origin, etc)"
            className="bg-black/65 text-indigo-100 border border-indigo-700 rounded px-3 py-2 min-h-[64px] focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-indigo-400 resize-none"
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
          <Button
            variant="default"
            className="mt-3 bg-indigo-600 shadow-glow hover:bg-indigo-500 transition-all"
            type="submit"
            disabled={!previewUrl || !quote.trim()}
          >
            Save
          </Button>
        </form>
        <div className="text-indigo-400 text-xs text-center mt-1 opacity-80">
          Only visible to you (demo only).
        </div>
      </DialogContent>
    </Dialog>
  );
};
