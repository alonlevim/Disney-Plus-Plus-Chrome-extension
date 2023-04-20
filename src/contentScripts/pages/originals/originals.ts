import { TRAILER_ON_THE_BIG_CARD, TRAILER_ON_THE_HERO_MOVIE_AND_SHOW_PAGE } from "../../../storage.constant";
import rules from "../../rules";
import { catchError } from "../../utils/handleError";
import log from "../../utils/log";
import { Page } from "../page.interface";
import BigCard from "../home/bigCard";
import heroMoviesAndShows from "../moviesAndShows/hero/heroMoviesAndShows";

export class Originals implements Page {
    private static _instance: Originals;
    private hero = heroMoviesAndShows();
    private rules = rules();
    private bigCard = BigCard();

    public static get Instance(): Originals {
        return this._instance || (this._instance = new this());
    }

    public init = (): void => {
        log('init Originals');
        this.hero.init();
        this.bigCard.init();
    }

    public update = () => {
        try {
            if( this.rules.isTheRuleValid(TRAILER_ON_THE_BIG_CARD) ) {
                this.bigCard.update();
            }
        } catch (error) {
            catchError(error);
        }

        // Hero
        try {
            if (this.rules.isTheRuleValid(TRAILER_ON_THE_HERO_MOVIE_AND_SHOW_PAGE)) {
                this.hero.update();
            }
        } catch (error) {
            catchError(error);
        }
    };

    public dispose = (): void => {
        log('dispose Originals');
        this.hero.dispose();
    }
}

export default () => Originals.Instance;