import { TRAILERS_ON_THE_HERO_HOMEPAGE, TRAILER_ON_THE_BIG_CARD } from "../../../storage.constant";
import rules from "../../rules";
import log from "../../utils/log";
import { Page } from "../page.interface";
import BigCard from "./bigCard";
import HeroHomePage from "./promotionHeader/heroHomePage";

export class Home implements Page {
    private static _instance: Home;

    private bigCard = BigCard();
    private heroHomePage = HeroHomePage();
    private rules = rules();

    public static get Instance(): Home {
        return this._instance || (this._instance = new this());
    }

    init = (): void => {
        log('init home');
        this.bigCard.init();
        this.heroHomePage.init();
    }

    update = (): void => {
        if( this.rules.isTheRuleValid(TRAILER_ON_THE_BIG_CARD) ) {
            this.bigCard.update();
        }

        if( this.rules.isTheRuleValid(TRAILERS_ON_THE_HERO_HOMEPAGE) ) {
            this.heroHomePage.update();
        }
    }

    dispose = (): void => {
        log('dispose home');
        this.bigCard.dispose();
        this.heroHomePage.dispose();
    }

}

export default () => Home.Instance;