import log from "../../utils/log";
import trailers from "../../utils/trailers/trailers";

const BIG_CARD_CLASS = "hover-card";

class BigCard {
    private static _instance: BigCard;

    private canWatch = false;
    private watching = false;
    private lastTitle = "null";
    private _isOpen = false;
    private trailers = trailers();

    public get isOpen(): boolean {
        return this._isOpen;
    }

    public static get Instance(): BigCard {
        return this._instance || (this._instance = new this());
    }

    public init = () => {
        this.canWatch = true;
    }

    public update = (): void => {
        if (!this.canWatch) {
            return;
        }

        // find cards in HTML
        const cards = Object.values(document.getElementsByClassName(BIG_CARD_CLASS));
        
        if( !cards.length && this.watching ) {
            this.handleClose();
        } else if( cards.length > 0 && !this.watching ) {
            const title = this.getTitleFromCard();

            if( title !== this.lastTitle ) {
                this.lastTitle = title;

                this.handleClose();
                this.handleOpen(title);
            }
        }
    }

    public showTrailer = (videoId: string): void => {
        // TODO: continue here
        log(`videoId: ${videoId}`);
    }

    private handleOpen(title: string): void {
        log('open:', title);
        this._isOpen = true;

        this.trailers.askForTrailer(title)
        .then((youtubeId) => console.log("then: " + youtubeId))
        .catch((error) => console.error(`catch: ${error}`));
    }

    private handleClose(): void {
        log('close');
        
        this._isOpen = false;
        // TODO: continue here
    }

    private getTitleFromCard() :string | null {
        try {
            return document.getElementsByClassName(BIG_CARD_CLASS)?.[0]?.getElementsByTagName("img")?.[0]?.alt;
        } catch (error) {
            return null;
        }
    }

    public dispose = (): void => {
        this.canWatch = false;
    }
}

export default () => BigCard.Instance;