import { Request, Response, Router } from 'express';
import {videosDB} from "../db/videos.db";
import {HttpStatus} from "../ts-types/h01.Resolution";

export const testingRouter = Router({});

//DELETE testing         (checked in postman)
testingRouter
    .delete('/hometask_01/api/testing/all-data', (req: Request, res: Response) => {
    videosDB.videos = [];
    res.sendStatus(HttpStatus.NoContent)
});