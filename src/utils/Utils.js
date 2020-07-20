export function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeMonth(string) {
  const offset = 3 + string.indexOf('de');
  return (
    string.substr(0, offset) +
    string.charAt(offset).toUpperCase() +
    string.substr(offset + 1)
  );
}

export function shortenDay(string) {
  return string.slice(0, string.indexOf('-'));
}

export function firstDigit(number) {
  const digits = Math.trunc(Math.log10(number));
  // eslint-disable-next-line no-restricted-properties
  return Math.trunc(number / Math.trunc(Math.pow(10, digits)));
}
