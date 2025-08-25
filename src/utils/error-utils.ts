import { PrismaClientInitializationError, PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { PgRepository } from "../constants/pg-repository";
import { ErrorMessage } from "../constants/errors";

export const getDbErrorMessage = (
    error: PrismaClientKnownRequestError | PrismaClientInitializationError | Error
): string => {
    let result: string;

    if(error instanceof PrismaClientKnownRequestError) {
        const fieldTarget: Array<string> = error.meta.target as Array<string>;

        switch(error.code) {
            case PgRepository.UNIQUE_RESTRICTION:
                result = fieldTarget.includes(PgRepository.USER_EMAIL_FIELD) ?
                    ErrorMessage.EMAIL_ALREADY_REGISTERED :
                    fieldTarget.includes(PgRepository.USER_USERNAME_FIELD) ?
                        ErrorMessage.USERNAME_ALREADY_REGISTERED : null;
        }
    } else if(error instanceof PrismaClientInitializationError) {
        result = ErrorMessage.INIT_CLIENT
    } else {
        result = error.message;
    }

    return result;
}