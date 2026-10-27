import React from 'react';
import { Clock, Sparkles, Wallet, ShieldCheck, Truck, Headphones, Wrench, Check } from 'lucide-react';

export const ServiceHighlights: React.FC = () => {
  const highlightFeatures = [
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Availability",
      description: "24/7 Instant booking and doorstep vehicle delivery across Peshawar, Mardan, and Bacha Khan Airport."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-blue-600" />,
      title: "Comfort",
      description: "Every car in our fleet undergoes 50-point inspection, deep cleaning, interior sanitization, and AC check."
    },
    {
      icon: <Wallet className="w-8 h-8 text-blue-600" />,
      title: "Savings",
      description: "Competitive daily PKR rates with no hidden charges, plus weekly and monthly rental packages for maximum savings."
    }
  ];

  const valuePoints = [
    {
      number: "1",
      title: "Instant Verification & Booking",
      description: "Simple CNIC and driving license verification via WhatsApp or online form in under 5 minutes."
    },
    {
      number: "2",
      title: "Doorstep Delivery in KP",
      description: "We bring your chosen car directly to your home, office, hotel, or Peshawar Airport terminal."
    },
    {
      number: "3",
      title: "Chauffeur & Self-Drive Options",
      description: "Drive yourself or relax with our courteous, background-verified professional uniformed drivers."
    },
    {
      number: "4",
      title: "24/7 Roadside Assistance",
      description: "Dedicated mobile emergency support crew ready across Peshawar, Mardan, Swat, and Motorway routes."
    }
  ];

  return (
    <section className="py-16 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3 Main Highlight Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-slate-100">
          {highlightFeatures.map((item, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all hover:shadow-md group"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-100/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-xs">{item.description}</p>
            </div>
          ))}
        </div>

        {/* "Where every drive feels extraordinary" Story & Key Points */}
        <div className="pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Image Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900">
              <img 
                src="/src/assets/images/hero_car_showroom_1793097354491.jpg" 
                alt="Happy customer receiving car keys"
                className="w-full h-[400px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">Peshawar Showroom</span>
                <p className="text-lg font-bold">Trusted by 20,000+ local commuters & tourists across KP</p>
              </div>
            </div>

            {/* Float badge */}
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-5 rounded-2xl shadow-xl hidden sm:block max-w-[200px] border-2 border-white">
              <div className="text-2xl font-black">25+ Yrs</div>
              <div className="text-xs text-blue-100 font-medium">Of excellence in vehicle rental across Pakistan</div>
            </div>
          </div>

          {/* Right Column Editorial Steps */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-md">
                Why Choose Car Rental Peshawar
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
                Where every drive feels extraordinary
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                We eliminate the hassle of renting a car in Khyber Pakhtunkhwa. Modern fleet, upfront pricing in PKR, and zero compromise on safety.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {valuePoints.map((point) => (
                <div key={point.number} className="flex gap-4 items-start p-3.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm shadow-blue-600/30">
                    {point.number}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{point.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
