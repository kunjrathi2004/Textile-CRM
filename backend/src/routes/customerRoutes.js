const express = require('express');
const router = express.Router();

// Import controller functions for customers
const { getAllCustomers, createCustomer, updateCustomer, deleteCustomer, getCustomerById } = require('../controllers/customerController');

// Define the routes for customers
router.get('/', getAllCustomers); // GET /customers -> get all customers
router.get('/:id', getCustomerById); // GET /customers/:id -> get a customer by ID
router.post('/', createCustomer); // POST /customers -> create a new customer
router.put('/:id', updateCustomer); // PUT /customers/:id -> update customer by ID
router.delete('/:id', deleteCustomer); // DELETE /customers/:id -> delete customer by ID

module.exports = router;
