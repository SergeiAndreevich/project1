import {videoResolutions} from "./Video";

export type Video_Test_dto = {
    "title": string,
    "author": string,
    "canBeDownloaded"?: boolean | false,
    "minAgeRestriction"?: number | null,
    "availableResolutions": videoResolutions[]
}
