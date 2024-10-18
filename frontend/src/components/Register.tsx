// import React, { useState, ChangeEvent } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { imageToBase64 } from '../utility/ImageToBase64';

// interface RegisterFormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   occupation: string;
//   picturePath: string; 
//   location: string;
// }

// const Register: React.FC = () => {
//   const [formData, setFormData] = useState<RegisterFormData>({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     occupation: '',
//     picturePath: '', 
//     location: '',
//   });
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const navigate = useNavigate();

//   // Handle input field change
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   // Handle image upload and convert to Base64
//   const handleUploadProfileImage = async (e: ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return; // Guard clause for safety

//     const data = await imageToBase64(e.target.files[0]); // Convert image to base64
//     if (typeof data === 'string') {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         picturePath: data, // Updated field to match the backend model
//       }));
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('http://localhost:4321/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       setLoading(false);

//       if (response.ok) {
//         navigate('/'); // Redirect on success
//       } else {
//         const result = await response.json();
//         setError(result.message || 'Failed to register.');
//       }
//     } catch (err) {
//       setLoading(false);
//       setError('Something went wrong. Please try again later.');
//     }
//   };

//   return (
//     <div className="bg-green-500 h-max flex justify-center items-center  my-24 shadow-md mx-48 flex-row rounded-lg">
//         <div className='flex flex-col justify-center gap-12 px-8 w-1/2 h-full'>
//             <p className='text-white font-semibold'>TRY FREE FOR 14 DAYS</p>
//             <h1 className='text-white text-3xl font-bold'>Join over <br/> 12,000 users worldwide</h1>
//             <p className='text-lg text-white font-semibold'>"Take it for a spin, experience our fanatical support <br/> if you need any help, and <br/>
//                 you will love it too... I guarantee it". 
//             </p>
//             <h3 className='text-xl text-white font-bold'>GITOLI Remy Claudien, Founder</h3>
//         </div>
//       <div className="bg-white shadow-lg rounded-tl-none rounded-bl-none rounded-lg w-1/2 px-8 py-4 h-full">
//         <h2 className="text-3xl font-bold text-center text- mb-6">Create Account</h2>
//         <form onSubmit={handleSubmit} className="space-y-3">
//           <div className="flex flex-col">
//           <label className="text-black">First Name</label>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               className="p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 md:w-full w-1/2 text-gray-700"
//               placeholder="Enter your first name"
//               required
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="text-black">Last Name</label>
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               className="p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 text-gray-700"
//               placeholder="Enter your last name"
//               required
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="text-black">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 text-gray-700"
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="text-black">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 text-gray-700"
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="text-black">Occupation</label>
//             <input
//               type="text"
//               name="occupation"
//               value={formData.occupation}
//               onChange={handleChange}
//               className="p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 text-gray-700"
//               placeholder="Enter your occupation"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="text-black">Profile Picture (Optional)</label>
//             <input
//               type={"file"}
//               name="picturePath"
//               accept="image/*"
//               onChange={handleUploadProfileImage}
//               className="p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 text-gray-700"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="text-black">Location</label>
//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               className="p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 text-gray-700"
//               placeholder="Enter your location"
//               required
//             />
//           </div>
//           <div className='pt-4'>
//           {error && <p className="text-red-500">{error}</p>}
//           <button
//             type="submit"
//             className={`w-full font-bold bg-green-600 text-white py-2 hover:bg-green-700 transition duration-300 ${
//               loading ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//             disabled={loading}
//           >
//             {loading ? 'Creating Account...' : 'Register'}
//           </button>
//           </div>
//         </form>
//         <p className="mt-3 text-center text-black">
//           Already have an account?{' '}
//           <a href="/" className="text-black font-bold hover:underline">
//             Login here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;

















import React from 'react';
import { useNavigate } from 'react-router-dom';
import { imageToBase64 } from '../utility/ImageToBase64';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  occupation: '',
  picturePath: '', 
  location: ''
}

const validationShema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(8, 'Atleast 8 characters').required('Password is required'),
  occupation: Yup.string().required('Occupation is required'),
  picturePath: Yup.string(),
  location: Yup.string().required('Location is required')
})

