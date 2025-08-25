import { Prisma } from '@prisma/client';
import { Role } from "../../enums/role";
import { CreateUserRequestDto } from "../../interfaces/create-user-request-dto";

export const createUserAdapter = (userDto: CreateUserRequestDto): Prisma.UserCreateInput => {
    return {
        username: userDto.username,
        passwordhash: userDto.password,
        email: userDto.email,
        name: userDto.name,
        lastname: userDto.lastName,
        role: { connect: { id: Role.COMMON } }
    }
}