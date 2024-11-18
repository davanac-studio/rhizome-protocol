export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export const generateProjectSlug = (title: string, id: string): string => {
  const slug = slugify(title);
  return `${id}-${slug}`;
};

export const extractIdFromSlug = (idWithSlug: string | undefined): string | undefined => {
  if (!idWithSlug) return undefined;
  const parts = idWithSlug.split('-');
  return parts[0];
};