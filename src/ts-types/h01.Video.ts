export enum videoResolutions {
    P144="P144",
    P240="P240",
    P360 ="P360",
    P480 ="P480",
    P720= "P720",
    P1080 ="P1080",
    P1440 ="P1440",
    P2160 ="P2160"
}
export type Video = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean | false,
    minAgeRestriction: number | null,
    createdAt: Date,
    publicationDate: Date, //default +1
    availableResolutions: videoResolutions[]
}
export function createVideo(
    id: number,
    title: string,
    author: string,
    availableResolutions: videoResolutions[],
    canBeDownloaded: boolean = false,
    minAgeRestriction: number | null = null,
    createdAt: Date = new Date(),
    publicationDate: Date = new Date(new Date().setDate(new Date().getDate() + 1))
): Video {
    return {
        id,
        title,
        author,
        canBeDownloaded,
        minAgeRestriction,
        createdAt,
        publicationDate,
        availableResolutions
    };
}
