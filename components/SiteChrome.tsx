"use client";

import { useEffect, useState } from "react";
import type { DesignSettings, SiteSettings } from "@/lib/content";

type Props = {
  site: SiteSettings;
  design: DesignSettings;
  children: React.ReactNode;
};

export function SiteChrome({ site, design, children }: Props) {
  const [, setCookiesAccepted] = useState(false);

  useEffect(() => {
    const isTinaPreview = window.self !== window.top || window.location.search.includes("tina");
    document.documentElement.classList.toggle("tina-edit-mode", isTinaPreview);

    document.querySelectorAll("[data-current-year]").forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => {
      if (isTinaPreview) {
        el.classList.add("active");
      } else {
        observer.observe(el);
      }
    });

    const header = document.getElementById("header");
    const landingChoice = document.getElementById("landing-choice");
    const onScroll = () => {
      const scrollPos = window.scrollY;
      if (header) {
        if (landingChoice) {
          header.classList.toggle("visible", scrollPos > window.innerHeight * 0.8);
        } else {
          header.classList.add("visible");
        }
        header.classList.toggle("scrolled", scrollPos > 30);
      }

      const stickyCta = document.querySelector(".sticky-cta");
      stickyCta?.classList.toggle("visible", scrollPos > 400);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const navLinks = document.getElementById("navLinks");
    const toggle = document.getElementById("mobileToggle");
    const toggleMenu = () => {
      const isOpen = navLinks?.classList.toggle("open") ?? false;
      toggle?.setAttribute("aria-expanded", String(isOpen));
      toggle?.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
    };
    toggle?.addEventListener("click", toggleMenu);

    document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
      const button = dropdown.querySelector(".dropdown-toggle");
      const clickHandler = () => {
        document.querySelectorAll(".nav-dropdown.open").forEach((openDropdown) => {
          if (openDropdown !== dropdown) openDropdown.classList.remove("open");
        });
        const isOpen = dropdown.classList.toggle("open");
        button?.setAttribute("aria-expanded", String(isOpen));
      };
      button?.addEventListener("click", clickHandler);
    });

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (!href) return;
        const target = document.querySelector(href);
        if (!target) return;
        event.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
        navLinks?.classList.remove("open");
      });
    });

    const calcWidth = document.getElementById("wall-width") as HTMLInputElement | null;
    const calcHeight = document.getElementById("wall-height") as HTMLInputElement | null;
    const calcCoats = document.getElementById("coat-count") as HTMLSelectElement | null;
    const calcResult = document.getElementById("needed-liters");
    const calculatePaint = () => {
      if (!calcWidth || !calcHeight || !calcCoats || !calcResult) return;
      const width = Number.parseFloat(calcWidth.value) || 0;
      const height = Number.parseFloat(calcHeight.value) || 0;
      const coats = Number.parseInt(calcCoats.value, 10) || 1;
      calcResult.textContent = (width * height * 0.15 * coats).toFixed(1);
      calcResult.setAttribute("style", width && height ? "color: var(--red)" : "color: var(--midnight)");
    };
    [calcWidth, calcHeight, calcCoats].forEach((input) => input?.addEventListener("input", calculatePaint));

    const aboutSlider = document.querySelector("[data-about-slider]");
    let slideTimer: ReturnType<typeof setTimeout> | undefined;
    if (aboutSlider) {
      const slides = Array.from(aboutSlider.querySelectorAll(".about-slide"));
      const nextButton = aboutSlider.querySelector(".about-slider-next");
      const progressBar = aboutSlider.querySelector(".about-slider-progress span") as HTMLElement | null;
      const delay = 5500;
      let activeSlide = 0;
      const restartProgress = () => {
        if (!progressBar) return;
        progressBar.style.animation = "none";
        void progressBar.offsetWidth;
        progressBar.style.animation = `aboutSlideProgress ${delay}ms linear forwards`;
      };
      const showSlide = (index: number) => {
        if (!slides.length) return;
        slides[activeSlide].classList.remove("active");
        activeSlide = (index + slides.length) % slides.length;
        slides[activeSlide].classList.add("active");
        clearTimeout(slideTimer);
        restartProgress();
        slideTimer = setTimeout(() => showSlide(activeSlide + 1), delay);
      };
      if (slides.length > 1) {
        nextButton?.addEventListener("click", () => showSlide(activeSlide + 1));
        restartProgress();
        slideTimer = setTimeout(() => showSlide(activeSlide + 1), delay);
      }
    }

    const acceptCookies = () => {
      window.localStorage.setItem("cookiesAccepted", "true");
      document.querySelector(".cookie-banner")?.classList.remove("visible");
      document.querySelector(".contact-map")?.classList.add("accepted");
      setCookiesAccepted(true);
    };
    const accepted = window.localStorage.getItem("cookiesAccepted") === "true";
    setCookiesAccepted(accepted);
    if (accepted) {
      document.querySelector(".contact-map")?.classList.add("accepted");
      document.querySelector(".cookie-banner")?.classList.remove("visible");
    } else {
      window.setTimeout(() => document.querySelector(".cookie-banner")?.classList.add("visible"), 1500);
    }
    document.getElementById("acceptCookies")?.addEventListener("click", acceptCookies);
    document.getElementById("activateMap")?.addEventListener("click", acceptCookies);

    return () => {
      document.documentElement.classList.remove("tina-edit-mode");
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      toggle?.removeEventListener("click", toggleMenu);
      document.getElementById("acceptCookies")?.removeEventListener("click", acceptCookies);
      document.getElementById("activateMap")?.removeEventListener("click", acceptCookies);
      clearTimeout(slideTimer);
    };
  }, []);

  return (
    <div
      style={
        {
          "--font-body": fontStack(design.bodyFont),
          "--font-heading": fontStack(design.headingFont),
          "--red": design.primaryColor || "#D42B2B"
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

function fontStack(font: string): string {
  const stacks: Record<string, string> = {
    "System Sans": "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    Inter: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    "Playfair Display": "'Playfair Display', Georgia, serif",
    Arial: "Arial, Helvetica, sans-serif",
    "Helvetica Neue": "'Helvetica Neue', Helvetica, Arial, sans-serif",
    Verdana: "Verdana, Geneva, sans-serif",
    Tahoma: "Tahoma, Geneva, sans-serif",
    "Trebuchet MS": "'Trebuchet MS', Helvetica, sans-serif",
    Georgia: "Georgia, 'Times New Roman', serif",
    "Times New Roman": "'Times New Roman', Times, serif",
    Garamond: "Garamond, Georgia, serif",
    "Courier New": "'Courier New', Courier, monospace",
    monospace: "monospace"
  };

  if (stacks[font]) return stacks[font];
  if (["serif", "sans-serif", "system-ui"].includes(font)) return font;
  const fallback = font === "Playfair Display" || font === "Georgia" ? "serif" : "sans-serif";
  return `"${font}", ${fallback}`;
}
