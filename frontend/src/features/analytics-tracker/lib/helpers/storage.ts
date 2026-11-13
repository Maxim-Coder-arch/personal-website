export const readStorage = (key: string): string | null => {
    try {
        return window.localStorage.getItem(key);
    } catch {
        return null;
    }
};

export const writeStorage = (key: string, value: string) => {
    try {
        window.localStorage.setItem(key, value);
    } catch {
        return;
    }
};