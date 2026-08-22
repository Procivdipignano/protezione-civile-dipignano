import { NextResponse } from "next/server";

const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Pannello Admin — Protezione Civile Dipignano</title>
  </head>
  <body>
    <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
    <script>
      CMS.init({
        config: {
          backend: {
            name: "github",
            repo: "Procivdipignano/protezione-civile-dipignano",
            branch: "main",
            base_url: "https://www.protezioneciviledipignano.it",
            auth_endpoint: "/api/auth"
          },
          media_folder: "public/images/uploads",
          public_folder: "/images/uploads",
          locale: "it",
          collections: [
            {
              name: "pages",
              label: "Pagine",
              files: [
                {
                  name: "home",
                  label: "Home",
                  file: "content/home.json",
                  format: "json",
                  fields: [
                    { label: "Titolo Hero", name: "hero_title", widget: "text" },
                    { label: "Sottotitolo Hero", name: "hero_subtitle", widget: "string" },
                    { label: "Pulsante primario", name: "hero_cta_primary", widget: "string" },
                    { label: "Pulsante secondario", name: "hero_cta_secondary", widget: "string" },
                    { label: "Testo banner centrale", name: "banner_text", widget: "string" },
                    { label: "Label Chi Siamo", name: "chi_siamo_label", widget: "string" },
                    { label: "Titolo Chi Siamo", name: "chi_siamo_title", widget: "string" },
                    { label: "Testo Chi Siamo 1", name: "chi_siamo_text1", widget: "text" },
                    { label: "Testo Chi Siamo 2", name: "chi_siamo_text2", widget: "text" }
                  ]
                },
                {
                  name: "chi-siamo",
                  label: "Chi Siamo",
                  file: "content/chi-siamo.json",
                  format: "json",
                  fields: [
                    { label: "Label storia", name: "storia_label", widget: "string" },
                    { label: "Titolo storia", name: "storia_title", widget: "string" },
                    { label: "Testo storia 1", name: "storia_text1", widget: "text" },
                    { label: "Testo storia 2", name: "storia_text2", widget: "text" },
                    { label: "Testo storia 3", name: "storia_text3", widget: "text" },
                    { label: "Titolo valori", name: "valori_title", widget: "string" },
                    {
                      label: "Valori", name: "valori", widget: "list",
                      fields: [
                        { label: "Emoji", name: "icon", widget: "string" },
                        { label: "Titolo", name: "title", widget: "string" },
                        { label: "Testo", name: "text", widget: "text" }
                      ]
                    }
                  ]
                },
                {
                  name: "volontariato",
                  label: "Volontariato",
                  file: "content/volontariato.json",
                  format: "json",
                  fields: [
                    { label: "Titolo pagina", name: "page_title", widget: "string" },
                    { label: "Sottotitolo pagina", name: "page_subtitle", widget: "string" },
                    { label: "Titolo sezione", name: "steps_title", widget: "string" },
                    {
                      label: "Passi", name: "steps", widget: "list",
                      fields: [
                        { label: "Numero", name: "number", widget: "string" },
                        { label: "Titolo", name: "title", widget: "string" },
                        { label: "Testo", name: "text", widget: "text" }
                      ]
                    },
                    { label: "Titolo CTA", name: "cta_title", widget: "string" },
                    { label: "Sottotitolo CTA", name: "cta_subtitle", widget: "string" }
                  ]
                },
                {
                  name: "contatti",
                  label: "Contatti",
                  file: "content/contatti.json",
                  format: "json",
                  fields: [
                    { label: "Titolo pagina", name: "page_title", widget: "string" },
                    { label: "Sottotitolo pagina", name: "page_subtitle", widget: "string" },
                    { label: "Label sede", name: "sede_label", widget: "string" },
                    { label: "Indirizzo sede", name: "sede", widget: "string" },
                    { label: "Label telefono", name: "telefono_label", widget: "string" },
                    { label: "Numero telefono", name: "telefono", widget: "string" },
                    { label: "Link telefono", name: "telefono_href", widget: "string" },
                    { label: "Label Facebook", name: "facebook_label", widget: "string" },
                    { label: "Testo link Facebook", name: "facebook_text", widget: "string" },
                    { label: "URL Facebook", name: "facebook_url", widget: "string" }
                  ]
                }
              ]
            }
          ]
        }
      });
    </script>
  </body>
</html>`;

export async function GET() {
  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
