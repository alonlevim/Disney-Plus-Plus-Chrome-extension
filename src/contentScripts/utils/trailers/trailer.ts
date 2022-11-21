import Youtube from "../youtube/youtube";

class Trailer {
    title: string;
    youtubeId: string;
    youtube: Youtube;
    serverStatus: TRAILER_SERVER_STATUS;
    serverResolve?: (youtube: Youtube) => void;
    serverReject?: () => void;

    constructor(title: string, resolve: (youtube: Youtube) => void, reject: () => void) {
        this.title = title;
        this.serverResolve = resolve;
        this.serverReject = reject;
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