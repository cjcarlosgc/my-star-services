import { Prisma } from '@prisma/client';
import { DeleteCustomerRequestDto } from '../../interfaces/delete-customer-request-dto';

export const deleteCustomerAdapter = (
  customerDto: DeleteCustomerRequestDto
): Prisma.CustomerUpdateInput => {
  return {
    active: false,
    updatedByUser: { connect: { id: customerDto.updatedBy } },
    updatedOn: new Date()
  };
};
