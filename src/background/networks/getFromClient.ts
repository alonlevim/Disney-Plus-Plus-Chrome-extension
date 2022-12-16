import {
    ASKING_FOR_TRAILER_FROM_CLIENT,
    GET_INIT,
    RESPONSE_ON_REPORT_TO_OPTIONS,
    SEND_REPORT_FROM_OPTIONS
} from "./actions";
import { sendError } from "../handleError";
import { askingForTrailer, sendReportToServer } from "./server";
import clientInit from "../init/clientInit";

export class GetFromClient {
    private static _instance: GetFromClient;
    private lastTabId: number;

    private constructor() {
        chrome.runtime.onMessage.addListener(async (
            message: any,
            sender: chrome.runtime.MessageSender
        ) => {
            try {
                this.lastTabId = sender.tab.id;

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
                    case SEND_REPORT_FROM_OPTIONS:
                        // eslint-disable-next-line no-case-declarations
                        let succeeded = false;

                        sendReportToServer(message.data)
                            .then(() => succeeded = true)
                            .catch(() => succeeded = false)
                            .finally(() => {
                                chrome.runtime.sendMessage({
                                    message: RESPONSE_ON_REPORT_TO_OPTIONS,
                                    status: succeeded
                                });
                            });
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

    public getLastTabId = (): number => this.lastTabId;

}

export default () => GetFromClient.Instance;