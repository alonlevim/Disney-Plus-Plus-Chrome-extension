import { FULLSCREEN_MOVIE_AND_SHOW, TRAILER_ON_THE_HERO_MOVIE_AND_SHOW_PAGE } from "../../../storage.constant";
import rules from "../../rules";
import getPageAndCountry from "../../utils/getPageAndCountry";
import { catchError } from "../../utils/handleError";
import log from "../../utils/log";
import { Page } from "../page.interface";
import { MOVIES, SHOWS } from "../pagesConstants";
import HeroMoviesAndShows from "./hero/heroMoviesAndShows";

const PATH_DOUBLE_CLICK = "#__next > div:nth-child(3) > div > div:nth-child(1) > div:nth-child(1) > div";

export class MoviesAndShows implements Page {
    private static _instance: MoviesAndShows;
    private setupDoubleClickListener = false;
    private hero = HeroMoviesAndShows();
    private rules = rules();

    public static get Instance(): MoviesAndShows {
        return this._instance || (this._instance = new this());
    }

    public init = (): void => {
        log('init MoviesAndShows');
        this.hero.init();
    }

    public update = () => {
        try {
            const pageAndCountry = getPageAndCountry();

            if (
                (pageAndCountry.page === MOVIES || pageAndCountry.page === SHOWS)
                &&
                pageAndCountry.watching
                &&
                !this.setupDoubleClickListener
                &&
                document.querySelector(PATH_DOUBLE_CLICK)
                &&
                this.rules.isTheRuleValid(FULLSCREEN_MOVIE_AND_SHOW)
            ) {
                this.setupDoubleClickListener = true;
                this.enableDoubleClickOnMovieOrShowsScreen();
            }
            // when disable fullscreen by option page.
            else if (
                (pageAndCountry.page === MOVIES || pageAndCountry.page === SHOWS)
                &&
                pageAndCountry.watching
                &&
                this.setupDoubleClickListener
                &&
                !this.rules.isTheRuleValid(FULLSCREEN_MOVIE_AND_SHOW)
            ) {
                this.setupDoubleClickListener = false;
                this.disableDoubleClickOnMoviesOrShowsScreen();
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

    private handleDoubleClickInMoviesOrShows(): void {
        try {
            (document.querySelector(".pr-0") as HTMLDivElement)?.click();
        } catch (error) {
            catchError(error);
        }
    }

    private enableDoubleClickOnMovieOrShowsScreen = () => {
        setTimeout(() => {
            try {
                const screen = document.querySelector(PATH_DOUBLE_CLICK);
                if (screen) {
                    screen.addEventListener('dblclick', this.handleDoubleClickInMoviesOrShows);
                }
            } catch (error) {
                catchError(error);
            }
        }, 1000);
    };

    private disableDoubleClickOnMoviesOrShowsScreen(): void {
        try {
            const screen = document.querySelector(PATH_DOUBLE_CLICK);
            if (screen) {
                screen.removeEventListener('dblclick', this.handleDoubleClickInMoviesOrShows);
            }
        } catch (error) {
            catchError(error);
        }
    }

    public dispose = (): void => {
        log('dispose MoviesAndShows');
        this.hero.dispose();

        try {
            if (this.setupDoubleClickListener) {
                this.disableDoubleClickOnMoviesOrShowsScreen();
                this.setupDoubleClickListener = false;
            }
        } catch (error) {
            catchError(error);
        }
    }
}

export default () => MoviesAndShows.Instance;