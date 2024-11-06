import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import ProtectedRoute from './routes/ProtectedRoute';
import PostCreation from './pages/PostCreation';
import ErrorBoundary from './components/ErrorBoundary';
import { RootState } from './redux/store';

function App() {
  
  const mode = useSelector((state: RootState) => state.user.mode); 
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); 
  return (
    <ThemeProvider theme={theme}>
  <CssBaseline />
  <BrowserRouter>
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create/post" element={<PostCreation />} />
        <Route path="/home" element={<Dashboard />} />
      </Routes>
    </ErrorBoundary>
  </BrowserRouter>
</ThemeProvider>
  );
}

export default App;
