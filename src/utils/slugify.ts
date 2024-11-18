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
  return `${id}-${slug}`;
};

export const extractIdFromSlug = (idWithSlug: string | undefined): string | undefined => {
  if (!idWithSlug) return undefined;
  
  // L'ID est un UUID, donc il a toujours 36 caractères
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
  const match = idWithSlug.match(uuidRegex);
  
  return match ? match[0] : undefined;
};