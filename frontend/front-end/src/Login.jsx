import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';
import connectologo from './assets/connecto-logo-color-removebg-preview.png';

const clientId =
  '598048758838-enhddjp4p7aecbg815on7utseok98276.apps.googleusercontent.com';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3553/login', formData);
      if (res.data.message === 'Invalid credentials or user not existed') {
        alert('Invalid credentials. Please check or sign up first.');
      } else if (res.data.message === 'Login successful') {
        navigate('/Mainpg');
      }
    } catch (error) {
      console.log('Error on fetching:', error);
    }
  };

  const onSuccess = (res) => {
    console.log('Login success:', res.profileObj);
  };
  const onFailure = (res) => {
    console.log('Login failed:', res);
  };

  useEffect(() => {
    async function start() {
      try {
        await gapi.load('client:auth2', async () => {
          await gapi.client.init({
            clientId: clientId,
            scope: 'email profile',
          });
        });
      } catch (error) {
        console.error('Error initializing Google API client:', error);
      }
    }
    start();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] via-[#f1f8e9] to-[#fff] p-4">
      {/* Outer container */}
      <div className="flex flex-col md:flex-row w-full md:w-4/5 lg:w-3/4 rounded-3xl overflow-hidden shadow-2xl bg-white/70 backdrop-blur-xl border border-gray-200">

        {/* Left section - Branding */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-sky-500 to-cyan-400 items-center justify-center p-8 text-white text-center flex-col">
          
          <h1 className="text-4xl font-extrabold tracking-wide mb-3">Welcome to Connecto</h1>
          <p className="text-lg font-light max-w-md leading-relaxed">
            Bridging Talent with Opportunities. <br />
            Empowering communities through meaningful work.
          </p>
        </div>

        {/* Right section - Login Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-sky-600 mb-8 tracking-wide">Log In</h2>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm bg-white rounded-xl p-6 shadow-md border border-gray-100"
          >
            <div className="mb-5">
              <label className="font-semibold text-gray-600 text-sm mb-2 block">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="border border-gray-300 outline-none rounded-lg px-3 py-2 w-full text-gray-800 focus:ring-2 focus:ring-sky-400 transition-all"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="mb-5">
              <label className="font-semibold text-gray-600 text-sm mb-2 block">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="border border-gray-300 outline-none rounded-lg px-3 py-2 w-full text-gray-800 focus:ring-2 focus:ring-sky-400 transition-all"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex justify-center mb-4">
              <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-500 to-cyan-400 text-white py-2 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              Log In
            </button>

            <p
              className="text-sm text-center text-gray-500 mt-5 cursor-pointer hover:text-sky-600 hover:underline"
              onClick={() => navigate('/Signup')}
            >
              Don’t have an account? Sign up here
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
