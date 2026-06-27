import Image from "next/image";
import Link from "next/link";

export default function ChiSiamoSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-pc-red font-bold text-xs tracking-widest uppercase">
            Chi Siamo
          </span>
          <h2 className="text-3xl font-bold text-pc-navy mt-2">
            Il Gruppo di Dipignano
          </h2>
          <p className="text-gray-600 mt-4 leading-relaxed">
            Siamo un gruppo di volontari della Protezione Civile attivo nel comune di
            Dipignano, in provincia di Cosenza. Collaboriamo con le istituzioni locali
            per garantire sicurezza e assistenza alla comunità in situazioni di emergenza
            e durante eventi pubblici.
          </p>
          <p className="text-gray-600 mt-3 leading-relaxed">
            Il nostro impegno nasce dalla passione per il territorio e dalla volontà di
            essere presenti quando la comunità ha più bisogno.
          </p>
          <Link
            href="/chi-siamo"
            className="inline-block mt-6 bg-pc-navy text-white px-6 py-3 rounded hover:bg-blue-950 transition-colors"
          >
            Scopri di più →
          </Link>
        </div>
        <div className="relative h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/images/chi-siamo.jpg"
            alt="Volontari Protezione Civile Dipignano"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
