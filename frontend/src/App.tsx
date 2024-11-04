import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import Navbar from './components/Navbar';
import ProtectedRoute from './routes/ProtectedRoute';
import PostCreation from './pages/PostCreation';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  
  const mode = useSelector((state: any) => state.mode); 
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); 
  return (
    <ThemeProvider theme={theme}>
  <CssBaseline />
  <BrowserRouter>
    <ErrorBoundary>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create/post" element={<PostCreation />} />
        <Route path="/home" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </ErrorBoundary>
  </BrowserRouter>
</ThemeProvider>
  );
}

export default App;
