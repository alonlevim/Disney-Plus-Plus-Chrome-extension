import { sendError } from "./handleError";

let _version = "";

const getVersion = async(): Promise<string> => {
    // when not in the cache.
    if(!_version) {
        try {
            await chrome.management.getSelf()
                .then((data) => {
                    if( data?.version ) {
                        _version = data.version;
                    }
                })
                .catch((error: Error) => {
                    if( typeof error?.stack === "string" ) {
                        sendError({ error: error.stack });
                    }
                });
        } catch (error) {
            sendError({ error });
        }
    }

    return _version;
};

export default getVersion;