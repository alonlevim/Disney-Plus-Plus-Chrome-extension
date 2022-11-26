import {
    getUILang,
    getSubtitleLang,
    getAudioLang,
    isRtl
} from "../utils/getLanguage";
import { catchError } from "../utils/handleError";
import { ASKING_FOR_TRAILER, ERROR } from "./actions";
import { Languages } from "./server.interface";

export const sendError =
    (error: string):
        Promise<void> =>
        chrome.runtime.sendMessage({ message: ERROR, error: error });

const lang = (): Languages => ({
    ui: getUILang(),
    subtitle: getSubtitleLang(),
    audio: getAudioLang(),
    rtl: isRtl()
})

export const askingForTrailer = ( title: string, itemId?: string ): void => {

    try {
        if (title) {
            chrome.runtime.sendMessage({
                message: ASKING_FOR_TRAILER,
                title,
                itemId,
                lang: lang()
            });
        }
    } catch (error) {
        catchError(error);
    }

}