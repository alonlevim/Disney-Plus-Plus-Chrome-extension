import getVersion from "../getVersion";
import trailers from "../trailers/trailers";
import { TrailersInterface } from "../trailers/trailers.interface";
import {
    ASKING_FOR_TRAILER_FROM_SERVER,
    TRAILERS_FROM_SERVER
} from "./actions";
import { Languages, LanguagesAndCountry } from "./server.interface";
import { sendToClientTrailer } from "./toClient";
import { TrailerResponseFromServer } from "./TrailerResponseFromServer.interface";

const { SERVER_URL } = process.env;

export const sendRequestToServer = async (
    action: string,
    data: any,
    cb?: (res: any) => void
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
        .then(data => {
            if (typeof cb === "function") {
                cb(data);
            }
            else {
                throw new Error('Missing cb in sendRequestToServer.');
            }
        })
        .catch((err) => {
            console.error(err);
            if (typeof cb === "function") {
                cb(null);
            }
        });
};

export const askingForTrailer = (
    data: {
        title: string;
        lang?: Languages,
        itemId?: string;
    },
    tabId: number
) => {
    const trailerFromCache = trailers().getTrailer(data.title);

    if (trailerFromCache) {
        return sendToClientTrailer(tabId, trailerFromCache);
    }

    sendRequestToServer(
        ASKING_FOR_TRAILER_FROM_SERVER,
        {
            title: data.title,
            itemId: data.itemId,
            lang: data?.lang
        },
        (res: any) => {
            const data = (
                res !== null ? {
                    title: res.title,
                    youtubeId: res.youtubeId,
                    status: "successed"
                } : {
                    title: res.title,
                    status: "failed"
                }
            ) as TrailerResponseFromServer;

            // add to cache
            trailers().insertOne(data);

            // back to client
            sendToClientTrailer(tabId, data);
        }
    );
};

export const getTrailersFromServer = async (data: LanguagesAndCountry):
    Promise<TrailersInterface> => {

    return new Promise((resolve) => {
        sendRequestToServer(
            TRAILERS_FROM_SERVER,
            data,
            resolve
        );
    });
}