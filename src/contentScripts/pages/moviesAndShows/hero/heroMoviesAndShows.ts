import { catchError } from "../../../utils/handleError";
import {
    BEFORE_TRAILER_START,
    ON_END_TRAILER,
    ON_START_ANIMATION_ENDED_TRAILER_1,
    ON_START_ANIMATION_ENDED_TRAILER_2,
    ON_START_TRAILER
} from "./heroMoviesAndShows.animation";
import translate from "../../../translation/trailer.translation";
import { HeroItem } from "../../../utils/hero/hero.interface";
import HeroClass from "../../../utils/hero/hero.class";

const HERO_IMAGE_PATH = "._24Ofj9sZSOmHmJoAjyeIrq";
const PROMOTION_ACTIONS_PATH = ".IvJal0TgDhB6zMOH9Jtf_";
const VIDEO_HEIGHT_PATH_SHOULD_BE = "._3AROLDGB01fCnKsXTMjaM2";
const MY_CUSTOM_CLASS_NAME = "_h5HKCc9DKsS8pFFm";

const HERO_IMAGE_PATH_2 = ".details-hero-base__heroImage__oAQ4W";
const PROMOTION_ACTIONS_PATH_2 = ".details-hero-gec__buttonsContainer__2oZq9";

const TARGET = "hero-movies-and-shows";

class HeroMoviesAndShows extends HeroClass {
    private static _instance: HeroMoviesAndShows;

    private canChangeVideoHeight = false;
    private currentVideoHeight = "null";
    private isResizeListening = false;

    public static get Instance(): HeroMoviesAndShows {
        return this._instance || (this._instance = new this());
    }

    override init(): void {
        super.init();
        this.canChangeVideoHeight = false;
        this.onHeroChangeScreen();
    }

    public update(): void {
        if (!this.canWatch) {
            return;
        }

        this.fixMissingBtn();

        const title = this.getTitle();

        if (title) {
            this.handleTitle(title, TARGET);
        }
    }

    protected getTitle(): string {
        try {
            return document.querySelector(HERO_IMAGE_PATH)?.getAttribute("alt") ?? document.querySelector(HERO_IMAGE_PATH_2)?.getAttribute("alt");
        } catch (error) {
            return null;
        }
    }

    protected getItemId(): string {
        try {
            const items = window.location.pathname.split("/");
            return items[items.length - 1];
        } catch (error) {
            return null;
        }
    }

    private getVideoHeightShouldBe(): string {
        try {
            return document.querySelector(VIDEO_HEIGHT_PATH_SHOULD_BE).clientHeight + "px";
        } catch (error) {
            return null;
        }
    }

    protected addBtn(item: HeroItem): void {
        try {
            // Check if there is not a Resume btn
            if( !document.querySelector(PROMOTION_ACTIONS_PATH)?.querySelector("._327SC61OuWTrcvPRkh7SJP.Bhnxu6dfnJDV6gSBMtJMI") && !document.querySelector(PROMOTION_ACTIONS_PATH_2)?.querySelector(".base-button__button__3qwNY") ) {
                // fix style
                document.querySelector(PROMOTION_ACTIONS_PATH)?.setAttribute('style', 'flex-wrap: nowrap;')
                document.querySelector(PROMOTION_ACTIONS_PATH_2)?.setAttribute('style', 'flex-wrap: nowrap;')
            }

            let level_5_span = document.createElement("span");
            level_5_span = this.changeTextOnButton(item, level_5_span);
            item.btnUI.level_5 = level_5_span;

            const level_4_btn = document.createElement("button");
            level_4_btn.className = "_1CSTLo7uotP5mTlp3jKun7 _1yQBhzj75P25n0B6DFF3aA base-button__button__3qwNY base-button__btnIcon__2NkgH";
            level_4_btn.addEventListener('click', this.onClickTrailer);
            level_4_btn.appendChild(level_5_span);
            item.btnUI.level_4 = level_4_btn;

            const level_3_span = document.createElement("span");
            level_3_span.className = "_2DhaMd4Yatz-PmNIfTTl2L button-watchlist__watchlistBtn__3trHT";
            level_3_span.appendChild(level_4_btn);
            item.btnUI.level_3 = level_3_span;

            const level_2_div = document.createElement("div");
            level_2_div.className = "_3MtbKw24KXDEXTonDsGxtK flex-grow-0 h-full";
            level_2_div.appendChild(level_3_span);
            item.btnUI.level_2 = level_2_div;

            const level_1_div = document.createElement("div");
            level_1_div.className = MY_CUSTOM_CLASS_NAME; // my custom class
            level_1_div.appendChild(level_2_div);
            item.btnUI.level_1 = level_1_div;

            document.querySelector(PROMOTION_ACTIONS_PATH)?.appendChild(level_1_div);
            document.querySelector(PROMOTION_ACTIONS_PATH_2)?.appendChild(level_1_div);

            this.currentItem.addedBtn = true;
        } catch (error) {
            console.error(error);
            catchError(error);
        }
    }

