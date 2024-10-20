// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// // import { Formik, Field, Form, ErrorMessage} from 'formik'
// // import * as Yup from 'yup'

// interface LoginFormData {
//   email: string;
//   password: string;
// }

// const Login :React.FC = () => {

//     const [formData, setFormData] = useState<LoginFormData>({
//         email: '',
//         password: ''
//       });
//       const [error, setError] = useState<string | null>(null);
//       const [loading, setLoading] = useState<boolean>(false);
//       const navigate = useNavigate();
    
//       // Handle input field change
//       const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//       };
    
//       // Handle form submission
//       const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         setLoading(true);
//         setError(null);
    
//         try {
//           const response = await fetch('http://localhost:4321/auth/login', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData),
//           });
    
//           setLoading(false);
//     console.log(response);
    
//           if (response.ok) {
//             navigate('/home'); // Redirect on success
//           } else {
//             const result = await response.json();
//             setError(result.message || 'Failed to register.');
//           }
//         } catch (err) {
//           setLoading(false);
//           console.log(" THIS IS THE ERROR ", err);
//           setError('Something went wrong. Please try again later.');
//         }
//       };

//      return (
//     <div className="bg-white flex flex-col mx-auto my-24 py-4 shadow-2xl rounded-tl-none rounded-bl-none rounded-lg w-1/2 px-8 h-full">
//     <h2 className="text-3xl font-bold text-center text- mb-6">Login</h2>
//     <form onSubmit={handleSubmit} className="space-y-3">
//       <div className="flex flex-col">
//         <label className="text-black">Email</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           className="p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 text-gray-700"
//           placeholder="Enter your email"
//           required
//         />
//       </div>
//       <div className="flex flex-col">
//         <label className="text-black">Password</label>
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           className="p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 text-gray-700"
//           placeholder="Enter your password"
//           required
//         />
//       </div>
//       <div className='pt-4'>
//       {error && <p className="text-red-500">{error}</p>}
//       <button
//         type="submit"
//         className={`w-full font-bold bg-green-600 text-white py-2 hover:bg-green-700 transition duration-300 ${
//           loading ? 'opacity-50 cursor-not-allowed' : ''
//         }`}
//         disabled={loading}
//       >
//         {loading ? 'Login in...' : 'Login'}
//       </button>
//       </div>
//     </form>
//     <p className="mt-3 text-center text-black">
//       Don't have an account?{' '}
//       <a href="/register" className="text-black font-bold hover:underline">
//         Register here
//       </a>
//     </p>
//   </div>
// )
// };

// export default Login;





























import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage} from 'formik'
import * as Yup from 'yup'

const initialValues= {
  email: '',
  password: ''
}

const validationShema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(8, 'Atleast 8 characters').required('Password is required')
})

const Login :React.FC = () => {
      const navigate = useNavigate();
    
      const handleSubmit = async (values: {email: string, password: string}, { setSubmitting, setErrors}: any) => {
        try {
          const response = await fetch('http://localhost:4321/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
    
          if (response.ok) {
            navigate('/home'); // Redirect on success
          } else {
            const result = await response.json();
            setErrors({ general: result.message || 'Failed to Login'});
          }
        } catch (err) {
          setSubmitting(false);
          setErrors({ general: 'Something went wrong. Please try again later.'});
        } finally {
          setSubmitting(false);
        }
      };

     return (
    <div className="bg-white flex flex-col mx-auto my-24 py-4 shadow-2xl rounded-tl-none rounded-bl-none rounded-lg md:w-1/2 w-11/12 px-8 h-full">
    <h2 className="text-3xl font-bold text-center text- mb-6">Login</h2>

    <Formik 
      initialValues={initialValues}
      validationShema={validationShema}
      onSubmit={handleSubmit}>

        {({ isSubmitting, errors}) => (
          <Form className='space-y-3'>
            <div className='flex flex-col'>
              <label htmlFor="email" className='text-gray-600 font-semibold flex justify-between'>
                Email 
                <ErrorMessage name='email' component='div' className='text-red-500' />
              </label>
              <Field
              type="email"
              name="email"
              className="p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 text-gray-700"
              placeholder="Enter your email" />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="password" className='text-gray-600 font-semibold flex justify-between'>
                Password 
                <ErrorMessage name='password' component='div' className='text-red-500' />
              </label>
              <Field 
              name="password"
              type="password"
              className="p-1 rounded-sm focus:border-blue-600 border border-[#20B486] bg-white indent-3 text-gray-700"
              placeholder="Enter your password" />
            </div>
            <div className='pt-4'>
            <button
            type='submit'
            className={`w-full font-bold bg-green-600 text-white py-1 hover:bg-green-700 transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
            </div>
          </Form>
        ) }
    </Formik>
    <p className="mt-2 text-center text-black md:flex md:justify-between md:flex-row flex flex-col">
      Don't have an account?{' '}
      <a href="/register" className="text-black font-bold hover:underline">
        Register here
      </a>
    </p>
  </div>
)
};

export default Login;