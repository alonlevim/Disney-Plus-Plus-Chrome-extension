import cache from "../cache/cache";
import bigCard from "../pages/home/bigCard";
import { catchError } from "../utils/handleError";
import log from "../utils/log";
import { RESPONSE_ABOUT_TRAILER } from "./actions";

class GetFromBackground {
    private static _instance: GetFromBackground;
    private cache = cache();
    private bigCard = bigCard();

    private constructor() {
        chrome.runtime.onMessage.addListener((
            message: any
        ) => {
            try {
                switch (message?.message) {
                    case RESPONSE_ABOUT_TRAILER:
                        this.responseAboutTrailer(message);
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

    private responseAboutTrailer = (message: any) => {
        log(message.res);

        if (message?.res?.youtubeId) {
            // cache
            this.cache.insertVideo(message.res.title, message.res.youtubeId);
            // show trailer
            this.bigCard.showTrailer(message.res.youtubeId);
        }
    }
}

export default () => GetFromBackground.Instance;