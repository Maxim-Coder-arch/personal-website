export const getPageCount = (total: number, pageSize: number) =>
    Math.max(1, Math.ceil(total / pageSize));