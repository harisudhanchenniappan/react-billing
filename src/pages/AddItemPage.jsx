import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddItemPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [username, setUsername] = useState(null);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const user = localStorage.getItem('username');
      if (!user) {
        alert('Please log in.');
        navigate('/login');
      } else {
        setUsername(user);
        fetchItems(user);  // Fetch items for the logged-in user
      }
    };
    fetchUser();
  }, []);

  // Fetch items for the logged-in user
  const fetchItems = async (username) => {
    try {
      const res = await axios.get('https://react-billing.onrender.com/api/items', {
        params: { username },
      });
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const item = { name, price: Number(price), quantity: Number(quantity), username };

    try {
      await axios.post('https://react-billing.onrender.com/api/items', item, {
        headers: { 'Content-Type': 'application/json' },
      });
      fetchItems(username); // Refresh the items list after adding a new item
      setName('');
      setPrice('');
      setQuantity('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (itemId) => {
    console.log(itemId)
    try {
      await axios.delete(`https://react-billing.onrender.com/api/items/${itemId}`);
      fetchItems(username); // Refresh the items list after deletion
    } catch (err) {
      console.error(err);
    }
  };

  const containerStyle = {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#4CAF50',
    fontFamily: 'Arial, sans-serif',
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    display: 'block',
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const tableStyle = {
    width: '100%',
    marginTop: '30px',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    textAlign: 'left',
  };

  const tdStyle = {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label style={labelStyle}>Name</label>
          <input
            type="text"
            style={inputStyle}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Price</label>
          <input
            type="number"
            style={inputStyle}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Quantity</label>
          <input
            type="number"
            style={inputStyle}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={buttonStyle}>Add Item</button>
      </form>

      <h3 style={{ marginTop: '30px' }}>Your Items</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Quantity</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td style={tdStyle}>{item.name}</td>
              <td style={tdStyle}>₹{item.price}</td>
              <td style={tdStyle}>{item.quantity}</td>
              <td style={tdStyle}>
                <button
                  onClick={() => handleDelete(item._id)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddItemPage;
