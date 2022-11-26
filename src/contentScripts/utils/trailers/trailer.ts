import Youtube from "../youtube/youtube";

class Trailer {
    title: string;
    youtubeId: string;
    youtube: Youtube;
    serverStatus: TRAILER_SERVER_STATUS;
    private serverResolve?: (youtube: Youtube) => void;
    private serverReject?: () => void;
    private onStartPlaying: (youtube: Youtube) => void;
    private onEndPlaying: (youtube: Youtube) => void;

    constructor(
        title: string,
        resolve: (youtube: Youtube) => void,
        reject: () => void
    ) {
        this.title = title;
        this.serverResolve = resolve;
        this.serverReject = reject;
    }

    initAutoPlayCallbacks(
        onStartPlaying: (youtube: Youtube) => void,
        onEndPlaying: (youtube: Youtube) => void
    ): void {
        this.onStartPlaying = onStartPlaying;
        this.onEndPlaying = onEndPlaying;
    }

    onResponseFromServer(status: TRAILER_SERVER_STATUS, youtubeId?: string): void {
        this.serverStatus = status;

        switch (status) {
            case TRAILER_SERVER_STATUS.WAITING:
            case TRAILER_SERVER_STATUS.FAILED:
                this.youtubeId = "";
                this.serverReject();
                break;
            case TRAILER_SERVER_STATUS.SUCCESSED:
                this.youtubeId = youtubeId;
                this.youtube = new Youtube(youtubeId);
                this.youtube.initCallbacks(this.onStartPlaying, this.onEndPlaying);
                this.serverResolve(this.youtube);
                break;
            default:
                this.serverReject();
        }

        this.serverResolve = null;
        this.serverReject = null;
    }
}

export enum TRAILER_SERVER_STATUS {
    SUCCESSED = "successed",
    FAILED = "failed",
    WAITING = "waiting",
}

export default Trailer;