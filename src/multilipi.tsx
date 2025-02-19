import { useEffect } from 'react';

const AddScriptToHead = () => {           

  useEffect(() => {
    const languages = ['as', 'et', 'hi', 'zu']; // Move array inside useEffect
    const links: HTMLLinkElement[] = [];
  
    // Add a link tag for each language
    languages.forEach((lang) => {
        const link = document.createElement('link');
        link.href = `https://${lang}.multilipi.com/`;
        link.hreflang = lang;
        link.rel = 'alternate';
        document.head.appendChild(link);
        links.push(link); // Keep track of the links for cleanup
    });
  
    // Cleanup: Remove all added link tags on component unmount
    return () => {
        links.forEach((link) => {
            document.head.removeChild(link);
        });
    };
  }, []);



  useEffect(() => {
    const script = document.createElement('script');
    // script.src = "https://multilipistorage.blob.core.windows.net/media-seo/seo-scripts/live.js";
    // script.src = "https://multilipistorage.blob.core.windows.net/static/JS/live.js";
    // script.src = "https://multilipistorage.blob.core.windows.net/static/JS/sub_domain_live.js";
    script.src = "https://multilipistorage.blob.core.windows.net/media-seo/seo-scripts/page_translations.js";
    // script.src = "https://multilipistorage.blob.core.windows.net/static/JS/page_translations.js";
    script.setAttribute('data-pos-x', "50");
    script.setAttribute('data-pos-y', "50");
    script.setAttribute('multilipi-key', "a4183977-bffb-474e-b131-1410b4ded5c7");
    script.setAttribute('mode', "auto");
    script.crossOrigin = "anonymous";
    // script.async = true;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []); 
  return null;
};

export default AddScriptToHead;
