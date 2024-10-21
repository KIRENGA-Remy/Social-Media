import React, { ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { setLogin, setLoading } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const authenticate = async () => {
      try {
        dispatch(setLoading(true));
        const response = await fetch('http://localhost:4321/auth/validate', {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json' 
        },
          credentials: 'include',
        },
      );

        if (response.ok) {
          const fetchedData = await response.json();
          dispatch(setLogin(fetchedData.user));
          navigate('/home');
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error during authentication', error);
        navigate('/');
      } finally {
        dispatch(setLoading(false)); // Set loading to false after completion
      }
    };

    authenticate();
  }, [dispatch, navigate]);

  if (loading) {
    return <div className='text-black text-xl font-semibold flex items-center justify-center'>Loading...</div>;
  }

  return <div>{children}</div>;
}

export default ProtectedRoute;
