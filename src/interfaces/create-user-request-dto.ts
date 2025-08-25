import { Role } from '../enums/role';

export interface CreateUserRequestDto {
    username: string;
    password: string;
    email: string;
    name: string;
    lastName: string;
    role: Role;
}