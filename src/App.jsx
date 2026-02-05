import { useState, useEffect } from 'react';
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { UserAccountsPage } from './pages/UserAccountsPage';
import { DrowsinessReportsPage } from './pages/DrowsinessReportsPage';
import { ActiveAlertsPage } from './pages/ActiveAlertsPage';
import { ArchivePage } from './pages/ArchivePage';
import { initializeData } from './utils/initData';
import './styles/theme.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  const navigate = (page) => {
    setCurrentPage(page);
  };

  if (!isAuthenticated) {
    if (currentPage === 'forgot-password') {
      return (
        <ForgotPasswordPage
          onBackToLogin={() => setCurrentPage('login')}
        />
      );
    }

    return (
      <LoginPage
        onLogin={handleLogin}
        onForgotPassword={() => setCurrentPage('forgot-password')}
      />
    );
  }

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={navigate}
      onLogout={handleLogout}
    >
      {currentPage === 'dashboard' && <DashboardPage />}
      {currentPage === 'users' && <UserAccountsPage />}
      {currentPage === 'reports' && <DrowsinessReportsPage />}
      {currentPage === 'alerts' && <ActiveAlertsPage />}
    </Layout>
  );
}