import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerOrderHistory from './CustomerOrderHistory';

export default function ManageCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching customers...');
      
      // First check if backend is reachable
      try {
        const healthCheck = await axios.get('/api/health');
        console.log('Backend health:', healthCheck.data);
      } catch (healthError) {
        console.error('Backend health check failed:', healthError);
        setError('Backend is not reachable. Please make sure the backend server is running on port 4000.');
        return;
      }
      
      const response = await axios.get('/api/customers');
      console.log('Customers response:', response.data);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setError(`Failed to load customers: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const viewCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}>Loading customers...</div>;
  
  if (error) return <div style={{ color: '#ff6b6b', textAlign: 'center', padding: '20px' }}>{error}</div>;

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Customer Management</h2>
      {customers.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
          No customers found. Customers will appear here after they place orders.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <h3>All Customers ({customers.length})</h3>
            <div style={{ maxHeight: 400, overflowY: 'auto' }}>
              {customers.map(customer => (
                <div key={customer.id} 
                     style={{ 
                       padding: 12, 
                       marginBottom: 8, 
                       background: '#222', 
                       borderRadius: 6, 
                       cursor: 'pointer',
                       border: selectedCustomer?.id === customer.id ? '2px solid #fff' : 'none'
                     }}
                     onClick={() => viewCustomerDetails(customer)}>
                  <div style={{ fontWeight: 'bold' }}>{customer.name}</div>
                  <div style={{ color: '#ccc', fontSize: 14 }}>{customer.email}</div>
                  <div style={{ color: '#888', fontSize: 12 }}>
                    {customer.total_orders || 0} orders • Joined {new Date(customer.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {selectedCustomer && (
            <div>
              <h3>Customer Details</h3>
              <div style={{ background: '#222', padding: 16, borderRadius: 6 }}>
                <p><strong>Name:</strong> {selectedCustomer.name}</p>
                <p><strong>Email:</strong> {selectedCustomer.email}</p>
                <p><strong>Phone:</strong> {selectedCustomer.phone || 'Not provided'}</p>
                <p><strong>Address:</strong> {selectedCustomer.address ? (
                  typeof selectedCustomer.address === 'object' ? 
                    `${selectedCustomer.address.complex ? selectedCustomer.address.complex + ', ' : ''}${selectedCustomer.address.street || ''}, ${selectedCustomer.address.town || ''}, ${selectedCustomer.address.city || ''}, ${selectedCustomer.address.province || ''} ${selectedCustomer.address.zip || ''}`.replace(/^,\s*|,\s*$/g, '').replace(/,\s*,/g, ',') :
                    selectedCustomer.address
                ) : 'Not provided'}</p>
                <p><strong>Total Orders:</strong> {selectedCustomer.total_orders || 0}</p>
                <p><strong>Joined:</strong> {new Date(selectedCustomer.created_at).toLocaleDateString()}</p>
                
                <CustomerOrderHistory customerId={selectedCustomer.id} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 