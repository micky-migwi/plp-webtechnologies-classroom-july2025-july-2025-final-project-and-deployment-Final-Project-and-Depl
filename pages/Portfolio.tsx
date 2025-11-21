import React, { useState } from 'react';
import { projects } from '../data';

export const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Web', 'Mobile', 'Branding'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="bg-gray-50 min-h-screen py-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Work</h1>
          <p className="mt-4 text-xl text-gray-500">
            A showcase of our most recent projects and case studies.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center space-x-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === cat
                  ? 'bg-primary text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                   <span className="text-white opacity-0 group-hover:opacity-100 font-semibold text-lg border border-white px-4 py-2 rounded">View Project</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-primary font-medium mb-1">{project.category}</p>
                <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
           <div className="text-center py-20 text-gray-500">
             No projects found in this category.
           </div>
        )}
      </div>
    </div>
  );
};