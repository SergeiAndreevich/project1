import {CreateVideoInputModel} from "../ts-types/h01.CreateVideoInputModel";
import {FieldError} from "../ts-types/h01.FieldError";
import {videoResolutions} from "../ts-types/h01.Video";
import {UpdateVideoInputModel} from "../ts-types/h01.UpdateVideoInputModel";

//при добавлении видео POST будет проверять корректность введенных данных
export const APIErrorResult = (data:CreateVideoInputModel) :FieldError[] =>{
    const errors: FieldError[] = [];
    if (
        !data.title ||
        typeof data.title !== 'string' ||
        data.title.trim().length < 2
    ) {
        errors.push({ field: 'title', message: 'Invalid title' });
    }
    if (
        !data.author ||
        typeof data.author !== 'string' ||
        data.author.trim().length < 2
    ) {
        errors.push({ field: 'author', message: 'Invalid author' });
    }
    //1-является ли массивом
    //2-есть ли что-то в массиве?
    //3-раскрываем содержимое массива типа available resolutions
    //4-в POST запросе пришло >0 разрешений и не больше максимального количества
    //5-проверяем на соответствие разрешений в POST с теми, что указаны в типе
    if (!Array.isArray(data.availableResolutions)) {
        errors.push({
            field: 'available resolutions',
            message: 'available resolutions must be array',
        });
    } else if (data.availableResolutions.length) {
        const existingResolutions = Object.values(videoResolutions);
        if (
            data.availableResolutions.length > existingResolutions.length ||
            data.availableResolutions.length < 1
        ) {
            errors.push({
                field: 'video resolutions',
                message: 'Invalid available resolutions',
            });
        }
        for (const resolution of data.availableResolutions) {
            if (!existingResolutions.includes(resolution)) {
                errors.push({
                    field: 'videos resolutions',
                    message: 'Invalid resolution:' + resolution,
                });
                break;
            }
        }
    }
    return errors
}

//при изменении параметров видео тоже нужна валидация
export const ChangeVideoValidation = (data:UpdateVideoInputModel) :FieldError[]=>{
    const errors: FieldError[] = [];
    if (
        !data.title ||
        typeof data.title !== 'string' ||
        data.title.trim().length < 2
    ) {
        errors.push({ field: 'title', message: 'Invalid title' });
    }
    if (
        !data.author ||
        typeof data.author !== 'string' ||
        data.author.trim().length < 2
    ) {
        errors.push({ field: 'author', message: 'Invalid author' });
    }
    if (!Array.isArray(data.availableResolutions)) {
        errors.push({
            field: 'available resolutions',
            message: 'available resolutions must be array',
        });
    } else if (data.availableResolutions.length) {
        const existingResolutions = Object.values(videoResolutions);
        if (
            data.availableResolutions.length > existingResolutions.length ||
            data.availableResolutions.length < 1
        ) {
            errors.push({
                field: 'video resolutions',
                message: 'Invalid available resolutions',
            });
        }
        for (const resolution of data.availableResolutions) {
            if (!existingResolutions.includes(resolution)) {
                errors.push({
                    field: 'videos resolutions',
                    message: 'Invalid resolution:' + resolution,
                });
                break;
            }
        }
    }
    if(!data.canBeDownloaded || typeof data.canBeDownloaded !== 'boolean'){
        errors.push({ field: 'canBeDownloaded', message: 'Invalid field' });
    }
    if(!data.minAgeRestriction ||
        typeof data.minAgeRestriction !== 'number' ||
        data.minAgeRestriction < 1 ||
        data.minAgeRestriction > 18
    ){
        errors.push({ field: 'age restrictions', message: 'Invalid age restriction' });
    }
    //надо бы еще проверку даты сделать, но как..

    return errors
}