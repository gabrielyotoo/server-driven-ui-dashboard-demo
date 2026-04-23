export const generateId = () =>
  Math.random()
    .toString(36)
    .slice(2)
    .replace(/^[0-9]/, 'z');
