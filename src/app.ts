import express from 'express';
import { Express } from 'express';
import { loggerMiddleware } from './middlewares/logger';
import { errorMiddleware } from './middlewares/error';
import { authMiddleware } from './middlewares/auth';
import routes from './routes';
import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);
app.use(errorMiddleware);

app.get('/', (request, response) => {
    response.send('Hola mundo, esta es mi API');
});

app.get('/dummy', (request, response) => {
    response.send({value: 'Esta es una de mis rutas'});
});

app.get('/dummy/:userId', (req, response) => {
    const userId: number = Number(req.params.userId);

    response.send({ user: userId });
});

app.get('/dummy-with', (request, response) => { // porque no se puede usar la primera ruta ya que caerà siempre ahì
    const paramOne: string = Array.isArray(request.query.pattern)
        ? String(request.query.pattern[0])
        : request.query.pattern !== undefined
            ? String(request.query.pattern)
            : '';
    const paramTwo: number | number[] = Array.isArray(request.query.searchType)
        ? request.query.searchType.map(iterable => Number(iterable))
        : request.query.searchType !== undefined
            ? Number(request.query.searchType)
            : NaN;

    return response.status(300).json({
        data: {
            paramOne,
            paramTwo
        },
        message: 'Todo bien',
        success: true
    });
});

app.get('/users', async (request, response) => {
    const users = await prisma.user.findMany();
    response.json(users);
});

app.get('/protected-users', authMiddleware, async(request, response) => {
    const users = await prisma.user.findMany();

    response.json(users);
});

app.use('/api', routes);

export default app;