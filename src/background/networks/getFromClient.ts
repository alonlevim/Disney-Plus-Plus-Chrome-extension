import {
    ASKING_FOR_LOGO_URL,
    ASKING_FOR_TRAILER_FROM_CLIENT,
    GET_INIT,
    RESPONSE_ON_LOGO_URL,
    RESPONSE_ON_REPORT_TO_OPTIONS,
    SEND_REPORT_FROM_OPTIONS
} from "./actions";
import { sendError } from "../handleError";
import { askingForTrailer, sendReportToServer } from "./server";
import clientInit from "../init/clientInit";
import getVersion from "../getVersion";

const { SERVER_URL } = process.env;

export class GetFromClient {
    private static _instance: GetFromClient;
    private lastTabId: number;

    private constructor() {
        chrome.runtime.onMessage.addListener(async (
            message: any,
            sender: chrome.runtime.MessageSender
        ) => {
            try {
                if (sender?.tab?.id) {
                    this.lastTabId = sender.tab.id;
                }

                switch (message?.message) {
                    case ASKING_FOR_TRAILER_FROM_CLIENT:
                        askingForTrailer(
                            {
                                title: message.title,
                                lang: message?.lang,
                                itemId: message.itemId,
                                target: message.target,
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
                    case ASKING_FOR_LOGO_URL:
                        getVersion()
                            .then(
                                (version) => {
                                    chrome.runtime.sendMessage({
                                        message: RESPONSE_ON_LOGO_URL,
                                        url: `${SERVER_URL}logo.png?version=${version}`
                                    });
                                })
                        break;
                }
            } catch (error) {
                console.error(error);
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