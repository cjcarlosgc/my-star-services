import { Prisma } from '@prisma/client';
import { UpdateCustomerRequestDto } from '../../interfaces/update-customer-request-dto';

export const updateCustomerAdapter = (
  customerDto: UpdateCustomerRequestDto
): Prisma.CustomerUpdateInput => {
  return {
    dni: customerDto.dni,
    name: customerDto.name,
    lastname: customerDto.lastName,
    age: customerDto.age,
    birthdate: customerDto.birthDate,
    sex: customerDto.sex,
    nationality: { connect: { id: customerDto.nationality } },
    updatedByUser: { connect: { id: customerDto.updatedBy } },
    updatedOn: new Date()
  };
};
