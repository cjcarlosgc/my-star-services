import { Router } from 'express';
import { createCustomer, deleteCustomer, getCustomerById, getCustomers, updateCustomer } from '../controllers/customer';

export const customerRouter: Router = Router();

customerRouter.get('', getCustomers);
customerRouter.get('/:id', getCustomerById);
customerRouter.post('/create', createCustomer);
customerRouter.post('/update/:id', updateCustomer);
customerRouter.post('/delete/:id', deleteCustomer);