import React, { useState } from 'react';
import './AuthForm.css';

const AuthForm = ({ onLogin, onRegister, loading, error }) => {
  const [tab, setTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tab === 'login') onLogin(email, password);
    else onRegister(email, password);
  };

  return (
    <div className="auth-form-container">
      <div className="auth-tabs">
        <button className={tab === 'login' ? 'active' : ''} onClick={() => setTab('login')}>Login</button>
        <button className={tab === 'register' ? 'active' : ''} onClick={() => setTab('register')}>Register</button>
      </div>
      <form className="auth-form" onSubmit={handleSubmit} autoComplete="on">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
        />
        <button type="submit" disabled={loading}>{loading ? (tab === 'login' ? 'Logging in...' : 'Registering...') : (tab === 'login' ? 'Login' : 'Register')}</button>
      </form>
      {error && <div className={error.includes('successful') ? 'auth-success' : 'auth-error'}>{error}</div>}
      <div className="auth-placeholder">Forgot password? (Coming soon)</div>
    </div>
  );
};

export default AuthForm; 