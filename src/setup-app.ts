import express, { Express} from "express";
import {HttpStatus} from "./ts-types/h01.Resolution";
import {videosRouter} from "./routers/videos.router";
import {testingRouter} from "./routers/testing.router";

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get("/", (req, res) => {
        res.status(HttpStatus.Ok).send("It is my first backend program!");
    });

    // Подключаем роутеры
    app.use("//hometask_01/api/videos", videosRouter);
    app.use("hometask_01/api/testing", testingRouter);

    return app;
};