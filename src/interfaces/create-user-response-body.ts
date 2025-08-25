import { Prisma } from '@prisma/client';
import { BaseResponseBody } from './base-response-body';

export interface CreateUserResponseBody extends BaseResponseBody {
    data?: Prisma.UserCreateInput;
}