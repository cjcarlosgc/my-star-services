export const error = (error, request, response, next) => {
    const { statusCode, message } = error;
    const time: string = new Date().toISOString();

    console.error(`ERROR [${time}] ${statusCode}: ${message}`);
};