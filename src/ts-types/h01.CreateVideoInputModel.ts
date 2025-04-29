import {videoResolutions} from "./h01.Video";

export type CreateVideoInputModel = {
    title: string,
    author: string,
    availableResolutions: videoResolutions[]
}
