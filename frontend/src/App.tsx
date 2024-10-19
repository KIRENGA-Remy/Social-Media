import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import Navbar from './components/Navbar';

function App() {
  const mode = useSelector((state: any) => state.mode); // Get mode from Redux state (light/dark)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // Create MUI theme based on mode

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        {/* Render the Navbar component outside the Routes */}
        <Navbar />
        
        {/* Route handling */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Dashboard />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
