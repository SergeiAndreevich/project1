import express, { Express, Request, Response } from "express";
import { videosDB } from './db/videos.db';
import {Video} from "./ts-types/Video";
import {HttpStatus} from "./ts-types/htttp_statuses";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware for parsing JSON in Request body

    // base route
    app.get("/", (req:Request, res:Response) => {
        res.status(200).send("It is my first backend program!");
    });

    //GET all ts-types
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
        !video ?
            res.status(HttpStatus.NotFound).send('Not Found') :
            res.status(HttpStatus.NoContent).send('No content')
    })
    //DELETE testing
    app.delete('/hometask_01/api/testing/all-data', (req: Request, res: Response) => {
        videosDB.videos = [];
        res.sendStatus(HttpStatus.NoContent);
    });


    //POST new video
    app.post("/hometask_01/api/videos",(req:Request,res:Response)=>{
        //1) проверяем приходящие данные на валидность

        //2) создаем newDriver
        const newVideo:Video ={
            id: videosDB.videos.length ? videosDB.videos[videosDB.videos.length - 1].id + 1 : 1,
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: req.body.canBeDownloaded,
            minAgeRestriction: req.body.minAgeRestriction,
            createdAt: new Date(),
            publicationDate: new Date(),
            availableResolutions: req.body.availableResolutions
        }

        //3) добавляем в БД
        videosDB.videos.push(newVideo);
        res.status(HttpStatus.Created).send(newVideo);
    })
    return app;
};