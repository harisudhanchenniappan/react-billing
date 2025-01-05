import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        const confirmed = window.confirm("Are you sure you want to sign out?");
        if (confirmed) {
            localStorage.removeItem("username");
            alert("You have been signed out.");
            navigate("/");
        }
    };

    return (
        <nav style={styles.nav}>
            <ul style={styles.ul}>
                <li style={styles.li}>
                    <Link to="/billingPage" style={styles.link}>
                        Billing
                    </Link>
                </li>
                <li style={styles.li}>
                    <Link to="/addItemPage" style={styles.link}>
                        Add Item
                    </Link>
                </li>
                <li style={styles.li}>
                    <Link to="/summary" style={styles.link}>
                        Summary
                    </Link>
                </li>
                <li style={styles.li}>
                    <button
                        style={styles.signOutButton}
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </button>
                </li>
            </ul>
        </nav>
    );
};

const styles = {
    nav: {
        background: '#2c3e50',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    ul: {
        listStyle: 'none',
        display: 'flex',
        margin: 0,
        padding: 0,
    },
    li: {
        margin: '0 1.5rem',
    },
    link: {
        color: '#ecf0f1',
        textDecoration: 'none',
        fontSize: '1.2rem',
        fontWeight: '600',
        transition: 'color 0.3s ease',
    },
    linkHover: {
        color: '#3498db',
    },
    signOutButton: {
        backgroundColor: '#e74c3c',
        border: 'none',
        color: '#fff',
        padding: '10px 20px',
        fontSize: '1rem',
        cursor: 'pointer',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
    },
    signOutButtonHover: {
        backgroundColor: '#c0392b',
    },
};

// Adding hover effects dynamically via JS (for Link and Sign Out button)
const addHoverEffect = (e, style) => {
    e.target.style.color = style.color || '#3498db';
};
const removeHoverEffect = (e) => {
    e.target.style.color = '#ecf0f1';
};

export default NavBar;
