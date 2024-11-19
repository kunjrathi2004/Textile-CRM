import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch customer data from the backend
    axios.get('http://localhost:5000/customers')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the customer data!", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Customer List</h1>
      <ul>
        {customers.map(customer => (
          <li key={customer.id}>
            {customer.name} - {customer.contact_info}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
