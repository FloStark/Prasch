"use client";

import { useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { HtmlContent } from "@/components/HtmlContent";

type Props = {
  page: any;
  site: any;
};

export function StructuredContent({ page, site }: Props) {
  if (!page.sections?.length) return <HtmlContent page={page} />;

  return (
    <>
      {page.slug === "home" && getTemplate(page.sections[0]) === "landingChoice" ? <Section section={page.sections[0]} site={site} /> : null}
      <a href="#main-content" className="skip-link">Zum Inhalt springen</a>
      <Header site={site} currentSlug={page.slug} hasLanding={page.slug === "home"} />
      <main id="main-content">
        {page.slug !== "home" ? <Breadcrumb current={page.sections?.[0]?.title || page.title} /> : null}
        {page.sections.map((section: any, index: number) => {
          if (page.slug === "home" && index === 0 && getTemplate(section) === "landingChoice") return null;
          return <Section key={`${section._template}-${index}`} section={section} site={site} />;
        })}
      </main>
      <Footer site={site} />
    </>
  );
}

function Header({ site, currentSlug, hasLanding }: { site: any; currentSlug: string; hasLanding: boolean }) {
  const isCurrent = (slug: string) => currentSlug === slug;
  const serviceCurrent = ["fassadengestaltung", "innenmalerei", "anstriche"].includes(currentSlug);
  const aboutCurrent = ["ueber-uns", "team", "referenzen"].includes(currentSlug);
  const locationCurrent = ["standort-graz", "standort-studenzen"].includes(currentSlug);

  return (
    <header id="header" className={hasLanding ? undefined : "visible"}>
      <div className="container">
        <nav>
          <a href="/" aria-label="Startseite">
            <img src={site.logo} alt={site.logoAlt} className="logo-img" width="140" height="46" />
          </a>
          <ul className="nav-links" id="navLinks">
            <li><a href="/" aria-current={isCurrent("home") ? "page" : undefined}>Home</a></li>
            <li className="nav-dropdown">
              <button type="button" className={`dropdown-toggle${serviceCurrent ? " current" : ""}`} aria-expanded="false">Leistungen <i className="fas fa-chevron-down" aria-hidden="true"></i></button>
              <ul className="dropdown-menu">
                <li><a href="/fassadengestaltung" aria-current={isCurrent("fassadengestaltung") ? "page" : undefined}>Fassaden <small>Fassadensanierung & Gestaltung</small></a></li>
                <li><a href="/innenmalerei" aria-current={isCurrent("innenmalerei") ? "page" : undefined}>Innenmalerei <small>Wandgestaltung & Räume</small></a></li>
                <li><a href="/anstriche" aria-current={isCurrent("anstriche") ? "page" : undefined}>Anstriche <small>Holz, Metall, Türen & Fenster</small></a></li>
              </ul>
            </li>
            <li className="nav-dropdown">
              <button type="button" className={`dropdown-toggle${aboutCurrent ? " current" : ""}`} aria-expanded="false">Über uns <i className="fas fa-chevron-down" aria-hidden="true"></i></button>
              <ul className="dropdown-menu">
                <li><a href="/ueber-uns" aria-current={isCurrent("ueber-uns") ? "page" : undefined}>Über uns <small>Handwerk, Haltung & Geschichte</small></a></li>
                <li><a href="/team" aria-current={isCurrent("team") ? "page" : undefined}>Team <small>Menschen hinter der Arbeit</small></a></li>
                <li><a href="/referenzen" aria-current={isCurrent("referenzen") ? "page" : undefined}>Referenzen <small>Ausgeführte Projekte</small></a></li>
              </ul>
            </li>
            <li><a href="/nachhaltigkeit" aria-current={isCurrent("nachhaltigkeit") ? "page" : undefined}>Nachhaltigkeit</a></li>
            <li className="nav-dropdown">
              <button type="button" className={`dropdown-toggle${locationCurrent ? " current" : ""}`} aria-expanded="false">Standorte <i className="fas fa-chevron-down" aria-hidden="true"></i></button>
              <ul className="dropdown-menu">
                <li><a href="/standort-graz" aria-current={isCurrent("standort-graz") ? "page" : undefined}>Standort Graz <small>Schörgelgasse 7, 8010 Graz</small></a></li>
                <li><a href="/standort-studenzen" aria-current={isCurrent("standort-studenzen") ? "page" : undefined}>Standort Studenzen <small>Malerarbeiten in der Südoststeiermark</small></a></li>
              </ul>
            </li>
            <li><a href="/farben-kaufen" aria-current={isCurrent("farben-kaufen") ? "page" : undefined}>Farben-Shop</a></li>
            <li><a href="/#contact">Kontakt</a></li>
          </ul>
          <a href={site.phoneHref} className="btn btn-primary nav-cta"><i className="fas fa-phone" aria-hidden="true"></i> Jetzt anrufen</a>
          <button className="mobile-toggle" id="mobileToggle" aria-label="Menü öffnen" aria-expanded="false"><span></span><span></span><span></span></button>
        </nav>
      </div>
    </header>
  );
}

function Footer({ site }: { site: any }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={site.logo} alt={site.logoAlt} className="footer-logo" width="140" height="46" data-tina-field={tinaField(site, "logo")} />
            <p data-tina-field={tinaField(site, "footerText")}>{site.footerText}</p>
          </div>
          <div className="footer-col">
            <h4 id="footer-leistungs-title">Leistung & Qualität</h4>
            <ul aria-labelledby="footer-leistungs-title">
              <li><a href="/fassadengestaltung">Fassadengestaltung</a></li>
              <li><a href="/innenmalerei">Innenmalerei</a></li>
              <li><a href="/anstriche">Anstriche & Lacke</a></li>
              <li><a href="/ueber-uns">Über uns</a></li>
              <li><a href="/team">Team</a></li>
              <li><a href="/referenzen">Referenzen</a></li>
              <li><a href="/nachhaltigkeit">Nachhaltigkeit</a></li>
              <li><a href="/farben-kaufen">Farben-Shop</a></li>
              <li><a href="/standort-graz">Standort Graz</a></li>
              <li><a href="/standort-studenzen">Standort Studenzen</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 id="footer-contact-title">Kontakt</h4>
            <ul aria-labelledby="footer-contact-title">
              <li><a href={site.phoneHref} data-tina-field={tinaField(site, "phone")}>{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`} data-tina-field={tinaField(site, "email")}>E-Mail schreiben</a></li>
              <li><a href="https://www.google.com/maps/search/?api=1&query=Schörgelgasse+7+8010+Graz" target="_blank" rel="noopener" data-tina-field={tinaField(site, "address")}>{site.address}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; <span data-current-year>2026</span> {site.siteName}. Alle Rechte vorbehalten.</p>
          <nav aria-label="Rechtliches"><p><a href="/impressum">Impressum</a> · <a href="/datenschutz">Datenschutz</a></p></nav>
        </div>
        <p className="footer-credit"><a href="https://murix.at" target="_blank" rel="noopener">Made by Murix.at</a></p>
      </div>
    </footer>
  );
}

function Breadcrumb({ current }: { current: string }) {
  return <nav className="breadcrumb-nav container" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">{current}</li></ol></nav>;
}

function Section({ section, site }: { section: any; site: any }) {
  switch (getTemplate(section)) {
    case "landingChoice": return <LandingChoice section={section} site={site} />;
    case "pageHero": return <PageHero section={section} />;
    case "homeHero": return <HomeHero section={section} />;
    case "feature": return <Feature section={section} />;
    case "aboutSlider": return <AboutSlider section={section} />;
    case "cardGrid": return <CardGrid section={section} />;
    case "gallery": return <Gallery section={section} />;
    case "testimonials": return <Testimonials section={section} />;
    case "teamGrid": return <TeamGrid section={section} />;
    case "teamImage": return <TeamImage section={section} />;
    case "faq": return <Faq section={section} />;
    case "bioBlock": return <BioBlock section={section} />;
    case "calculator": return <Calculator section={section} />;
    case "contact": return <Contact section={section} site={site} />;
    case "cta": return <Cta section={section} />;
    case "legal": return <Legal section={section} />;
    default: return null;
  }
}

function getTemplate(section: any) {
  if (section?._template) return section._template;
  const typename = section?.__typename || "";
  return typename.replace(/^PageSections/, "").replace(/^./, (char: string) => char.toLowerCase());
}

function LandingChoice({ section, site }: { section: any; site: any }) {
  return (
    <section id="landing-choice" className="landing-choice">
      <a className="split left" href="#main-hero" aria-label="Zum Bereich Malerbetrieb springen">
        <div className="split-bg" style={{ backgroundImage: `url('${section.leftImage}')` }} data-tina-field={tinaField(section, "leftImage")}></div>
        <div className="split-content">
          <span className="split-label" data-tina-field={tinaField(section, "leftLabel")}>{section.leftLabel}</span>
          <h2 data-tina-field={tinaField(section, "leftTitle")}>{section.leftTitle}</h2>
          <span className="btn btn-white" data-tina-field={tinaField(section, "leftButton")}>{section.leftButton}</span>
        </div>
      </a>
      <a className="split right" href="#shop-teaser" aria-label="Zum Bereich Farben und Fachhandel springen">
        <div className="split-bg" style={{ backgroundImage: `url('${section.rightImage}')` }} data-tina-field={tinaField(section, "rightImage")}></div>
        <div className="split-content">
          <span className="split-label" data-tina-field={tinaField(section, "rightLabel")}>{section.rightLabel}</span>
          <h2 data-tina-field={tinaField(section, "rightTitle")}>{section.rightTitle}</h2>
          <span className="btn btn-white" data-tina-field={tinaField(section, "rightButton")}>{section.rightButton}</span>
        </div>
      </a>
      <div className="split-logo"><img src={site.logo} alt={site.logoAlt} /></div>
      <div className="scroll-hint"><i className="fas fa-chevron-down"></i></div>
    </section>
  );
}

function PageHero({ section }: { section: any }) {
  return (
    <div className={`page-hero${section.logo ? " sustainability-hero" : ""}`} id={section.id || undefined}>
      <div className="container">
        <div className={section.logo ? "sustainability-hero-grid reveal" : "section-header reveal"}>
          <div className={section.logo ? "section-header" : undefined}>
            {section.label ? <span className="section-label" data-tina-field={tinaField(section, "label")}>{section.label}</span> : null}
            <h1 data-tina-field={tinaField(section, "title")}>{section.title}</h1>
            {section.description ? <p className="section-desc" data-tina-field={tinaField(section, "description")}>{section.description}</p> : null}
          </div>
          {section.logo ? <img src={section.logo} alt={section.logoAlt || ""} className="hero-logo sustainability-hero-logo" width="360" height="118" data-tina-field={tinaField(section, "logo")} /> : null}
        </div>
      </div>
    </div>
  );
}

function HomeHero({ section }: { section: any }) {
  return (
    <section className="hero" id="main-hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="eco-badge">
              <i className="fas fa-leaf" aria-hidden="true"></i> 100% Bio-Farben auf Wunsch
            </div>
            {section.label ? <span className="section-label" data-tina-field={tinaField(section, "label")}>{section.label}</span> : null}
            <h1>
              <span className="line" data-tina-field={tinaField(section, "titleLine1")}>{section.titleLine1}</span>
              <span className="line"><span className="accent" data-tina-field={tinaField(section, "titleAccent")}>{section.titleAccent}</span></span>
              <span className="sr-only"> – Malerbetrieb Prasch Graz | Malermeister für Fassaden, Innenmalerei & Farbenhandel</span>
            </h1>
            <p className="hero-text" data-tina-field={tinaField(section, "description")}>{section.description}</p>
            <div className="hero-cta">
              {section.primaryButtonText ? <a href={cleanUrl(section.primaryButtonUrl)} className="btn btn-primary" data-tina-field={tinaField(section, "primaryButtonText")}>{section.primaryButtonText}</a> : null}
              {section.secondaryButtonText ? <a href={cleanUrl(section.secondaryButtonUrl)} className="btn btn-outline" data-tina-field={tinaField(section, "secondaryButtonText")}>{section.secondaryButtonText}</a> : null}
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-placeholder hero-photo-card">
              <img src={section.image} alt={section.imageAlt || ""} width="600" height="750" data-tina-field={tinaField(section, "image")} />
            </div>
            <div className="hero-badge hero-badge-primary">
              <strong data-tina-field={tinaField(section, "badgeTitle")}>{section.badgeTitle}</strong>
              <span data-tina-field={tinaField(section, "badgeText")}>{section.badgeText}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ section }: { section: any }) {
  const image = <div className="hero-visual reveal"><div className="hero-image-placeholder"><img src={section.image} alt={section.imageAlt || ""} loading="lazy" data-tina-field={tinaField(section, "image")} /></div></div>;
  const content = (
    <div className="about-content reveal">
      {section.badge ? <div className="eco-badge" data-tina-field={tinaField(section, "badge")}><i className="fas fa-leaf" aria-hidden="true"></i> {section.badge}</div> : null}
      {section.label ? <span className="section-label" data-tina-field={tinaField(section, "label")}>{section.label}</span> : null}
      <h2 data-tina-field={tinaField(section, "title")}>{section.title}</h2>
      {section.texts?.map((item: any, index: number) => <p key={index} className="about-text" data-tina-field={tinaField(item, "text")}>{item.text}</p>)}
      {section.values?.length ? <Values values={section.values} /> : null}
    </div>
  );
  return <section className="container"><div className="about-grid">{section.imageRight ? content : image}{section.imageRight ? image : content}</div></section>;
}

function AboutSlider({ section }: { section: any }) {
  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-placeholder reveal craft-card" data-about-slider>
            {section.images?.map((image: any, index: number) => (
              <img
                key={`${image.src}-${index}`}
                src={image.src}
                alt={image.alt || ""}
                className={`about-slide${index === 0 ? " active" : ""}`}
                loading="lazy"
                data-tina-field={tinaField(image, "src")}
              />
            ))}
            <div className="craft-card-label">
              <span data-tina-field={tinaField(section, "cardLabel")}>{section.cardLabel}</span>
              <strong data-tina-field={tinaField(section, "cardTitle")}>{section.cardTitle}</strong>
            </div>
            <button className="about-slider-next" type="button" aria-label="Nächstes Bild anzeigen">
              <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </button>
            <div className="about-slider-progress" aria-hidden="true"><span></span></div>
          </div>

          <div className="about-content reveal">
            {section.label ? <span className="section-label" data-tina-field={tinaField(section, "label")}>{section.label}</span> : null}
            <h2 style={{ whiteSpace: "pre-line" }} data-tina-field={tinaField(section, "title")}>{section.title}</h2>
            {section.texts?.map((item: any, index: number) => <p key={index} className="about-text" data-tina-field={tinaField(item, "text")}>{item.text}</p>)}
            {section.values?.length ? <Values values={section.values} /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function Values({ values }: { values: any[] }) {
  return <div className="about-values">{values.map((value, index) => <div className="value-item" key={index}><i className={value.icon || "fas fa-check"} aria-hidden="true"></i><div><strong data-tina-field={tinaField(value, "title")}>{value.title}</strong><span data-tina-field={tinaField(value, "text")}>{value.text}</span></div></div>)}</div>;
}

function CardGrid({ section }: { section: any }) {
  if (section.variant === "brands") return <BrandGrid section={section} />;
  if (section.variant === "highlights") return <HighlightGrid section={section} />;

  const header = (
    <div className="section-header reveal">
      {section.label ? <span className="section-label" data-tina-field={tinaField(section, "label")}>{section.label}</span> : null}
      {section.title ? <h2 data-tina-field={tinaField(section, "title")}>{section.title}</h2> : null}
      {section.description ? <p className="section-desc" data-tina-field={tinaField(section, "description")}>{section.description}</p> : null}
    </div>
  );
  const grid = (
    <div className="services-grid reveal-stagger">
      {section.cards?.map((card: any, index: number) => <div className="service-card" key={index}>{card.image ? <div className="brand-logo"><img src={card.image} alt={card.imageAlt || ""} loading="lazy" data-tina-field={tinaField(card, "image")} /></div> : card.icon ? <div className="service-icon"><i className={card.icon} aria-hidden="true"></i></div> : null}<h3 data-tina-field={tinaField(card, "title")}>{card.title}</h3><p data-tina-field={tinaField(card, "text")}>{card.text}</p>{card.linkText && card.linkUrl ? <a href={cleanUrl(card.linkUrl)} className="accent" style={{ display: "inline-block", marginTop: "1rem", fontWeight: 600 }} data-tina-field={tinaField(card, "linkText")}>{card.linkText}</a> : null}</div>)}
    </div>
  );

  if (section.id) {
    return <section id={section.id}><div className="container">{header}{grid}</div></section>;
  }

  return (
    <section className="container reveal">
      {header}
      {grid}
    </section>
  );
}

function BrandGrid({ section }: { section: any }) {
  return (
    <section className="container">
      <div id={section.id || undefined}>
        {section.label || section.title || section.description ? (
          <div className="section-header reveal" style={{ textAlign: "left", marginBottom: "2rem" }}>
            {section.label ? <span className="section-label" data-tina-field={tinaField(section, "label")}>{section.label}</span> : null}
            {section.title ? <h2 data-tina-field={tinaField(section, "title")}>{section.title}</h2> : null}
            {section.description ? <p data-tina-field={tinaField(section, "description")}>{section.description}</p> : null}
          </div>
        ) : null}
        <div className="brands-grid reveal-stagger">
          {section.cards?.map((card: any, index: number) => (
            <div className="brand-card" key={index}>
              {card.image ? <div className="brand-logo"><img src={card.image} alt={card.imageAlt || ""} loading="lazy" data-tina-field={tinaField(card, "image")} /></div> : null}
              <h3 data-tina-field={tinaField(card, "title")}>{card.title}</h3>
              <p data-tina-field={tinaField(card, "text")}>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HighlightGrid({ section }: { section: any }) {
  return (
    <section className="container reveal">
      <div className="service-highlights-grid">
        {section.cards?.map((card: any, index: number) => (
          <div className="service-card" key={index}>
            {card.icon ? <i className={card.icon} style={{ fontSize: "2rem", color: "var(--red)", marginBottom: "1.5rem" }}></i> : null}
            <h3 data-tina-field={tinaField(card, "title")}>{card.title}</h3>
            <p data-tina-field={tinaField(card, "text")}>{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Gallery({ section }: { section: any }) {
  if (section.variant === "shop") return <ShopGallery section={section} />;

  return (
    <section className="container reveal references-section">
      <div className="section-header" style={{ textAlign: "left", marginBottom: "2rem" }}>
        {section.label ? <span className="section-label" data-tina-field={tinaField(section, "label")}>{section.label}</span> : null}
        <h2 data-tina-field={tinaField(section, "title")}>{section.title}</h2>
        {section.description ? <p data-tina-field={tinaField(section, "description")}>{section.description}</p> : null}
      </div>
      <div className="references-grid reveal-stagger">
        {section.items?.map((item: any, index: number) => <article className={`reference-card${item.wide ? " reference-card-wide" : ""}`} key={index}>{item.video ? <video autoPlay loop muted playsInline preload="auto" aria-label={item.alt || item.title}><source src={item.src} type="video/mp4" /></video> : <img src={item.src} alt={item.alt || ""} loading="lazy" data-tina-field={tinaField(item, "src")} />}<div className="reference-card-content">{item.tag ? <span data-tina-field={tinaField(item, "tag")}>{item.tag}</span> : null}<h3 data-tina-field={tinaField(item, "title")}>{item.title}</h3></div></article>)}
      </div>
    </section>
  );
}

function ShopGallery({ section }: { section: any }) {
  return (
    <section className="container">
      <div id={section.id || undefined} className="shop-gallery reveal">
        {(section.label || section.title || section.description) ? (
          <div className="section-header" style={{ textAlign: "left", marginBottom: "2rem" }}>
            {section.label ? <span className="section-label" data-tina-field={tinaField(section, "label")}>{section.label}</span> : null}
            {section.title ? <h2 data-tina-field={tinaField(section, "title")}>{section.title}</h2> : null}
            {section.description ? <p data-tina-field={tinaField(section, "description")}>{section.description}</p> : null}
          </div>
        ) : null}
        <div className="shop-gallery-grid">
          {section.items?.map((item: any, index: number) => (
            <figure className={`shop-gallery-item${item.wide ? " shop-gallery-item-large" : ""}`} key={index}>
              <img src={item.src} alt={item.alt || ""} loading="lazy" data-tina-field={tinaField(item, "src")} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials({ section }: { section: any }) {
  return <section id="testimonials" className="container reveal">{section.label ? <span className="section-label" data-tina-field={tinaField(section, "label")}>{section.label}</span> : null}<h2 data-tina-field={tinaField(section, "title")}>{section.title}</h2><div className="testimonials-grid reveal-stagger">{section.items?.map((item: any, index: number) => <div className="testimonial-card" key={index}><div className="testimonial-stars"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div><p className="testimonial-text" data-tina-field={tinaField(item, "text")}>{item.text}</p><div className="testimonial-author"><strong data-tina-field={tinaField(item, "author")}>{item.author}</strong><span data-tina-field={tinaField(item, "source")}>{item.source}</span></div></div>)}</div></section>;
}

function TeamGrid({ section }: { section: any }) {
  return (
    <section id={section.id || undefined} className="team-section">
      <div className="container">
        <div className="section-header reveal">
          {section.label ? <span className="section-label" data-tina-field={tinaField(section, "label")}>{section.label}</span> : null}
          <h2 data-tina-field={tinaField(section, "title")}>{section.title}</h2>
          {section.description ? <p className="section-desc" data-tina-field={tinaField(section, "description")}>{section.description}</p> : null}
        </div>
        <div className="team-grid reveal-stagger">
          {section.members?.map((member: any, index: number) => (
            <article className="team-card" key={index}>
              <div className="team-card-image">
                <img src={member.image} alt={member.imageAlt || member.name || ""} loading="lazy" data-tina-field={tinaField(member, "image")} />
              </div>
              <div className="team-card-content">
                <span className="team-role" data-tina-field={tinaField(member, "role")}>{member.role}</span>
                <h3 data-tina-field={tinaField(member, "name")}>{member.name}</h3>
                <p data-tina-field={tinaField(member, "text")}>{member.text}</p>
                {member.skills?.length ? <div className="team-skills">{member.skills.map((skill: any, skillIndex: number) => <span key={skillIndex} data-tina-field={tinaField(skill, "text")}>{skill.text}</span>)}</div> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamImage({ section }: { section: any }) {
  return (
    <section id={section.id || undefined} className="team-image-section">
      <div className="container">
        <div className="team-image-panel reveal">
          <div className="team-image-copy">
            {section.label ? <span className="section-label" data-tina-field={tinaField(section, "label")}>{section.label}</span> : null}
            <h2 data-tina-field={tinaField(section, "title")}>{section.title}</h2>
            <p data-tina-field={tinaField(section, "text")}>{section.text}</p>
          </div>
          <div className="team-image-frame" data-tina-field={tinaField(section, "image")}>
            {section.image ? (
              <img src={section.image} alt={section.imageAlt || section.title || "Teamfoto"} loading="lazy" />
            ) : (
              <div className="team-image-placeholder">
                <div className="team-placeholder-icon"><i className="fas fa-users" aria-hidden="true"></i></div>
                <strong data-tina-field={tinaField(section, "placeholderTitle")}>{section.placeholderTitle}</strong>
                <span data-tina-field={tinaField(section, "placeholderText")}>{section.placeholderText}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq({ section }: { section: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id={section.id || "faq"} className="container reveal">
      {section.label ? <span className="section-label" data-tina-field={tinaField(section, "label")}>{section.label}</span> : null}
      <h2 data-tina-field={tinaField(section, "title")}>{section.title}</h2>
      <div className="faq-grid reveal-stagger">
        {section.items?.map((item: any, index: number) => {
          const isOpen = openIndex === index;

          return (
            <div className="faq-item" key={index}>
              <button
                className="faq-question"
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-ans-${index}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span data-tina-field={tinaField(item, "question")}>{item.question}</span>
                <i className="fas fa-chevron-down" aria-hidden="true"></i>
              </button>
              <div
                id={`faq-ans-${index}`}
                className="faq-answer"
                role="region"
                style={{ maxHeight: isOpen ? "240px" : undefined }}
              >
                <p data-tina-field={tinaField(item, "answer")}>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function BioBlock({ section }: { section: any }) {
  return (
    <section id={section.id || undefined} className="container reveal" style={{ background: "var(--lighter-gray)", padding: "8rem 4rem", borderRadius: "var(--radius-lg)", marginTop: "6rem", marginBottom: "6rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <i className={section.icon || "fas fa-seedling"} style={{ fontSize: "3rem", color: "var(--eco-green)", marginBottom: "2rem" }} aria-hidden="true"></i>
        <h2 data-tina-field={tinaField(section, "title")}>{section.title}</h2>
        <p data-tina-field={tinaField(section, "text")}>{section.text}</p>
      </div>
    </section>
  );
}

function Calculator({ section }: { section: any }) {
  return <section className="container reveal"><div className="calculator-container" style={{ marginTop: "5rem", background: "var(--lighter-gray)", padding: "3rem", borderRadius: "var(--radius-lg)" }}><div className="section-header" style={{ textAlign: "left", marginBottom: "2rem" }}>{section.label ? <span className="section-label" data-tina-field={tinaField(section, "label")}>{section.label}</span> : null}<h2 data-tina-field={tinaField(section, "title")}>{section.title}</h2><p data-tina-field={tinaField(section, "description")}>{section.description}</p></div><div className="calc-grid"><div className="calc-inputs"><div className="form-group"><label htmlFor="wall-width">Gesamtbreite der Wände (m)</label><input type="number" id="wall-width" placeholder="z.B. 15" step="0.1" min="0" /></div><div className="form-group"><label htmlFor="wall-height">Raumhöhe (m)</label><input type="number" id="wall-height" placeholder="z.B. 2.5" step="0.1" min="0" /></div><div className="form-group"><label htmlFor="coat-count">Anzahl der Anstriche</label><select id="coat-count"><option value="1">1 Anstrich (Auffrischung)</option><option value="2">2 Anstriche (Standard / Neuanstrich)</option></select></div></div><div className="calc-result"><div className="result-card"><i className="fas fa-paint-roller" aria-hidden="true"></i><div className="result-value"><span id="needed-liters">0.0</span> Liter</div><p>Empfohlene Menge für Ihr Projekt</p><div className="pro-tip"><i className="fas fa-info-circle"></i><span data-tina-field={tinaField(section, "tip")}>{section.tip}</span></div></div></div></div></div></section>;
}

function Contact({ section, site }: { section: any; site: any }) {
  return <section id={section.id || "contact"}><div className="container"><div className="section-header reveal"><span className="section-label" data-tina-field={tinaField(section, "label")}>{section.label}</span><h2 data-tina-field={tinaField(section, "title")}>{section.title}</h2><p className="section-desc" data-tina-field={tinaField(section, "description")}>{section.description}</p></div><div className="contact-grid"><div className="contact-info reveal"><div className="contact-items"><div className="contact-item"><div className="contact-icon"><i className="fas fa-phone" aria-hidden="true"></i></div><div><span className="contact-label">Telefon</span><span className="contact-value"><a href={site.phoneHref}>{site.phone}</a></span></div></div><div className="contact-item"><div className="contact-icon"><i className="fas fa-envelope" aria-hidden="true"></i></div><div><span className="contact-label">E-Mail</span><span className="contact-value"><a href={`mailto:${site.email}`}>{site.email}</a></span></div></div><div className="contact-item"><div className="contact-icon"><i className="fas fa-location-dot" aria-hidden="true"></i></div><div><span className="contact-label">Adresse</span><span className="contact-value">{site.address}</span></div></div><div className="contact-item"><div className="contact-icon"><i className="fas fa-clock" aria-hidden="true"></i></div><div><span className="contact-label">Öffnungszeiten</span><span className="contact-value">Mo – Fr: 07:00 – 15:30 Uhr</span></div></div></div></div><div className="contact-map reveal"><div className="map-placeholder"><i className="fas fa-map-marked-alt" aria-hidden="true"></i><h3 data-tina-field={tinaField(section, "mapTitle")}>{section.mapTitle}</h3><p data-tina-field={tinaField(section, "mapText")}>{section.mapText}</p><button id="activateMap" className="btn btn-primary" type="button">Karte laden</button></div>{section.mapEmbedUrl ? <iframe src={section.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={section.mapTitle}></iframe> : null}</div></div></div></section>;
}

function Cta({ section }: { section: any }) {
  return <section className="container reveal"><div className="cross-sell"><div className="cross-sell-content">{section.label ? <span className="section-label" data-tina-field={tinaField(section, "label")}>{section.label}</span> : null}<h2 data-tina-field={tinaField(section, "title")}>{section.title}</h2><p className="about-text" data-tina-field={tinaField(section, "text")}>{section.text}</p></div><div className="cross-sell-highlight">{section.buttons?.map((button: any, index: number) => <a key={index} href={cleanUrl(button.url)} className={`btn btn-${button.style || "primary"}`} data-tina-field={tinaField(button, "text")}>{button.text}</a>)}</div></div></section>;
}

function Legal({ section }: { section: any }) {
  return <div className="container legal-page"><div className="legal-content reveal"><h1 data-tina-field={tinaField(section, "title")}>{section.title}</h1>{section.blocks?.map((block: any, index: number) => <div className="impressum-block" key={index}>{block.title ? <h2 data-tina-field={tinaField(block, "title")}>{block.title}</h2> : null}<p style={{ whiteSpace: "pre-line" }} data-tina-field={tinaField(block, "text")}>{block.text}</p></div>)}</div></div>;
}

function cleanUrl(url: string) {
  return url?.replace(/^([^/#]+)\.html/, "/$1") || "#";
}
