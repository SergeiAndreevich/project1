import {Video} from "../ts-types/h01.Video";
export const videosDB ={
    videos:<Video[]>[
        {
            id: 0,
            title: "string",
            author: "string",
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: new Date(),
            publicationDate: new Date(),
            availableResolutions: [
                "P144"
            ]
        }
    ]
}