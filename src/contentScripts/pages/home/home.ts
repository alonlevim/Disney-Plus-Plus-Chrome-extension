import log from "../../utils/log";
import { Page } from "../page.interface";
import BigCard from "./bigCard";
import HeroHomePage from "./promotionHeader/heroHomePage";

export class Home implements Page {
    private static _instance: Home;

    private bigCard = BigCard();
    private heroHomePage = HeroHomePage();

    public static get Instance(): Home {
        return this._instance || (this._instance = new this());
    }

    init = (): void => {
        log('init home');
        this.bigCard.init();
        this.heroHomePage.init();
    }

    update = (): void => {
        this.bigCard.update();
        this.heroHomePage.update();
    }

    dispose = (): void => {
        log('dispose home');
        this.bigCard.dispose();
        this.heroHomePage.dispose();
    }

}

export default () => Home.Instance;