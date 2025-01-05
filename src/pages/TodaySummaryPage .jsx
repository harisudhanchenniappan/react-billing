import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodaySummaryPage = () => {
  const [summary, setSummary] = useState({ totalRevenue: 0, totalBills: 0, itemsSummary: [] });

  useEffect(() => {
    const today = new Date();
    const startDate = today.toISOString().split('T')[0];
    const endDate = today.toISOString().split('T')[0];
    const username = localStorage.getItem('username');

    if (!username) {
      console.error('Username not found in localStorage');
      return;
    }

    axios
      .get(`https://react-billing.onrender.com/api/summary`, {
        params: { startDate, endDate, username },
      })
      .then((res) => setSummary(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Today's Summary</h2>

      <div style={styles.summaryCard}>
        <h4 style={styles.cardTitle}>Revenue and Bills</h4>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Total Revenue</th>
              <th style={styles.tableHeader}>Total Bills</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.tableData}>₹{summary.totalRevenue}</td>
              <td style={styles.tableData}>{summary.totalBills}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={styles.itemSummaryCard}>
        <h3 style={styles.cardTitle}>Item Summary</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Item Name</th>
              <th style={styles.tableHeader}>Total Quantity</th>
              <th style={styles.tableHeader}>Total Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {summary.itemsSummary.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableData}>{item._id}</td>
                <td style={styles.tableData}>{item.totalQuantity}</td>
                <td style={styles.tableData}>{item.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    marginBottom: '30px',
  },
  itemSummaryCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '15px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
  tableHeader: {
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '1.1rem',
    textAlign: 'center',
    padding: '12px',
    border: '1px solid #ddd',
  },
  tableData: {
    textAlign: 'center',
    padding: '12px',
    border: '1px solid #ddd',
    color: '#333',
  },
};

export default TodaySummaryPage;
