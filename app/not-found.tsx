import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: false }
};

export default function NotFound() {
  return (
    <main className="container legal-page">
      <div className="legal-content">
        <h1>Seite nicht gefunden</h1>
        <p>Die angeforderte Seite existiert nicht oder wurde verschoben.</p>
        <p><a className="btn btn-primary" href="/">Zur Startseite</a></p>
      </div>
    </main>
  );
}
