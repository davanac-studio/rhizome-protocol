export const encryptStorageUrl = (url: string): string => {
  if (!url) return '';
  
  // Use browser's built-in btoa for base64 encoding
  const encoded = btoa(url);
  return encoded;
};

export const decryptStorageUrl = (encoded: string): string => {
  if (!encoded) return '';
  
  // Use browser's built-in atob for base64 decoding
  const decoded = atob(encoded);
  return decoded;
};