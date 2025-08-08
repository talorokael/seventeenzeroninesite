import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CustomerOrderHistory({ customerId }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get(`/api/orders/customer/${customerId}`)
      .then(res => setOrders(res.data))
      .catch(error => console.error('Error fetching customer orders:', error));
  }, [customerId]);
  return (
    <div>
      <h3>Order History</h3>
      {orders.length === 0 ? (
        <p style={{ color: '#888' }}>No orders found for this customer.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {orders.map(order => (
            <li key={order.id} style={{ 
              padding: '8px 0', 
              borderBottom: '1px solid #333',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>Order #{order.id}</span>
              <span>R{order.total}</span>
              <span style={{ 
                padding: '2px 6px', 
                borderRadius: '4px', 
                fontSize: '12px',
                background: order.status === 'completed' ? '#4CAF50' : 
                           order.status === 'cancelled' ? '#f44336' : 
                           order.status === 'shipped' ? '#2196F3' : 
                           order.status === 'processing' ? '#FF9800' : 
                           order.status === 'paid' ? '#4CAF50' : '#666'
              }}>
                {order.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
