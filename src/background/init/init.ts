import rules, { Rules } from '../rules';
import getFromClient, { GetFromClient } from "../networks/getFromClient";
import trailers, { Trailers } from "../trailers/trailers";
import getVersion from '../getVersion';
import { FIRST_INSTALL_DATE, FIRST_INSTALL_VERSION } from '../../storage.constant';

class Init {
    private static _instance: Init;
    private trailers: Trailers;
    private getFromClient: GetFromClient;
    private rules: Rules;

    private constructor() {
        this.init();
    }

    public static get Instance(): Init {
        return this._instance || (this._instance = new this());
    }

    private init(): void {
        this.getFromClient = getFromClient();
        this.trailers = trailers();
        this.rules = rules();

        this.setInstallDate();
    }

    private setInstallDate(): void {
        chrome.storage.sync.get([FIRST_INSTALL_DATE, FIRST_INSTALL_VERSION])
            .then((data) => {
                if (!data?.[FIRST_INSTALL_DATE]) {
                    chrome.storage.sync.set({ [FIRST_INSTALL_DATE]: (new Date()).toString() })
                }
                if (!data?.[FIRST_INSTALL_VERSION]) {
                    getVersion().then((version) => {
                        if (!version) {
                            return
                        }
                        chrome.storage.sync.set({ [FIRST_INSTALL_VERSION]: version })
                    });
                }
            });
    }
}

export default () => Init.Instance;