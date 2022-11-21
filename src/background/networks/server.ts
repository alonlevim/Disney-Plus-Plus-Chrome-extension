import getVersion from "../getVersion";
import { ASKING_FOR_TRAILER_TO_SERVER } from "./actions";
import { sendToClientTrailer } from "./toClient";
import { TrailerResponseFromServer } from "./TrailerResponseFromServer.interface";

const { SERVER_URL } = process.env;

export const sendRequestToServer = async (
    action: string,
    data: any,
    cb?: (res: TrailerResponseFromServer) => void
): Promise<void> => {
    data.version = await getVersion();

    fetch(SERVER_URL + action, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then((res) => {
            if (typeof cb === "function") {
                cb({
                    title: res.title,
                    youtubeId: res.youtubeId,
                    status: 'successed'
                });
            }
        })
        .catch((err) => {
            console.error(err);
            cb({
                title: data.title,
                status: 'failed'
            });
        });
};

export const askingForTrailer = (
    title: string,
    tabId: number
) => {
    sendRequestToServer(
        ASKING_FOR_TRAILER_TO_SERVER,
        { title: title },
        (res: TrailerResponseFromServer) => sendToClientTrailer(tabId, res)
    );
};