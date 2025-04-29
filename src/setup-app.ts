import express, { Express, Request, Response } from "express";
import { videosDB } from './db/videos.db';
import {createVideo, Video} from "./ts-types/h01.Video";
import {HttpStatus} from "./ts-types/h01.Resolution";
import {CreateVideoInputModel} from "./ts-types/h01.CreateVideoInputModel";
import {UpdateVideoInputModel} from "./ts-types/h01.UpdateVideoInputModel";
import {APIErrorResult, ChangeVideoValidation} from "./validation/APIErrorResult";
import {createErrorMessages} from "./utils/error.utils";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware for parsing JSON in Request body

    // base route
    app.get("/", (req:Request, res:Response) => {
        res.status(200).send("It is my first backend program!");
    });

    //GET all videos         (checked in postman)
    app.get("/hometask_01/api/videos",(req:Request,res:Response)=>{
        res.status(HttpStatus.Ok).send(videosDB.videos)
    })
    //GET video by id
    app.get("/hometask_01/api/videos/:id",(req:Request,res:Response)=>{
        const id = parseInt(req.params.id);
        const video = videosDB.videos.find(v => v.id === id);
        if (!video) {
            res.status(HttpStatus.NotFound).send('error')
            return;
        }
        res.status(HttpStatus.Ok).send(videosDB.videos)
    })
    //DELETE video by id
    app.delete("/hometask_01/api/videos/:id", (req:Request, res:Response)=>{
        const id=parseInt(req.params.id);
        const video = videosDB.videos.find(v => v.id === id);
        if (!video) {
            res.status(HttpStatus.NotFound).send('Not Found')
            return;
        }
        res.status(HttpStatus.NoContent).send('No content')
    })
    //DELETE testing         (checked in postman)
    app.delete('/hometask_01/api/testing/all-data', (req: Request, res: Response) => {
        videosDB.videos = [];
        res.sendStatus(HttpStatus.NoContent);
    });
    //POST new video         (checked in postman)
    app.post("/hometask_01/api/videos",(req:Request,res:Response)=>{
        //1) проверяем приходящие данные на валидность
        const errors = APIErrorResult(req.body);
        if (errors.length > 0) {
            res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
            return;
        }
        //2) создаем newVideo
        const newVideo: CreateVideoInputModel = {
            title: req.body.title,
            author: req.body.author,
            availableResolutions: req.body.availableResolutions
        }
        const id = videosDB.videos.length ? videosDB.videos[videosDB.videos.length - 1].id + 1 : 1
        const videoToAdd:Video = createVideo(id, newVideo.title,newVideo.author,newVideo.availableResolutions)

        //3) добавляем в БД
        videosDB.videos.push(videoToAdd);
        res.status(HttpStatus.Created).send(videoToAdd);
    })
    //PUT update existing video         (checked in postman)
    app.put("/hometask_01/api/videos/:id", (req:Request, res: Response)=>{
        const id = parseInt(req.params.id);
        const video = videosDB.videos.find(v=>v.id===id);
        if (!video) {
            res.status(HttpStatus.NotFound).send('Not Found')
            return;
        }
        // проверяем приходящие данные на валидность
        const errors = ChangeVideoValidation(req.body);
        if (errors.length > 0) {
            res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
            return;
        }
        video.title = req.body.title;
        video.author = req.body.author;
        video.availableResolutions = req.body.availableResolutions;
        video.canBeDownloaded = req.body.canBeDownloaded;
        video.minAgeRestriction = req.body.minAgeRestriction;
        video.publicationDate = req.body.publicationDate;
        res.status(HttpStatus.NoContent).send('Content changed')
    })

    return app;
};