import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PastWeekSummaryPage = () => {
  const [summary, setSummary] = useState({ totalRevenue: 0, totalBills: 0, itemsSummary: [] });

  useEffect(() => {
    const today = new Date();
    const pastWeek = new Date(today);
    pastWeek.setDate(today.getDate() - 7);

    const startDate = pastWeek.toISOString().split('T')[0];
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
      <h2 style={styles.heading}>Past Week Summary</h2>
      
      <div style={styles.tableContainer}>
        <h3 style={styles.subheading}>Overall Summary</h3>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableHeaderCell}>Total Revenue</th>
              <th style={styles.tableHeaderCell}>Total Bills</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.tableCell}>₹{summary.totalRevenue}</td>
              <td style={styles.tableCell}>{summary.totalBills}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={styles.tableContainer}>
        <h3 style={styles.subheading}>Item Summary</h3>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableHeaderCell}>Item Name</th>
              <th style={styles.tableHeaderCell}>Total Quantity</th>
              <th style={styles.tableHeaderCell}>Total Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {summary.itemsSummary.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{item._id}</td>
                <td style={styles.tableCell}>{item.totalQuantity}</td>
                <td style={styles.tableCell}>{item.totalPrice}</td>
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
    padding: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  subheading: {
    fontSize: '1.5rem',
    color: '#2c3e50',
    marginBottom: '15px',
  },
  tableContainer: {
    marginBottom: '30px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  tableHeader: {
    backgroundColor: '#34495e',
    color: '#fff',
    fontSize: '1.1rem',
  },
  tableHeaderCell: {
    padding: '12px',
    textAlign: 'center',
  },
  tableCell: {
    padding: '12px',
    textAlign: 'center',
    borderBottom: '1px solid #ddd',
  },
};

export default PastWeekSummaryPage;
