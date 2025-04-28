import request from "supertest";
import express from "express";
import {setupApp} from "../../src/setup-app";
import {HttpStatus} from "../../src/ts-types/htttp_statuses";
import {Video_Test_dto} from "../../src/ts-types/Video_Test_dto";
import {videoResolutions} from "../../src/ts-types/Video";

describe('Driver API', () => {
    //стартуем приложение для тестов (не влияет на скрипт watch и dev)
    const app = express();
    setupApp(app);
    //создаем тестовый объект
    const testVideo: Video_Test_dto = {
        title: 'Test title',
        author: 'Test author',
        canBeDownloaded: true,
        minAgeRestriction: 18,
        availableResolutions: []
    };
    //перед запуском каждой функции теста очищаем данные в ноль
    beforeAll(async () => {
        await request(app).delete('/hometask_01/api/testing/all-data').expect(HttpStatus.NoContent);
    });
    //testing
    it('should create video; POST new videos', async () => {
        const newVideo: Video_Test_dto = {
            ...testVideo,
            title: 'Samurai',
            author: 'Ivan',
            availableResolutions: [videoResolutions.P144,videoResolutions.P240]
        };

        await request(app)
            .post('/hometask_01/api/videos')
            .send(newVideo)
            .expect(HttpStatus.Created);
    });
});


