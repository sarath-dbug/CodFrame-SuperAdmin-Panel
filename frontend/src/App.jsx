import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './App.css';
import Auth from './pages/Auth';
import DashBoard from './pages/DashBoard';
import CRMAdmin from './pages/CRM-Admin';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import PageNotFound from './components/PageNotFound';
import { ThemeProvider } from './components/ThemeProvider';
import { CrmAdminProvider } from './components/CRM-Context'; 

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <CrmAdminProvider> {/* Add this provider */}
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Auth />} />
              <Route path="/login" element={<Auth />} />

              {/* Protected routes */}
              <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route index element={<DashBoard />} />
                <Route path="dashboard" element={<DashBoard />} />
                <Route path="crm-admins" element={<CRMAdmin />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </Router>
        </CrmAdminProvider> {/* Close provider */}
      </ThemeProvider>
    </Provider>
  );
}

export default App;