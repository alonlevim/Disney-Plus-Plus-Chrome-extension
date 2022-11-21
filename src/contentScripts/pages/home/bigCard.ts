import log from "../../utils/log";
import trailers from "../../utils/trailers/trailers";

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
            .then((youtubeId) => {
                log("then: " + youtubeId);

                if( this.currentTitle === title ) {
                    this.waitCursor(card, false);

                    // video
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

    public dispose = (): void => {
        this.canWatch = false;
    }
}

export default () => BigCard.Instance;