import React, { useState } from 'react';
import { Mail, MapPin, Phone, Sparkles, Loader2 } from 'lucide-react';
import { generateTaglines } from '../services/geminiService';

export const Contact: React.FC = () => {
  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [validationErrors, setValidationErrors] = useState<{name?: string, email?: string, message?: string}>({});

  // AI Feature State
  const [businessDesc, setBusinessDesc] = useState('');
  const [taglines, setTaglines] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error for specific field on change
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const errors: {name?: string, email?: string, message?: string} = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
    return errors;
  };

  // Encode form data for Netlify
  const encode = (data: any) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setFormStatus('error');
      return;
    }

    setFormStatus('submitting');

    try {
      // POST request to Netlify
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...formData })
      });
      
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setFormStatus('error');
    }
  };

  const handleGenerateTaglines = async () => {
    if (!businessDesc.trim()) return;
    
    setIsGenerating(true);
    setTaglines([]);
    
    try {
      const results = await generateTaglines(businessDesc);
      setTaglines(results);
    } catch (err) {
      console.error(err);
      setTaglines(["Could not generate ideas at this time."]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white min-h-screen py-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Get in Touch</h1>
          <p className="mt-4 text-xl text-gray-500">
            Ready to start your project? Contact us or use our AI helper for some quick inspiration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Contact Info & Form */}
          <div className="space-y-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {formStatus === 'success' && (
                <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-md border border-green-200">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}
              
              {formStatus === 'error' && Object.keys(validationErrors).length === 0 && (
                <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
                  Something went wrong sending your message. Please try again.
                </div>
              )}

              <form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                name="contact" 
                method="post" 
                data-netlify="true" 
                data-netlify-honeypot="bot-field"
              >
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                   <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2
                      ${validationErrors.name ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Your Name"
                  />
                  {validationErrors.name && <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2
                      ${validationErrors.email ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="you@example.com"
                  />
                   {validationErrors.email && <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2
                      ${validationErrors.message ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Tell us about your project..."
                  />
                  {validationErrors.message && <p className="mt-1 text-sm text-red-600">{validationErrors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors font-medium flex justify-center items-center disabled:opacity-70"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Sending...
                    </>
                  ) : "Send Message"}
                </button>
              </form>
            </div>
            
            {/* Contact Details */}
            <div className="flex flex-col space-y-4 text-gray-600 pl-2">
              <div className="flex items-center">
                <MapPin className="mr-3 text-primary" size={20} />
                <span>123 Innovation Dr, Tech City, TC 90210</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 text-primary" size={20} />
                <span>+1 (555) 0123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-3 text-primary" size={20} />
                <span>hello@novacreative.com</span>
              </div>
            </div>
          </div>

          {/* Right Column: Gemini AI Playground */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-8 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <Sparkles className="mr-2 text-yellow-300" />
                <h2 className="text-2xl font-bold">Creative Spark AI</h2>
              </div>
              
              <p className="mb-6 text-indigo-100">
                Stuck on branding? Describe your business below and let our Gemini-powered AI generate catchy taglines for your new project.
              </p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="businessDesc" className="block text-sm font-medium text-indigo-200 mb-1">
                    Business Description
                  </label>
                  <textarea
                    id="businessDesc"
                    rows={3}
                    className="w-full rounded-md border-none bg-white/20 placeholder-indigo-200/50 text-white p-3 focus:ring-2 focus:ring-white/50"
                    placeholder="e.g. A coffee shop that also sells rare books..."
                    value={businessDesc}
                    onChange={(e) => setBusinessDesc(e.target.value)}
                  />
                </div>
                
                <button
                  onClick={handleGenerateTaglines}
                  disabled={isGenerating || !businessDesc.trim()}
                  className="w-full bg-white text-indigo-600 py-2 px-4 rounded-md font-bold hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Generating Ideas...
                    </>
                  ) : (
                    'Generate Taglines'
                  )}
                </button>
              </div>

              {taglines.length > 0 && (
                <div className="mt-8 animate-fade-in">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-100">Suggestions:</h3>
                  <ul className="space-y-3">
                    {taglines.map((tagline, idx) => (
                      <li key={idx} className="bg-white/10 p-3 rounded-lg border border-white/10 backdrop-blur-sm">
                        "{tagline}"
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};