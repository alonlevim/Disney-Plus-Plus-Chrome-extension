import router from "./router";
import log from "./utils/log";
import watch from "./utils/watch";
import onMessage from './networks/getFromBackground'

const init = (first = true): void => {
    log('init');

    if( first ) {
        router();
        watch();
        onMessage();
    }
};

window.onload = () => init(true);