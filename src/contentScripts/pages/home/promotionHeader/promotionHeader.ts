import { catchError } from "../../../utils/handleError";
import trailers from "../../../utils/trailers/trailers";
import {
    BEFORE_TRAILER_START,
    ON_END_TRAILER,
    ON_START_ANIMATION_ENDED_TRAILER_1,
    ON_START_ANIMATION_ENDED_TRAILER_2,
    ON_START_TRAILER
} from "./promotionHeader.animation";
import { PromotionItem, PromotionList } from "./promotionHeader.interface";
import translate from "./promotionHeader.translation";

const PROMOTION_IMAGE_PATH = "._1grSXqPibJda0muajkRKkU";

class PromotionHeader {
    private static _instance: PromotionHeader;

    private trailers = trailers();
    private lastTitle = "null";
    private canWatch = false;
    private list: PromotionList;
    private currentItem: PromotionItem;

    private constructor() {
        this.list = {};
    }

    public static get Instance(): PromotionHeader {
        return this._instance || (this._instance = new this());
    }

    public init(): void {
        this.canWatch = true;
    }

    public update(): void {
        if (!this.canWatch) {
            return;
        }

        const title = this.getTitle();

        // There is a change
        if (this.lastTitle !== title) {
            this.lastTitle = title;
            this.cleanPreItem();

            if (title) {
                this.handleTitle(title);
            }
        }
    }

    private getTitle(): string | null {
        try {
            return document.querySelector(PROMOTION_IMAGE_PATH)?.getAttribute("alt");
        } catch (error) {
            return null;
        }
    }

    private handleTitle(title: string): void {
        if (typeof this.list[title] === "undefined") {
            // new title
            this.list[title] = {
                title,
                addedBtn: false,
                loading: true,
                btnUI: {},
                watching: false,
            };

            // get video
            this.trailers.askForTrailer(title)
                .then((youtube) => {
                    this.list[title].youtube = youtube;
                    this.list[title].loading = false;
                    this.updateBtnUiFromLoadingToAllowToShowTrailer(this.list[title]);
                });
        }

        // update current
        this.currentItem = this.list[title];

        // show btn
        if (!this.list[title].addedBtn) {
            this.addBtn(this.currentItem);
        }
    }

    private addBtn(item: PromotionItem): void {
        try {
            let level_5_span = document.createElement("span");
            level_5_span = this.changeTextOnButton(item, level_5_span);
            item.btnUI.level_5 = level_5_span;

            const level_4_btn = document.createElement("button");
            level_4_btn.className = "_1CSTLo7uotP5mTlp3jKun7 _1yQBhzj75P25n0B6DFF3aA";
            level_4_btn.addEventListener('click', this.onClickTrailer);
            level_4_btn.appendChild(level_5_span);
            item.btnUI.level_4 = level_4_btn;

            const level_3_span = document.createElement("span");
            level_3_span.className = "_2DhaMd4Yatz-PmNIfTTl2L";
            level_3_span.appendChild(level_4_btn);
            item.btnUI.level_3 = level_3_span;

            const level_2_div = document.createElement("div");
            level_2_div.className = "_3MtbKw24KXDEXTonDsGxtK flex-grow-0 h-full";
            level_2_div.appendChild(level_3_span);
            item.btnUI.level_2 = level_2_div;

            const level_1_div = document.createElement("div");
            level_1_div.className = "ml-SPACE_05";
            level_1_div.appendChild(level_2_div);
            item.btnUI.level_1 = level_1_div;

            document.querySelector("._3WOPDH3uV90WJTM6_qrL6J").appendChild(level_1_div);

            this.list[item.title].addedBtn = true;
        } catch (error) {
            console.error(error);
            catchError(error);
        }
    }

    private updateBtnUiFromLoadingToAllowToShowTrailer(item: PromotionItem): void {
        if (item.btnUI.level_5) {
            this.changeTextOnButton(item, item.btnUI.level_5);
        }
    }

    private changeTextOnButton(item: PromotionItem, level_5_span: HTMLSpanElement): HTMLSpanElement {
        if (item.loading) {
            level_5_span.className = "loaderT";
        } else {
            level_5_span.innerText = translate("Trailer");
            level_5_span.className = "ON_IMAGE BUTTON2_SEMIBOLD";
            level_5_span.setAttribute('style', 'font-family: var(--FONT-FAMILY);');
        }

        return level_5_span;
    }

    private cleanPreItem(): void {
        if (this.currentItem) {
            this.currentItem.addedBtn = false;
            this.currentItem.btnUI = {};
            this.currentItem.watching = false;
        }
    }

    private onClickTrailer = (ev: MouseEvent): void => {
        ev.stopPropagation();
        ev.preventDefault();

        if (!this.currentItem || this.currentItem?.loading) {
            return;
        }

        if (this.currentItem.watching) {
            this.onEndTrailer();
            return;
        }

        try {
            const bigImage = document.querySelector("._1grSXqPibJda0muajkRKkU");
            if (bigImage) {
                // hide iframe
                this.currentItem.youtube.getIframe().setAttribute('style', BEFORE_TRAILER_START)
                // add callbacks
                this.currentItem.youtube.initCallbacks(this.onEnterTrailer, this.onEndTrailer);
                // add video on screen and when onload the iframe it's start to play
                bigImage.parentNode.appendChild(this.currentItem.youtube.getIframe());
                this.currentItem.btnUI.level_5.innerText = translate("Loading");

                this.currentItem.watching = true;
            }
        } catch (error) {
            console.error(error);
            catchError(error);
        }
    }

    private onEnterTrailer = (): void => {
        this.currentItem.youtube.getIframe().setAttribute('style', ON_START_TRAILER)
        this.currentItem.btnUI.level_5.innerText = translate("Stop");

        setTimeout(() => {
            this.currentItem.youtube.getIframe().setAttribute(
                'style',
                this.currentItem.youtube.getIframe().getAttribute('style')
                    .replace(
                        ON_START_ANIMATION_ENDED_TRAILER_1,
                        ON_START_ANIMATION_ENDED_TRAILER_2
                    )
            );
        }, 400);
    }

    private onEndTrailer = (): void => {
        this.currentItem.youtube.getIframe().setAttribute(
            'style',
            this.currentItem.youtube.getIframe().getAttribute('style')
            + ON_END_TRAILER
        );

        setTimeout(() => {
            if (this.currentItem) {
                this.currentItem.youtube.destroyIframe();
                this.currentItem.watching = false;

                if (this.currentItem.btnUI?.level_5) {
                    this.changeTextOnButton(this.currentItem, this.currentItem.btnUI.level_5);
                }
            }
        }, 400);
    }

    public dispose = (): void => {
        this.canWatch = false;
    }
}

export default () => PromotionHeader.Instance;