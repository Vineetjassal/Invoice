export const svgToDataUri = async (svgString: string): Promise<string> => {
  try {
    // Clean the SVG string
    const cleanSvg = svgString.trim();
    
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return '';
    }

    // Try to use canvas if available
    if (typeof document !== 'undefined') {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      
      if (context) {
        // Set canvas size
        canvas.width = 100;
        canvas.height = 100;
        
        // Create an image element
        const img = new Image();
        const svgBlob = new Blob([cleanSvg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(svgBlob);
        
        return new Promise((resolve) => {
          img.onload = () => {
            context.drawImage(img, 0, 0, 100, 100);
            const dataUri = canvas.toDataURL("image/png");
            URL.revokeObjectURL(url);
            resolve(dataUri);
          };
          
          img.onerror = () => {
            URL.revokeObjectURL(url);
            resolve('');
          };
          
          img.src = url;
        });
      }
    }
    
    // Fallback: create a simple data URI from SVG
    const base64 = btoa(cleanSvg);
    return `data:image/svg+xml;base64,${base64}`;
    
  } catch (error) {
    console.error("Error converting SVG to data URI:", error);
    return '';
  }
};