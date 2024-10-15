import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageToBase64 } from '../utility/ImageToBase64';

interface LoginFormData {
  email: string;
  password: string;
}

const Login :React.FC = () => {

    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
      });
      const [error, setError] = useState<string | null>(null);
      const [loading, setLoading] = useState<boolean>(false);
      const navigate = useNavigate();
    
      // Handle input field change
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
    
      // Handle form submission
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
        try {
          const response = await fetch('http://localhost:4321/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          setLoading(false);
    
          if (response.ok) {
            navigate('/home'); // Redirect on success
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
    <div className="bg-white flex flex-col mx-auto my-24 py-4 shadow-lg rounded-tl-none rounded-bl-none rounded-lg w-1/2 px-8 h-full">
    <h2 className="text-3xl font-bold text-center text- mb-6">Login</h2>
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col">
        <label className="text-black">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 text-gray-700"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-black">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 text-gray-700"
          placeholder="Enter your password"
          required
        />
      </div>
      <div className='pt-4'>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className={`w-full font-bold bg-green-600 text-white py-2 hover:bg-green-700 transition duration-300 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={loading}
      >
        {loading ? 'Login in...' : 'Login'}
      </button>
      </div>
    </form>
    <p className="mt-3 text-center text-black">
      Don't have an account?{' '}
      <a href="/register" className="text-black font-bold hover:underline">
        Register here
      </a>
    </p>
  </div>
)
};

export default Login;