import { RESPONSE_ABOUT_TRAILER_TO_CLIENT } from "./actions";
import { TrailerResponseFromServer } from "./TrailerResponseFromServer.interface";

export const sendToClientTrailer = (tabId :number, res: TrailerResponseFromServer) => {
    chrome.tabs.sendMessage(tabId, { message: RESPONSE_ABOUT_TRAILER_TO_CLIENT, res });
};