import MoviesAndShows from "./pages/moviesAndShows/moviesAndShows";
import Home from "./pages/home/home";
import { Page } from "./pages/page.interface";
import { HOME, MOVIES, ON_BOARDING, ON_BOARDING_PROFILE, SHOWS } from "./pages/pagesConstants";
import getPageAndCountry from "./utils/getPageAndCountry";

export class Router {
    private static _instance: Router;
    private currentUrl = "null";

    // Pages
    private moviesAndShows: MoviesAndShows;
    private home: Home;
    private pages: Page[];

    private constructor() {
        // init pages
        this.moviesAndShows = new MoviesAndShows();
        this.home = new Home();

        this.pages = [
            this.moviesAndShows,
            this.home
        ];

        // update router
        this.update();
    }

    public static get Instance(): Router {
        return this._instance || (this._instance = new this());
    }

    public handleChangePage = (): void => {
        const url = window.location.href;

        if (url !== this.currentUrl) {
            this.currentUrl = url;
            this.update();
        }
    };

    private update(): void {
        const pageAndCountry = getPageAndCountry();

        // Dispose
        this.disposePages();

        switch (pageAndCountry.page) {
            case HOME:
                this.home.init();
                break;
            case ON_BOARDING:
            case ON_BOARDING_PROFILE:
                break;
            case MOVIES:
            case SHOWS:
                this.moviesAndShows.init();
                break;
        }
    }

    private disposePages(): void {
        this.pages.forEach(
            (page) => page.dispose()
        );
    }
}

export default () => Router.Instance;