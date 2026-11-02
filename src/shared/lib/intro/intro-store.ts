export const INTRO_STORAGE_KEY = "intro-seen";

export const INTRO_INIT_SCRIPT = `try{if(sessionStorage.getItem("${INTRO_STORAGE_KEY}")==="1"){document.documentElement.dataset.intro="seen"}}catch(e){}`;

let introDone = false;

const listeners = new Set<() => void>();

export const completeIntro = () => {
    if (introDone) return;

    introDone = true;

    try {
        window.sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {}

    listeners.forEach((listener) => listener());
};

export const subscribeIntro = (listener: () => void) => {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
};

export const getIntroSnapshot = () =>
    introDone || document.documentElement.dataset.intro === "seen";

export const getIntroServerSnapshot = () => false;