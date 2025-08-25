import dotenv from 'dotenv';
import app from './app';
import pino from 'pino';
import { PrismaClient } from '@prisma/client';

const log = pino();
const prisma = new PrismaClient();
dotenv.config();

const PORT: number = parseInt(process.env.PORT, 10) || 3000;

app.get('/health', (_req, res) => res.status(200).send('OK'));

app.listen(PORT, () => {
    log.info(`Servidor iniciado con éxito en http://localhost:${PORT}`);
});

// Apagado limpio (SIGTERM/SIGINT)
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});