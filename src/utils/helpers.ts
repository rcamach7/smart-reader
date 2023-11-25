export function shortenString(str: string, max: number, etcString?: string) {
  if (str.length <= max) {
    return str.trim();
  }
  const etc = etcString ? etcString : '...';
  return str.substring(0, max).trim() + etc;
}
