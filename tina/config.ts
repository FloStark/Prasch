import { defineConfig } from "tinacms";

const branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.HEAD || "main";
const fontOptions = [
  "Inter",
  "Playfair Display",
  "System Sans",
  "Arial",
  "Helvetica Neue",
  "Verdana",
  "Tahoma",
  "Trebuchet MS",
  "Georgia",
  "Times New Roman",
  "Garamond",
  "Courier New",
  "system-ui",
  "serif",
  "sans-serif",
  "monospace"
];

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Seiten",
        path: "content/pages",
        format: "json",
        ui: {
          router: ({ document }) => {
            const slug = document._sys.filename;
            return slug === "home" ? "/" : `/${slug}`;
          }
        },
        fields: [
          { type: "string", name: "slug", label: "Slug", required: true },
          { type: "string", name: "title", label: "SEO Title", required: true },
          { type: "string", name: "description", label: "Meta Description", ui: { component: "textarea" } },
          { type: "string", name: "keywords", label: "Meta Keywords" },
          { type: "string", name: "robots", label: "Robots" },
          { type: "string", name: "canonical", label: "Canonical URL" },
          { type: "string", name: "ogTitle", label: "OpenGraph Title" },
          { type: "string", name: "ogDescription", label: "OpenGraph Description", ui: { component: "textarea" } },
          { type: "image", name: "ogImage", label: "OpenGraph Bild" },
          {
            type: "string",
            name: "bodyHtml",
            label: "Technischer HTML-Fallback",
            description: "Alle Texte, Links und Abschnittsstrukturen dieser Seite. Medien können zusätzlich unten als Medienliste ausgetauscht werden.",
            ui: { component: "textarea" },
            required: false
          },
          {
            type: "object",
            name: "sections",
            label: "Bearbeitbare Seitenabschnitte",
            list: true,
            templates: [
              {
                name: "landingChoice",
                label: "Startauswahl",
                fields: [
                  { type: "image", name: "leftImage", label: "Linkes Bild" },
                  { type: "string", name: "leftLabel", label: "Linkes Label" },
                  { type: "string", name: "leftTitle", label: "Linker Titel" },
                  { type: "string", name: "leftButton", label: "Linker Button" },
                  { type: "image", name: "rightImage", label: "Rechtes Bild" },
                  { type: "string", name: "rightLabel", label: "Rechtes Label" },
                  { type: "string", name: "rightTitle", label: "Rechter Titel" },
                  { type: "string", name: "rightButton", label: "Rechter Button" }
                ]
              },
              {
                name: "pageHero",
                label: "Seiten-Hero",
                fields: [
                  { type: "string", name: "id", label: "Technische Section-ID" },
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "title", label: "Überschrift" },
                  { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } },
                  { type: "image", name: "logo", label: "Optionales Logo" },
                  { type: "string", name: "logoAlt", label: "Logo Alt-Text" }
                ]
              },
              {
                name: "homeHero",
                label: "Startseiten-Hero mit Bild",
                fields: [
                  { type: "string", name: "id", label: "Technische Section-ID" },
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "titleLine1", label: "Überschrift Zeile 1" },
                  { type: "string", name: "titleAccent", label: "Hervorgehobene Überschrift" },
                  { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } },
                  { type: "string", name: "primaryButtonText", label: "Primärer Button Text" },
                  { type: "string", name: "primaryButtonUrl", label: "Primärer Button Link" },
                  { type: "string", name: "secondaryButtonText", label: "Sekundärer Button Text" },
                  { type: "string", name: "secondaryButtonUrl", label: "Sekundärer Button Link" },
                  { type: "image", name: "image", label: "Hero-Bild" },
                  { type: "string", name: "imageAlt", label: "Hero-Bild Alt-Text" },
                  { type: "string", name: "badgeTitle", label: "Badge Titel" },
                  { type: "string", name: "badgeText", label: "Badge Text" }
                ]
              },
              {
                name: "feature",
                label: "Text mit Bild",
                fields: [
                  { type: "string", name: "id", label: "Technische Section-ID" },
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "title", label: "Überschrift" },
                  { type: "image", name: "image", label: "Bild" },
                  { type: "string", name: "imageAlt", label: "Bild Alt-Text" },
                  { type: "boolean", name: "imageRight", label: "Bild rechts anzeigen" },
                  { type: "string", name: "badge", label: "Badge" },
                  {
                    type: "object",
                    name: "texts",
                    label: "Textabsätze",
                    list: true,
                    fields: [{ type: "string", name: "text", label: "Text", ui: { component: "textarea" } }]
                  },
                  {
                    type: "object",
                    name: "values",
                    label: "Werte/Highlights",
                    list: true,
                    fields: [
                      { type: "string", name: "icon", label: "Icon CSS-Klasse" },
                      { type: "string", name: "title", label: "Titel" },
                      { type: "string", name: "text", label: "Text" }
                    ]
                  }
                ]
              },
              {
                name: "aboutSlider",
                label: "Über-uns mit Bildslider",
                fields: [
                  { type: "string", name: "id", label: "Technische Section-ID" },
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "title", label: "Überschrift", ui: { component: "textarea" } },
                  {
                    type: "object",
                    name: "images",
                    label: "Slider-Bilder",
                    list: true,
                    ui: { itemProps: (item) => ({ label: item?.alt || item?.src || "Bild" }) },
                    fields: [
                      { type: "image", name: "src", label: "Bild" },
                      { type: "string", name: "alt", label: "Alt-Text" }
                    ]
                  },
                  { type: "string", name: "cardLabel", label: "Bildkarten Label" },
                  { type: "string", name: "cardTitle", label: "Bildkarten Titel" },
                  {
                    type: "object",
                    name: "texts",
                    label: "Textabsätze",
                    list: true,
                    fields: [{ type: "string", name: "text", label: "Text", ui: { component: "textarea" } }]
                  },
                  {
                    type: "object",
                    name: "values",
                    label: "Werte/Highlights",
                    list: true,
                    fields: [
                      { type: "string", name: "icon", label: "Icon CSS-Klasse" },
                      { type: "string", name: "title", label: "Titel" },
                      { type: "string", name: "text", label: "Text" }
                    ]
                  }
                ]
              },
              {
                name: "cardGrid",
                label: "Kartenraster",
                fields: [
                  { type: "string", name: "id", label: "Technische Section-ID" },
                  { type: "string", name: "variant", label: "Darstellung", options: ["services", "brands", "highlights"] },
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "title", label: "Überschrift" },
                  { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } },
                  {
                    type: "object",
                    name: "cards",
                    label: "Karten",
                    list: true,
                    ui: { itemProps: (item) => ({ label: item?.title || "Karte" }) },
                    fields: [
                      { type: "string", name: "icon", label: "Icon CSS-Klasse" },
                      { type: "image", name: "image", label: "Bild/Logo" },
                      { type: "string", name: "imageAlt", label: "Bild Alt-Text" },
                      { type: "string", name: "title", label: "Titel" },
                      { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
                      { type: "string", name: "linkText", label: "Linktext" },
                      { type: "string", name: "linkUrl", label: "Linkziel" }
                    ]
                  }
                ]
              },
              {
                name: "gallery",
                label: "Galerie",
                fields: [
                  { type: "string", name: "id", label: "Technische Section-ID" },
                  { type: "string", name: "variant", label: "Darstellung", options: ["references", "shop"] },
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "title", label: "Überschrift" },
                  { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } },
                  {
                    type: "object",
                    name: "items",
                    label: "Galerie-Elemente",
                    list: true,
                    ui: { itemProps: (item) => ({ label: item?.title || item?.tag || "Medium" }) },
                    fields: [
                      { type: "image", name: "src", label: "Bild/Video" },
                      { type: "string", name: "alt", label: "Alt-Text / Beschreibung" },
                      { type: "string", name: "tag", label: "Tag" },
                      { type: "string", name: "title", label: "Titel" },
                      { type: "boolean", name: "wide", label: "Breit anzeigen" },
                      { type: "boolean", name: "video", label: "Video" }
                    ]
                  }
                ]
              },
              {
                name: "testimonials",
                label: "Kundenstimmen",
                fields: [
                  { type: "string", name: "id", label: "Technische Section-ID" },
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "title", label: "Überschrift" },
                  {
                    type: "object",
                    name: "items",
                    label: "Stimmen",
                    list: true,
                    fields: [
                      { type: "string", name: "text", label: "Zitat", ui: { component: "textarea" } },
                      { type: "string", name: "author", label: "Name" },
                      { type: "string", name: "source", label: "Quelle" }
                    ]
                  }
                ]
              },
              {
                name: "teamGrid",
                label: "Team-Bereich",
                fields: [
                  { type: "string", name: "id", label: "Technische Section-ID" },
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "title", label: "Überschrift" },
                  { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } },
                  {
                    type: "object",
                    name: "members",
                    label: "Teammitglieder",
                    list: true,
                    ui: { itemProps: (item) => ({ label: item?.name || "Teammitglied" }) },
                    fields: [
                      { type: "image", name: "image", label: "Portrait/Bild" },
                      { type: "string", name: "imageAlt", label: "Bild Alt-Text" },
                      { type: "string", name: "name", label: "Name" },
                      { type: "string", name: "role", label: "Rolle" },
                      { type: "string", name: "text", label: "Beschreibung", ui: { component: "textarea" } },
                      {
                        type: "object",
                        name: "skills",
                        label: "Schwerpunkte",
                        list: true,
                        fields: [{ type: "string", name: "text", label: "Schwerpunkt" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "teamImage",
                label: "Team-Bild Section",
                fields: [
                  { type: "string", name: "id", label: "Technische Section-ID" },
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "title", label: "Überschrift" },
                  { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
                  { type: "image", name: "image", label: "Teamfoto / Gruppenbild" },
                  { type: "string", name: "imageAlt", label: "Bild Alt-Text" },
                  { type: "string", name: "placeholderTitle", label: "Platzhalter Titel" },
                  { type: "string", name: "placeholderText", label: "Platzhalter Text", ui: { component: "textarea" } }
                ]
              },
              {
                name: "faq",
                label: "FAQ",
                fields: [
                  { type: "string", name: "id", label: "Technische Section-ID" },
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "title", label: "Überschrift" },
                  {
                    type: "object",
                    name: "items",
                    label: "Fragen",
                    list: true,
                    fields: [
                      { type: "string", name: "question", label: "Frage" },
                      { type: "string", name: "answer", label: "Antwort", ui: { component: "textarea" } }
                    ]
                  }
                ]
              },
              {
                name: "bioBlock",
                label: "Bio-Farben Hinweisblock",
                fields: [
                  { type: "string", name: "id", label: "Technische Section-ID" },
                  { type: "string", name: "icon", label: "Icon CSS-Klasse" },
                  { type: "string", name: "title", label: "Überschrift" },
                  { type: "string", name: "text", label: "Text", ui: { component: "textarea" } }
                ]
              },
              {
                name: "calculator",
                label: "Farbrechner",
                fields: [
                  { type: "string", name: "id", label: "Technische Section-ID" },
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "title", label: "Überschrift" },
                  { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } },
                  { type: "string", name: "tip", label: "Tipp", ui: { component: "textarea" } }
                ]
              },
              {
                name: "contact",
                label: "Kontaktbereich",
                fields: [
                  { type: "string", name: "id", label: "Technische Section-ID" },
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "title", label: "Überschrift" },
                  { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } },
                  { type: "string", name: "mapTitle", label: "Karten-Titel" },
                  { type: "string", name: "mapText", label: "Karten-Text", ui: { component: "textarea" } },
                  { type: "string", name: "mapEmbedUrl", label: "Google Maps Embed URL", ui: { component: "textarea" } }
                ]
              },
              {
                name: "cta",
                label: "Call to Action",
                fields: [
                  { type: "string", name: "id", label: "Technische Section-ID" },
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "title", label: "Überschrift" },
                  { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
                  {
                    type: "object",
                    name: "buttons",
                    label: "Buttons",
                    list: true,
                    fields: [
                      { type: "string", name: "text", label: "Button-Text" },
                      { type: "string", name: "url", label: "Button-Link" },
                      { type: "string", name: "style", label: "Button-Stil", options: ["primary", "outline", "white"] }
                    ]
                  }
                ]
              },
              {
                name: "legal",
                label: "Rechtstext",
                fields: [
                  { type: "string", name: "id", label: "Technische Section-ID" },
                  { type: "string", name: "title", label: "Seitentitel" },
                  {
                    type: "object",
                    name: "blocks",
                    label: "Textblöcke",
                    list: true,
                    fields: [
                      { type: "string", name: "title", label: "Überschrift" },
                      { type: "string", name: "text", label: "Text", ui: { component: "textarea" } }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "media",
            label: "Bilder und Videos",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.alt || item?.src || "Medium" }) },
            fields: [
              { type: "string", name: "originalSrc", label: "Originalpfad", required: true },
              { type: "image", name: "src", label: "Bild/Video", required: true },
              { type: "string", name: "alt", label: "Alt-Text / Beschreibung" }
            ]
          },
          {
            type: "string",
            name: "schemaJson",
            label: "Schema.org JSON-LD",
            list: true,
            ui: { component: "textarea" }
          }
        ]
      },
      {
        name: "siteSettings",
        label: "Globale Website-Daten",
        path: "content/settings",
        format: "json",
        match: { include: "site" },
        fields: [
          { type: "string", name: "siteName", label: "Website-Name" },
          { type: "string", name: "baseUrl", label: "Basis-URL" },
          { type: "image", name: "logo", label: "Logo" },
          { type: "string", name: "logoAlt", label: "Logo Alt-Text" },
          { type: "string", name: "phone", label: "Telefon" },
          { type: "string", name: "phoneHref", label: "Telefon-Link" },
          { type: "string", name: "email", label: "E-Mail" },
          { type: "string", name: "address", label: "Adresse" },
          { type: "string", name: "footerText", label: "Footer-Text", ui: { component: "textarea" } },
          { type: "string", name: "cookieTitle", label: "Cookie-Titel" },
          { type: "string", name: "cookieText", label: "Cookie-Text", ui: { component: "textarea" } }
        ]
      },
      {
        name: "designSettings",
        label: "Design & Schriftarten",
        path: "content/settings",
        format: "json",
        match: { include: "design" },
        fields: [
          {
            type: "string",
            name: "bodyFont",
            label: "Fließtext-Schrift",
            options: fontOptions
          },
          {
            type: "string",
            name: "headingFont",
            label: "Überschriften-Schrift",
            options: fontOptions
          },
          {
            type: "string",
            name: "accentFont",
            label: "Akzent-Schrift",
            options: fontOptions
          },
          { type: "string", name: "primaryColor", label: "Primärfarbe" }
        ]
      }
    ]
  }
});
