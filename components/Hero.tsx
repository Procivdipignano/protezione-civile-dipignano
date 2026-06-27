import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Immagine di sfondo */}
      <Image
        src="/images/hero.jpg"
        alt="Protezione Civile Dipignano"
        fill
        className="object-cover"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />
      {/* Contenuto */}
      <div className="relative z-10 px-6 max-w-3xl">
        <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
          Pronti quando serve.<br />Vicini alla comunità.
        </h1>
        <p className="text-white/80 mt-4 text-lg">
          Gruppo Volontari Protezione Civile · Dipignano (CS)
        </p>
        <div className="flex gap-4 justify-center mt-8 flex-wrap">
          <Link
            href="/volontariato"
            className="bg-pc-red text-white font-bold px-8 py-3 rounded hover:bg-red-800 transition-colors"
          >
            DIVENTA VOLONTARIO
          </Link>
          <Link
            href="/chi-siamo"
            className="border border-white text-white font-bold px-8 py-3 rounded hover:bg-white/10 transition-colors"
          >
            CHI SIAMO
          </Link>
        </div>
      </div>
    </section>
  );
}
