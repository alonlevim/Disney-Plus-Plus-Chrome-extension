import { TRAILER_ON_THE_BIG_CARD } from "../../../storage.constant";
import rules from "../../rules";
import log from "../../utils/log";
import { Page } from "../page.interface";
import BigCard from "../home/bigCard";

export class Studio implements Page {
    private static _instance: Studio;

    private bigCard = BigCard();
    private rules = rules();

    public static get Instance(): Studio {
        return this._instance || (this._instance = new this());
    }

    init = (): void => {
        log('init studio');
        this.bigCard.init();
    }

    update = (): void => {
        if( this.rules.isTheRuleValid(TRAILER_ON_THE_BIG_CARD) ) {
            this.bigCard.update();
        }
    }

    dispose = (): void => {
        log('dispose studio');
        this.bigCard.dispose();
    }

}

export default () => Studio.Instance;