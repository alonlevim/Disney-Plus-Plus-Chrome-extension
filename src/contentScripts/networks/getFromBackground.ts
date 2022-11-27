import { getAudioLang, getSubtitleLang, getUILang, isRtl } from "../utils/getLanguage";
import getPageAndCountry from "../utils/getPageAndCountry";
import { catchError } from "../utils/handleError";
import { TRAILER_SERVER_STATUS } from "../utils/trailers/trailer";
import { TrailerResponseFromServer } from "../utils/trailers/TrailerResponseFromServer.interface";
import trailers from "../utils/trailers/trailers";
import {
    ASKING_FOR_COUNTRY_AND_LANGUAGE,
    RESPONSE_ABOUT_TRAILER
} from "./actions";
import { LanguagesAndCountry } from "./server.interface";

class GetFromBackground {
    private static _instance: GetFromBackground;
    private trailers = trailers();

    private constructor() {
        chrome.runtime.onMessage.addListener((
            message: any,
            sender: chrome.runtime.MessageSender,
            sendResponse: (response?: any) => void
        ) => {
            try {
                switch (message?.message) {
                    case RESPONSE_ABOUT_TRAILER:
                        this.responseAboutTrailer(message.res);
                        break;
                    case ASKING_FOR_COUNTRY_AND_LANGUAGE:
                        this.sendCountryAndLanguage(sendResponse);
                        break;
                }
            } catch (error) {
                console.error(error);
                catchError(error);
            }
        });
    }

    public static get Instance(): GetFromBackground {
        return this._instance || (this._instance = new this());
    }

    private responseAboutTrailer = (res: TrailerResponseFromServer) => {
        const { title, youtubeId } = res;
        const status = (res.status === 'failed')
            ?
            TRAILER_SERVER_STATUS.FAILED
            :
            TRAILER_SERVER_STATUS.SUCCESSED;
        this.trailers.responseFromServer(title, status, youtubeId);
    }

    private sendCountryAndLanguage = (sendResponse: (response?: any) => void):
        void => {
        const page = getPageAndCountry();

        const data = {
            ui: getUILang(),
            subtitle: getSubtitleLang(),
            audio: getAudioLang(),
            rtl: isRtl(),
            country: page.country
        } as LanguagesAndCountry;

        if (typeof sendResponse === "function") {
            sendResponse(data);
        }
    };
}

export default () => GetFromBackground.Instance;