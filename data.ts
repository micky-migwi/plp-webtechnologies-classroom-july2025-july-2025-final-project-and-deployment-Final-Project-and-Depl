import { Code, Search, Smartphone, Globe, ShieldCheck, Lightbulb } from 'lucide-react';
import { Project, ServiceItem } from './types';

export const services: ServiceItem[] = [
  {
    title: 'Web Development',
    description: 'Custom websites built with React, TypeScript, and modern frameworks tailored to your needs.',
    icon: Code,
  },
  {
    title: 'SEO Optimization',
    description: 'Improve your search engine rankings and drive organic traffic with our proven strategies.',
    icon: Search,
  },
  {
    title: 'Mobile App Design',
    description: 'Native and cross-platform mobile application designs that provide seamless user experiences.',
    icon: Smartphone,
  },
  {
    title: 'Global Branding',
    description: 'We help define your voice and visual identity to resonate across international markets.',
    icon: Globe,
  },
  {
    title: 'Cyber Security',
    description: 'Protect your digital assets with our comprehensive security audits and implementation.',
    icon: ShieldCheck,
  },
  {
    title: 'AI Integration',
    description: 'Leverage the power of Gemini and other AI models to automate workflows and generate content.',
    icon: Lightbulb,
  },
];

export const projects: Project[] = [
  { id: 1, title: 'EcoFin App', category: 'Mobile', imageUrl: 'https://picsum.photos/id/1/800/600' },
  { id: 2, title: 'Nebula Dashboard', category: 'Web', imageUrl: 'https://picsum.photos/id/20/800/600' },
  { id: 3, title: 'Zenith Brand', category: 'Branding', imageUrl: 'https://picsum.photos/id/180/800/600' },
  { id: 4, title: 'Flow State', category: 'Web', imageUrl: 'https://picsum.photos/id/96/800/600' },
  { id: 5, title: 'Urban Guide', category: 'Mobile', imageUrl: 'https://picsum.photos/id/122/800/600' },
  { id: 6, title: 'Pure Honey', category: 'Branding', imageUrl: 'https://picsum.photos/id/225/800/600' },
];