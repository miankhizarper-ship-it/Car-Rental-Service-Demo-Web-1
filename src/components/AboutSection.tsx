import React from 'react';
import { ShieldCheck, Award, Smile, Car, Check, Play, MessageCircle } from 'lucide-react';

interface AboutSectionProps {
  onOpenWhatsApp: (msg?: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenWhatsApp }) => {
  const pillars = [
    {
      title: "Variety Brands",
      description: "From luxury Toyota Fortuner and Prado V8 to economical Suzuki Alto and Honda Civic sedans."
    },
    {
      title: "Awesome Support",
      description: "24/7 dedicated helpline and roadside emergency assistance team operating across Peshawar, Mardan, and Swat."
    },
    {
      title: "Maximum Freedom",
      description: "Unlimited mileage options for city commutes and clear intercity packages for long northern trips."
    },
    {
      title: "Flexibility On The Go",
      description: "Seamless online date changes, instant doorstep delivery, and transparent PKR pricing with zero hidden fees."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Main Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-md">
            Our Story & Legacy
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-3">
            About Car Rental Peshawar
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Founded with a vision to revolutionize mobility in Khyber Pakhtunkhwa, Car Rental provides premium, sanitized, and fully insured vehicles for families, corporate protocols, weddings, and northern valley travel.
          </p>
        </div>

        {/* 4 Pillars Grid matching Screenshot 4 */}
        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-8 text-center sm:text-left">
            Where every drive feels extraordinary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-lg transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center mb-4">
                  0{idx + 1}
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* High-Resolution Showroom Banner & Counters */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900">
          <img
            src="./images/hero_car_showroom_1793097354491.jpg"
            alt="Peshawar Car Rental Showroom"
            className="w-full h-80 sm:h-96 object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent flex items-center p-6 sm:p-12">
            <div className="max-w-xl text-white space-y-4">
              <span className="inline-block bg-amber-500 text-slate-950 text-xs font-black px-3 py-1 rounded-md uppercase">
                Premium Fleet Quality
              </span>
              <h3 className="text-2xl sm:text-4xl font-black leading-tight">
                Unlock unforgettable memories on the road
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Whether you need a daily commuter for Peshawar city traffic or a luxury 4x4 Fortuner for a high-profile wedding event in Mardan, we guarantee unmatched comfort and reliability.
              </p>
              <button
                onClick={() => onOpenWhatsApp("Hi, I want to learn more about renting a vehicle with Car Rental Peshawar.")}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm py-3 px-6 rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>Contact Showroom Team</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quantified Proof Counters matching Screenshot 4 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
            <div className="text-4xl sm:text-5xl font-black text-blue-600 tracking-tight">20k+</div>
            <div className="text-sm font-bold text-slate-900 mt-2">Happy Customers</div>
            <div className="text-xs text-slate-500 mt-1">Satisfied commuters, tourists & protocol clients</div>
          </div>

          <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
            <div className="text-4xl sm:text-5xl font-black text-indigo-600 tracking-tight">540+</div>
            <div className="text-sm font-bold text-slate-900 mt-2">Count of Cars</div>
            <div className="text-xs text-slate-500 mt-1">Maintained fleet across Peshawar & Mardan</div>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 text-white">
            <div className="text-4xl sm:text-5xl font-black text-amber-400 tracking-tight">25+</div>
            <div className="text-sm font-bold text-white mt-2">Years of Experience</div>
            <div className="text-xs text-slate-400 mt-1">Leading vehicle rental showroom in KP</div>
          </div>
        </div>

      </div>
    </section>
  );
};
