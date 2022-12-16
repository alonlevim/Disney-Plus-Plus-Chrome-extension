import {
    TRAILER_ON_THE_BIG_CARD,
    TRAILERS_ON_THE_HERO_HOMEPAGE,
    TRAILER_ON_THE_HERO_MOVIE_AND_SHOW_PAGE,
    FULLSCREEN_MOVIE_AND_SHOW
} from "../storage.constant";
import ActionsRules from "../actionsRules.interface";
import getFromClient from "./networks/getFromClient";
import { sendRulesToClient } from "./networks/toClient";

export class Rules {
    private static _instance: Rules;

    private constructor() {
        chrome.storage.onChanged.addListener(this.updateClient);
    }

    public static get Instance(): Rules {
        return this._instance || (this._instance = new this());
    }

    public getRules = async (): Promise<ActionsRules> => (
        new Promise((resolve, reject) => {
            chrome.storage.sync.get([
                TRAILER_ON_THE_BIG_CARD,
                TRAILERS_ON_THE_HERO_HOMEPAGE,
                TRAILER_ON_THE_HERO_MOVIE_AND_SHOW_PAGE,
                FULLSCREEN_MOVIE_AND_SHOW
            ])
                .then((data: any) => {
                    const obj = {
                        [TRAILER_ON_THE_BIG_CARD]: data[TRAILER_ON_THE_BIG_CARD] ?? true,
                        [TRAILERS_ON_THE_HERO_HOMEPAGE]: data[TRAILERS_ON_THE_HERO_HOMEPAGE] ?? true,
                        [TRAILER_ON_THE_HERO_MOVIE_AND_SHOW_PAGE]: data[TRAILER_ON_THE_HERO_MOVIE_AND_SHOW_PAGE] ?? true,
                        [FULLSCREEN_MOVIE_AND_SHOW]: data[FULLSCREEN_MOVIE_AND_SHOW] ?? true,
                    };

                    return resolve(obj);
                })
                .catch(reject);
        })
    );

    private updateClient = () => {
        const tabId = getFromClient().getLastTabId();

        if( !tabId ) {
            return;
        }
        
        this.getRules()
            .then((rules) => {
                sendRulesToClient(tabId, rules);
            });
    }
}

export default () => Rules.Instance;