import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Page, SearchResult } from '../types';
import { services, projects } from '../data';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: Page) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search Pages
    if ('home'.includes(lowerQuery)) searchResults.push({ type: 'page', title: 'Home', page: Page.HOME });
    if ('contact'.includes(lowerQuery)) searchResults.push({ type: 'page', title: 'Contact Us', page: Page.CONTACT });
    if ('portfolio'.includes(lowerQuery) || 'work'.includes(lowerQuery)) searchResults.push({ type: 'page', title: 'Portfolio', page: Page.PORTFOLIO });
    if ('services'.includes(lowerQuery)) searchResults.push({ type: 'page', title: 'Services', page: Page.SERVICES });

    // Search Services
    services.forEach(s => {
      if (s.title.toLowerCase().includes(lowerQuery) || s.description.toLowerCase().includes(lowerQuery)) {
        searchResults.push({ 
          type: 'service', 
          title: s.title, 
          description: s.description,
          page: Page.SERVICES 
        });
      }
    });

    // Search Projects
    projects.forEach(p => {
      if (p.title.toLowerCase().includes(lowerQuery) || p.category.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          type: 'project',
          title: p.title,
          description: `Category: ${p.category}`,
          page: Page.PORTFOLIO
        });
      }
    });

    setResults(searchResults);
  }, [query]);

  if (!isOpen) return null;

  const handleResultClick = (page: Page) => {
    onNavigate(page);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" role="dialog" aria-modal="true">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

        <div className="inline-block w-full max-w-2xl my-12 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl ring-1 ring-black ring-opacity-5">
          <div className="relative border-b border-gray-200">
            <Search className="absolute left-4 top-4 text-gray-400" size={24} />
            <input
              ref={inputRef}
              type="text"
              className="w-full p-4 pl-14 text-lg bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-400 outline-none"
              placeholder="Search pages, services, or projects..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && onClose()}
            />
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {results.length > 0 ? (
              <ul className="py-2 text-sm text-gray-700 divide-y divide-gray-100">
                {results.map((result, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => handleResultClick(result.page)}
                      className="w-full text-left flex items-center px-6 py-3 hover:bg-gray-50 group transition-colors"
                    >
                      <div className="flex-shrink-0 mr-4">
                        <span className={`
                          inline-flex items-center justify-center h-8 w-8 rounded-lg
                          ${result.type === 'page' ? 'bg-blue-100 text-blue-600' : ''}
                          ${result.type === 'service' ? 'bg-purple-100 text-purple-600' : ''}
                          ${result.type === 'project' ? 'bg-green-100 text-green-600' : ''}
                        `}>
                          {result.type === 'page' && <Search size={14} />}
                          {result.type === 'service' && <ArrowRight size={14} />}
                          {result.type === 'project' && <ArrowRight size={14} />}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{result.title}</div>
                        {result.description && <div className="text-gray-500 mt-0.5">{result.description}</div>}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : query ? (
              <div className="py-14 px-6 text-center text-gray-500">
                <p>No results found for "{query}"</p>
              </div>
            ) : (
              <div className="py-14 px-6 text-center text-gray-500">
                <p>Type to search...</p>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 px-6 py-3 text-xs text-gray-500 flex justify-between border-t border-gray-100">
             <span>Search across Pages, Services and Portfolio</span>
             <span>ESC to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};