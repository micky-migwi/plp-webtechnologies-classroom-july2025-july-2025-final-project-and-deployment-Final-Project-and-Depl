import React, { useState } from 'react';
import { Menu, X, Zap, Search, User as UserIcon, LogOut } from 'lucide-react';
import { Page } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { SearchOverlay } from './SearchOverlay';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { label: 'Home', value: Page.HOME },
    { label: 'Services', value: Page.SERVICES },
    { label: 'Portfolio', value: Page.PORTFOLIO },
    { label: 'Contact', value: Page.CONTACT },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    onNavigate(Page.HOME);
    setIsMobileMenuOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer group" 
              onClick={() => handleNavClick(Page.HOME)}
            >
              <div className="bg-primary text-white p-1.5 rounded-lg mr-2 group-hover:rotate-12 transition-transform">
                <Zap size={24} fill="currentColor" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">
                Nova<span className="text-primary">Creative</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    currentPage === item.value
                      ? 'text-primary'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="h-6 w-px bg-gray-200 mx-2"></div>

              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-500 hover:text-primary transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {isAuthenticated ? (
                 <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-700 font-medium">Hi, {user?.name}</span>
                    <button 
                      onClick={handleLogout}
                      className="text-gray-500 hover:text-red-600 transition-colors"
                      title="Logout"
                    >
                      <LogOut size={20} />
                    </button>
                 </div>
              ) : (
                <button
                  onClick={() => handleNavClick(Page.LOGIN)}
                  className="flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                >
                  <UserIcon size={18} className="mr-1" /> Sign In
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
               <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="text-gray-500 hover:text-gray-900"
                >
                  <Search size={24} />
                </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-500 hover:text-gray-900 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    currentPage === item.value
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="border-t border-gray-100 my-2 pt-2">
                 {isAuthenticated ? (
                    <>
                      <div className="px-3 py-2 text-sm text-gray-500">Signed in as <span className="font-bold">{user?.name}</span></div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                      >
                        Log Out
                      </button>
                    </>
                 ) : (
                   <button
                      onClick={() => handleNavClick(Page.LOGIN)}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-gray-50"
                    >
                      Sign In / Sign Up
                    </button>
                 )}
              </div>
            </div>
          </div>
        )}
      </header>
      
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
};