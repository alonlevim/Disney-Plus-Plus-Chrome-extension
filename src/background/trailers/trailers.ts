import { sendError } from '../handleError';
import { TrailerResponseFromServer } from '../networks/TrailerResponseFromServer.interface';
import { TrailerInterface, TrailersInterface } from './trailers.interface'

export class Trailers {
    private static _instance: Trailers;
    private list: TrailersInterface;

    private constructor() {
        this.list = {};
    }

    public static get Instance(): Trailers {
        return this._instance || (this._instance = new this());
    }

    public insertList = (newList: TrailersInterface): void => {
        if (!newList || typeof newList !== "object") {
            return;
        }

        try {
            for (const title in newList) {
                this.list[title] = { ...newList[title] };
            }
        } catch (error) {
            console.error(error);
            sendError(error);
        }
    }

    public insertOne = (newItem: TrailerInterface | TrailerResponseFromServer): void => {
        if (!newItem || typeof newItem !== "object" || !newItem?.title) {
            return;
        }

        try {
            this.list[newItem.title] = {
                title: newItem.title,
                youtubeId: newItem.youtubeId
            };
        } catch (error) {
            console.error(error);
            sendError(error);
        }
    }

    public isEmptyList = () => Object.keys(this.list).length === 0;

    public getTrailer = (title: string): TrailerInterface => {
        return this.list?.[title] ?? null;
    }
}

export default () => Trailers.Instance;