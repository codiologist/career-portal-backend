export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-")        // replace spaces with -
    .replace(/-+/g, "-");        // remove duplicate -
};
