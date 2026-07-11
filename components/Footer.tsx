import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-pc-navy text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.jpg"
              alt="Logo Protezione Civile Dipignano"
              width={48}
              height={48}
              className="rounded-full"
            />
            <span className="font-bold text-sm">PROTEZIONE CIVILE DIPIGNANO</span>
          </div>
          <p className="text-white/60 text-sm mt-3">
            Gruppo Volontari della Protezione Civile<br />
            Comune di Dipignano (CS)
          </p>
        </div>
        <div>
          <h3 className="font-bold text-sm mb-4">Navigazione</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/volontariato" className="hover:text-white transition-colors">Volontariato</Link></li>
            <li><Link href="/chi-siamo" className="hover:text-white transition-colors">Chi Siamo</Link></li>
            <li><Link href="/contatti" className="hover:text-white transition-colors">Contatti</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-sm mb-4">Contatti</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <a href="tel:+393451746349" className="hover:text-white transition-colors">
                📞 +39 345 174 6349
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61576957454527"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                📘 Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-xs text-white/40 py-4">
        © {new Date().getFullYear()} Protezione Civile Dipignano
      </div>
    </footer>
  );
}
