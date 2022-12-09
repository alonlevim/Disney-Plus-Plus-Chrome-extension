import { LANGUAGE } from "../../storage.constant";
import { getTrailersFromServer } from "../networks/server";
import { askingForCountryAndLanguage, sendRulesToClient } from "../networks/toClient";
import rules from "../rules";
import trailers from "../trailers/trailers";
import { TrailersInterface } from "../trailers/trailers.interface";

const clientInit = (tabId: number): void => {
    // trailers cache
    if (tabId && trailers().isEmptyList()) {
        askingForCountryAndLanguage(tabId)
            .then((languagesAndCountry) => {
                setLanguage(languagesAndCountry.ui);
                return getTrailersFromServer(languagesAndCountry);
            })
            .then(updateTrailers)
            .catch(console.error);
    }

    // send rules to client
    rules().getRules()
        .then((rules) => {
            sendRulesToClient(tabId, rules);
        });
}

const updateTrailers = (newList: TrailersInterface): void => {
    trailers().insertList(newList);
};

const setLanguage = (language: string) => {
    if (language) {
        const _language = language.length > 2 ? language.substring(0, 2) : language;
        chrome.storage.sync.set({
            [LANGUAGE]: _language
        });
    }
};

export default clientInit;