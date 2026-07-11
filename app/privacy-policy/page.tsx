import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Protezione Civile Dipignano",
  description: "Informativa sul trattamento dei dati personali",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-pc-navy pt-32 pb-16 text-center">
        <h1 className="text-white text-4xl font-bold">Privacy Policy</h1>
        <p className="text-white/70 mt-3">Informativa ai sensi dell&apos;art. 13 GDPR (Reg. UE 2016/679)</p>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 prose prose-gray">

          <h2 className="text-xl font-bold text-pc-navy mt-8 mb-3">1. Titolare del trattamento</h2>
          <p className="text-gray-600">
            Mino Scornaienchi — Protezione Civile Dipignano ODV<br />
            Comune di Dipignano (CS), Calabria<br />
            Email: <a href="mailto:protezionecivile.dipignano@gmail.com" className="text-pc-red hover:underline">protezionecivile.dipignano@gmail.com</a><br />
            Tel: <a href="tel:+393451746349" className="text-pc-red hover:underline">+39 345 174 6349</a>
          </p>

          <h2 className="text-xl font-bold text-pc-navy mt-8 mb-3">2. Dati trattati e finalità</h2>
          <p className="text-gray-600">
            Attraverso questo sito vengono trattati esclusivamente i dati che l&apos;utente fornisce
            volontariamente compilando il modulo di contatto (nome, indirizzo email, messaggio).
            Tali dati sono trattati al solo scopo di rispondere alle richieste ricevute.
          </p>
          <p className="text-gray-600">
            Il sito non raccoglie dati di navigazione, non utilizza strumenti di analisi
            statistica (es. Google Analytics) e non installa cookie di profilazione o marketing.
          </p>

          <h2 className="text-xl font-bold text-pc-navy mt-8 mb-3">3. Base giuridica</h2>
          <p className="text-gray-600">
            Il trattamento dei dati forniti tramite il modulo di contatto si basa sul consenso
            dell&apos;interessato (art. 6, par. 1, lett. a) GDPR) e sull&apos;esecuzione di misure
            precontrattuali adottate su richiesta dell&apos;interessato (art. 6, par. 1, lett. b) GDPR).
          </p>

          <h2 className="text-xl font-bold text-pc-navy mt-8 mb-3">4. Periodo di conservazione</h2>
          <p className="text-gray-600">
            I dati personali forniti tramite il modulo di contatto sono conservati per il tempo
            strettamente necessario a evadere la richiesta e comunque non oltre 12 mesi dalla
            ricezione del messaggio, salvo obblighi di legge.
          </p>

          <h2 className="text-xl font-bold text-pc-navy mt-8 mb-3">5. Comunicazione e diffusione</h2>
          <p className="text-gray-600">
            I dati non vengono comunicati a terzi né diffusi. Possono essere accessibili da
            eventuali fornitori di servizi tecnici (hosting, email) nei limiti strettamente
            necessari all&apos;erogazione del servizio.
          </p>

          <h2 className="text-xl font-bold text-pc-navy mt-8 mb-3">6. Diritti degli interessati</h2>
          <p className="text-gray-600">
            Ai sensi degli artt. 15-22 GDPR, l&apos;interessato ha diritto di:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>accedere ai propri dati personali;</li>
            <li>ottenerne la rettifica o la cancellazione;</li>
            <li>opporsi al trattamento o richiederne la limitazione;</li>
            <li>ricevere i dati in formato portabile;</li>
            <li>revocare il consenso in qualsiasi momento;</li>
            <li>proporre reclamo al Garante per la protezione dei dati personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-pc-red hover:underline">www.garanteprivacy.it</a>).</li>
          </ul>
          <p className="text-gray-600 mt-3">
            Per esercitare tali diritti è possibile contattare il Titolare all&apos;indirizzo email:{" "}
            <a href="mailto:protezionecivile.dipignano@gmail.com" className="text-pc-red hover:underline">
              protezionecivile.dipignano@gmail.com
            </a>
          </p>

          <h2 className="text-xl font-bold text-pc-navy mt-8 mb-3">7. Cookie</h2>
          <p className="text-gray-600">
            Per informazioni dettagliate sui cookie utilizzati da questo sito, si rimanda alla{" "}
            <a href="/cookie-policy" className="text-pc-red hover:underline">Cookie Policy</a>.
          </p>

          <p className="text-gray-400 text-sm mt-12">
            Ultimo aggiornamento: luglio 2026
          </p>
        </div>
      </section>
    </>
  );
}
