import { Sex } from '../enums/sex';

export interface CreateCustomerRequestDto {
    dni: string;
    name: string;
    lastName: string;
    sex: Sex;
    age: number;
    birthDate: string;
    nationality: number;
    createdBy: number;
}