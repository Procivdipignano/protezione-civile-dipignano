import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import content from "@/content/volontariato.json";

export const metadata: Metadata = {
  title: "Volontariato — Protezione Civile Dipignano",
  description: "Diventa volontario della Protezione Civile di Dipignano",
};

export default function VolontariatoPage() {
  return (
    <>
      <section className="bg-pc-navy pt-32 pb-16 text-center">
        <h1 className="text-white text-4xl font-bold">{content.page_title}</h1>
        <p className="text-white/70 mt-3">{content.page_subtitle}</p>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-pc-navy mb-6">{content.steps_title}</h2>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            {content.steps.map((step) => (
              <div key={step.number} className="flex gap-4">
                <span className="text-pc-red font-bold text-xl">{step.number}</span>
                <div>
                  <h3 className="font-bold text-pc-navy">{step.title}</h3>
                  <p className="mt-1">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 border-2 border-pc-navy/10 rounded-lg flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <h3 className="font-bold text-pc-navy">Modulo di iscrizione</h3>
              <p className="mt-1 text-sm text-gray-600">
                Scarica, compila e consegnaci il modulo per candidarti come volontario.
              </p>
            </div>
            <a
              href="/documents/modulo-iscrizione.docx"
              download
              className="inline-block bg-pc-navy text-white font-bold px-6 py-3 rounded hover:bg-pc-navy/90 transition-colors whitespace-nowrap"
            >
              SCARICA MODULO
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src={content.image1 || "/images/canadair.jpg"}
                alt="Foto Protezione Civile"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src={content.image2 || "/images/elicottero.jpg"}
                alt="Foto Protezione Civile"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-12 p-6 bg-pc-navy rounded-lg text-center">
            <p className="text-white font-bold text-lg">{content.cta_title}</p>
            <p className="text-white/70 mt-2 text-sm">{content.cta_subtitle}</p>
            <Link
              href="/contatti"
              className="inline-block mt-4 bg-pc-red text-white font-bold px-8 py-3 rounded hover:bg-red-800 transition-colors"
            >
              CONTATTACI
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
