import { Request, Response } from 'express';
import {
  findActiveCustomers,
  findCustomerById,
  createNewCustomer,
  updateCustomerById,
  deleteCustomerById,
} from '../service/customer';
import { getDbErrorMessage } from '../utils/error-utils';
import { Api } from '../constants/api';
import { createCustomerAdapter } from '../adapters/customer/create';
import { CreateCustomerRequestDto } from '../interfaces/create-customer-request-dto';
import { UpdateCustomerRequestDto } from '../interfaces/update-customer-request-dto';
import { updateCustomerAdapter } from '../adapters/customer/update';
import { deleteCustomerAdapter } from '../adapters/customer/delete';
import { Customer, Prisma } from '@prisma/client';

// Obtener todos los clientes activos
export const getCustomers = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const activeCustomers: Customer[] = await findActiveCustomers();
    return response.status(200).json({
      data: activeCustomers,
      success: true,
    });
  } catch (error) {
    return response.status(400).json({
      message: getDbErrorMessage(error),
      success: false,
    });
  }
};

// Obtener un cliente por ID
export const getCustomerById = async (
  request: Request<{ id: string }>,
  response: Response
): Promise<Response> => {
  try {
    const customer: Customer = await findCustomerById(
      Number(request.params.id)
    );

    if (!customer) {
      throw Error(Api.CUSTOMER_NOT_FOUND_MESSAGE);
    }

    return response.status(200).json({
      data: customer,
      success: true,
    });
  } catch (error) {
    return response.status(400).json({
      message: getDbErrorMessage(error),
      success: false,
    });
  }
};

// Crear un cliente
export const createCustomer = async (
  request: Request<{}, {}, CreateCustomerRequestDto>,
  response: Response
): Promise<Response> => {
  try {
    const newCustomer: Prisma.CustomerCreateInput = createCustomerAdapter(
      request.body
    );
    const createdCustomer: Prisma.CustomerCreateInput = await createNewCustomer(
      newCustomer
    );

    return response.status(201).json({
      data: createdCustomer,
      success: true,
    });
  } catch (error) {
    return response.status(400).json({
      message: getDbErrorMessage(error),
      success: false,
    });
  }
};

// Actualizar un cliente
export const updateCustomer = async (
  request: Request<{ id: string }, {}, UpdateCustomerRequestDto>,
  response: Response
): Promise<Response> => {
  try {
    const input: Prisma.CustomerUpdateInput = updateCustomerAdapter(request.body);

    const updatedCustomer: Customer = await updateCustomerById(
      Number(request.params.id),
      input
    );

    return response.status(200).json({
      data: updatedCustomer,
      success: true,
    });
  } catch (error) {
    return response.status(400).json({
      message: getDbErrorMessage(error),
      success: false,
    });
  }
};

// Eliminar (soft delete) un cliente
export const deleteCustomer = async (
  request: Request<{ id: string }>,
  response: Response
): Promise<Response> => {
  try {
    const input: Prisma.CustomerUpdateInput = deleteCustomerAdapter(request.body);

    const updatedCustomer: Customer = await updateCustomerById(
      Number(request.params.id),
      input
    );

    return response.status(200).json({
      data: updatedCustomer,
      success: true,
    });
  } catch (error) {
    return response.status(400).json({
      message: getDbErrorMessage(error),
      success: false,
    });
  }
};
