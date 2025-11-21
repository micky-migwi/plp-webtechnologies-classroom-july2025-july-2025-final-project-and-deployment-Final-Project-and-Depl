// Define the available pages for navigation
export enum Page {
  HOME = 'HOME',
  SERVICES = 'SERVICES',
  PORTFOLIO = 'PORTFOLIO',
  CONTACT = 'CONTACT',
  LOGIN = 'LOGIN'
}

// Structure for portfolio items
export interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
}

// Structure for service offerings
export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

// Structure for AI Tagline response
export interface TaglineResponse {
  taglines: string[];
}

// User interface for Authentication
export interface User {
  email: string;
  name: string;
}

// Search Result interface
export interface SearchResult {
  type: 'page' | 'service' | 'project';
  title: string;
  description?: string;
  page: Page;
}