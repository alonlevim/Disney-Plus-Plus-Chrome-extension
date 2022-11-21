class Youtube {
    iframe: HTMLIFrameElement;
    youtubeId: string;

    constructor(youtubeId: string) {
        this.youtubeId = youtubeId;
        
        this.iframe = document.createElement("iframe");
        this.iframe.setAttribute("type", "text/html");
        this.iframe.setAttribute("width", "100%");
        this.iframe.setAttribute("height", "100%");
        this.iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
        this.iframe.setAttribute("frameborder", "0");
        this.iframe.setAttribute("src", "https://www.youtube.com/embed/" + youtubeId + "?autoplay=1&mute=0&enablejsapi=1&controls=0&ref=0");

        return this;
    }
}

export default Youtube;