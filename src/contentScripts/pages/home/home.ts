import log from "../../utils/log";
import { Page } from "../page.interface";
import BigCard from "./bigCard";

class Home implements Page {
    private bigCard = BigCard();

    init = (): void => {
        log('home init');
        this.bigCard.init();
    }

    dispose = (): void => {
        this.bigCard.dispose();
    }

}

export default Home;