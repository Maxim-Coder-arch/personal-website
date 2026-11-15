const formatters = new Map<string, Intl.DateTimeFormat>();

const getFormatter = (locale: string) => {
    let formatter = formatters.get(locale);

    if (!formatter) {
        formatter = new Intl.DateTimeFormat(locale, {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "UTC",
        });
        formatters.set(locale, formatter);
    }

    return formatter;
};

export const formatArticleDate = (value: string, locale = "ru") => {
    return getFormatter(locale).format(new Date(value));
};
