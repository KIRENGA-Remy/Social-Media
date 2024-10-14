import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageToBase64 } from '../utility/ImageToBase64';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  occupation: string;
  picturePath: string; // Updated to match backend field
  location: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    occupation: '',
    picturePath: '', // Updated to match backend field
    location: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Handle input field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle image upload and convert to Base64
  const handleUploadProfileImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return; // Guard clause for safety

    const data = await imageToBase64(e.target.files[0]); // Convert image to base64
    if (typeof data === 'string') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        picturePath: data, // Updated field to match the backend model
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:4321', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      setLoading(false);

      if (response.ok) {
        navigate('/'); // Redirect on success
      } else {
        const result = await response.json();
        setError(result.message || 'Failed to register.');
      }
    } catch (err) {
      setLoading(false);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center">
      <div className="bg-blue-900 shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-white">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="p-2 border-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="p-2 border-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="Enter your last name"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 border-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white">Occupation</label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="p-2 border-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="Enter your occupation"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white">Profile Picture (Optional)</label>
            <input
              type="file"
              name="userprofile"
              accept="image/*"
              onChange={handleUploadProfileImage}
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="p-2 border-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="Enter your location"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-white">
          Already have an account?{' '}
          <a href="/" className="text-blue-300 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
