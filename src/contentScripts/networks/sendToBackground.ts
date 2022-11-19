import { catchError } from "../utils/handleError";
import { ASKING_FOR_TRAILER, ERROR } from "./actions";

export const sendError =
    (error: string):
        Promise<void> =>
        chrome.runtime.sendMessage({ message: ERROR, error: error });


export const askingForTrailer = (
    title: string,
    callback: (response: any) => void
): void => {

    try {
        if (title) {
            chrome.runtime.sendMessage({ message: ASKING_FOR_TRAILER, title }, callback);
        }
    } catch (error) {
        catchError(error);
    }

}