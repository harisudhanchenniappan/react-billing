import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodayBillsPage = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const today = new Date();
    const startDate = today.toISOString().split('T')[0];
    const endDate = today.toISOString().split('T')[0];

    axios
      .get(`https://react-billing.onrender.com/api/bills?startDate=${startDate}&endDate=${endDate}`)
      .then((res) => setBills(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Today's Bills</h2>
      {bills.length > 0 ? (
        bills.map((bill) => (
          <div className="card mb-4" key={bill.billNumber} style={styles.card}>
            <div className="card-body">
              <h5 style={styles.cardTitle}>Bill Number: {bill.billNumber}</h5>
              <p style={styles.cardText}>Date: {new Date(bill.date).toISOString().split('T')[0]}</p>
              <p style={styles.cardText}>Total: ₹{bill.totalPrice}</p>
            </div>
          </div>
        ))
      ) : (
        <p style={styles.noBillsText}>No bills found for today.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f4f6f9',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ddd',
    transition: 'transform 0.3s ease',
  },
  cardBody: {
    padding: '20px',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#007bff',
    marginBottom: '10px',
  },
  cardText: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '5px',
  },
  noBillsText: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#888',
  },
};

export default TodayBillsPage;
