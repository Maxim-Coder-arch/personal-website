export const getShare = (value: number, total: number) => {
    return (total === 0 ? 0 : value / total);
}