import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../redux/store';
import { setLogin } from '../redux/userSlice';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(8, 'At least 8 characters').required('Password is required'),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: { email: string; password: string }, { setSubmitting, setErrors }: any) => {
    try {
      const response = await fetch('http://localhost:4321/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const result = await response.json();
        // Dispatch login to Redux with the token or other user details
        dispatch(setLogin({ ...result, token: result.token }));

        navigate('/home'); // Redirect on success
      } else {
        const result = await response.json();
        setErrors({ general: result.message || 'Failed to login' });
      }
    } catch (err) {
      setErrors({ general: 'Something went wrong. Please try again later.' });
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
        {({ isSubmitting, errors, values }) => (
          <Form className="space-y-3">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-600 font-semibold flex justify-between">
                Email
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </label>
              <Field
                type="email"
                name="email"
                value={values.email}
                className="p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 text-gray-700"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-600 font-semibold flex justify-between">
                Password
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </label>
              <Field
                name="password"
                type="password"
                value={values.password}
                className="p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 text-gray-700"
                placeholder="Enter your password"
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className={`w-full font-bold bg-green-600 text-white py-1 hover:bg-green-700 transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <p className="mt-2 text-center text-black">
        Don't have an account?{' '}
        <a href="/register" className="text-black font-bold hover:underline">
          Register here
        </a>
      </p>
    </div>
  );
};

export default Login;
