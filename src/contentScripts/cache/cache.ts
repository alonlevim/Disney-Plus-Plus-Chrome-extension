import { VideosCache } from "./cache.interface";

export enum VIDEO_SERVER_STATUS {
    SUCCESSED = "successed",
    FAILED = "failed",
    WAITING = "waiting",
}

class Cache {
    private static _instance: Cache;
    private videosCache: VideosCache = {};

    private constructor() {
        //
    }

    public static get Instance(): Cache {
        return this._instance || (this._instance = new this());
    }

    public insertVideo = (title: string, videoId: string): void => {
        if (!this.videosCache[title] || this.videosCache[title]?.status !== VIDEO_SERVER_STATUS.SUCCESSED) {
            this.videosCache[title] = {
                videoId,
                status: VIDEO_SERVER_STATUS.SUCCESSED
            };
        }
    }

    public insertWaitingForVideo = (title: string): void => {
        if (!this.videosCache[title] || this.videosCache[title].status === VIDEO_SERVER_STATUS.FAILED) {
            this.videosCache[title] = {
                status: VIDEO_SERVER_STATUS.WAITING
            };
        }
    }
}

export default () => Cache.Instance;