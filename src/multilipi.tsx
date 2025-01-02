import { useEffect } from 'react';

const AddScriptToHead = () => {
  useEffect(() => {
    // Create the script element
    const script = document.createElement('script');
    script.src = "https://multilipistorage.blob.core.windows.net/media-seo/seo-scripts/live.js";
    script.setAttribute('data-pos-x', "50");
    script.setAttribute('data-pos-y', "50");
    script.setAttribute('key', "b7ef1046-dae8-4a0b-962b-295137c9613b");
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
