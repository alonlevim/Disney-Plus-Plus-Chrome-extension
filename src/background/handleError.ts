import { sendRequestToServer } from "./networks/server";

interface SendError {
    file?: string;
    url?: string;
    func?: string;
    error?: string;
}

const sendError = (data: SendError): void => {
    sendRequestToServer(
        "error",
        {
            file: data.file,
            url: data.url,
            func: data.func,
            error: data.error
        }
    );
};

export { sendError }