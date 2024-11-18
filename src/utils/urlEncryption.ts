export const encryptStorageUrl = (url: string): string => {
  if (!url) return '';
  
  // Use browser's built-in base64 encoding
  try {
    return btoa(encodeURIComponent(url));
  } catch (error) {
    console.error('Error encrypting URL:', error);
    return '';
  }
};

export const decryptStorageUrl = (encoded: string): string => {
  if (!encoded) return '';
  
  // Use browser's built-in base64 decoding
  try {
    return decodeURIComponent(atob(encoded));
  } catch (error) {
    console.error('Error decrypting URL:', error);
    return '';
  }
};