import { useState } from 'react';
import { registerUser, loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'buyer' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = isLogin
        ? await loginUser({ email: form.email, password: form.password })
        : await registerUser(form);
      localStorage.setItem('token', res.data.token);
      setMessage('Success!');
      navigate('/');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#080710', position: 'relative' }}>
      {/* Glass shapes */}
      <div style={{
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'linear-gradient(#1845ad, #23a2f6)',
        position: 'absolute',
        top: '-80px',
        left: '-80px'
      }}></div>
      <div style={{
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'linear-gradient(to right, #ff512f, #f09819)',
        position: 'absolute',
        bottom: '-80px',
        right: '-30px'
      }}></div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="p-4 px-5"
        style={{
          width: '400px',
          borderRadius: '10px',
          backgroundColor: 'rgba(255,255,255,0.13)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255,255,255,0.1)',
          boxShadow: '0 0 40px rgba(8,7,16,0.6)',
          color: 'white',
          zIndex: 1
        }}
      >
        <h3 className="text-center mb-4">{isLogin ? 'Login Here' : 'Register Here'}</h3>

        {!isLogin && (
          <>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control bg-transparent text-white"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Account Type</label>
              <select
                className="form-select bg-transparent text-white"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>
          </>
        )}

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control bg-transparent text-white"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control bg-transparent text-white"
            placeholder="Enter password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-light w-100 fw-bold">
          {isLogin ? 'Log In' : 'Register'}
        </button>

        <div className="text-center mt-3">
          {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}{' '}
          <button type="button" className="btn btn-link text-info p-0" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register' : 'Login'}
          </button>
        </div>

        {message && (
          <div className={`alert mt-3 ${message === 'Success!' ? 'alert-success' : 'alert-danger'}`} role="alert">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
