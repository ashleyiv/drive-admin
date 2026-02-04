import { useState, useEffect } from 'react';
import { LoginPage } from './pages/LoginPage';
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

  useEffect(() => {
    // Initialize data on app load
    initializeData();
  }, []);

  const handleLogin = (email, password) => {
    // Simple mock authentication - in production this would validate against a backend
    if (email && password) {
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
      return { success: true };
    }
    return { success: false, error: 'Please enter both email and password' };
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'users':
        return (
          <UserAccountsPage
            onNavigateToArchive={() => setCurrentPage('archive')}
          />
        );
      case 'archive':
        return (
          <ArchivePage
            onNavigateBack={() => setCurrentPage('users')}
          />
        );
      case 'reports':
        return <DrowsinessReportsPage />;
      case 'alerts':
        return <ActiveAlertsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <Layout
  currentPage={currentPage}
  onNavigate={setCurrentPage}
  onLogout={() => {
    setIsAuthenticated(false);
    setCurrentPage('login');
  }}
>
  {renderPage()}
</Layout>

  );
}
