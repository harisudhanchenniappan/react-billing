import React from "react";
import { Link } from "react-router-dom";

function WelcomePage() {
  const styles = {
    container: {
      fontFamily: "'Roboto', sans-serif",
      padding: "2rem",
      backgroundColor: "#f9f9f9",
      color: "#333",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      maxWidth: "800px",
      margin: "2rem auto",
    },
    header: {
      color: "#2c3e50",
      fontWeight: "bold",
      marginBottom: "1rem",
    },
    leadText: {
      color: "#7f8c8d",
      marginBottom: "2rem",
      fontSize: "1.1rem",
    },
    buttonContainer: {
      marginBottom: "2rem",
    },
    button: {
      backgroundColor: "#3498db",
      color: "#fff",
      padding: "0.8rem 2rem",
      fontSize: "1.1rem",
      fontWeight: "bold",
      border: "none",
      borderRadius: "5px",
      textDecoration: "none",
      margin: "0 1rem",
    },
    sectionTitle: {
      color: "#2980b9",
      fontWeight: "bold",
      marginTop: "2rem",
      marginBottom: "1rem",
    },
    list: {
      textAlign: "left",
      margin: "0 auto",
      maxWidth: "600px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to Your Billing Dashboard</h1>
      <p style={styles.leadText}>
        Effortlessly manage your bills, track payments, and get detailed insights with our user-friendly billing app. Whether you're a small business or an individual, we simplify the process for you!
      </p>

      <div style={styles.buttonContainer}>
        <Link to="/login-signup" style={styles.button}>
          Login/Signup
        </Link>
        
      </div>

      <h3 style={styles.sectionTitle}>Why Use Our Billing App?</h3>
      <ul style={styles.list}>
        <li>💸 Track all your bills in one place with real-time updates.</li>
        <li>📊 Generate and view detailed summaries for each bill.</li>
        <li>🔒 Secure payment tracking and bill management.</li>
        <li>🧾 Easy-to-read invoices and receipts for all transactions.</li>
      </ul>

      <h3 style={styles.sectionTitle}>How It Works</h3>
      <ol style={styles.list}>
        <li>1️⃣ Sign up or log in to your account.</li>
        <li>2️⃣ Add and manage your bills.</li>
        <li>3️⃣ Track your payments and due dates.</li>
        <li>4️⃣ Get insightful reports and notifications about your bills.</li>
      </ol>

      <p style={styles.leadText}>
        Ready to get started? Click the buttons above and start managing your bills with ease!
      </p>
    </div>
  );
}

export default WelcomePage;
