import { Customer, Prisma, PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

// Leer todos los clientes activos
export const findActiveCustomers = async (): Promise<Customer[]> => {
    const activeCustomers: Customer[] = await prisma.customer.findMany({
        where: {
            active: true
        }
    });
    return activeCustomers;
}

// Leer un cliente en particular por ID
export const findCustomerById = async (id: number): Promise<Customer> => {
    const customer: Customer = await prisma.customer.findUnique({
        where: { id }
    });
    return customer;
}

// Crear un cliente
export const createNewCustomer = async (customer: Prisma.CustomerCreateInput): Promise<Prisma.CustomerCreateInput> => {
    await prisma.customer.create({
        data: customer
    });
    return customer;
}

// Actualizar un cliente
export const updateCustomerById = async (id: number, data: Prisma.CustomerUpdateInput): Promise<Customer> => {
    const updatedCustomer: Customer = await prisma.customer.update({
        where: { id },
        data
    });
    return updatedCustomer;
}

// Eliminar (soft delete) un cliente
export const deleteCustomerById = async (id: number): Promise<Customer> => {
    const deletedCustomer: Customer = await prisma.customer.update({
        where: { id },
        data: { active: false }
    });
    return deletedCustomer;
}