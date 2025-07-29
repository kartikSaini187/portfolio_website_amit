import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, MapPin, ExternalLink, Menu, X } from 'lucide-react';

const GraphicDesignerPortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Sample portfolio data - replace with actual designer's information
  const designerInfo = {
    name: "Alex Rivera",
    title: "Creative Graphic Designer",
    bio: "Passionate visual storyteller with 5+ years of experience creating compelling designs that connect brands with their audiences. Specialized in brand identity, web design, and print media.",
    email: "alex.rivera@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    skills: ["Brand Identity", "Web Design", "Print Design", "UI/UX", "Typography", "Illustration"]
  };

  const portfolioItems = [
    {
      id: 1,
      title: "Brand Identity - TechFlow",
      category: "Branding",
      description: "Complete brand identity design for a tech startup",
      url: "https://behance.net/project1",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop"
    },
    {
      id: 2,
      title: "E-commerce Website Design",
      category: "Web Design",
      description: "Modern e-commerce platform design with focus on user experience",
      url: "https://dribbble.com/project2",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Magazine Layout Design",
      category: "Print Design",
      description: "Editorial design for lifestyle magazine featuring clean typography",
      url: "https://behance.net/project3",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Mobile App UI Design",
      category: "UI/UX",
      description: "Intuitive mobile app interface for fitness tracking application",
      url: "https://dribbble.com/project4",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Restaurant Branding Package",
      category: "Branding",
      description: "Complete branding solution including logo, menu, and packaging design",
      url: "https://behance.net/project5",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=300&fit=crop"
    },
    {
      id: 6,
      title: "Corporate Annual Report",
      category: "Print Design",
      description: "Professional annual report design with data visualization",
      url: "https://dribbble.com/project6",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'portfolio', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold text-white">
              {designerInfo.name}
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Portfolio', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item === 'Home' ? 'hero' : item.toLowerCase())}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    activeSection === (item === 'Home' ? 'hero' : item.toLowerCase())
                      ? 'text-purple-400'
                      : 'text-white hover:text-purple-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-lg border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'About', 'Portfolio', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item === 'Home' ? 'hero' : item.toLowerCase())}
                  className="block w-full text-left px-3 py-2 text-white hover:text-purple-300 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-pulse">
            {designerInfo.name}
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 mb-8 font-light">
            {designerInfo.title}
          </p>
          <div className="mb-12">
            <button
              onClick={() => scrollToSection('portfolio')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              View My Work
            </button>
          </div>
          <div className="animate-bounce">
            <ChevronDown size={32} className="text-white mx-auto" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {designerInfo.bio}
              </p>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white mb-4">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-3">
                  {designerInfo.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-200 px-4 py-2 rounded-full border border-purple-500/30 hover:border-purple-400 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="text-purple-400" size={20} />
                    <span className="text-gray-300">{designerInfo.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="text-purple-400" size={20} />
                    <span className="text-gray-300">{designerInfo.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-purple-400" size={20} />
                    <span className="text-gray-300">{designerInfo.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">My Portfolio</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600/10 to-pink-600/10 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-purple-400 font-medium">{item.category}</span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors"
                  >
                    View Project
                    <ExternalLink size={14} className="ml-2" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Work Together</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300">
              Ready to bring your vision to life? Let's create something amazing together.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white">Email</h3>
                <a
                  href={`mailto:${designerInfo.email}`}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {designerInfo.email}
                </a>
              </div>
              
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                  <Phone className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white">Phone</h3>
                <a
                  href={`tel:${designerInfo.phone}`}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {designerInfo.phone}
                </a>
              </div>
              
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white">Location</h3>
                <p className="text-purple-400">{designerInfo.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 {designerInfo.name}. All rights reserved. Crafted with passion and creativity.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GraphicDesignerPortfolio;