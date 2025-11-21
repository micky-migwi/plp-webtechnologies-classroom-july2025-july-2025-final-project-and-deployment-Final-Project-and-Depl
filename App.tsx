import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Page } from './types';
import { AuthProvider } from './contexts/AuthContext';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);

  // Simple function to render the correct page component based on state
  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <Home onNavigate={setCurrentPage} />;
      case Page.SERVICES:
        return <Services />;
      case Page.PORTFOLIO:
        return <Portfolio />;
      case Page.CONTACT:
        return <Contact />;
      case Page.LOGIN:
        return <Login onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      {/* Main Content Area */}
      <main className="flex-grow">
        {renderPage()}
      </main>
      
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;