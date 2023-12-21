export function shortenString(str: string, max: number, etcString?: string) {
  if (str?.length <= max) {
    return str.trim();
  }
  const etc = etcString ? etcString : '...';
  return str.substring(0, max).trim() + etc;
}

export function convertToHttps(url: string): string {
  if (!url) return url;
  return url.replace(/^http:\/\//i, 'https://');
}
