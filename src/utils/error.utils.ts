import {FieldError} from "../ts-types/h01.FieldError";

export const createErrorMessages = (errors: FieldError[]): { errorMessages: FieldError[] } => {
    return { errorMessages: errors };
};

//Что делает эта функция в целом:
//Она принимает массив ошибок валидации (errors) и создает новый объект,
// который содержит этот массив ошибок в свойстве errorMessages.
// Этот формат, скорее всего, выбран для удобства при формировании ответа API.
// Например, если у вас есть ошибки валидации для поля name и для поля email, функция может быть вызвана следующим образом:

// // Предположим, у вас есть массив ошибок:
// const validationErrors: ValidationError[] = [
//     { field: 'name', message: 'Invalid name' },
//     { field: 'email', message: 'Invalid email format' },
// ];

// Вызов функции:
//const errorResponse = createErrorMessages(validationErrors);

// errorResponse будет выглядеть так:
// {
//   errorMessages: [
//     { field: 'name', message: 'Invalid name' },
//     { field: 'email', message: 'Invalid email format' }
//   ]
// }