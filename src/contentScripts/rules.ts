import ActionsRules from "../actionsRules.interface";
import {
    TRAILER_ON_THE_BIG_CARD,
    TRAILERS_ON_THE_HERO_HOMEPAGE,
    TRAILER_ON_THE_HERO_MOVIE_AND_SHOW_PAGE,
    FULLSCREEN_MOVIE_AND_SHOW
} from "../storage.constant";

type RuleCanBe = typeof TRAILER_ON_THE_BIG_CARD |
    typeof TRAILERS_ON_THE_HERO_HOMEPAGE |
    typeof TRAILER_ON_THE_HERO_MOVIE_AND_SHOW_PAGE |
    typeof FULLSCREEN_MOVIE_AND_SHOW;

export class Rules {
    private static _instance: Rules;

    private init: boolean;
    private rules: ActionsRules;
    private callbacks: { (): void; }[];

    private constructor() {
        this.init = false;
        this.callbacks = [];
    }

    public static get Instance(): Rules {
        return this._instance || (this._instance = new this());
    }

    public updateRules = (rules: ActionsRules): void => {
        this.init = true;
        this.rules = rules;

        this.runCallbacks();
    }

    public isTheRuleValid = (rule: RuleCanBe): boolean => {
        if (!this.init || !this.rules || typeof this.rules !== "object") {
            return false;
        }

        return this.rules?.[rule] ?? false;
    }

    public runAfterInit = (callback: () => void) => {
        if (this.init) {
            if( typeof callback === "function" ) {
                callback();
            }
        } else {
            this.callbacks.push(callback);
        }
    }

    public isInit(): boolean {
        return this.init;
    }

    private runCallbacks = (): void => {
        for( const cb of this.callbacks ) {
            if( typeof cb === "function" ) {
                cb();
            }
        }

        this.callbacks = [];
    }
}

export default () => Rules.Instance;