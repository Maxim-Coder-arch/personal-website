export const PROJECT_LIMITS = {
    titleMax: 200,
    subtitleMax: 400,
    descriptionMax: 5000,
    labelMax: 60,
    valueMax: 300,
    imageMaxBytes: 5 * 1024 * 1024,
} as const;

export const PROJECT_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

export const PROJECT_EDITOR_CONFIG = {
    delay: 0.05,
    skeletonHeight: 520,

    messages: {
        created: "Проект создан",
        saved: "Изменения сохранены",
        deleted: "Проект удалён",
        invalid: "Проверь заполненные поля",
        imageFailed: "Проект создан, но обложка не загрузилась. Загрузи её ещё раз",
        imageType: "Подходят только JPG, PNG и WebP",
        imageSize: "Файл больше 5 МБ",
    },
} as const;