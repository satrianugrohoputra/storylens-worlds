
import React from "react";

// Floating dropdown for language toggle (EN/ID)
type Props = {
  locale: "en" | "id";
  setLocale: (l: "en" | "id") => void;
};
export const LocaleSwitcher: React.FC<Props> = ({ locale, setLocale }) => {
  return (
    <div className="fixed z-40 right-8 bottom-12">
      <select
        value={locale}
        onChange={e => setLocale(e.target.value as "en" | "id")}
        className="appearance-none bg-gradient-to-r from-indigo-800 to-indigo-600/80 text-white p-2 px-5 rounded-xl shadow
         font-semibold ring-2 ring-indigo-300/60 focus:ring-blue-300/60 transition outline-none hover:scale-105"
        aria-label="Select language"
      >
        <option value="en">English</option>
        <option value="id">Bahasa Indonesia</option>
      </select>
    </div>
  );
};