    protected onClickTrailer = (ev: MouseEvent): void => {
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
            const bigImage = document.querySelector(HERO_IMAGE_PATH) ?? document.querySelector(HERO_IMAGE_PATH_2);
            if (bigImage) {
                const height = this.getVideoHeightShouldBe() ?? "100%";
                this.currentVideoHeight = height;
                // hide iframe
                this.currentItem.youtube.getIframe().setAttribute('style', BEFORE_TRAILER_START + `height: ${height};`)
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

    protected onEnterTrailer = (): void => {
        const height = this.getVideoHeightShouldBe() ?? "100%";
        this.currentVideoHeight = height;

        // this.currentItem.youtube.getIframe().setAttribute('style', ON_START_TRAILER + `height: ${height};`)
        this.currentItem.youtube.getIframe().setAttribute('style', "position: absolute; inset: 0; z-index:1; width: 100%; height: 100%;opacity: 1;");
        this.currentItem.btnUI.level_5.innerText = translate("Stop");

        // this.canChangeVideoHeight = false;
        this.canChangeVideoHeight = true;

        // setTimeout(() => {
        //     this.currentItem.youtube.getIframe().setAttribute(
        //         'style',
        //         this.currentItem.youtube.getIframe().getAttribute('style')
        //             .replace(
        //                 ON_START_ANIMATION_ENDED_TRAILER_1,
        //                 ON_START_ANIMATION_ENDED_TRAILER_2
        //             )
        //     );

        //     this.canChangeVideoHeight = true;
        // }, 400);
    }

    protected onEndTrailer = (): void => {
        this.currentItem.youtube.getIframe().setAttribute(
            'style',
            this.currentItem.youtube.getIframe().getAttribute('style')
            + ON_END_TRAILER
        );

        this.canChangeVideoHeight = false;

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

    private onHeroChangeScreen(): void {
        if (this.isResizeListening) {
            return;
        }

        this.isResizeListening = true;
        window.addEventListener('resize', this.handleHeroChangingHeight);
    }

    private disableHeroChangeScreen(): void {
        if (!this.isResizeListening) {
            return;
        }

        window.removeEventListener('resize', this.handleHeroChangingHeight);
        this.isResizeListening = false;
    }

    private handleHeroChangingHeight = (): void => {
        const newHeight = this.getVideoHeightShouldBe();
        this.changeVideoHeight(newHeight);
    }

    private changeVideoHeight(newHeight: string): void {
        if (
            !this.canChangeVideoHeight
            ||
            newHeight === this.currentVideoHeight
            ||
            !newHeight
            ||
            !this.canWatch
            ||
            !this.currentItem?.watching
        ) {
            return;
        }

        try {
            const oldStyle = this.currentItem.youtube.getIframe().getAttribute('style');
            const regex = /(?:height):[^;]*;/gi;
            const newStyle = oldStyle.replace(regex, `height: ${newHeight};`);
            this.currentItem.youtube.getIframe().setAttribute('style', newStyle);
            this.currentVideoHeight = newHeight;
        } catch (error) {
            console.error(error);
        }
    }

    protected fixMissingBtn(): void {
        if (!this.currentItem?.addedBtn || this.fixedMissingBtn) {
            return;
        }

        const btnElementAtDom = document.querySelector(`.${MY_CUSTOM_CLASS_NAME}`);
        if (!btnElementAtDom) {
            this.currentItem.addedBtn = false;
            this.fixedMissingBtn = true;
        }
    }

    public override dispose(): void {
        super.dispose();
        this.disableHeroChangeScreen();
    }
}

export default () => HeroMoviesAndShows.Instance;