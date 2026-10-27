import React, { useState } from 'react';
import { Search, Calendar, MapPin, Car as CarIcon, MessageCircle, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';
import { BookingSearch } from '../types';

interface HeroSectionProps {
  onSearch: (search: BookingSearch) => void;
  onOpenWhatsApp: (msg?: string) => void;
  onViewAllCars: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onOpenWhatsApp,
  onViewAllCars,
}) => {
  const [carType, setCarType] = useState('All');
  const [placeOfRental, setPlaceOfRental] = useState('Peshawar - University Road');
  const [placeOfReturn, setPlaceOfReturn] = useState('Peshawar - Bacha Khan Airport');
  const [pickupDate, setPickupDate] = useState('2026-11-01');
  const [returnDate, setReturnDate] = useState('2026-11-04');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      city: placeOfRental.includes('Mardan') ? 'Mardan' : 'Peshawar',
      pickupLocation: placeOfRental,
      returnLocation: placeOfReturn,
      pickupDate,
      returnDate,
      carType,
    });
  };

  return (
    <section className="relative pt-6 pb-12 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Container matching design image 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Bold Blue Feature Card */}
          <div className="lg:col-span-7 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-6 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden shadow-xl shadow-blue-700/15 min-h-[460px]">
            {/* Background subtle mesh decoration */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Content Top */}
            <div className="relative z-10 max-w-xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-blue-100 border border-white/15 mb-6">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>KP's #1 Rated Car Rental Showroom</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] mb-4">
                Rent Your Dream Car in Peshawar & Mardan
              </h1>

              <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                Choose from luxury 4x4 SUVs like Fortuner & Prado, executive sedans like Civic & Corolla, or budget hatchbacks. Available for daily, weekly, or monthly rental with doorstep delivery.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onViewAllCars}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm py-3 px-6 rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                >
                  <span>View All Cars</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenWhatsApp("Hi, I want to rent a car in Peshawar / Mardan. Please share rates.")}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm py-3 px-6 rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>Book via WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Bottom Hero Studio Cars Image */}
            <div className="relative z-10 mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-2/3 rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                <img
                  src="./images/hero_car_showroom_1793097354491.jpg"
                  alt="Car Rental Showroom Vehicles"
                  className="w-full h-44 object-cover object-center transform hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
              </div>

              <div className="w-full sm:w-1/3 space-y-2 text-xs text-blue-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Doorstep Delivery KP</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Self Drive & Driver</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>24/7 Roadside Assist</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: "Book Your Car" Floating Form Widget */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/80 border border-slate-200/80 flex flex-col justify-center">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center justify-between">
                <span>Book your car</span>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 py-1 px-2.5 rounded-md">
                  Instant Availability
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Select your preferences to filter available fleet in Peshawar & Mardan.
              </p>
            </div>

            <form onSubmit={handleSearchSubmit} className="space-y-4">
              {/* Car Type Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <CarIcon className="w-3.5 h-3.5 text-blue-600" />
                  Car Type
                </label>
                <select
                  value={carType}
                  onChange={(e) => setCarType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm rounded-xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                >
                  <option value="All">All Vehicle Groups (SUV, Sedan, 4x4)</option>
                  <option value="SUV">SUV & Crossover (Fortuner, Sportage)</option>
                  <option value="Sedan">Executive Sedan (Civic, Corolla, Elantra)</option>
                  <option value="Pickup">4x4 Pickup Truck (Hilux Revo Rocco)</option>
                  <option value="Luxury">VIP Luxury (Land Cruiser Prado V8)</option>
                  <option value="Economy">Economy & Budget (Suzuki Alto, Yaris)</option>
                </select>
              </div>

              {/* Place of Rental */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  Place of Rental (Pick-up)
                </label>
                <select
                  value={placeOfRental}
                  onChange={(e) => setPlaceOfRental(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm rounded-xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                >
                  <option value="Peshawar - University Road">Peshawar Showroom (University Road)</option>
                  <option value="Peshawar - Bacha Khan Airport">Peshawar Bacha Khan Airport (Pick-up)</option>
                  <option value="Peshawar - Hayatabad">Peshawar Hayatabad Doorstep Delivery</option>
                  <option value="Mardan - Bank Road Cantt">Mardan Showroom (Bank Road Cantt)</option>
                  <option value="Mardan - Motorway Interchange">Mardan Motorway Interchange Drop</option>
                  <option value="Swat - Mingora Intercity">Swat Valley Pickup Point</option>
                </select>
              </div>

              {/* Place of Return */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  Place of Return
                </label>
                <select
                  value={placeOfReturn}
                  onChange={(e) => setPlaceOfReturn(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm rounded-xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                >
                  <option value="Peshawar - University Road">Peshawar Showroom (University Road)</option>
                  <option value="Peshawar - Bacha Khan Airport">Peshawar Airport Dropoff</option>
                  <option value="Mardan - Bank Road Cantt">Mardan Showroom (Bank Road Cantt)</option>
                  <option value="Same Location">Same as Pickup Location</option>
                </select>
              </div>

              {/* Rental Date & Return Date grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    Pick-up Date
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    Return Date
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Search Available Cars Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-md transition-all hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Available Cars</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
