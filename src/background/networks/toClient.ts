import { RESPONSE_ABOUT_TRAILER_TO_CLIENT } from "./actions";

export const sendToClientTrailer = (tabId :number, res: any) => {
    chrome.tabs.sendMessage(tabId, { message: RESPONSE_ABOUT_TRAILER_TO_CLIENT, res });
};