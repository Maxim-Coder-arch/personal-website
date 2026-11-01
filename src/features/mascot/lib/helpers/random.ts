export const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

export const pick = <T>(items: readonly T[]): T => items[Math.floor(Math.random() * items.length)];