import React from 'react';
import { ArrowRight } from 'lucide-react';
import { services } from '../data';

export const Services: React.FC = () => {
  return (
    <div className="bg-white min-h-screen animate-fade-in py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Services</h1>
          <p className="mt-4 text-xl text-gray-500">
            Comprehensive digital solutions for modern businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div 
              key={index}
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-primary ring-4 ring-white">
                  <service.icon size={24} />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {service.description}
                </p>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <ArrowRight size={20} />
              </span>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-indigo-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
           <div>
             <h3 className="text-2xl font-bold text-gray-900">Need a custom solution?</h3>
             <p className="mt-2 text-gray-600">We specialize in solving complex problems with elegant code.</p>
           </div>
           <button className="mt-6 md:mt-0 bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors">
             Schedule a Consultation
           </button>
        </div>
      </div>
    </div>
  );
};