import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      // You can replace this with a real login API call
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      onLogin?.(data); // send login info to parent
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (<div className=' flex md:mx-auto flex-col justify-center items-center h-screen -mt-10'>
    <div className=" min-w-sm mx-auto p-6 border rounded-lg shadow-md bg-white">
    <p className='text-center font-black text-sm bg-blue-100 rounded-4xl p-1 mb-4 text-blue-700'>Skylark - RTSP Assignment</p>

      <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Username</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 cursor-pointer px-4 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div></div>
  );
};

export default LoginForm;
