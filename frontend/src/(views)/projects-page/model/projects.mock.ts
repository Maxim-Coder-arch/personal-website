import type { IProject } from "@/src/shared/types/global-types";

export const projects: IProject[] = [
    {
        id: "softbyte-learn",
        title: "SoftByte Learn",
        subtitle: "Онлайн обучающая платформа",
        description:
            "Платформа с курсами, уроками и проверкой заданий. Разработал интерфейс, личный кабинет и интеграцию с API.",
        additionalData: [
            { label: "Срок разработки", value: "2 недели" },
            { label: "Есть бэкенд", value: "да" },
            { label: "Стек", value: "Next.js, TypeScript" },
        ],
        imagePath: "/projects-presentations/24963.jpg",
    },
    {
        id: "atlas-cms",
        title: "Atlas CMS",
        subtitle: "Система управления контентом",
        description:
            "Административная панель для редакторов корпоративного сайта: страницы, медиа, роли и публикации.",
        additionalData: [
            { label: "Срок разработки", value: "1 месяц" },
            { label: "Есть бэкенд", value: "да" },
        ],
        imagePath: "/projects-presentations/24963.jpg",
    },
    {
        id: "northwind-shop",
        title: "Northwind Shop",
        subtitle: "Интернет-магазин",
        description:
            "Каталог, корзина и оформление заказа с оплатой. Упор на скорость загрузки и аккуратную мобильную версию.",
        additionalData: [
            { label: "Срок разработки", value: "3 недели" },
            { label: "Есть бэкенд", value: "нет" },
            { label: "Стек", value: "React, Tailwind" },
        ],
        imagePath: "/projects-presentations/24963.jpg",
    },
];