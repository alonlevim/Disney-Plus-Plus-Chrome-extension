import Youtube from "../../../utils/youtube/youtube";

export interface PromotionList {
    [title: string]: PromotionItem
}

export interface PromotionItem {
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
}