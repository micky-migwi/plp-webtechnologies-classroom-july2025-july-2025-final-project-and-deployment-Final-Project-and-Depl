import React from 'react';
import { ArrowRight, Monitor, PenTool, TrendingUp } from 'lucide-react';
import { Page } from '../types';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">We craft digital</span>{' '}
                  <span className="block text-primary xl:inline">masterpieces</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Elevate your brand with award-winning design, cutting-edge development, and data-driven marketing strategies tailored for growth.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => onNavigate(Page.PORTFOLIO)}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-indigo-700 md:py-4 md:text-lg transition-all"
                    >
                      View Our Work
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      onClick={() => onNavigate(Page.CONTACT)}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg transition-all"
                    >
                      Get in Touch
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-50">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-90"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt="Team working on design"
          />
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">What We Do</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to build online
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Digital Strategy',
                  description: 'We map out the path to your success with data-backed insights.',
                  icon: TrendingUp,
                },
                {
                  title: 'UI/UX Design',
                  description: 'Beautiful, intuitive interfaces that users love to interact with.',
                  icon: PenTool,
                },
                {
                  title: 'Web Development',
                  description: 'Robust, scalable code that powers your business 24/7.',
                  icon: Monitor,
                },
              ].map((feature, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-4">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 text-center">
             <button 
               onClick={() => onNavigate(Page.SERVICES)}
               className="inline-flex items-center text-primary font-semibold hover:text-indigo-700"
             >
               See all services <ArrowRight size={16} className="ml-1" />
             </button>
          </div>
        </div>
      </section>
    </div>
  );
};