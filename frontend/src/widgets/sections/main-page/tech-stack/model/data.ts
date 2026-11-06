import { createRepeatedIcons } from "../lib/helpers/create-icons";

import { ITechnology } from "./types";

export const technologies: ITechnology[] = [
    {
        id: "1",
        title: "Frontend",
        description:
            "Моё основное направление. Эти технологии я знаю лучше всего.",
        icons: createRepeatedIcons(7),
    },
    {
        id: "2",
        title: "Backend",
        description:
            "Серверная разработка, API и работа с данными.",
        icons: createRepeatedIcons(7),
    },
    {
        id: "3",
        title: "Tools & Workflow",
        description:
            "Инструменты и технологии, которые использую в разработке.",
        icons: createRepeatedIcons(7),
    },
    {
        id: "4",
        title: "Databases",
        description:
            "Хранение, организация и обработка данных.",
        icons: createRepeatedIcons(7),
    },
    {
        id: "5",
        title: "Other technologies",
        description:
            "Дополнительные технологии и инструменты, с которыми знаком.",
        icons: createRepeatedIcons(7),
    },
];