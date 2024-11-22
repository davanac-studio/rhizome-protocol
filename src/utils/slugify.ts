export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export const generateProjectSlug = (title: string, id: string): string => {
  const slug = slugify(title);
  return `${id}-${slug}`;
};

export const extractIdFromSlug = (idWithSlug: string | undefined): string | undefined => {
  if (!idWithSlug) return undefined;
  
  // Extract the UUID part (first segment before the first dash)
  const uuidPattern = /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i;
  const match = idWithSlug.match(uuidPattern);
  
  if (!match) {
    console.error('Invalid slug format:', idWithSlug);
    return undefined;
  }
  
  return match[1];
};

// Add default export
export default slugify;