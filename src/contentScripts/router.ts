import MoviesAndShowsInstance, { MoviesAndShows } from "./pages/moviesAndShows/moviesAndShows";
import HomeInstance, { Home } from "./pages/home/home";
import StudioInstance, { Studio } from "./pages/studio/studio";
import OriginalsInstance, { Originals } from "./pages/originals/originals";
import { Page } from "./pages/page.interface";
import {
    HOME,
    MOVIES,
    ON_BOARDING,
    ON_BOARDING_PROFILE,
    ORIGINALS,
    SHOWS,
    STUDIO,
    STUDIO_DISNEY,
    STUDIO_MARVEL,
    STUDIO_NAT_GEO,
    STUDIO_PIXAR,
    STUDIO_STAR,
    STUDIO_STAR_WARS
} from "./pages/pagesConstants";
import getPageAndCountry from "./utils/getPageAndCountry";
import trailersInstance, { Trailers } from "./utils/trailers/trailers";

export class Router {
    private static _instance: Router;
    private currentUrl = "null";

    // Pages
    private moviesAndShows: MoviesAndShows;
    private home: Home;
    private studio: Studio;
    private pages: Page[];
    private trailers: Trailers;
    private originals: Originals;

    private constructor() {
        // init pages
        this.moviesAndShows = MoviesAndShowsInstance();
        this.home = HomeInstance();
        this.trailers = trailersInstance();
        this.studio = StudioInstance();
        this.originals = OriginalsInstance();

        this.pages = [
            this.moviesAndShows,
            this.home,
            this.studio,
            this.originals
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
            this.trailers.getPlayingNow()?.destroyIframe();
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
            case ORIGINALS:
                this.originals.init();
                break;
            case STUDIO:
                if ([STUDIO_PIXAR,
                    STUDIO_DISNEY,
                    STUDIO_MARVEL,
                    STUDIO_STAR_WARS,
                    STUDIO_NAT_GEO,
                    STUDIO_STAR].includes(pageAndCountry.studio)) {
                    this.studio.init();
                }
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