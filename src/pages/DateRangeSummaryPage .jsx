import React, { useState } from 'react';
import axios from 'axios';

const DateRangeSummaryPage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  const fetchSummary = () => {
    setError('');
    const username = localStorage.getItem('username');

    if (!username) {
      setError('Username not found in localStorage.');
      return;
    }

    if (!startDate || !endDate) {
      setError('Please select both start and end dates.');
      return;
    }

    axios
      .get(`https://react-billing.onrender.com/api/summary`, {
        params: { startDate, endDate, username },
      })
      .then((res) => setSummary(res.data))
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch summary. Please try again.');
      });
  };

  // Inline styles for customization
  const formStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const tableStyle = {
    marginTop: '20px',
    width: '100%',
    borderCollapse: 'collapse',
  };

  const tableHeaderStyle = {
    backgroundColor: '#343a40',
    color: 'white',
    fontWeight: 'bold',
  };

  const tableRowStyle = {
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
  };

  const alertStyle = {
    marginTop: '20px',
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Date Range Summary</h2>

      <div style={formStyle}>
        <div className="mb-3">
          <label>Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button style={buttonStyle} onClick={fetchSummary}>
          Get Summary
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" style={alertStyle}>
          {error}
        </div>
      )}

      {summary && (
        <div className="mt-4">
          <h3>Summary Details</h3>

          {/* Total Revenue and Bills Table */}
          <table style={tableStyle} className="table table-bordered">
            <thead style={tableHeaderStyle}>
              <tr>
                <th>Total Revenue</th>
                <th>Total Bills</th>
              </tr>
            </thead>
            <tbody>
              <tr style={tableRowStyle}>
                <td>₹{summary.totalRevenue}</td>
                <td>{summary.totalBills}</td>
              </tr>
            </tbody>
          </table>

          {/* Item Summary Table */}
          <h4 className="mt-4">Item Summary</h4>
          <table style={tableStyle} className="table table-bordered">
            <thead style={tableHeaderStyle}>
              <tr>
                <th>Item Name</th>
                <th>Total Quantity</th>
                <th>Total Price (₹)</th>
              </tr>
            </thead>
            <tbody>
              {summary.itemsSummary.map((item, index) => (
                <tr key={index} style={tableRowStyle}>
                  <td>{item._id}</td>
                  <td>{item.totalQuantity}</td>
                  <td>₹{item.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DateRangeSummaryPage;
