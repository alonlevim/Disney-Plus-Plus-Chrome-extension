import { VIDEO_SERVER_STATUS } from "./cache";

export interface VideosCache {
    [title: string]: {
        videoId?: string;
        status: VIDEO_SERVER_STATUS
    }
}