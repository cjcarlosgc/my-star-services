import { Prisma, PrismaClient, User } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export const createUser = async (user :Prisma.UserCreateInput): Promise<Prisma.UserCreateInput> => {
    await prisma.user.create({
        data: user,
        include: { role: true }
    });

    return user;
}

export const findUser = async (username: string): Promise<User> => {
    const user: User = await prisma.user.findUnique({
        where: {
            username,
        }
    });

    return user;
}