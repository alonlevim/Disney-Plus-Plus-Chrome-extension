import { RESPONSE_ON_REPORT, SEND_REPORT } from "../server.constant";
let request: ReportNetwork | null;

class ReportNetwork {
    resolve: (value?: unknown) => void;
    reject: () => void;

    public constructor(resolve: (value?: unknown) => void, reject: () => void) {
        this.resolve = resolve;
        this.reject = reject;
    }
}

chrome?.runtime?.onMessage?.addListener((message: any) => {
    switch (message?.message) {
        case RESPONSE_ON_REPORT:
            if(request) {
                if( message.status ) {
                    request.resolve();
                } else {
                    request.reject();
                }
            }
            request = null;
            break;
    }
});

const sendToServer = (data: any) =>
    new Promise((resolve, reject) => {
        // old request
        if( request ) {
            request.reject();
        }

        // new request
        request = new ReportNetwork(resolve, reject);

        chrome?.runtime?.sendMessage({
            message: SEND_REPORT,
            data
        });
    });

export default sendToServer;