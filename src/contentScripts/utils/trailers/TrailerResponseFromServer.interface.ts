export interface TrailerResponseFromServer {
    title: string;
    youtubeId?: string;
    status: 'successed' | 'failed'
}