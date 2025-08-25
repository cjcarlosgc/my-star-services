import { Request, Response } from 'express';

export const loggerMiddleware = (
  request: Request,
  response: Response,
  next
) => {
  if (request.url !== '/health') {
    const time: string = new Date().toISOString();

    console.log(
      `[${time}] ${request.method} ${request.url} - IP: ${request.ip}`
    );
    // console.log(`Request: ${JSON.stringify(request.param)}`);
    console.log(`Request query: ${JSON.stringify(request.query)}`);
    console.log(`Request params: ${JSON.stringify(request.params)}`);
    console.log(`Request body: ${JSON.stringify(request.body)}`);

    const start: number = Date.now();

    response.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`se resolvió en: ${duration}ms`);
      console.log(`Response: ${response.send()}`);
    });

    next();
  }
};
