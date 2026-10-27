import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/cars';
import { 
  MapPin, Mail, Phone, Clock, Send, MessageCircle, 
  Calendar, CheckCircle, ArrowRight, ShieldCheck 
} from 'lucide-react';

interface ContactSectionProps {
  onOpenWhatsApp: (msg?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenWhatsApp }) => {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formLocation, setFormLocation] = useState('Peshawar');
  const [formCarType, setFormCarType] = useState('SUV');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    const msg = `*NEW CONTACT FORM INQUIRY* 📩
*Name:* ${formName}
*Phone:* ${formPhone}
*Email:* ${formEmail || 'N/A'}
*Showroom City:* ${formLocation}
*Preferred Car Type:* ${formCarType}
*Note:* ${formMessage || 'Inquiring about car rental rates.'}`;

    setTimeout(() => {
      onOpenWhatsApp(msg);
      setFormSubmitted(false);
      setFormName('');
      setFormPhone('');
      setFormMessage('');
    }, 1200);
  };

  const contactCards = [
    {
      icon: <MapPin className="w-5 h-5 text-amber-500" />,
      title: "Address",
      detail: "University Rd, Peshawar & Bank Rd Cantt, Mardan"
    },
    {
      icon: <Mail className="w-5 h-5 text-amber-500" />,
      title: "Email",
      detail: "info@carrentalpeshawar.pk"
    },
    {
      icon: <Phone className="w-5 h-5 text-amber-500" />,
      title: "Phone",
      detail: "+92 300 9876543 / +92 91 5843210"
    },
    {
      icon: <Clock className="w-5 h-5 text-amber-500" />,
      title: "Opening Hours",
      detail: "24/7 Service · Always Available"
    }
  ];

  const brandLogos = ["TOYOTA", "HONDA", "SUZUKI", "HYUNDAI", "KIA", "MERCEDES", "AUDI"];

  return (
    <section id="contact" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Title matching Screenshot 5 */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100/70 px-3 py-1 rounded-md">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            Contact Us & Reservation
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Visit our showrooms in Peshawar and Mardan or submit an online booking inquiry below.
          </p>
        </div>

        {/* Side-by-Side Form & Hero Image matching Screenshot 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Form Card */}
          <div className="lg:col-span-6 bg-blue-600 text-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-blue-600/15 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-black mb-2">Book your car</h3>
              <p className="text-xs text-blue-100 mb-6">
                Fill in your details for instant phone or WhatsApp reservation confirmation.
              </p>

              {formSubmitted ? (
                <div className="bg-white/10 border border-white/20 p-6 rounded-2xl text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-300 mx-auto" />
                  <h4 className="text-lg font-bold">Inquiry Sent Successfully!</h4>
                  <p className="text-xs text-blue-100">Connecting you to WhatsApp representative...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-blue-100 font-semibold mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Engineer Farhan"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-blue-700/80 border border-blue-400/40 text-white placeholder-blue-200/60 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-blue-100 font-semibold mb-1">Mobile / WhatsApp</label>
                      <input
                        type="tel"
                        required
                        placeholder="0300 1234567"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full bg-blue-700/80 border border-blue-400/40 text-white placeholder-blue-200/60 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-blue-100 font-semibold mb-1">Showroom Location</label>
                      <select
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        className="w-full bg-blue-700/80 border border-blue-400/40 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                      >
                        <option value="Peshawar Showroom" className="text-slate-900">Peshawar (University Rd)</option>
                        <option value="Peshawar Airport" className="text-slate-900">Peshawar Airport Pickup</option>
                        <option value="Mardan Showroom" className="text-slate-900">Mardan (Bank Rd Cantt)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-blue-100 font-semibold mb-1">Vehicle Category</label>
                    <select
                      value={formCarType}
                      onChange={(e) => setFormCarType(e.target.value)}
                      className="w-full bg-blue-700/80 border border-blue-400/40 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      <option value="SUV" className="text-slate-900">4x4 SUV (Fortuner, Prado)</option>
                      <option value="Sedan" className="text-slate-900">Executive Sedan (Civic, Corolla)</option>
                      <option value="Pickup" className="text-slate-900">4x4 Truck (Hilux Revo Rocco)</option>
                      <option value="Economy" className="text-slate-900">Economy (Alto, Yaris)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-blue-100 font-semibold mb-1">Special Notes / Dates</label>
                    <textarea
                      rows={2}
                      placeholder="Rental dates, self-drive or driver required..."
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full bg-blue-700/80 border border-blue-400/40 text-white placeholder-blue-200/60 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Booking Reservation</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 relative">
            <img
              src="./images/hero_car_showroom_1793097354491.jpg"
              alt="Car Rental Contact Banner"
              className="w-full h-full object-cover min-h-[360px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                Showroom Operational Hours
              </span>
              <h4 className="text-xl font-bold">Open 24 Hours · 7 Days a Week</h4>
              <p className="text-xs text-slate-300 mt-1">
                Walk in anytime at Main University Road, Peshawar or Call Helpline +92 300 9876543.
              </p>
            </div>
          </div>

        </div>

        {/* 4 Contact Cards Grid matching Screenshot 5 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactCards.map((card, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center shrink-0 border border-amber-200/60">
                {card.icon}
              </div>
              <div className="min-w-0">
                <span className="text-xs text-slate-500 block font-medium">{card.title}</span>
                <span className="text-xs font-bold text-slate-900 block truncate mt-0.5">{card.detail}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Latest Blog Posts & News matching Screenshot 5 */}
        <div className="pt-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100/60 px-2.5 py-1 rounded-md">
                News & Guides
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Latest blog posts & news
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <article key={post.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all group">
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                    {post.category}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="text-[11px] text-slate-400 font-medium">
                    {post.date} · {post.readTime}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Partnered Manufacturer Logos Bar */}
        <div className="pt-8 border-t border-slate-200">
          <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">
            Featured Vehicle Manufacturers in Our Showroom
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all">
            {brandLogos.map((brand, idx) => (
              <span key={idx} className="text-lg font-black tracking-widest text-slate-800 hover:text-blue-600 transition-colors">
                {brand}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
