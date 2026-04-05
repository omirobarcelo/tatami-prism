export const parse = (input: string): string => {
  let parsed = input;
  parsed = parsed.replace(/\*(.+?)\*/g, '<strong>$1</strong>');
  parsed = parsed.replace(/_(.+?)_/g, '<em>$1</em>');
  return parsed;
};
