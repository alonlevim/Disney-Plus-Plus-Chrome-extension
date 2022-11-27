import { TrailerInterface } from "../trailers/trailers.interface";
import {
    ASKING_FOR_COUNTRY_AND_LANGUAGE,
    RESPONSE_ABOUT_TRAILER_TO_CLIENT
} from "./actions";
import { LanguagesAndCountry } from "./server.interface";
import { TrailerResponseFromServer } from "./TrailerResponseFromServer.interface";

export const sendToClientTrailer = (tabId: number, res: TrailerResponseFromServer | TrailerInterface) => {
    chrome.tabs.sendMessage(tabId, { message: RESPONSE_ABOUT_TRAILER_TO_CLIENT, res });
};

export const askingForCountryAndLanguage = async (tabId: number):
    Promise<LanguagesAndCountry> => (
    new Promise((resolve) => {
        chrome.tabs.sendMessage(
            tabId,
            { message: ASKING_FOR_COUNTRY_AND_LANGUAGE },
            resolve
        );
    })
);