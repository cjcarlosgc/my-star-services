import { Request, Response } from 'express';
import { CreateUserRequestDto } from '../interfaces/create-user-request-dto';
import bcrypt from 'bcryptjs';
import { Api } from '../constants/api';
import { CreateUserResponseBody } from '../interfaces/create-user-response-body';
import { createUserAdapter } from '../adapters/user/create';
import { createUser, findUser } from '../service/user';
import { LoginUserRequestDto } from '../interfaces/login-user-request-dto';
import { TokenContent } from '../interfaces/token-content';
import jwt from 'jsonwebtoken';
import { getDbErrorMessage } from '../utils/error-utils';
import { LoginUserResponseBody } from '../interfaces/login-user-response-body';
import { ErrorMessage } from '../constants/errors';
import { Prisma, User } from '@prisma/client';

export const register = async (
  request: Request<{}, {}, CreateUserRequestDto>,
  response: Response<CreateUserResponseBody>
): Promise<Response<CreateUserResponseBody>> => {
  try {
    const encryptedPwd = await bcrypt.hash(request.body.password, 10);

    const newUser: Prisma.UserCreateInput = createUserAdapter({
      ...request.body,
      password: encryptedPwd,
    });

    const createdUser: Prisma.UserCreateInput = await createUser(newUser);

    return response.status(201).json({
      message: Api.CREATE_USER_MESSAGE,
      data: createdUser,
      success: true,
    });
  } catch (error) {
    const message: string = getDbErrorMessage(error);

    return response.status(401).json({
      message: message ?? Api.ERROR_CREATE_USER_MESSAGE,
      success: false,
    });
  }
};

export const login = async (
  request: Request<{}, {}, LoginUserRequestDto>,
  response: Response<LoginUserResponseBody>
): Promise<Response<LoginUserResponseBody>> => {
  try {
    const user: User = await findUser(request.body.username);

    if (!user) throw Error(ErrorMessage.INVALID_CREDENTIALS);

    const validPassword: boolean = await bcrypt.compare(
      request.body.password,
      user.passwordhash
    );

    if (!validPassword) throw Error(ErrorMessage.INVALID_CREDENTIALS);

    const tokenContent: TokenContent = {
      userId: user.id.toString(),
      role: user.roleId,
    };

    const token = jwt.sign(tokenContent, process.env.JWT_SECRET, {
      expiresIn: Api.TOKEN_TTL,
    });

    return response.json({ token, success: true });
  } catch (error) {
    console.log(error.message);
    const message: string = getDbErrorMessage(error);

    return response.status(401).json({
      message: message,
      success: false,
    });
  }
};
