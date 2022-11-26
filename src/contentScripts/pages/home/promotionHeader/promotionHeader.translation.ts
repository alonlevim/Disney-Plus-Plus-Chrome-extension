import { getUILang } from "../../../utils/getLanguage";
import { Translation } from "./promotionHeader.interface";

const map = {
    "TRAILER": {
        "en": "Trailer",
        "ar": "اعلان الفيلم",
        "he": "טריילר",
    },
    "LOADING": {
        "en": "Loading",
        "ar": "جار التحميل",
        "he": "טוען",
    },
    "STOP": {
        "en": "Stop",
        "ar": "التوقّف",
        "he": "עצור",
    },
} as Translation;

const translate = (word: string): string => {
    try {
        const longLang = getUILang();
        const lang = (longLang.length > 2 ? longLang.substring(0, 2) : longLang) as "en" | "ar" | "he";

        return map?.[word.toUpperCase()]?.[lang] ?? map?.[word.toUpperCase()]?.["en"] ?? "";
    } catch (error) {
        console.error(error);
        return "";
    }
};

export default translate;