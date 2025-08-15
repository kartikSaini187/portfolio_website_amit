import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Mail, Phone, Menu, X, Home, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const GraphicDesignerPortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [animatedElements, setAnimatedElements] = useState(new Set());

  // Company information
  const companyInfo = {
    name: "TechFlow",
    tagline: "Innovating Tomorrow's Technology Today",
    description: "We deliver cutting-edge solutions that transform businesses and drive digital excellence.",
    address: {
      street: "123 Innovation Street",
      city: "New York, NY 10001",
      country: "United States"
    },
    phones: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    emails: ["info@techflow.com", "support@techflow.com"],
    socials: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com"
    }
  };

  const services = [
    {
      id: 1,
      icon: "💡",
      title: "Digital Innovation",
      description: "Transform your business with cutting-edge digital solutions and innovative strategies that drive growth."
    },
    {
      id: 2,
      icon: "🚀",
      title: "Cloud Solutions",
      description: "Scalable and secure cloud infrastructure designed to optimize your operations and reduce costs."
    },
    {
      id: 3,
      icon: "🔒",
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your data and maintain business continuity."
    },
    {
      id: 4,
      icon: "📊",
      title: "Data Analytics",
      description: "Unlock insights from your data with advanced analytics and machine learning solutions."
    },
    {
      id: 5,
      icon: "🤖",
      title: "AI Integration",
      description: "Harness the power of artificial intelligence to automate processes and enhance decision-making."
    },
    {
      id: 6,
      icon: "📱",
      title: "Mobile Solutions",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences."
    }
  ];

  const stats = [
    { value: 500, label: "Projects Delivered", suffix: "+" },
    { value: 98, label: "Client Satisfaction", suffix: "%" },
    { value: 150, label: "Team Members", suffix: "+" }
  ];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section
      const sections = ['home', 'services', 'about'];
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

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animatedElements.has(entry.target)) {
            entry.target.classList.add('animate');
            setAnimatedElements(prev => new Set(prev).add(entry.target));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, [animatedElements]);

  // Preloader
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleNewsletterSubmit = () => {
    if (!newsletterEmail) return;
    
    setNewsletterStatus('loading');
    
    setTimeout(() => {
      setNewsletterStatus('success');
      setNewsletterEmail('');
      
      setTimeout(() => {
        setNewsletterStatus('');
      }, 3000);
    }, 1500);
  };

  // Animated counter component
  const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            const startTime = Date.now();
            const updateCount = () => {
              const now = Date.now();
              const progress = Math.min((now - startTime) / duration, 1);
              setCount(Math.floor(progress * end));
              
              if (progress < 1) {
                requestAnimationFrame(updateCount);
              }
            };
            updateCount();
          }
        },
        { threshold: 0.5 }
      );

      if (countRef.current) {
        observer.observe(countRef.current);
      }

      return () => observer.disconnect();
    }, [end, duration]);

    return <span ref={countRef}>{count}{suffix}</span>;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Custom styles */}
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes floatUp {
          from {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          to {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
          }
        }
        
        @keyframes glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.2); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
        }
        
        .animate-on-scroll.animate {
          animation: fadeInUp 0.8s forwards;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #6366f1, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 3s ease-in-out infinite;
          background-size: 200% 200%;
        }
        
        .floating {
          animation: float 3s ease-in-out infinite;
        }
        
        .glowing {
          animation: glow 2s ease-in-out infinite;
        }
        
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(99, 102, 241, 0.6);
          border-radius: 50%;
          pointer-events: none;
        }
        
        .hero-bg-gradient {
          background: radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%);
        }
        
        .footer-bg-animation {
          background: radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
          animation: pulse 10s ease-in-out infinite;
        }
        
        .newsletter-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
          animation: spin 20s linear infinite;
        }
        
        .wave-animation {
          animation: wave 10s linear infinite;
        }
      `}</style>

      {/* Preloader */}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] bg-slate-900 flex items-center justify-center transition-opacity duration-1000">
          <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/90 backdrop-blur-lg shadow-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold gradient-text glowing cursor-pointer">
              {companyInfo.name}
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'Services', 'About'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    activeSection === item.toLowerCase()
                      ? 'text-indigo-400'
                      : 'text-white hover:text-indigo-300'
                  }`}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
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
        <div className={`md:hidden fixed top-16 right-0 w-4/5 max-w-sm h-screen bg-slate-900/98 backdrop-blur-lg transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 space-y-4">
            {['Home', 'Services', 'About'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left text-lg text-white hover:text-indigo-300 transition-colors py-2"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 hero-bg-gradient"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '-10px',
                animation: `floatUp ${Math.random() * 20 + 20}s linear infinite`,
                animationDelay: `${Math.random() * 20}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-on-scroll">
            Welcome to <span className="gradient-text">{companyInfo.name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            {companyInfo.tagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => scrollToSection('services')}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-indigo-500/25 transform hover:-translate-y-1 transition-all duration-300"
            >
              Explore Services
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="px-8 py-4 border-2 border-indigo-600 text-indigo-400 rounded-full font-semibold text-lg hover:bg-indigo-600 hover:text-white transform hover:-translate-y-1 transition-all duration-300"
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-white" />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Cutting-edge solutions tailored to transform your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="animate-on-scroll group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-slate-800/50 border border-indigo-500/20 rounded-2xl p-8 text-center hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  
                  <div className="text-5xl mb-4 floating">{service.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4 text-white">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full filter blur-[100px] opacity-20 animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Driving <span className="gradient-text">Innovation</span> Forward
              </h2>
              <p className="text-lg text-gray-400 mb-6">
                At {companyInfo.name}, we're more than just a technology company. We're your partners in digital transformation, committed to delivering innovative solutions that propel your business into the future.
              </p>
              <p className="text-lg text-gray-400 mb-8">
                With over a decade of experience and a team of industry experts, we've helped hundreds of businesses navigate the digital landscape and achieve remarkable results.
              </p>
              
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-indigo-500 mb-2">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="animate-on-scroll relative" style={{ animationDelay: '0.2s' }}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/20">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900 border-t border-indigo-500/20 overflow-hidden">
        <div className="absolute inset-0 footer-bg-animation"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="animate-on-scroll">
              <h3 className="text-2xl font-bold gradient-text mb-4">{companyInfo.name}</h3>
              <p className="text-gray-400 mb-6">{companyInfo.description}</p>
              <div className="flex space-x-4">
                <a href={companyInfo.socials.facebook} className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center justify-center text-indigo-400 hover:bg-indigo-500 hover:text-white hover:-translate-y-1 transition-all duration-300">
                  <Facebook size={18} />
                </a>
                <a href={companyInfo.socials.twitter} className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center justify-center text-indigo-400 hover:bg-indigo-500 hover:text-white hover:-translate-y-1 transition-all duration-300">
                  <Twitter size={18} />
                </a>
                <a href={companyInfo.socials.linkedin} className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center justify-center text-indigo-400 hover:bg-indigo-500 hover:text-white hover:-translate-y-1 transition-all duration-300">
                  <Linkedin size={18} />
                </a>
                <a href={companyInfo.socials.instagram} className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center justify-center text-indigo-400 hover:bg-indigo-500 hover:text-white hover:-translate-y-1 transition-all duration-300">
                  <Instagram size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="animate-on-scroll" style={{ animationDelay: '0.1s' }}>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Services', 'About', 'Careers', 'Blog'].map((link) => (
                  <li key={link}>
                    <button 
                      onClick={() => link === 'Home' || link === 'Services' || link === 'About' ? scrollToSection(link.toLowerCase()) : null}
                      className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center group cursor-pointer bg-transparent border-none text-left"
                    >
                      <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">▸</span>
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="animate-on-scroll" style={{ animationDelay: '0.2s' }}>
              <h4 className="text-lg font-semibold mb-4 text-white">Our Services</h4>
              <ul className="space-y-2">
                {services.slice(0, 5).map((service) => (
                  <li key={service.id}>
                    <button className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center group cursor-pointer bg-transparent border-none text-left">
                      <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">▸</span>
                      {service.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="animate-on-scroll" style={{ animationDelay: '0.3s' }}>
              <h4 className="text-lg font-semibold mb-4 text-white">Contact Information</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center flex-shrink-0 floating">
                    <Home size={18} className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-gray-400">{companyInfo.address.street}</p>
                    <p className="text-gray-400">{companyInfo.address.city}</p>
                    <p className="text-gray-400">{companyInfo.address.country}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center flex-shrink-0 floating" style={{ animationDelay: '0.5s' }}>
                    <Phone size={18} className="text-indigo-400" />
                  </div>
                  <div>
                    {companyInfo.phones.map((phone, index) => (
                      <p key={index} className="text-gray-400">{phone}</p>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center flex-shrink-0 floating" style={{ animationDelay: '1s' }}>
                    <Mail size={18} className="text-indigo-400" />
                  </div>
                  <div>
                    {companyInfo.emails.map((email, index) => (
                      <p key={index} className="text-gray-400">{email}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="relative bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-8 mb-8 overflow-hidden animate-on-scroll" style={{ animationDelay: '0.4s' }}>
            <div className="newsletter-glow"></div>
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h4 className="text-2xl font-semibold mb-2 text-white">Subscribe to Our Newsletter</h4>
              <p className="text-gray-400 mb-6">Stay updated with the latest tech trends and company news</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-6 py-3 bg-slate-800/80 border border-indigo-500/30 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                />
                <button
                  onClick={handleNewsletterSubmit}
                  disabled={newsletterStatus === 'loading' || !newsletterEmail}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  <span className={newsletterStatus === 'loading' ? 'opacity-0' : ''}>
                    {newsletterStatus === 'success' ? 'Subscribed! ✓' : 'Subscribe'}
                  </span>
                  {newsletterStatus === 'loading' && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="text-center pt-8 border-t border-indigo-500/10 relative">
            <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
              <div className="h-full w-[200%] bg-gradient-to-r from-transparent via-indigo-500 to-transparent wave-animation"></div>
            </div>
            <p className="text-gray-400">
              © 2024 {companyInfo.name}. All rights reserved. | 
              <button className="text-indigo-400 hover:text-indigo-300 mx-2 transition-colors cursor-pointer bg-transparent border-none">Privacy Policy</button> | 
              <button className="text-indigo-400 hover:text-indigo-300 ml-2 transition-colors cursor-pointer bg-transparent border-none">Terms of Service</button>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GraphicDesignerPortfolio;