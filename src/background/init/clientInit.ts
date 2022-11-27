import { getTrailersFromServer } from "../networks/server";
import { askingForCountryAndLanguage } from "../networks/toClient";
import trailers from "../trailers/trailers";
import { TrailersInterface } from "../trailers/trailers.interface";

const clientInit = (tabId: number): void => {
    if (tabId && trailers().isEmptyList()) {
        askingForCountryAndLanguage(tabId)
            .then((languagesAndCountry) => getTrailersFromServer(languagesAndCountry))
            .then(updateTrailers)
            .catch(console.error);
    }
}

const updateTrailers = (newList: TrailersInterface): void => {
    trailers().insertList(newList);
};

export default clientInit;