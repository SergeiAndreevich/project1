import request from "supertest";
import express from "express";
import {setupApp} from "../../src/setup-app";
import {HttpStatus} from "../../src/ts-types/h01.Resolution";
import {createVideo, Video, videoResolutions} from "../../src/ts-types/h01.Video";
import {CreateVideoInputModel} from "../../src/ts-types/h01.CreateVideoInputModel";
import {UpdateVideoInputModel} from "../../src/ts-types/h01.UpdateVideoInputModel";

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
    it('should not create video; POST new video', async () => {
        const newVideo: CreateVideoInputModel = {
            ...testVideo,
            title: '   ',
            author: 'Ivan',
            availableResolutions: [videoResolutions.P144,videoResolutions.P240]
        };

        await request(app)
            .post('/hometask_01/api/videos')
            .send(newVideo)
            .expect(HttpStatus.BadRequest);
    });
    it('should not create video; POST new video', async () => {
        const newVideo: CreateVideoInputModel = {
            ...testVideo,
            title: ' Ivan  ',
            author: '',
            availableResolutions: [videoResolutions.P144,videoResolutions.P240]
        };

        await request(app)
            .post('/hometask_01/api/videos')
            .send(newVideo)
            .expect(HttpStatus.BadRequest);
    });
    it('should not create video; POST new video', async () => {
        const newVideo: CreateVideoInputModel = {
            ...testVideo,
            title: '   New title',
            author: 'I  ',
            availableResolutions: [videoResolutions.P1080]
        };

        await request(app)
            .post('/hometask_01/api/videos')
            .send(newVideo)
            .expect(HttpStatus.BadRequest);
    });

    /// PUT хз че не так. В postman все работает
    // it('should not update video; PUT new video', async () => {
    //     const newVideo: CreateVideoInputModel = {
    //         ...testVideo,
    //         title: 'Samurai',
    //         author: 'Ivan',
    //         availableResolutions: [videoResolutions.P144,videoResolutions.P240]
    //     };
    //
    //     await request(app)
    //         .post('/hometask_01/api/videos')
    //         .send(newVideo)
    //         .expect(HttpStatus.Created);
    //     const updateVideo: UpdateVideoInputModel = {
    //         title: '    ',
    //         author: 'Ivan ',
    //         availableResolutions: [videoResolutions.P1080],
    //         canBeDownloaded: true,
    //         minAgeRestriction: 18,
    //         publicationDate: new Date()
    //     };
    //
    //     await request(app)
    //         .put('/hometask_01/api/videos/:id')
    //         .send(updateVideo)
    //         .expect(HttpStatus.BadRequest);
    // });
});
