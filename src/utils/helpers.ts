export function shortenString(str: string, max: number) {
  if (str.length <= max) {
    return str.trim();
  }
  return str.substring(0, max).trim() + '...';
}
