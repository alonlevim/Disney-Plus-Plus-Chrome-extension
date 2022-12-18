import translate from "../../../translation/trailer.translation";
import { catchError } from "../../../utils/handleError";
import { fromUrlToItemId } from "../../../utils/helper";
import HeroClass from "../../../utils/hero/hero.class";
import { HeroItem } from "../../../utils/hero/hero.interface";
import {
    BEFORE_TRAILER_START,
    ON_END_TRAILER,
    ON_START_ANIMATION_ENDED_TRAILER_1,
    ON_START_ANIMATION_ENDED_TRAILER_2,
    ON_START_TRAILER
} from "./promotionHeader.animation";
import { HeroList } from "./heroHomePage.interface";
import rulesInstance from "../../../rules";

const PROMOTION_IMAGE_PATH = "._1grSXqPibJda0muajkRKkU";
const PROMOTION_ACTIONS_PATH = "._3WOPDH3uV90WJTM6_qrL6J";
const MY_CUSTOM_CLASS_NAME = "_h5HKCc9DKsS8pFFm";

class HeroHomePage extends HeroClass {
    private static _instance: HeroHomePage;

    private lastTitle = "null";
    private list: HeroList;
    private rules = rulesInstance();
    private initialized = false;

    private constructor() {
        super();
        this.list = {};
    }

    public static get Instance(): HeroHomePage {
        return this._instance || (this._instance = new this());
    }

    public init(): void {
        if (this.initialized) {
            return;
        }

        this.initialized = true;

        super.init();
        this.rules.runAfterInit(() => {
            if (!this.initialized) {
                this.init();
            } else {
                this.update();
            }
        });
    }

    public update(): void {
        if (!this.canWatch) {
            return;
        }

        this.fixMissingBtn();

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

    protected override handleTitle(title: string): void {
        if (typeof this.list[title] === "undefined") {
            // new title
            this.list[title] = {
                title,
                addedBtn: false,
                loading: true,
                btnUI: {},
                watching: false,
            };

            const itemId = this.getItemId();

            // get video
            this.trailers.askForTrailer(title, itemId)
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

    protected getTitle(): string {
        try {
            return document.querySelector(PROMOTION_IMAGE_PATH)?.getAttribute("alt");
        } catch (error) {
            return null;
        }
    }

    protected getItemId(): string {
        try {
            const element = document.querySelector(PROMOTION_ACTIONS_PATH).firstChild as Element;
            const href = element.querySelector("a").getAttribute("href");

            return fromUrlToItemId(href);
        } catch (error) {
            return null;
        }
    }

    protected addBtn(item: HeroItem): void {
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

            document.querySelector(PROMOTION_ACTIONS_PATH).appendChild(level_1_div);

            this.list[item.title].addedBtn = true;
        } catch (error) {
            console.error(error);
            catchError(error);
        }
    }

    private cleanPreItem(): void {
        if (this.currentItem) {
            this.currentItem.addedBtn = false;
            this.currentItem.btnUI = {};
            this.currentItem.watching = false;
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

    protected onEnterTrailer = (): void => {
        // this.currentItem.youtube.getIframe().setAttribute('style', ON_START_TRAILER)
        this.currentItem.youtube.getIframe().setAttribute('style', "position: absolute; inset: 0; z-index:1; width: 100%; height: 100%;opacity: 1;");
        this.currentItem.btnUI.level_5.innerText = translate("Stop");

        // setTimeout(() => {
        //     this.currentItem.youtube.getIframe().setAttribute(
        //         'style',
        //         this.currentItem.youtube.getIframe().getAttribute('style')
        //             .replace(
        //                 ON_START_ANIMATION_ENDED_TRAILER_1,
        //                 ON_START_ANIMATION_ENDED_TRAILER_2
        //             )
        //     );
        // }, 400);
    }

    protected onEndTrailer = (): void => {
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

    protected fixMissingBtn(): void {
        if (!this.currentItem?.addedBtn) {
            return;
        }

        const btnElementAtDom = document.querySelector(`.${MY_CUSTOM_CLASS_NAME}`);
        if (!btnElementAtDom) {
            this.currentItem.addedBtn = false;
        }
    }

    public dispose(): void {
        this.initialized = false;
        super.dispose();
    }
}

export default () => HeroHomePage.Instance;