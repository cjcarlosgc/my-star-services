import { Request, Response } from 'express';

export const loggerMiddleware = (
  request: Request,
  response: Response,
  next
) => {
  const url: string = request.url;
  const time: string = new Date().toISOString();

  if (url !== '/health' && url !== '/') {
    console.log('**************************************')
  }
  
  console.log(
    `[${time}] ${request.method} ${request.url} - IP: ${request.ip}`
  );

  console.log(`Request query: ${JSON.stringify(request.query)}`);
  console.log(`Request params: ${JSON.stringify(request.params)}`);
  console.log(`Request body: ${JSON.stringify(request.body)}`);

  if (url !== '/health' && url !== '/') {
    console.log('**************************************')
  }

  const start: number = Date.now();

  response.on('finish', () => {
    const duration = Date.now() - start;

    if (url !== '/health' && url !== '/') {
      console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    }

    console.log(`se resolvió en: ${duration}ms`);
    console.log(`Response: ${response.send()}`);

    if (url !== '/health' && url !== '/') {
      console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    }
  });

  next();
};
