"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) {
      setVisible(true);
    }
  }, []);

  const save = () => {
    localStorage.setItem("cookie_consent", JSON.stringify({ technical: true, analytics }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-pc-navy border-t border-white/10 shadow-2xl">
      <div className="max-w-6xl mx-auto px-6 py-5">
        <p className="text-white/80 text-sm mb-4">
          Questo sito utilizza cookie per il suo funzionamento. Puoi scegliere quali accettare.{" "}
          <Link href="/cookie-policy" className="text-pc-red hover:underline">Cookie Policy</Link>
          {" "}·{" "}
          <Link href="/privacy-policy" className="text-pc-red hover:underline">Privacy Policy</Link>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <label className="flex items-center gap-3 cursor-not-allowed">
            <input
              type="checkbox"
              checked
              disabled
              className="w-4 h-4 accent-pc-red"
            />
            <span className="text-white text-sm">
              <span className="font-bold">Cookie tecnici</span>{" "}
              <span className="text-white/50">(necessari, non disattivabili)</span>
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="w-4 h-4 accent-pc-red"
            />
            <span className="text-white text-sm">
              <span className="font-bold">Cookie analitici</span>{" "}
              <span className="text-white/50">(statistiche anonime, opzionali)</span>
            </span>
          </label>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => { setAnalytics(true); save(); }}
            className="bg-pc-red text-white font-bold text-sm px-6 py-2 rounded hover:bg-red-800 transition-colors"
          >
            Accetta tutti
          </button>
          <button
            onClick={save}
            className="bg-white/10 text-white font-bold text-sm px-6 py-2 rounded hover:bg-white/20 transition-colors"
          >
            Salva preferenze
          </button>
        </div>
      </div>
    </div>
  );
}
