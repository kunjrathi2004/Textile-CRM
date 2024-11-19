// backend/src/controllers/customerController.js
const client = require('../db'); // Import database connection (client)

// Function to get all customers
exports.getAllCustomers = (req, res) => {
  // Use client.query to fetch customers
  client.query('SELECT * FROM customers', (err, result) => {
    if (err) {
      console.error('Error fetching customers:', err);  // Log the error for debugging
      return res.status(500).json({ error: 'Failed to fetch customers' });
    }
    res.status(200).json(result.rows);  // Return the customers as a JSON response
  });
};

// Function to get a customer by ID
exports.getCustomerById = (req, res) => {
  const { id } = req.params; // Get the customer ID from the URL

  client.query('SELECT * FROM customers WHERE id = $1', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching customer' });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.status(200).json(result.rows[0]);
  });
};

// Function to create a new customer
exports.createCustomer = (req, res) => {
  const { name, contact_info, gst_number } = req.body;
  
  // Use parameterized query to insert a new customer
  client.query(
    'INSERT INTO customers (name, contact_info, gst_number) VALUES ($1, $2, $3) RETURNING *',
    [name, contact_info, gst_number],
    (err, result) => {
      if (err) {
        console.error('Error creating customer:', err);  // Log the error for debugging
        return res.status(500).json({ error: 'Failed to create customer' });
      }
      res.status(201).json(result.rows[0]);  // Return the created customer as JSON response
    }
  );
};

// Function to update a customer by ID
exports.updateCustomer = (req, res) => {
  const { id } = req.params;  // Get the customer ID from request parameters
  const { name, contact_info, gst_number } = req.body;  // Get updated details from request body
  
  // Use parameterized query to update the customer information
  client.query(
    'UPDATE customers SET name = $1, contact_info = $2, gst_number = $3 WHERE id = $4 RETURNING *',
    [name, contact_info, gst_number, id],
    (err, result) => {
      if (err) {
        console.error('Error updating customer:', err);  // Log the error for debugging
        return res.status(500).json({ error: 'Failed to update customer' });
      }
      res.status(200).json(result.rows[0]);  // Return the updated customer details as JSON response
    }
  );
};

// Function to delete a customer by ID
exports.deleteCustomer = (req, res) => {
  const { id } = req.params;  // Get the customer ID from request parameters
  
  // Use parameterized query to delete the customer
  client.query('DELETE FROM customers WHERE id = $1 RETURNING *', [id], (err, result) => {
    if (err) {
      console.error('Error deleting customer:', err);  // Log the error for debugging
      return res.status(500).json({ error: 'Failed to delete customer' });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });  // Return error if customer doesn't exist
    }

    res.status(200).json({ message: 'Customer deleted successfully' });  // Return success message
  });
};
