export const moveId = (ids: string[], index: number, direction: -1 | 1) => {
    const target = index + direction;

    if (target < 0 || target >= ids.length) return ids;

    const next = [...ids];

    [next[index], next[target]] = [next[target], next[index]];

    return next;
};