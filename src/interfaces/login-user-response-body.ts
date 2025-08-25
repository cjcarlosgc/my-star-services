import { BaseResponseBody } from './base-response-body';

export interface LoginUserResponseBody extends BaseResponseBody {
    token?: string;
}