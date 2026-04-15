import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import SymptomForm from './components/SymptomForm';
import SymptomList from './components/SymptomList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  return (
    <Router>
      <div style={{ backgroundColor: '#fcfcfc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        
        {isLoggedIn && (
          <nav style={styles.nav}>
            <div style={styles.navContainer}>
              <div style={styles.logo}>Salus <span style={{color: '#2dd4bf'}}>AI</span></div>
              
              <div style={styles.linksContainer}>
                <Link to="/symptoms" style={styles.navLink}>Symptoms</Link>
                <Link to="/add-symptom" style={styles.navLink}>Assistant</Link>
                <Link to="#" style={styles.navLink}>Doctors</Link>
                <Link to="#" style={styles.navLink}>Calendar</Link>
              </div>

              <div style={styles.profileSection}>
                <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
                <div style={styles.avatar}>👤</div>
              </div>
            </div>
          </nav>
        )}

        <Routes>
          <Route path="/" element={<Navigate to={isLoggedIn ? "/symptoms" : "/login"} />} />
          <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-symptom" element={isLoggedIn ? <SymptomForm /> : <Navigate to="/login" />} />
          <Route path="/symptoms" element={isLoggedIn ? <SymptomList /> : <Navigate to="/login" />} />
        </Routes>

      </div>
    </Router>
  );
}

const styles = {
  nav: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid #eee',
    padding: '0 40px',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#0d4d4d',
    cursor: 'pointer',
  },
  linksContainer: {
    display: 'flex',
    gap: '30px',
  },
  navLink: {
    color: '#6b7280',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  },
  profileSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  avatar: {
    width: '35px',
    height: '35px',
    backgroundColor: '#0d4d4d',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '18px',
  },
  logoutBtn: {
    background: 'none',
    border: '1px solid #ff4444',
    color: '#ff4444',
    padding: '5px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
  }
};

export default App;