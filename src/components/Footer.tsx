import React from 'react';
import { Car, Phone, Mail, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenWhatsApp: (msg?: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenWhatsApp, onOpenAdmin }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand Wordmark & Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                <Car className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white block">Car Rental</span>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">Peshawar & Mardan</span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Khyber Pakhtunkhwa's premier car rental showroom. Rent Fortuner, Prado, Civic, Corolla, Hilux Revo & budget cars with verified doorstep delivery and 24/7 service.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => onOpenWhatsApp("Hi Car Rental team")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp Booking</span>
              </button>
            </div>
          </div>

          {/* Col 2: Showroom Locations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Showrooms</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Main University Road, Opp. Peshawar University, Peshawar</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Bank Road Cantt, Mardan</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('vehicles')} className="hover:text-white transition-colors">
                  Fleet Showroom
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About Us & Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact & Location
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  Fleet Admin Demo
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Helpline & Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Direct Helpline</h4>
            <div className="space-y-2">
              <a href="tel:+923009876543" className="block font-bold text-white text-sm hover:text-blue-400">
                +92 300 9876543
              </a>
              <a href="tel:+92915843210" className="block text-slate-400 hover:text-white">
                +92 91 5843210 (Peshawar)
              </a>
              <div className="pt-2 text-slate-500">
                <span className="block font-semibold text-slate-400">Showroom Hours:</span>
                <span>Open 24 Hours / 7 Days</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Car Rental Showroom Peshawar & Mardan. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Self Drive & Chauffeur Services</span>
            <span>·</span>
            <span>KP Doorstep Delivery</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
