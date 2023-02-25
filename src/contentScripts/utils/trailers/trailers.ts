import Trailer, { TRAILER_SERVER_STATUS } from "./trailer"
import { askingForTrailer } from "../../networks/sendToBackground";
import Youtube from "../youtube/youtube";
import log from "../log";

interface TrailersMap {
    [title: string]: Trailer
}

export class Trailers {
    private static _instance: Trailers;
    items: TrailersMap;
    private playingNow?: Youtube;

    private constructor() {
        this.items = {};
        this.onMessage();
    }

    public static get Instance(): Trailers {
        return this._instance || (this._instance = new this());
    }

    public getPlayingNow = () : Youtube => {
        return this.playingNow;
    }

    public isCurrentYoutube = (youtube: Youtube) : boolean => {
        return this.playingNow === youtube;
    }

    public askForTrailer(
        title: string,
        target: string,
        itemId?: string,
        ): Promise<Youtube> {
        return new Promise((resolve, reject) => {
            // exists
            if( typeof this.items[title] !== "undefined" ) {
                // create again iframe
                this.items[title].youtube?.createIframe();

                return resolve(this.items[title].youtube);
            }

            // new one
            this.items[title] = new Trailer(title, resolve, reject);

            // send to server
            askingForTrailer(title, itemId, target);
        });
    }

    public askForTrailerAutoPlay(
        title: string,
        itemId: string,
        target: string,
        onStartPlaying: (youtube: Youtube) => void,
        onEndPlaying: (youtube: Youtube) => void
        ): Promise<Youtube> {
        return new Promise((resolve, reject) => {
            // exists
            if( typeof this.items[title] !== "undefined" ) {
                // set callbacks
                this.items[title].youtube.initCallbacks(onStartPlaying, onEndPlaying);
                // create again iframe
                this.items[title].youtube?.createIframe();

                return resolve(this.items[title].youtube);
            }

            // new one
            this.items[title] = new Trailer(title, resolve, reject);
            this.items[title].initAutoPlayCallbacks(onStartPlaying, onEndPlaying);

            // send to server
            askingForTrailer(title, itemId, target);
        });
    }

    public responseFromServer(title: string, status: TRAILER_SERVER_STATUS, youtubeId?: string): void {
        if( !this.items[title] ) {
            return;
        }

        this.items[title].onResponseFromServer(status, youtubeId);
    }

    public setPlayingNow(item?: Youtube): void {
        this.playingNow = item;
    }

    private onMessage = () => {
        window.addEventListener("message", (res) => {
            if( this.playingNow ) {
                try {
                    const data = JSON.parse(res.data);

                    switch(data.event) {
                        case "infoDelivery":
                            this.playingNow.onInfoDelivery(data.info);
                            break;
                        case "onStateChange":
                            this.playingNow.onStateChange(data.info);
                            break;
                        default:
                            log(data);
                            break;
                    }

                } catch (error) {
                    log(error);
                }
            }
        });
    }
}

export default () => Trailers.Instance;