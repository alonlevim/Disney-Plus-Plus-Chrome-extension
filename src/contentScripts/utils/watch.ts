import BigCard from "../pages/home/bigCard";
import MoviesAndShowsInstance from "../pages/moviesAndShows/moviesAndShows";
import Router from "../router";

class Watch {
    private static _instance: Watch;
    private static router = Router();
    private static bigCard = BigCard();
    private static moviesAndShowsInstance = MoviesAndShowsInstance();

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
        Watch.bigCard.update();
        Watch.moviesAndShowsInstance.update();
    }
}

export default () => Watch.Instance