export const slugify = (text: string): string => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export const generateProjectSlug = (title: string, id: string): string => {
  const slug = slugify(title);
  const shortId = id.split('-')[0]; // Take only the first part of UUID
  return `${slug}-${shortId}`;
};

export const extractIdFromSlug = (slug: string | undefined): string | undefined => {
  if (!slug) return undefined;
  
  // The ID is always after the last hyphen
  const parts = slug.split('-');
  if (parts.length < 2) return undefined;
  
  // Get the short ID (last part)
  const shortId = parts[parts.length - 1];
  
  // Find the corresponding full ID from the URL
  const match = window.location.pathname.match(/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i);
  if (!match) return undefined;
  
  return match[1];
};