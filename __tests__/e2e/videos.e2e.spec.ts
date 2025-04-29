import request from "supertest";
import express from "express";
import {setupApp} from "../../src/setup-app";
import {HttpStatus} from "../../src/ts-types/h01.Resolution";
import {Video, videoResolutions} from "../../src/ts-types/h01.Video";
import {CreateVideoInputModel} from "../../src/ts-types/h01.CreateVideoInputModel";

describe('Videos API', () => {
    //стартуем приложение для тестов (не влияет на скрипт watch и dev)
    const app = express();
    beforeAll(() => {
        setupApp(app);
    });

    // Очищаем базу данных перед каждым тестом
    beforeEach(async () => {
        await request(app)
            .delete('/hometask_01/api/testing/all-data')
            .expect(HttpStatus.NoContent);
    });
    //создаем тестовый объект
    const testVideo: CreateVideoInputModel = {
        title: "test title",
        author: "test author",
        availableResolutions: [videoResolutions.P720]
    }
    //testing
    it('should create video; POST new video', async () => {
        const newVideo: CreateVideoInputModel = {
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
    it('should return list of videos', async  ()=>{
        await request(app)
            .post('/hometask_01/api/videos')
            .send({ ...testVideo, title: 'A new title' })
            .expect(HttpStatus.Created);
        await request(app)
            .post('/hometask_01/api/videos')
            .send({ ...testVideo, title: 'Another title' })
            .expect(HttpStatus.Created);
        await request(app)
            .get('/hometask_01/api/videos')
            .expect(HttpStatus.Ok);
    })
    it('should return video by id', async ()=>{
        const createResponse = await request(app)
            .post('/hometask_01/api/videos')
            .send({ ...testVideo, title: 'Another new title' })
            .expect(HttpStatus.Created);

        const getResponse = await request(app)
            .get(`/hometask_01/api/videos/${createResponse.body.id}`)
            .expect(HttpStatus.Ok);

        expect(getResponse.body[0]).toEqual({
            ...createResponse.body
        });
    })
});


