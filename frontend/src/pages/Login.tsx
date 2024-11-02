
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { AppDispatch} from '../redux/store';
import { setLogin } from '../redux/userSlice';
import KeyIcon from '@mui/icons-material/Key';
// import { Button, Stack } from '@mui/material';
import axios from 'axios'; // Import axios

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(8, 'At least 8 characters').required('Password is required'),
});

const Login: React.FC = () => {
  // const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (values: typeof initialValues, { setSubmitting, setErrors }: any) => {
    try {
      setSubmitting(true);

      // Replace fetch with axios
      const response = await axios.post(
        'http://localhost:4321/auth/login',
        values,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, 
        }
      );

      if (response.status === 200) {
        const fetchedData = response.data;
        dispatch(setLogin(fetchedData.user));
        navigate('/create/post'); // Redirect on success
      } else {
        setErrors({ general: response.data.message || 'Failed to Login' });
      }
    } catch (err: any) {
      setErrors({ general: err.response?.data?.message || 'Something went wrong. Please try again later.' });
    } finally {
      setSubmitting(false); 
    }
  };

  return (
    <div className="bg-white flex flex-col mx-auto my-24 py-4 shadow-2xl rounded-tl-none rounded-bl-none rounded-lg md:w-1/2 w-11/12 px-8 h-full">
      <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-3">
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="text-gray-600 font-semibold flex justify-between">
                Email
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </label>
              <Field
                type="email"
                name="email"
                className="p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 text-gray-700"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="password" className="text-gray-600 font-semibold flex justify-between">
                Password
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </label>
              <Field
                name="password"
                type="password"
                className="p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 text-gray-700"
                placeholder="Enter your password"
              />
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className={`w-full font-bold bg-green-600 text-white py-1 hover:bg-green-700 transition duration-300 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : <><KeyIcon /> Login</>}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <p className="mt-2 text-center text-black flex justify-between">
        Don't have an account?{' '}
        <a href="/register" className="text-black font-bold hover:underline">
          Register here
        </a>
      </p>
    </div>
  );
};

export default Login;
