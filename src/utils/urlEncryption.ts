import { Buffer } from 'buffer';

export const encryptStorageUrl = (url: string): string => {
  if (!url) return '';
  
  // Convert the URL to base64
  const encoded = Buffer.from(url).toString('base64');
  return encoded;
};

export const decryptStorageUrl = (encoded: string): string => {
  if (!url) return '';
  
  // Convert back from base64 to URL
  const decoded = Buffer.from(encoded, 'base64').toString('ascii');
  return decoded;
};