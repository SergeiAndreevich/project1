import {videoResolutions} from "./h01.Video";
export type UpdateVideoInputModel = {

    title: string,
    author: string,
    availableResolutions: videoResolutions[],
    canBeDownloaded: boolean,
    minAgeRestriction: number,
    publicationDate: Date
}
