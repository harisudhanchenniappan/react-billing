import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const BillingPage = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const user = localStorage.getItem("username");
      if (!user) {
        alert("Please log in.");
        navigate("/login");
      } else {
        setUsername(user);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (username) {
      axios.get('https://react-billing.onrender.com/api/items')
        .then((res) => {
          // Filter items based on the username stored in localStorage
          const filteredItems = res.data.filter(item => item.username === username);
          setItems(filteredItems);
        })
        .catch((err) => console.error(err));
    }
  }, [username]);

  const generateBillNumber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `BILL-${year}${month}${day}-${hours}${minutes}${seconds}`;
  };

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem._id === item._id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, increment) => {
    setCart(
      cart.map((cartItem) =>
        cartItem._id === id
          ? {
              ...cartItem,
              quantity: Math.max(cartItem.quantity + (increment ? 1 : -1), 1),
            }
          : cartItem
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((cartItem) => cartItem._id !== id));
  };

  const proceedToBuy = () => {
    const confirmation = window.confirm(
      'Are you sure you want to proceed with the purchase?'
    );
    if (confirmation) {
      const billData = {
        billNumber: generateBillNumber(),
        items: cart.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
        })),
        totalPrice: cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
        date: new Date().toISOString().split('T')[0],
        username: username,
      };

      axios
        .post('https://react-billing.onrender.com/api/bills', billData)
        .then((res) => {
          alert('Bill saved successfully! Bill Number: ' + billData.billNumber);
          setCart([]);
        })
        .catch((err) => console.error(err));
    }
  };

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: '20px',
  };

  const cardStyle = {
    width: '18rem',
    margin: '10px',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f8f9fa',
  };

  const buttonStyle = {
    backgroundColor: '#28a745',
    borderColor: '#28a745',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  };

  const cartStyle = {
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const cartItemStyle = {
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  };

  const cartActionsStyle = {
    display: 'flex',
    gap: '10px',
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-8">
          <h2>Billing Page</h2>
          <div style={containerStyle}>
            {items.length > 0 ? (
              items.map((item) => (
                <div style={cardStyle} key={item._id}>
                  <h5>{item.name}</h5>
                  <p>Price: ₹{item.price}</p>
                  <button
                    style={buttonStyle}
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <p>No items found for {username}.</p>
            )}
          </div>
        </div>
        <div className="col-md-4" style={cartStyle}>
          <h2>Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <ul className="list-group">
                {cart.map((item) => (
                  <li
                    className="list-group-item"
                    key={item._id}
                    style={cartItemStyle}
                  >
                    <div>
                      <h5>{item.name}</h5>
                      <p>Price: ₹{item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Total: ₹{item.price * item.quantity}</p>
                    </div>
                    <div style={cartActionsStyle}>
                      <button
                        style={buttonStyle}
                        onClick={() => updateQuantity(item._id, false)}
                      >
                        -
                      </button>
                      <button
                        style={buttonStyle}
                        onClick={() => updateQuantity(item._id, true)}
                      >
                        +
                      </button>
                      <button
                        style={{ ...buttonStyle, backgroundColor: '#dc3545', borderColor: '#dc3545' }}
                        onClick={() => removeFromCart(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <h4 className="mt-3">
                Total: ₹
                {cart.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )}
              </h4>
              <button
                style={{ ...buttonStyle, backgroundColor: '#007bff', borderColor: '#007bff' }}
                onClick={proceedToBuy}
              >
                Proceed to Buy
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
