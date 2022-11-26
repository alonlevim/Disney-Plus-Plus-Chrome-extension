import log from "../../utils/log";
import { Page } from "../page.interface";
import BigCard from "./bigCard";
import PromotionHeader from "./promotionHeader/promotionHeader";

class Home implements Page {
    private bigCard = BigCard();
    private promotionHeader = PromotionHeader();

    init = (): void => {
        log('home init');
        this.bigCard.init();
        this.promotionHeader.init();
    }

    dispose = (): void => {
        this.bigCard.dispose();
        this.promotionHeader.dispose();
    }

}

export default Home;