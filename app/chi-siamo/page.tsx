import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Chi Siamo — Protezione Civile Dipignano",
  description: "Il gruppo volontari della Protezione Civile di Dipignano",
};

export default function ChiSiamoPage() {
  return (
    <>
      <section className="bg-pc-navy pt-32 pb-16 text-center">
        <h1 className="text-white text-4xl font-bold">Chi Siamo</h1>
        <p className="text-white/70 mt-3">
          Il Gruppo Volontari Protezione Civile di Dipignano
        </p>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-pc-red font-bold text-xs tracking-widest uppercase">
              La nostra storia
            </span>
            <h2 className="text-3xl font-bold text-pc-navy mt-2">
              Nati per servire la comunità
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Il gruppo di Protezione Civile di Dipignano è attivo nel territorio
              comunale con l&apos;obiettivo di supportare le istituzioni locali in situazioni
              di emergenza, prevenzione dei rischi e assistenza alla popolazione.
            </p>
            <p className="text-gray-600 mt-3 leading-relaxed">
              I volontari del gruppo sono formati e operativi per interventi in caso di
              calamità naturali, eventi di pubblica utilità e attività di protezione
              del territorio.
            </p>
            <p className="text-gray-600 mt-3 leading-relaxed">
              Il gruppo opera in coordinamento con la Protezione Civile della Regione
              Calabria e il Dipartimento Nazionale della Protezione Civile.
            </p>
          </div>
          <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/chi-siamo.jpg"
              alt="Volontari in attività"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-pc-navy text-center mb-12">
            I nostri valori
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🤝", title: "Solidarietà", text: "Siamo presenti per la comunità nei momenti di difficoltà, senza distinzioni." },
              { icon: "⚡", title: "Prontezza", text: "Formazione continua e organizzazione per rispondere rapidamente alle emergenze." },
              { icon: "🏔️", title: "Territorio", text: "Conosciamo il territorio di Dipignano e lavoriamo per proteggerlo." },
            ].map((v) => (
              <div key={v.title} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-4xl">{v.icon}</div>
                <h3 className="font-bold text-pc-navy mt-3">{v.title}</h3>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
