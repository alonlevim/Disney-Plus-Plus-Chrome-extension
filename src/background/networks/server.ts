import getVersion from "../getVersion";
import { ASKING_FOR_TRAILER_TO_SERVER } from "./actions";
import { sendToClientTrailer } from "./toClient";

const { SERVER_URL } = process.env;

export const sendRequestToServer = async (
    action: string,
    data: any,
    cb?: (...data: any) => void
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
                cb(res);
            }
        })
        .catch((err) => console.error(err));
};

export const askingForTrailer = (
    title: string,
    tabId: number,
    callback?: (...data: any) => void
) => {
    sendRequestToServer(
        ASKING_FOR_TRAILER_TO_SERVER,
        { title: title },
        (res: any) => sendToClientTrailer(tabId, res)
    );

    if (typeof callback === "function") {
        callback({});
    }
};