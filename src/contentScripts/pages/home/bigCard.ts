import log from "../../utils/log";
import trailers from "../../utils/trailers/trailers";
import { BEFORE_TRAILER_START, ON_END_TRAILER, ON_START_TRAILER } from "../../utils/youtube/animationConstants";
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
        const card = this.getCard();

        if (!card && this.watching) {
            this.handleClose(card);
        } else if (card && !this.watching) {
            const title = this.getTitleFromCard();

            if (title !== this.currentTitle) {
                this.handleClose(card);

                this.currentTitle = title;

                this.handleOpen(card, title);
            }
        }
    }

    private handleOpen = (card: HTMLDivElement, title: string): void => {
        log('open:', title);
        this._isOpen = true;
        this.watching = true;
        
        this.waitCursor(card);

        this.trailers.askForTrailer(title, this.handleShow, this.handleEnd)
            .then((youtube) => {
                log("then: " + youtube.youtubeId);

                if( this.currentTitle === title ) {
                    // video
                    this.addIframe(card, youtube);
                }
            })
            .catch((error) => {
                console.error(`catch: ${error}`);
                
                if( this.currentTitle === title ) {
                    this.waitCursor(card, false);
                }
            });
    }

    private handleClose(card: HTMLDivElement): void {
        log('close');

        this._isOpen = false;
        this.watching = false;
        this.currentTitle = "null";

        const currentYoutube = this.trailers.getPlayingNow();
        if( currentYoutube ) {
            currentYoutube.destroyIframe();
        }
    }

    private getTitleFromCard(): string | null {
        try {
            return document.getElementsByClassName(BIG_CARD_CLASS)?.[0]?.getElementsByTagName("img")?.[0]?.alt;
        } catch (error) {
            return null;
        }
    }

    private waitCursor(card: HTMLDivElement, waiting = true): void {
        try {
            const _card = card.querySelector("div > a > div");
            if( waiting ) {
                _card.setAttribute('style', 'cursor: wait;');
            } else {
                _card.removeAttribute('style');
            }
        } catch (error) {
            //
        }
    }

    private getCard = (): HTMLDivElement|null => {
        // find cards in HTML
        const cards = Object.values(document.getElementsByClassName(BIG_CARD_CLASS)) as HTMLDivElement[];
        return this.lastCard(cards);
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

    private getImageElement(card: HTMLDivElement): HTMLDivElement|null {
        try {
            return card.querySelectorAll("div > a > div > div")?.[1].querySelector("img");
        } catch (error) {
            return null;
        }
    }

    private addIframe(card: HTMLDivElement, youtube: Youtube): void {
        const imageElement = this.getImageElement(card);
        
        if( !imageElement ) {
            return;
        }

        const parent = imageElement.parentElement;

        parent.insertBefore(youtube.iframe, imageElement);
    }

    private handleShow = (youtube: Youtube) => {
        const card = this.getCard();

        if( !card ) {
            return;
        }
        
        this.waitCursor(card, false);

        if( youtube.iframe ) {
            youtube.iframe.setAttribute(
                'style',
                youtube.iframe.getAttribute('style')
                    .replace(BEFORE_TRAILER_START, ON_START_TRAILER)
            );
        }
    }

    private handleEnd = (youtube: Youtube) => {
        youtube.iframe.setAttribute(
            'style',
            youtube.iframe.getAttribute('style')
                .replace(ON_START_TRAILER, ON_END_TRAILER)
            );

        setTimeout(() => {
            youtube.destroyIframe();
        }, 500);
    }

    public dispose = (): void => {
        this.canWatch = false;
    }
}

export default () => BigCard.Instance;