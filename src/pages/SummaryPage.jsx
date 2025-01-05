import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const SummaryPage = () => {
  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={styles.navbarContainer}>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={styles.navbarToggler}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav" style={styles.navbarCollapse}>
            <ul className="navbar-nav" style={styles.navItems}>
              <li className="nav-item" style={styles.navItem}>
                <Link className="nav-link" to="today-bills" style={styles.navLink}>
                  Today Bills
                </Link>
              </li>
              <li className="nav-item" style={styles.navItem}>
                <Link className="nav-link" to="today-summary" style={styles.navLink}>
                  Today Summary
                </Link>
              </li>
              <li className="nav-item" style={styles.navItem}>
                <Link className="nav-link" to="past-week-summary" style={styles.navLink}>
                  Past Week Summary
                </Link>
              </li>
              <li className="nav-item" style={styles.navItem}>
                <Link className="nav-link" to="date-range-summary" style={styles.navLink}>
                  Date Range
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div style={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
  },
  navbar: {
    backgroundColor: '#007bff',
    padding: '10px 20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  navbarContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  navbarToggler: {
    border: 'none',
    backgroundColor: 'transparent',
    padding: '8px',
  },
  navbarCollapse: {
    display: 'flex',
    justifyContent: 'center',
  },
  navItems: {
    listStyle: 'none',
    display: 'flex',
    padding: 0,
    margin: 0,
  },
  navItem: {
    margin: '0 20px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: '500',
    transition: 'color 0.3s',
  },
  navLinkHover: {
    color: '#f8f9fa',
  },
  mainContent: {
    marginTop: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
};

export default SummaryPage;
