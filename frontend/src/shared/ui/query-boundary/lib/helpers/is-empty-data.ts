export const isEmptyData = (data: unknown) => {
    return Array.isArray(data) && data.length === 0;
}