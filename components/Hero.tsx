import Image from "next/image";
import Link from "next/link";
import content from "@/content/home.json";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <Image
        src={content.hero_image || "/images/hero.jpg"}
        alt="Protezione Civile Dipignano"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 px-6 max-w-3xl">
        <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg whitespace-pre-line">
          {content.hero_title}
        </h1>
        <p className="text-white/80 mt-4 text-lg">{content.hero_subtitle}</p>
        <div className="flex gap-4 justify-center mt-8 flex-wrap">
          <Link
            href="/volontariato"
            className="bg-pc-red text-white font-bold px-8 py-3 rounded hover:bg-red-800 transition-colors"
          >
            {content.hero_cta_primary}
          </Link>
          <Link
            href="/chi-siamo"
            className="border border-white text-white font-bold px-8 py-3 rounded hover:bg-white/10 transition-colors"
          >
            {content.hero_cta_secondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
