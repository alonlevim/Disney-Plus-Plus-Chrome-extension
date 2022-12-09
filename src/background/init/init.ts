import rules, { Rules } from '../rules';
import getFromClient, { GetFromClient } from "../networks/getFromClient";
import trailers, { Trailers } from "../trailers/trailers";

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
    }
}

export default () => Init.Instance;