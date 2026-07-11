import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy — Protezione Civile Dipignano",
  description: "Informativa sull'uso dei cookie",
};

export default function CookiePolicyPage() {
  return (
    <>
      <section className="bg-pc-navy pt-32 pb-16 text-center">
        <h1 className="text-white text-4xl font-bold">Cookie Policy</h1>
        <p className="text-white/70 mt-3">Informativa ai sensi del Provvedimento Garante Privacy dell&apos;8 maggio 2014</p>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">

          <h2 className="text-xl font-bold text-pc-navy mt-8 mb-3">Cosa sono i cookie</h2>
          <p className="text-gray-600">
            I cookie sono piccoli file di testo che i siti visitati inviano al browser dell&apos;utente,
            dove vengono memorizzati per essere ritrasmessi alla visita successiva. Permettono
            il corretto funzionamento del sito e migliorano l&apos;esperienza di navigazione.
          </p>

          <h2 className="text-xl font-bold text-pc-navy mt-8 mb-3">Cookie utilizzati da questo sito</h2>
          <p className="text-gray-600 mb-4">
            Questo sito utilizza esclusivamente cookie tecnici necessari al suo funzionamento.
            Non vengono installati cookie di profilazione, marketing o analisi statistica.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-200">
              <thead>
                <tr className="bg-pc-navy text-white">
                  <th className="border border-gray-300 px-4 py-2 text-left">Nome</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Tipo</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Finalità</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Scadenza</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr>
                  <td className="border border-gray-200 px-4 py-2 font-mono">cookie_consent</td>
                  <td className="border border-gray-200 px-4 py-2">Tecnico</td>
                  <td className="border border-gray-200 px-4 py-2">Memorizza il consenso al banner cookie</td>
                  <td className="border border-gray-200 px-4 py-2">12 mesi</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2 font-mono">__Host-next-auth.*</td>
                  <td className="border border-gray-200 px-4 py-2">Tecnico</td>
                  <td className="border border-gray-200 px-4 py-2">Sessione Next.js (framework del sito)</td>
                  <td className="border border-gray-200 px-4 py-2">Sessione</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-pc-navy mt-8 mb-3">Cookie di terze parti</h2>
          <p className="text-gray-600">
            Questo sito non installa cookie di terze parti. Il pulsante Facebook presente nel
            footer è un semplice link esterno e non carica script di Facebook su questo sito.
          </p>

          <h2 className="text-xl font-bold text-pc-navy mt-8 mb-3">Come gestire i cookie</h2>
          <p className="text-gray-600 mb-3">
            È possibile disabilitare i cookie direttamente dalle impostazioni del browser.
            Di seguito i link alle guide dei browser più comuni:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-pc-red hover:underline">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie" target="_blank" rel="noopener noreferrer" className="text-pc-red hover:underline">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-pc-red hover:underline">Apple Safari</a></li>
            <li><a href="https://support.microsoft.com/it-it/windows/eliminare-e-gestire-i-cookie-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-pc-red hover:underline">Microsoft Edge</a></li>
          </ul>

          <h2 className="text-xl font-bold text-pc-navy mt-8 mb-3">Titolare del trattamento</h2>
          <p className="text-gray-600">
            Mino Scornaienchi — Protezione Civile Dipignano ODV<br />
            Email: <a href="mailto:protezionecivile.dipignano@gmail.com" className="text-pc-red hover:underline">protezionecivile.dipignano@gmail.com</a>
          </p>
          <p className="text-gray-600 mt-3">
            Per ulteriori informazioni sul trattamento dei dati personali, consulta la{" "}
            <a href="/privacy-policy" className="text-pc-red hover:underline">Privacy Policy</a>.
          </p>

          <p className="text-gray-400 text-sm mt-12">
            Ultimo aggiornamento: luglio 2026
          </p>
        </div>
      </section>
    </>
  );
}
