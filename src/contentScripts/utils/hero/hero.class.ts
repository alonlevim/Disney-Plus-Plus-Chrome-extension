import trailers from "../../utils/trailers/trailers";
import translate from "../../translation/trailer.translation";
import { HeroInterface, HeroItem } from "../hero/hero.interface";
import Youtube from "../youtube/youtube";

abstract class HeroClass implements HeroInterface {
    protected trailers = trailers();
    protected canWatch = false;
    protected currentItem: HeroItem;
    protected fixedMissingBtn = false;

    public init(): void {
        this.canWatch = true;
        this.currentItem = undefined;
        this.fixedMissingBtn = false;
    }

    public abstract update(): void;

    protected abstract getTitle(): string;

    protected abstract getItemId(): string;

    protected handleTitle(title: string, target: string): void {
        if (typeof this.currentItem === "undefined") {
            // new title
            this.currentItem = {
                title,
                addedBtn: false,
                loading: true,
                btnUI: {},
                watching: false,
            };

            const itemId = this.getItemId();

            // get video
            this.trailers.askForTrailer(title, target, itemId)
                .then((youtube: Youtube) => {
                    this.currentItem.youtube = youtube;
                    this.currentItem.loading = false;
                    this.updateBtnUiFromLoadingToAllowToShowTrailer(this.currentItem);
                });
        }

        // show btn
        if (!this.currentItem.addedBtn) {
            this.addBtn(this.currentItem);
        }
    }

    protected abstract addBtn(item: HeroItem): void;

    protected updateBtnUiFromLoadingToAllowToShowTrailer(item: HeroItem): void {
        if (item.btnUI.level_5) {
            this.changeTextOnButton(item, item.btnUI.level_5);
        }
    }

    protected changeTextOnButton(item: HeroItem, level_5_span: HTMLSpanElement): HTMLSpanElement {
        if (item.loading) {
            level_5_span.className = "loaderT";
        } else {
            level_5_span.innerText = translate("Trailer");
            level_5_span.className = "ON_IMAGE BUTTON2_SEMIBOLD";
            level_5_span.setAttribute('style', 'font-family: var(--FONT-FAMILY);');
        }

        return level_5_span;
    }

    protected abstract onClickTrailer(ev: MouseEvent): void;

    protected abstract onEnterTrailer(): void;

    protected abstract onEndTrailer(): void;

    protected abstract fixMissingBtn(): void;

    public dispose(): void {
        this.canWatch = false;
    }
}

export default HeroClass;