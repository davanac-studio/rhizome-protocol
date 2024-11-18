export const encryptStorageUrl = (url: string): string => {
  if (!url) return '';
  
  // First encode the URL to handle special characters
  const encodedUrl = encodeURIComponent(url);
  // Then use browser's built-in btoa for base64 encoding
  const encoded = btoa(encodedUrl);
  return encoded;
};

export const decryptStorageUrl = (encoded: string): string => {
  if (!encoded) return '';
  
  try {
    // First decode from base64
    const decoded = atob(encoded);
    // Then decode the URL
    return decodeURIComponent(decoded);
  } catch (error) {
    console.error('Error decoding URL:', error);
    return ''; // Return empty string on error
  }
};