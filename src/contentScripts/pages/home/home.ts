import log from "../../utils/log";
import { Page } from "../page.interface";
import BigCard from "./bigCard";
import PromotionHeader from "./promotionHeader/promotionHeader";

class Home implements Page {
    private bigCard = BigCard();
    private promotionHeader = PromotionHeader();

    init = (): void => {
        log('init home');
        this.bigCard.init();
        this.promotionHeader.init();
    }

    dispose = (): void => {
        log('dispose home');
        this.bigCard.dispose();
        this.promotionHeader.dispose();
    }

}

export default Home;