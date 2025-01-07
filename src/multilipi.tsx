import { useEffect } from 'react';

const AddScriptToHead = () => {           

  useEffect(() => {
    const languages = ['en', 'gu', 'hi']; // Move array inside useEffect
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
    // Create the script element
    const script = document.createElement('script');
    // script.src = "https://multilipistorage.blob.core.windows.net/media-seo/seo-scripts/live.js";
    // script.src = "https://multilipistorage.blob.core.windows.net/static/JS/live.js";
    script.src = "https://multilipistorage.blob.core.windows.net/static/JS/sub_domain_live.js";
    script.setAttribute('data-pos-x', "50");
    script.setAttribute('data-pos-y', "50");
    script.setAttribute('key', "73c687b7-acae-4024-956b-29fa5d1e3b0d");
    script.crossOrigin = "anonymous";
    // script.async = true;

    // Append script to the <head> tag
    document.head.appendChild(script);

    // Cleanup: remove the script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []); // Runs only once when the component mounts

  return null; // This component doesn't render anything
};

export default AddScriptToHead;
