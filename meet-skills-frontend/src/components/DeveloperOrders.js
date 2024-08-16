import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeveloperOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const response = await axios.get(
            `http://localhost:3000/dev-orders/${userId}`
          );
          setOrders(response.data);
        } else {
          console.error('User ID not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Developer Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Client Name</th>
            <th>Project</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.clientName}</td>
              <td>{order.project}</td>
              <td>{order.status}</td>
              <td>{order.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeveloperOrders;
