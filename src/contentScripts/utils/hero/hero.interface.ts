import Youtube from "../youtube/youtube";

export interface HeroInterface {
    init: () => void;
    update: () => void;
    dispose: () => void;
}

export interface HeroList {
    [title: string]: HeroItem
}

export interface HeroItem {
    addedBtn: boolean;
    loading: boolean;
    title: string;
    watching: boolean;
    btnUI: {
        level_1?: HTMLElement;
        level_2?: HTMLElement;
        level_3?: HTMLElement;
        level_4?: HTMLElement;
        level_5?: HTMLElement;
    },
    youtube?: Youtube;
    fixedMissingBtn?: boolean;
}