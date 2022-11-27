import {
    ASKING_FOR_TRAILER_FROM_CLIENT,
    GET_INIT
} from "./actions";
import { sendError } from "../handleError";
import { askingForTrailer } from "./server";
import clientInit from "../init/clientInit";

export class GetFromClient {
    private static _instance: GetFromClient;

    private constructor() {
        chrome.runtime.onMessage.addListener(async (
            message: any,
            sender: chrome.runtime.MessageSender
        ) => {
            try {
                switch (message?.message) {
                    case ASKING_FOR_TRAILER_FROM_CLIENT:
                        askingForTrailer(
                            {
                                title: message.title,
                                lang: message?.lang,
                                itemId: message.itemId
                            },
                            sender.tab.id,
                        );
                        break;
                    case GET_INIT:
                        clientInit(sender.tab.id);
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