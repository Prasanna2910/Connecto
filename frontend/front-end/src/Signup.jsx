import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    confirmemail: '',
    password: '',
    confirmpassword: '',
    gender: 'male',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const res = await axios.post('http://localhost:3553/signup', formData);
      console.log(res.data.message);

      if (res.data.message === 'ok') {
        navigate('/Mainpg');
      } else if (res.data.message === 'get out') {
        alert('Your email is already registered. Please login instead.');
        navigate('/Login');
      }

      setFormData({
        name: '',
        email: '',
        confirmemail: '',
        password: '',
        confirmpassword: '',
        gender: 'male',
      });
    } catch (err) {
      console.log('Error:', err.response);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-sky-100 to-indigo-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-sky-200 p-8">
        <h2 className="text-3xl font-bold text-center text-sky-600 mb-6">Create Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter your name"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Confirm Email</label>
            <input
              type="email"
              name="confirmemail"
              value={formData.confirmemail}
              placeholder="Re-enter your email"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter password"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              value={formData.confirmpassword}
              placeholder="Re-enter password"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-600 to-indigo-500 text-white font-semibold py-2 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-5 text-gray-700">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/Login')}
            className="text-sky-600 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
