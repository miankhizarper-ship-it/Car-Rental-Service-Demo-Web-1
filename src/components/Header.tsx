import React, { useState } from 'react';
import { Car, Phone, MessageCircle, ShieldCheck, Menu, X, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAdmin: () => void;
  onOpenWhatsApp: (message?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAdmin,
  onOpenWhatsApp
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'vehicles', label: 'Vehicles' },
    { id: 'details', label: 'Details' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    
    // Scroll to section if on home tab
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top micro bar for location trust */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4 text-slate-300">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Showrooms: University Rd, Peshawar & Bank Rd, Mardan
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline flex items-center gap-1 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Doorstep Delivery across KP
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenAdmin} 
            className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors font-medium text-xs bg-slate-800 px-2 py-0.5 rounded"
          >
            <LayoutDashboard className="w-3 h-3" />
            <span>Admin Panel</span>
          </button>
        </div>
      </div>

      {/* Main Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button 
          onClick={() => handleNavClick('home')} 
          className="flex items-center gap-2.5 text-left group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:bg-blue-700 transition-all">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 block leading-none">
              Car Rental
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 block mt-0.5">
              Peshawar & Mardan
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`whitespace-nowrap transition-colors py-1 relative ${
                  isActive 
                    ? 'text-blue-600 font-semibold' 
                    : 'hover:text-slate-900'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Phone Helpline */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <a
            href="tel:+923009876543"
            className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 py-2 px-3.5 rounded-lg transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <span className="block text-[10px] text-slate-500 font-normal leading-none">Need help?</span>
              <span className="block text-slate-900 font-bold leading-tight">+92 300 9876543</span>
            </div>
          </a>

          <button
            onClick={() => onOpenWhatsApp("Hello Car Rental team, I want to inquire about renting a car in Peshawar / Mardan.")}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2.5 px-4 rounded-lg shadow-sm shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Book via WhatsApp</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => onOpenWhatsApp("Hi, I want to rent a car.")}
            className="bg-emerald-600 text-white p-2 rounded-lg sm:hidden"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === link.id
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <a
              href="tel:+923009876543"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>Helpline: +92 300 9876543</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWhatsApp("Hello, I want to book a car in Peshawar/Mardan.");
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Book via WhatsApp</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center justify-center gap-2 w-full py-2 bg-slate-900 text-slate-200 rounded-lg text-xs font-medium"
            >
              <LayoutDashboard className="w-4 h-4 text-blue-400" />
              <span>Open Fleet Admin Panel</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
