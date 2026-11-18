export const scrollToSection = (id: string, reduceMotion: boolean) => {
    document.getElementById(id)?.scrollIntoView({
        behavior: reduceMotion ? "instant" : "smooth",
        block: "start",
    });
};