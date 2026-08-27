import Link from "next/link";
import Image from "next/image";
import homeContent from "@/content/home.json";
import footerContent from "@/content/footer.json";

export default function Footer() {
  return (
    <footer className="bg-pc-navy text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src={homeContent.logo_image || "/images/logo.jpg"}
              alt="Logo Protezione Civile Dipignano"
              width={48}
              height={48}
              className="rounded-full"
            />
            <span className="font-bold text-sm">{footerContent.nome}</span>
          </div>
          <p className="text-white/60 text-sm mt-3 whitespace-pre-line">
            {footerContent.descrizione}
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
              <a href={footerContent.telefono_href} className="hover:text-white transition-colors">
                📞 {footerContent.telefono}
              </a>
            </li>
            <li>
              <a
                href={footerContent.facebook_url}
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
      <div className="border-t border-white/10 text-center text-xs text-white/40 py-4 space-x-4">
        <span>© {new Date().getFullYear()} {footerContent.copyright}</span>
        <Link href="/privacy-policy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
        <Link href="/cookie-policy" className="hover:text-white/70 transition-colors">Cookie Policy</Link>
      </div>
    </footer>
  );
}
