export const join = (arr: string[], separator = '', terminator?: string): string => {
  if (terminator == null) {
    return arr.join(separator);
  } else {
    return arr.length < 2 ? arr.join(separator) : `${arr.slice(0, -1).join(separator)}${terminator}${arr.slice(-1)}`;
  }
};
