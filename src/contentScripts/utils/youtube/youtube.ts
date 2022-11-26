import log from "../log";
import trailers from "../trailers/trailers";
import { BEFORE_TRAILER_START } from "./animationConstants";
import { PLAYER_STATE } from "./PlayerState";

class Youtube {
    iframe: HTMLIFrameElement;
    youtubeId: string;
    playStatus: PLAYER_STATE;

    private trailers = trailers();
    private _onShow: (youtube: Youtube) => void;
    private _onEnd: (youtube: Youtube) => void;
    private listening = false;
    private unstatred = false;

    constructor(youtubeId: string) {
        this.youtubeId = youtubeId;
        this.createIframe();

        return this;
    }

    public initCallbacks = (onShow: (youtube: Youtube) => void, onEnd: (youtube: Youtube) => void) => {
        this._onShow = onShow;
        this._onEnd = onEnd;
    }

    public createIframe = () => {
        // attributes
        this.iframe = document.createElement("iframe");
        this.iframe.setAttribute("type", "text/html");
        this.iframe.setAttribute("width", "100%");
        this.iframe.setAttribute("height", "100%");
        this.iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
        this.iframe.setAttribute("frameborder", "0");
        this.iframe.setAttribute("src", "https://www.youtube.com/embed/" + this.youtubeId + "?autoplay=0&enablejsapi=1&controls=0&ref=0");
        this.iframe.setAttribute("style", "position: absolute; top: 0; right: 0; left: 0; bottom: 0; z-index: 1; " + BEFORE_TRAILER_START);

        // events
        this.iframe.addEventListener("load", this.onLoad);
    }

    private onLoad = () => {
        log("loaded");
        this.initAfterLoad();
        this.play();
    }

    private initAfterLoad = () => {
        // Send: add onStateChange to event listener
        this.iframe.contentWindow.postMessage(
            '{"event":"command","func":"addEventListener","args":["onStateChange"]}',
            "https://www.youtube.com"
        );
    }

    public play = (): void => {
        log("play");

        this.trailers.setPlayingNow(this);

        // Send: play
        this.iframe.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":[],"id":1,"channel":"widget"}',
            "https://www.youtube.com"
        );

        if( !this.listening ) {
            this.listening = true;

            setTimeout(() => {
                // send command
                this.iframe.contentWindow.postMessage(
                    '{"event":"listening","id":1,"channel":"widget"}',
                    "https://www.youtube.com"
                );
            }, 10);
        }
    }

    public onInfoDelivery = (data: any) => {
        log("onInfoDelivery", data);
    }

    public onStateChange = (data: any) => {
        switch (data) {
            case PLAYER_STATE.PLAYING:
                this.playStatus = PLAYER_STATE.PLAYING;
                if( this.unstatred ) {
                    this.unstatred = false;
                    if( typeof this._onShow === "function" ) {
                        this._onShow(this);
                    }
                }
                break;
            case PLAYER_STATE.PAUSED:
                this.playStatus = PLAYER_STATE.PAUSED;
                break;
            case PLAYER_STATE.BUFFERING:
                this.playStatus = PLAYER_STATE.BUFFERING;
                break;
            case PLAYER_STATE.ENDED:
                this.playStatus = PLAYER_STATE.ENDED;
                if( typeof this._onEnd === "function" ) {
                    this._onEnd(this);
                }
                break;
            case PLAYER_STATE.UNSTARTED:
                this.playStatus = PLAYER_STATE.UNSTARTED;
                this.unstatred = true;
                break;
        }

        log( Object.keys(PLAYER_STATE)[Object.values(PLAYER_STATE).indexOf(this.playStatus)] );
    }

    public destroyIframe = () => {
        if( this.iframe && this.iframe.parentNode ) {
            this.iframe.parentNode.removeChild(this.iframe);
            log("destroyed iframe");
        }
        
        this.playStatus = null;
        this.listening = false;
        this.unstatred = false;

        this._onShow = undefined;
        this._onEnd = undefined;
        
        if( this.trailers.isCurrentYoutube(this) ) {
            this.trailers.setPlayingNow(undefined);
        }

        this.iframe = null;
    }
}

export default Youtube;