const Register: React.FC = () => {
  const navigate = useNavigate();

    const handleUploadProfileImage = async (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
      if (!e.target.files) return;
  
      const data = await imageToBase64(e.target.files[0]);
      if (typeof data === 'string') {
        setFieldValue('picturePath', data);
      }
    };

  const handleSubmit = async (values: typeof initialValues, { setSubmitting, setErrors} : any) => {

    try {
      const response = await fetch('http://localhost:4321/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      setSubmitting(true)

      if (response.ok) {
        navigate('/'); 
      } else {
        const result = await response.json();
        setErrors({general: result.message || 'Failed to register.'});
      }
    } catch (err) {
      setSubmitting(false)
      setErrors({general: 'Something went wrong. Please try again later.'});
    } finally{
      setSubmitting(false)
    }
  };

  return (
    <div className="bg-gray-100 h-[660px] flex justify-center items-center  my-24 shadow-md mx-48 flex-row rounded-lg">
        <div className='bg-green-500 h-full flex flex-col gap-6 items-center py-12 px-8 w-1/2 rounded-tr-none rounded-br-none rounded-lg'>
            <p className='text-white font-semibold'>TRY FREE FOR 14 DAYS</p>
            <h1 className='text-white text-3xl font-bold'>Join +12,000 users <br/> worldwide</h1>
            <p className='text-lg text-white font-semibold'>"Take it for a spin, experience our fanatical support <br/> if you need any help, and <br/>
                you will love it too... I guarantee it". 
            </p>
            <h3 className='text-xl text-white font-bold'>GITOLI Remy Claudien, Founder</h3>
        </div>
      <div className="bg-white rounded-tl-none rounded-bl-none rounded-lg w-1/2 px-8 py-4 h-full">
        <h2 className="text-3xl font-bold text-center mb-6 -mt-2">Create Account</h2>

        <Formik 
        initialValues={initialValues}
        validationSchema={validationShema}
        onSubmit={handleSubmit}>
          {({ isSubmitting, setFieldValue, errors }) => (
            <Form className='space-y-3'>
              <div className='flex flex-col'>
                <label htmlFor="firstName" className='text-gray-600 font-semibold flex justify-between'>
                  First name 
                  <ErrorMessage name='firstName' component='div' className='text-red-500' />
                </label>
                <Field
                type='text'
                name='firstName'
                className='p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 md:w-full w-1/2 text-gray-700'
                placeholder='Enter your first name'
                 />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="lastName" className='text-gray-600 font-semibold flex justify-between'>
                  Last name 
                  <ErrorMessage name='lastName' component='div' className='text-red-500' />
                </label>
                <Field
                type='text'
                name='lastName'
                className='p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 md:w-full w-1/2 text-gray-700'
                placeholder='Enter your last name'
                 />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="email" className='text-gray-600 font-semibold flex justify-between'>
                  Email 
                  <ErrorMessage name='email' component='div' className='text-red-500' />
                </label>
                <Field
                type='email'
                name='email'
                className='p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 md:w-full w-1/2 text-gray-700'
                placeholder='Enter your email'
                 />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="password" className='text-gray-600 font-semibold flex justify-between'>
                  Password 
                  <ErrorMessage name='password' component='div' className='text-red-500' />
                </label>
                <Field
                type='password'
                name='password'
                className='p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 md:w-full w-1/2 text-gray-700'
                placeholder='Enter your password'
                 />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="occupation" className='text-gray-600 font-semibold flex justify-between'>
                  Occupation 
                  <ErrorMessage name='occupation' component='div' className='text-red-500' />
                </label>
                <Field
                type='text'
                name='occupation'
                className='p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 md:w-full w-1/2 text-gray-700'
                placeholder='Enter your occupation'
                 />
              </div>
              <div className="flex flex-col">
                <label className="text-black">Profile Picture (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUploadProfileImage(e, setFieldValue)}
                  className="p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 text-gray-700"
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="location" className='text-gray-600 font-semibold flex justify-between'>
                  Location 
                  <ErrorMessage name='location' component='div' className='text-red-500' />
                </label>
                <Field
                type='text'
                name='location'
                className='p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 md:w-full w-1/2 text-gray-700'
                placeholder='Enter your location'
                 />
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
