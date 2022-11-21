import log from "../../utils/log";
import trailers from "../../utils/trailers/trailers";
import Youtube from "../../utils/youtube/youtube";

const BIG_CARD_CLASS = "hover-card";

class BigCard {
    private static _instance: BigCard;

    private canWatch = false;
    private watching = false;
    private currentTitle = "null";
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
        const cards = Object.values(document.getElementsByClassName(BIG_CARD_CLASS)) as HTMLDivElement[];
        const card = this.lastCard(cards);

        if (!card && this.watching) {
            this.handleClose(card);
        } else if (card && !this.watching) {
            const title = this.getTitleFromCard();

            if (title !== this.currentTitle) {
                this.currentTitle = title;

                this.handleClose(card);
                this.handleOpen(card, title);
            }
        }
    }

    public showTrailer = (videoId: string): void => {
        // TODO: continue here
        log(`videoId: ${videoId}`);
    }

    private handleOpen(card: HTMLDivElement, title: string): void {
        log('open:', title);
        this._isOpen = true;
        
        this.waitCursor(card);

        this.trailers.askForTrailer(title)
            .then((youtube) => {
                log("then: " + youtube.youtubeId);

                if( this.currentTitle === title ) {
                    this.waitCursor(card, false);

                    // hide image
                    this.showAndHideImage(card);

                    // video
                    this.addIframe(card, youtube);
                }
            })
            .catch((error) => console.error(`catch: ${error}`));
    }

    private handleClose(card: HTMLDivElement): void {
        log('close');

        this._isOpen = false;
        // TODO: continue here
    }

    private getTitleFromCard(): string | null {
        try {
            return document.getElementsByClassName(BIG_CARD_CLASS)?.[0]?.getElementsByTagName("img")?.[0]?.alt;
        } catch (error) {
            return null;
        }
    }

    private waitCursor(card: HTMLDivElement, waiting = true): void {
        const _card = card.querySelector("div > a > div");
        if( waiting ) {
            _card.setAttribute('style', 'cursor: wait;');
        } else {
            _card.removeAttribute('style');
        }
    }

    private lastCard(cards: HTMLDivElement[]): HTMLDivElement | null {
        if (Array.isArray(cards)) {
            const len = cards.length;

            if (len === 0) {
                return null;
            }

            return cards[len - 1];
        }
    }

    private getImageElement(card: HTMLDivElement): HTMLDivElement {
        return card.querySelectorAll("div > a > div > div")?.[1].querySelector("img");
    }

    private showAndHideImage(card: HTMLDivElement, show = false) {
        const imageElement = this.getImageElement(card);

        if( imageElement ) {
            if( !show ) {
                imageElement.setAttribute('style', 'transition: 0.5s opacity ease-out; opacity: 0;');
            } else {
                imageElement.setAttribute('style', 'transition: 0.5s opacity ease-out; opacity: 1;');
            }
        }
    }

    private addIframe(card: HTMLDivElement, youtube: Youtube): void {
        const imageElement = this.getImageElement(card);
        const parent = imageElement.parentElement;

        parent.insertBefore(youtube.iframe, imageElement);
    }

    public dispose = (): void => {
        this.canWatch = false;
    }
}

export default () => BigCard.Instance;