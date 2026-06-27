import Link from "next/link";

const items = [
  { icon: "🚒", label: "Missione", sub: "Cosa facciamo", href: "/chi-siamo", highlight: false },
  { icon: "📸", label: "Galleria", sub: "Le nostre attività", href: "/chi-siamo#galleria", highlight: false },
  { icon: "📋", label: "Unisciti", sub: "Diventa volontario", href: "/volontariato", highlight: true },
  { icon: "📞", label: "Contatti", sub: "Scrivici", href: "/contatti", highlight: false },
];

export default function QuickAccess() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`flex flex-col items-center justify-center py-8 gap-2 transition-opacity hover:opacity-80 ${
            item.highlight ? "bg-pc-red text-white" : "bg-gray-100 text-pc-navy"
          }`}
        >
          <span className="text-3xl">{item.icon}</span>
          <span className="font-bold text-sm">{item.label}</span>
          <span className={`text-xs ${item.highlight ? "text-white/80" : "text-gray-500"}`}>
            {item.sub}
          </span>
        </Link>
      ))}
    </section>
  );
}
