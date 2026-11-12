const integerFormat = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });

const decimalFormat = new Intl.NumberFormat("ru-RU", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const formatNumber = (value: number) => integerFormat.format(Math.round(value));

export const formatDecimal = (value: number) => decimalFormat.format(value);

export const formatPercent = (fraction: number) => `${decimalFormat.format(fraction * 100)}%`;

export const formatDuration = (seconds: number) => {
  const total = Math.round(seconds);
  if (total < 60) return `${total}с`;

  const minutes = Math.floor(total / 60);

  if (minutes < 60) return `${minutes}м ${total % 60}с`;

  return `${Math.floor(minutes / 60)}ч ${minutes % 60}м`;
};

export const getDelta = (current: number, previous: number) => {
  if (previous === 0) return current === 0 ? 0 : null;

  return ((current - previous) / previous) * 100;
};