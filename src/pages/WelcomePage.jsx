import React from "react";
import { Link } from "react-router-dom";

function WelcomePage() {
  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      padding: "3rem",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
      maxWidth: "1000px",
      margin: "3rem auto",
      textAlign: "center",
    },
    header: {
      color: "#1a202c",
      fontWeight: "800",
      fontSize: "2.5rem",
      marginBottom: "1rem",
    },
    leadText: {
      color: "#4a5568",
      marginBottom: "2rem",
      fontSize: "1.2rem",
      lineHeight: "1.8",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
      marginBottom: "3rem",
    },
    button: {
      backgroundColor: "#2b6cb0",
      color: "#fff",
      padding: "0.8rem 1.5rem",
      fontSize: "1.1rem",
      fontWeight: "600",
      border: "none",
      borderRadius: "6px",
      textDecoration: "none",
      transition: "transform 0.2s ease, background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#2c5282",
      transform: "scale(1.05)",
    },
    featureContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "2rem",
      margin: "2rem 0",
    },
    featureCard: {
      backgroundColor: "#f7fafc",
      padding: "1.5rem",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    featureIcon: {
      fontSize: "2rem",
      color: "#3182ce",
      marginBottom: "0.5rem",
    },
    featureTitle: {
      fontSize: "1.2rem",
      fontWeight: "700",
      color: "#2d3748",
      marginBottom: "0.5rem",
    },
    featureText: {
      fontSize: "1rem",
      color: "#4a5568",
      lineHeight: "1.6",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to Your Billing Dashboard</h1>
      <p style={styles.leadText}>
        Say goodbye to billing stress! Our intuitive app helps you organize, track, and manage your bills 
        with ease. Whether you're an individual or a business, we’ve got the tools you need to stay on top 
        of your finances.
      </p>

      <div style={styles.buttonContainer}>
        <Link
          to="/Login-signup"
          style={styles.button}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
            e.target.style.transform = styles.buttonHover.transform;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = styles.button.backgroundColor;
            e.target.style.transform = "scale(1)";
          }}
        >
          Login
        </Link>
        <Link
          to="/Login-signup"
          style={styles.button}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
            e.target.style.transform = styles.buttonHover.transform;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = styles.button.backgroundColor;
            e.target.style.transform = "scale(1)";
          }}
        >
          Signup
        </Link>
      </div>

      <div style={styles.featureContainer}>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>💸</div>
          <div style={styles.featureTitle}>Real-Time Tracking</div>
          <p style={styles.featureText}>
            Monitor your bills and payments in real-time. Stay updated on due dates and outstanding payments.
          </p>
        </div>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>📊</div>
          <div style={styles.featureTitle}>Detailed Analytics</div>
          <p style={styles.featureText}>
            Generate insightful reports for better financial decisions. Understand your spending patterns.
          </p>
        </div>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>🔒</div>
          <div style={styles.featureTitle}>Secure & Reliable</div>
          <p style={styles.featureText}>
            Your data is safe with our top-notch security measures. Manage bills with peace of mind.
          </p>
        </div>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>🧾</div>
          <div style={styles.featureTitle}>Effortless Invoicing</div>
          <p style={styles.featureText}>
            Easily create, send, and manage invoices. Simplify your billing process and save time.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
