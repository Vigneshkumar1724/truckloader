import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { getTheme } from './theme';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LoadMarketplace from './pages/LoadMarketplace';
import TruckMarketplace from './pages/TruckMarketplace';
import PostLoad from './pages/PostLoad';
import PostTruck from './pages/PostTruck';
import LoadDetail from './pages/LoadDetail';
import TruckDetail from './pages/TruckDetail';
import Dashboard from './pages/Dashboard';
import TransporterProfile from './pages/TransporterProfile';
import LiveTracking from './pages/LiveTracking';
import AuthPage from './pages/AuthPage';

function AppContent() {
  const { darkMode } = useApp();
  const theme = getTheme(darkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/loads" element={<LoadMarketplace />} />
              <Route path="/loads/:id" element={<LoadDetail />} />
              <Route path="/trucks" element={<TruckMarketplace />} />
              <Route path="/trucks/:id" element={<TruckDetail />} />
              <Route path="/post-load" element={<PostLoad />} />
              <Route path="/post-truck" element={<PostTruck />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile/:id" element={<TransporterProfile />} />
              <Route path="/tracking" element={<LiveTracking />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
