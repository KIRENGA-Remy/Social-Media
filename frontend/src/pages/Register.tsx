import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageToBase64 } from '../utility/ImageToBase64';
import loginSignupImage from '../assets/login-animation.gif';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import axios from 'axios';

interface InitialValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  occupation: string;
  picturePath: string | null;
  location: string;
  friends: string[];
  viewedProfile: number;
  impressions: number;
}

const initialValues: InitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  occupation: '',
  picturePath: null,
  location: '',
  friends: [],
  viewedProfile: 0,
  impressions: 0,
};

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(8, 'At least 8 characters').required('Password is required'),
  occupation: Yup.string().required('Occupation is required'),
  location: Yup.string().required('Location is required'),
});

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [picturePath, setPicturePath] = useState<string | null>(null);

  const handleUploadProfileImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await imageToBase64(file);
      if (typeof base64 === 'string') {
        setPicturePath(base64);
      } else {
        console.error('Error converting image to base64 string');
      }
    } else {
      console.error('No picture found');
    }
  };

  const handleSubmit = async (values: InitialValues, { setSubmitting, setErrors }: any) => {
    try {
      setSubmitting(true);

      const formData = {
        ...values,
        picturePath, 
      };

      const response = await axios.post('http://localhost:4321/auth/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data.message || 'Registration successful');
      navigate('/');
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        console.error('Registration error:', error.response.data.message);
      } else {
        console.error('Registration error:', error);
      }
      setErrors({ general: error.response?.data?.message || 'Something went wrong. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 h-[460px] flex justify-center items-center my-24 shadow-md md:mx-48 mx-8 flex-row rounded-lg">
      <div className="md:bg-green-500 md:h-full md:flex md:flex-col md:gap-6 md:py-6 md:px-8 md:w-1/2 md:rounded-tr-none md:rounded-br-none md:rounded-lg hidden">
        <div className="w-32 items-center mx-auto my-4 overflow-hidden rounded-full">
          <img src={loginSignupImage} alt="image" className="w-full" />
        </div>
        <p className="text-white font-semibold mx-auto">TRY FREE FOR 14 DAYS</p>
        <h1 className="text-white text-3xl flex font-bold text-start">Join +12,000 users <br /> worldwide</h1>
        <p className="text-lg text-white font-semibold">
          "Take it for a spin, experience our fanatical support <br /> if you need any help, and <br />
          you will love it too... I guarantee it".
        </p>
        <h3 className="text-xl text-white font-bold items-start">GITOLI Remy Claudien, Founder</h3>
      </div>

      <div className="bg-white rounded-tl-none rounded-bl-none rounded-lg md:w-1/2 md:px-8 px-4 md:py-4 py-2 w-full h-full">
        <h2 className="text-3xl font-bold text-center mb-6 mt-2">Create Account</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-3">
              <div className="flex flex-col w-full">
                <label htmlFor="firstName" className="text-gray-600 font-semibold flex justify-between">
                  First name
                  <ErrorMessage name="firstName" component="div" className="text-red-500" />
                </label>
                <Field
                  type="text"
                  name="firstName"
                  className="p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 text-gray-700"
                  placeholder="Enter your first name"
                />
              </div>

                            {/* Last Name */}
                            <div className="flex flex-col w-full">
                <label htmlFor="lastName" className="text-gray-600 font-semibold flex justify-between">
                  Last name
                  <ErrorMessage name="lastName" component="div" className="text-red-500" />
                </label>
                <Field
                  type="text"
                  name="lastName"
                  className="p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 text-gray-700"
                  placeholder="Enter your last name"
                />
              </div>
              {/* Email */}
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
              {/* Password */}
              <div className="flex flex-col w-full">
                <label htmlFor="password" className="text-gray-600 font-semibold flex justify-between">
                  Password
                  <ErrorMessage name="password" component="div" className="text-red-500" />
                </label>
                <Field
                  type="password"
                  name="password"
                  className="p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 text-gray-700"
                  placeholder="Enter your password"
                />
              </div>
              {/* Occupation */}
              <div className="flex flex-col w-full">
                <label htmlFor="occupation" className="text-gray-600 font-semibold flex justify-between">
                  Occupation
                  <ErrorMessage name="occupation" component="div" className="text-red-500" />
                </label>
                <Field
                  type="text"
                  name="occupation"
                  className="p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 text-gray-700"
                  placeholder="Enter your occupation"
                />
              </div>
              {/* Location */}
              <div className="flex flex-col w-full">
                <label htmlFor="location" className="text-gray-600 font-semibold flex justify-between">
                  Location
                  <ErrorMessage name="location" component="div" className="text-red-500" />
                </label>
                <Field
                  type="text"
                  name="location"
                  className="p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 text-gray-700"
                  placeholder="Enter your location"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="text-gray-600 font-semibold flex justify-between">Profile Picture (Optional)</label>
                <div className="p-1 rounded-sm font-bold w-full border border-[#20B486] flex items-center justify-center cursor-pointer">
                  <label htmlFor="picturePath" className="cursor-pointer flex items-center">
                    {!picturePath ? (
                      <p className="hover:underline">Upload Image</p>
                    ) : (
                      <>
                        <Typography>Image Uploaded</Typography>
                        <EditOutlinedIcon className="ml-2" />
                      </>
                    )}
                  </label>
                  <input
                    id="picturePath"
                    type="file"
                    accept="image/*"
                    name="picturePath"
                    onChange={handleUploadProfileImage}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className={`w-full font-bold bg-green-600 text-white py-1 hover:bg-green-700 transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Register'}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <p className="mt-2 text-center text-black flex justify-between">
          Already have an account?{' '}
          <a href="/" className="text-black font-bold hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
