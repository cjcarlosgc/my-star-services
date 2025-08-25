import { Sex } from '../enums/sex';

export interface UpdateCustomerRequestDto {
    id: number;
    dni: string;
    name: string;
    lastName: string;
    sex: Sex;
    age: number;
    birthDate: string;
    nationality: number;
    updatedBy: number;
}