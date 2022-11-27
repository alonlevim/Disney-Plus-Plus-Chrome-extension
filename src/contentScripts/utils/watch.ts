import Home from "../pages/home/home";
import MoviesAndShowsInstance from "../pages/moviesAndShows/moviesAndShows";
import Router from "../router";

class Watch {
    private static _instance: Watch;
    private static router = Router();
    private static moviesAndShowsInstance = MoviesAndShowsInstance();
    private static homeInstance = Home();

    private constructor() {
        const observer = new MutationObserver(this.listener);

        observer.observe(document, {
            subtree: true,
            childList: true
        })
    }

    public static get Instance(): Watch {
        return this._instance || (this._instance = new this());
    }

    private listener() {
        Watch.router.handleChangePage();
        Watch.homeInstance.update();
        Watch.moviesAndShowsInstance.update();
    }
}

export default () => Watch.Instance