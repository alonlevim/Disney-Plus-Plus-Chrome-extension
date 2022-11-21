import { catchError } from "../utils/handleError";
import log from "../utils/log";
import { TRAILER_SERVER_STATUS } from "../utils/trailers/trailer";
import { TrailerResponseFromServer } from "../utils/trailers/TrailerResponseFromServer.interface";
import trailers from "../utils/trailers/trailers";
import { RESPONSE_ABOUT_TRAILER } from "./actions";

class GetFromBackground {
    private static _instance: GetFromBackground;
    private trailers = trailers();

    private constructor() {
        chrome.runtime.onMessage.addListener((
            message: any
        ) => {
            try {
                switch (message?.message) {
                    case RESPONSE_ABOUT_TRAILER:
                        this.responseAboutTrailer(message.res);
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
        const status = res.status === 'failed' ? TRAILER_SERVER_STATUS.FAILED : TRAILER_SERVER_STATUS.SUCCESSED;
        this.trailers.responseFromServer(title, status, youtubeId);
    }
}

export default () => GetFromBackground.Instance;