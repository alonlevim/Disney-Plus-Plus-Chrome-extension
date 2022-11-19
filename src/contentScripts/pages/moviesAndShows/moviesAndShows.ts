import getPageAndCountry from "../../utils/getPageAndCountry";
import { catchError } from "../../utils/handleError";
import log from "../../utils/log";
import { Page } from "../page.interface";
import { MOVIES, SHOWS } from "../pagesConstants";

const PATH_DOUBLE_CLICK = "#__next > div:nth-child(3) > div > div:nth-child(1) > div:nth-child(1) > div";

class MoviesAndShows implements Page {
    private setupDoubleClickListener = false;

    public init = (): void => {
        log('init MoviesAndShows');
    }

    public onLoadMoviesOrShowsUIWatch = () => {
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
            ) {
                this.setupDoubleClickListener = true;
                this.enableDoubleClickOnMovieOrShowsScreen();
            }
        } catch (error) {
            catchError(error);
        }
    };

    private handleDoubleClickInMoviesOrShows(): void {
        try {
            // TODO: Check why not working
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

export default MoviesAndShows;