import Hero from "@/components/Hero";
import QuickAccess from "@/components/QuickAccess";
import ChiSiamoSection from "@/components/ChiSiamoSection";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickAccess />
      <section className="relative h-80 overflow-hidden">
        <Image
          src="/images/elicottero.jpg"
          alt="Elicottero Protezione Civile"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <p className="text-white text-2xl md:text-3xl font-bold tracking-wide text-center drop-shadow-lg">
            Sempre pronti a intervenire
          </p>
        </div>
      </section>
      <ChiSiamoSection />
    </>
  );
}
