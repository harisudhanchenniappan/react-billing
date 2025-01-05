import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
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
  }, [navigate]);

  const handleSignOut = () => {
    const confirmed = window.confirm("Are you sure you want to sign out?");
    if (confirmed) {
      localStorage.removeItem("username");
      alert("You have been signed out.");
      navigate("/");
    }
  };

  // Enhanced Styles
  const styles = {
    container: {
      textAlign: "center",
      margin: "50px auto",
      padding: "30px",
      maxWidth: "900px",
      fontFamily: "'Arial', sans-serif",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease",
    },
    containerHover: {
      transform: "scale(1.02)",
    },
    heading: {
      fontSize: "2.5rem",
      color: "#333",
      marginBottom: "30px",
      fontWeight: "bold",
    },
    button: {
      margin: "15px",
      padding: "12px 25px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "1.1rem",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
      transform: "scale(1.05)",
    },
    buttonDelete: {
      backgroundColor: "#dc3545",
    },
    buttonDeleteHover: {
      backgroundColor: "#c82333",
    },
    link: {
      textDecoration: "none",
      color: "#3498db",
      fontWeight: "bold",
    },
    formList: {
      marginTop: "30px",
      textAlign: "left",
    },
    formItem: {
      marginBottom: "15px",
      padding: "10px",
      borderBottom: "1px solid #ddd",
    },
  };

  return (
    <div
      style={styles.container}
      onMouseOver={() => (styles.container = styles.containerHover)}
      onMouseOut={() => (styles.container = { ...styles.container, transform: "none" })}
    >
      <h2 style={styles.heading}>Welcome, {username}!</h2>

      <div className="button-container">
        <Link to="/billingPage">
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Billing
          </button>
        </Link>

        <Link to="/addItemPage">
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Add Items
          </button>
        </Link>

        <Link to="/summary">
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Summary
          </button>
        </Link>

        <button
          style={styles.buttonDelete}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonDeleteHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Home;
