import { Prisma } from '@prisma/client';
import { CreateCustomerRequestDto } from '../../interfaces/create-customer-request-dto';

export const createCustomerAdapter = (
  customerDto: CreateCustomerRequestDto
): Prisma.CustomerCreateInput => {
  return {
    dni: customerDto.dni,
    name: customerDto.name,
    lastname: customerDto.lastName,
    age: customerDto.age,
    birthdate: customerDto.birthDate,
    sex: customerDto.sex,
    nationality: { connect: { id: customerDto.nationality } },
    createdByUser: { connect: { id: customerDto.createdBy } }
  };
};
