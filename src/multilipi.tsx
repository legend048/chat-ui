import { useEffect } from "react";

const LANGUAGES = ["hi", "ar"] as const;
const DOMAIN = "www.audiobookconverter.com";
// const MULTILIPI_KEY = "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX";
const MULTILIPI_KEY = "af639f7a-cc76-4f18-b61c-ef3afde93617";

export default function AddScriptToHead() {
  useEffect(() => {
    const head = document.head;
    const added: HTMLElement[] = [];

    const add = <T extends HTMLElement>(el: T) => {
      head.appendChild(el);
      added.push(el);
      return el;
    };

    // Alternate language URLs
    LANGUAGES.forEach((lang) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = lang;
      link.href = `https://${lang}.${DOMAIN}/`;
      add(link);
    });

    // DNS warm-up for Multilipi
    const dns = document.createElement("link");
    dns.rel = "dns-prefetch";
    dns.href = "//multilipiseo.multilipi.com";
    add(dns);

    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://multilipiseo.multilipi.com";
    preconnect.crossOrigin = "anonymous";
    add(preconnect);

    // Multilipi script
    const script = document.createElement("script");
    script.src = "https://script-cdn.multilipi.com/static/JS/page_translations.js";
    script.crossOrigin = "anonymous";
    script.dataset.posX = "50";
    script.dataset.posY = "50";
    script.setAttribute("multilipi-key", MULTILIPI_KEY);
    script.setAttribute("mode", "auto");
    add(script);

    return () => {
      added.forEach((el) => el.parentNode?.removeChild(el));
    };
  }, []);

  return null;
}
