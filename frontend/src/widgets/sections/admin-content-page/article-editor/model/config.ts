export const ARTICLE_LIMITS = {
    titleMax: 200,
    subtitleMax: 400,
} as const;

export const ARTICLE_EDITOR_CONFIG = {
    delay: 0.05,
    skeletonHeight: 480,
    previewPlaceholder: "Здесь появится превью",

    pills: {
        mode: "editor-mode-pill",
    },

    messages: {
        created: "Статья создана",
        saved: "Изменения сохранены",
        deleted: "Статья удалена",
        invalid: "Проверь заполненные поля",
    },
} as const;