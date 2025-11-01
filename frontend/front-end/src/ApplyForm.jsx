import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Applyform() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    Name: '',
    PhoneNumber: '',
    Work: '',
    Email: '',
    Profile: '',
    WorkExp: '',
    Location: '',
    ExpectedSalary: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!state.Name || !state.PhoneNumber || !state.Work) {
      alert('Please fill Name, Work, and Phone Number fields.');
      return;
    }
    axios
      .post('http://localhost:3553/main', state)
      .then((res) => {
        console.log(res);
        navigate('/Mainpg');
      })
      .catch((err) => console.error(err));
  };

  const handleFile = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      axios
        .post('https://api.cloudinary.com/v1_1/ddpebfutl/image/upload', {
          file: event.target.result,
          upload_preset: 'tg5wbsjz',
        })
        .then((res) => {
          setState((prev) => ({ ...prev, Profile: res.data.secure_url }));
          console.log(res.data);
        })
        .catch((err) => console.error(err));
    };
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-sky-100 to-sky-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-sky-200 p-8">
        <h1 className="text-3xl font-bold text-center text-sky-600 mb-6">Apply for a Job</h1>

        <div className="space-y-5">
          {[
            { id: 'Name', label: 'Full Name', type: 'text', placeholder: 'Enter your full name' },
            { id: 'Work', label: 'Job Title or Skill', type: 'text', placeholder: 'e.g., Carpenter, Software Engineer' },
            { id: 'PhoneNumber', label: 'Phone Number', type: 'text', placeholder: 'Enter your active phone number' },
            { id: 'Email', label: 'Email Address (optional)', type: 'email', placeholder: 'e.g., example@gmail.com' },
            { id: 'WorkExp', label: 'Work Experience', type: 'text', placeholder: 'e.g., Fresher or 3 years' },
            { id: 'Location', label: 'Current Location', type: 'text', placeholder: 'e.g., Chennai, Coimbatore' },
            { id: 'ExpectedSalary', label: 'Expected Salary (per month)', type: 'text', placeholder: 'e.g., ₹20000' },
          ].map((field) => (
            <div key={field.id}>
              <label className="block text-gray-700 font-medium mb-1">{field.label}</label>
              <input
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
          ))}

          {/* File Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Profile Photo / ID Proof</label>
            <input
              type="file"
              name="Profile"
              onChange={handleFile}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            {state.Profile && (
              <img
                src={state.Profile}
                alt="Profile Preview"
                className="mt-3 w-24 h-24 object-cover rounded-full border-2 border-sky-300 mx-auto"
              />
            )}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            className="w-40 bg-sky-600 text-white font-semibold py-2 rounded-xl shadow-md hover:bg-sky-700 transition-transform duration-300 hover:scale-105"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}

export default Applyform;
