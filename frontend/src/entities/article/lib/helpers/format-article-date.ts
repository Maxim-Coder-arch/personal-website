const formatter = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
});

export const formatArticleDate = (value: string) => {
    return formatter.format(new Date(value));
}