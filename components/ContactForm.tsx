"use client";

import { useState } from "react";
import Link from "next/link";

type FormState = { nome: string; email: string; messaggio: string };
type Errors = Partial<FormState> & { privacy?: string };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ nome: "", email: "", messaggio: "" });
  const [privacy, setPrivacy] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): Errors {
    const e: Errors = {};
    if (!form.nome.trim()) e.nome = "Nome obbligatorio";
    if (!form.email.trim()) e.email = "Email obbligatoria";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email non valida";
    if (!form.messaggio.trim()) e.messaggio = "Messaggio obbligatorio";
    if (!privacy) e.privacy = "Devi accettare la privacy policy per inviare il messaggio";
    return e;
  }

  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSending(true);
    setSendError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: form.nome, email: form.email, messaggio: form.messaggio }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setSendError("Errore nell'invio. Riprova o scrivici direttamente via email.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="text-4xl">✅</div>
        <h3 className="text-green-800 font-bold mt-3">Messaggio inviato!</h3>
        <p className="text-green-700 text-sm mt-2">
          Ti risponderemo entro 48 ore.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor="nome" className="block text-sm font-bold text-pc-navy mb-1">
          Nome *
        </label>
        <input
          id="nome"
          type="text"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-pc-red"
          placeholder="Il tuo nome"
        />
        {errors.nome && <p className="text-pc-red text-xs mt-1">{errors.nome}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-pc-navy mb-1">
          Email *
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-pc-red"
          placeholder="la-tua@email.it"
        />
        {errors.email && <p className="text-pc-red text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="messaggio" className="block text-sm font-bold text-pc-navy mb-1">
          Messaggio *
        </label>
        <textarea
          id="messaggio"
          rows={5}
          value={form.messaggio}
          onChange={(e) => setForm({ ...form, messaggio: e.target.value })}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-pc-red resize-none"
          placeholder="Scrivi il tuo messaggio..."
        />
        {errors.messaggio && <p className="text-pc-red text-xs mt-1">{errors.messaggio}</p>}
      </div>
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={privacy}
            onChange={(e) => setPrivacy(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-pc-red shrink-0"
          />
          <span className="text-sm text-gray-600">
            Ho letto e accetto la{" "}
            <Link href="/privacy-policy" className="text-pc-red hover:underline font-semibold">
              Privacy Policy
            </Link>
            . Acconsento al trattamento dei miei dati personali per rispondere alla mia richiesta. *
          </span>
        </label>
        {errors.privacy && <p className="text-pc-red text-xs mt-1">{errors.privacy}</p>}
      </div>
      {sendError && <p className="text-pc-red text-sm">{sendError}</p>}
      <button
        type="submit"
        disabled={sending}
        className="w-full bg-pc-red text-white font-bold py-3 rounded hover:bg-red-800 transition-colors disabled:opacity-60"
      >
        {sending ? "INVIO IN CORSO..." : "INVIA MESSAGGIO"}
      </button>
    </form>
  );
}
