import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contatti — Protezione Civile Dipignano",
  description: "Contatta il gruppo Protezione Civile di Dipignano",
};

export default function ContattiPage() {
  return (
    <>
      <section className="bg-pc-navy pt-32 pb-16 text-center">
        <h1 className="text-white text-4xl font-bold">Contatti</h1>
        <p className="text-white/70 mt-3">Siamo a tua disposizione</p>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold text-pc-navy mb-6">Dove siamo</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex gap-3">
                <span className="text-pc-red text-xl">📍</span>
                <div>
                  <span className="font-bold text-pc-navy block">Sede</span>
                  Comune di Dipignano (CS), Calabria
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-pc-red text-xl">📘</span>
                <div>
                  <span className="font-bold text-pc-navy block">Facebook</span>
                  <a
                    href="https://www.facebook.com/profile.php?id=61576957454527"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pc-red hover:underline"
                  >
                    Protezione Civile Dipignano
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-pc-navy mb-6">Scrivici</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
