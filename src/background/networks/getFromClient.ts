import { ASKING_FOR_TRAILER_FROM_CLIENT } from "./actions";
import { sendError } from "../handleError";
import { askingForTrailer } from "./server";

class GetFromClient {
    private static _instance: GetFromClient;

    private constructor() {
        chrome.runtime.onMessage.addListener(async (
            message: any,
            sender: chrome.runtime.MessageSender
        ) => {
            try {
                switch (message?.message) {
                    case ASKING_FOR_TRAILER_FROM_CLIENT:
                        askingForTrailer(message.title, sender.tab.id);
                        break;
                }
            } catch (error) {
                sendError(error);
            }
        })
    }

    public static get Instance(): GetFromClient {
        return this._instance || (this._instance = new this());
    }
}

export default () => GetFromClient.Instance;