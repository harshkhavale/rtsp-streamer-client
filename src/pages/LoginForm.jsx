import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../redux/slices/authSlice';
import { apiUrl } from '../utils';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Invalid credentials');
      }

      const data = await response.json();

      dispatch(
        loginSuccess({
          token: data.access,
          user: { username },
        })
      );

      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="min-w-sm p-6 border rounded-lg shadow-md bg-gray-900 text-white w-80">
      <p className='bg-blue-200 text-blue-600 text-xs p-2 mb-4'>
  The request may take some time as the services are hosted on a free server (Render.com).
</p>
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

        {/* Animated error message */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            error ? 'opacity-100 mb-4 scale-100' : 'opacity-0 mb-0 scale-95'
          } text-red-700 text-center bg-red-200 text-nowrap p-1 px-4 rounded-3xl text-sm`}
        >
          {error}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className='text-sm'>Username</p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full border border-white px-3 py-2 rounded text-white bg-transparent"
              disabled={loading}
            />
          </div>
          <div>
            <p className='text-sm'>Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-white px-3 py-2 rounded text-white bg-transparent"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 cursor-pointer rounded ${
              loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } text-white transition-all`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
