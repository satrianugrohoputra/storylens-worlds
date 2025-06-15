
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

const LOCAL_STORAGE_KEY = "chapter2-reflection-answer";

export default function ReflectionForm() {
  const [answer, setAnswer] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const prev = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (prev) setAnswer(prev);
  }, []);

  const onSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, answer);
    setSaved(true);
    toast("Reflection saved!", { description: "Your answer was stored to this device." });
    setTimeout(() => setSaved(false), 1700);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-indigo-900/80 rounded-xl shadow-lg px-6 py-8 border border-indigo-600/20">
      <label htmlFor="reflection" className="text-lg font-semibold text-indigo-200 block mb-2">
        What will you discover beyond?
      </label>
      <Textarea
        id="reflection"
        className="mb-4 mt-1 resize-none bg-indigo-950/90 text-indigo-100 border-indigo-700 placeholder:text-indigo-400/70 font-medium"
        placeholder="Share your thoughts, dreams, or wildest ideas for the journey ahead..."
        rows={3}
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        autoFocus
        maxLength={420}
      />
      <Button
        className="mt-1 px-7 py-2 rounded-lg font-bold bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 transition-all hover:scale-105"
        onClick={onSave}
        type="button"
      >
        {saved ? "Saved!" : "Save"}
      </Button>
    </div>
  );
}
