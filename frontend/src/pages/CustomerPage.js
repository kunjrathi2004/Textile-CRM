import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerPage = () => {
	const [customers, setCustomers] = useState([]);

	useEffect(() => {
		const fetchCustomers = async () => {
			const response = await axios.get('http://localhost:5000/customers');
			setCustomers(response.data);
		};
		fetchCustomers();
	}, []);

	return (
		<div>
			<h1>Customer</h1>
			<ul>
				{customers.map(customer => (
					<li key={customer.id}>{customer.name}</li>
				))}
			</ul>
		</div>
	);
};

export default CustomerPage; 