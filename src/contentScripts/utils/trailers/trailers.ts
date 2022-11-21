import Trailer, { TRAILER_SERVER_STATUS } from "./trailer"
import { askingForTrailer } from "../../networks/sendToBackground";

interface TrailersMap {
    [title: string]: Trailer
}

class Trailers {
    private static _instance: Trailers;
    items: TrailersMap;

    private constructor() {
        this.items = {};
    }

    public static get Instance(): Trailers {
        return this._instance || (this._instance = new this());
    }

    public askForTrailer(title: string): Promise<string> {
        return new Promise((resolve, reject) => {
            // exists
            if( typeof this.items[title] !== "undefined" ) {
                return resolve(this.items[title].youtubeId);
            }

            // new one
            this.items[title] = new Trailer(title, resolve, reject);

            // send to server
            askingForTrailer(title);
        });
    }

    public responseFromServer(title: string, status: TRAILER_SERVER_STATUS, youtubeId?: string): void {
        if( !this.items[title] ) {
            return;
        }

        this.items[title].onResponseFromServer(status, youtubeId);
    }
}

export default () => Trailers.Instance;