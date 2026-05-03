export const withOpacity = (hexColor: string, opacity: number) => {
  let hex = hexColor.replace('#', '').trim();

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(c => c + c)
      .join('');
  }

  if (hex.length === 8) {
    hex = hex.slice(0, 6);
  }

  if (hex.length !== 6) {
    return hexColor;
  }

  const alpha = Math.round(Math.min(1, Math.max(0, opacity)) * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase();

  return `#${hex.toUpperCase()}${alpha}`;
};