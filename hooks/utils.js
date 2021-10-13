export const buildSlug = ({ id, name }) => {
  return `/${id}-${name.toLowerCase()}`;
};
