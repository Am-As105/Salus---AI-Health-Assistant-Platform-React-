import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
         
            const res = await axios.post('http://localhost:8000/api/login', { email, password });
            
            localStorage.setItem('token', res.data.data.token);
            
    
            window.location.href = '/dashboard';
            
        } catch (err) {
            setError('Please enter a valid email address or password');
        }
    }
    const s = {
        wrapper: { minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px' },
        logoBox: { backgroundColor: '#0d9488', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', boxShadow: '0 4px 12px rgba(13, 148, 136, 0.2)' },
        card: { backgroundColor: '#fff', padding: '40px', borderRadius: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', width: '100%', maxWidth: '420px', border: '1px solid #f1f5f9', position: 'relative' },
        indicator: { position: 'absolute', left: '0', top: '100px', height: '60px', width: '4px', backgroundColor: '#c4b5fd', borderRadius: '0 4px 4px 0' },
        label: { display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px', textAlign: 'left' },
        input: { width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb', marginBottom: '15px', outline: 'none', fontSize: '15px', boxSizing: 'border-box' },
        btn: { width: '100%', padding: '14px', borderRadius: '12px', backgroundColor: '#134e4a', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
        errorBox: { color: '#ef4444', fontSize: '12px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '5px' }
    };

    return (
        <div style={s.wrapper}>
            <div style={{ textAlign: 'center', marginBottom: '35px' }}>
                <div style={s.logoBox}>
                    <svg width="24" height="24" fill="none" stroke="#fff" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
                <h1 style={{ color: '#134e4a', fontSize: '32px', margin: '0', fontWeight: '800' }}>Salus AI</h1>
                <p style={{ color: '#6b7280', marginTop: '8px' }}>Your empathetic partner in personalized health.</p>
            </div>

            <div style={s.card}>
                <div style={s.indicator}></div>
                <h2 style={{ fontSize: '24px', color: '#111827', marginBottom: '8px', fontWeight: '700', textAlign: 'left' }}>Welcome back</h2>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '30px', textAlign: 'left' }}>Sign in to continue your personalized health journey.</p>

                <form onSubmit={handleSubmit}>
                    <label style={s.label}>Email</label>
                    <input 
                        type="email" 
                        placeholder="yourname@email.com" 
                        style={s.input} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    
                    {error && <div style={s.errorBox}><span>⚠️</span> {error}</div>}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <label style={{ ...s.label, marginBottom: '0' }}>Password</label>
                        <a href="#" style={{ fontSize: '12px', color: '#0d9488', fontWeight: '700', textDecoration: 'none' }}>Forgot Password?</a>
                    </div>
                    <input 
                        type="password" 
                        placeholder="••••••••" 
                        style={s.input} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />

                    <button type="submit" style={s.btn}>
                        Sign In <span>→</span>
                    </button>
                </form>

                <div style={{ marginTop: '25px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
                    Don't have an account? <Link to="/register" style={{ color: '#0d9488', fontWeight: '700', textDecoration: 'none' }}>Create an account</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;