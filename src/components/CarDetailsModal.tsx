import React, { useState } from 'react';
import { Car } from '../types';
import { 
  X, Check, Shield, MessageCircle, Calendar, MapPin, Phone, User, 
  Sparkles, Fuel, Sliders, Users, DoorOpen, Wind, Gauge, ArrowRight, CheckCircle2 
} from 'lucide-react';

interface CarDetailsModalProps {
  car: Car | null;
  allCars: Car[];
  onClose: () => void;
  onSelectOtherCar: (car: Car) => void;
  onOpenWhatsApp: (msg?: string) => void;
}

export const CarDetailsModal: React.FC<CarDetailsModalProps> = ({
  car,
  allCars,
  onClose,
  onSelectOtherCar,
  onOpenWhatsApp
}) => {
  if (!car) return null;

  const [bookingDays, setBookingDays] = useState(3);
  const [withDriverOption, setWithDriverOption] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Peshawar');
  const [pickupDate, setPickupDate] = useState('2026-11-01');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Calculate pricing
  const baseTotal = car.dailyRatePkr * bookingDays;
  const driverCharge = withDriverOption ? 2500 * bookingDays : 0;
  const discountAmount = bookingDays >= 7 ? Math.round(baseTotal * 0.1) : 0;
  const finalTotal = baseTotal + driverCharge - discountAmount;

  const otherCars = allCars.filter(c => c.id !== car.id).slice(0, 3);

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedMessage = `*NEW RENTAL BOOKING REQUEST* 🚗
    
*Car:* ${car.name} (${car.brand} ${car.category})
*Customer:* ${customerName || 'Valued Customer'}
*Phone:* ${customerPhone || 'Not provided'}
*Location:* ${selectedCity}
*Pick-up Date:* ${pickupDate}
*Duration:* ${bookingDays} Days
*Option:* ${withDriverOption ? 'With Chauffeur (+PKR 2,500/day)' : 'Self Drive'}
*Estimated Total:* PKR ${finalTotal.toLocaleString()}

Please confirm car availability for these dates.`;

    onOpenWhatsApp(formattedMessage);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative my-auto">
        
        {/* Sticky Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-20 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Vehicle Details</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">{car.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-10">
          
          {/* Main Top Section: Image & Price Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Car Showcase */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 flex items-center justify-center relative min-h-[280px]">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full max-h-[280px] object-contain drop-shadow-xl"
                />
                {car.badge && (
                  <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {car.badge}
                  </span>
                )}
              </div>

              <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100/80 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-blue-900 block mb-1">Showroom Vehicle Description:</span>
                {car.description}
              </div>
            </div>

            {/* Right Column: Technical Specification Grid (Matching Screenshot 3) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-900 text-white rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Daily Rental Rate</span>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">
                    PKR {car.dailyRatePkr.toLocaleString()}
                    <span className="text-xs font-normal text-slate-300"> / day</span>
                  </div>
                </div>
                <button
                  onClick={() => onOpenWhatsApp(`Hi, I am interested in renting ${car.name}. Is it available?`)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>Ask WhatsApp</span>
                </button>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3">Technical Specification</h3>
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 text-center">
                    <Sliders className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-500 block uppercase font-medium">Gear Box</span>
                    <span className="text-xs font-bold text-slate-900">{car.specs.gearBox}</span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 text-center">
                    <Fuel className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-500 block uppercase font-medium">Fuel</span>
                    <span className="text-xs font-bold text-slate-900">{car.specs.fuel}</span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 text-center">
                    <DoorOpen className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-500 block uppercase font-medium">Doors</span>
                    <span className="text-xs font-bold text-slate-900">{car.specs.doors}</span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 text-center">
                    <Wind className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-500 block uppercase font-medium">Air Conditioner</span>
                    <span className="text-xs font-bold text-slate-900">{car.specs.airConditioner ? 'Yes' : 'No'}</span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 text-center">
                    <Users className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-500 block uppercase font-medium">Seats</span>
                    <span className="text-xs font-bold text-slate-900">{car.specs.seats}</span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 text-center">
                    <Gauge className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-500 block uppercase font-medium">Engine</span>
                    <span className="text-xs font-bold text-slate-900">{car.specs.engineCapacity || 'Standard'}</span>
                  </div>
                </div>
              </div>

              {/* Car Equipment Checklist matching screenshot 3 */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Car Equipment & Features</h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                  {car.equipment.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Quick Booking Calculator Box */}
          <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl">
            <div className="max-w-3xl">
              <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Instant Rent Calculator & Booking</span>
              </h3>
              <p className="text-xs text-blue-200 mb-6">
                Calculate total rent including driver options and send an instant verified booking request.
              </p>

              <form onSubmit={handleBookSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-blue-200 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shahab Khan"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-blue-300/60 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-blue-200 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0300 1234567"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-blue-300/60 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-blue-200 mb-1">Select Location</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="Peshawar Showroom" className="text-slate-900">Peshawar (University Rd)</option>
                    <option value="Peshawar Airport" className="text-slate-900">Peshawar Bacha Khan Airport</option>
                    <option value="Mardan Showroom" className="text-slate-900">Mardan (Bank Rd Cantt)</option>
                    <option value="Doorstep KP" className="text-slate-900">Doorstep Delivery in KP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-blue-200 mb-1">Rental Duration (Days)</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={bookingDays}
                    onChange={(e) => setBookingDays(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-white/10 border border-white/20 text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-blue-100">
                    <input
                      type="checkbox"
                      checked={withDriverOption}
                      onChange={(e) => setWithDriverOption(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-amber-400 bg-white/10 border-white/30"
                    />
                    <span>Add Professional Driver (+2,500 PKR/day)</span>
                  </label>
                </div>

                <div className="flex flex-col justify-end">
                  <button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs py-2.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-slate-950" />
                    <span>Confirm PKR {finalTotal.toLocaleString()} & Rent</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Other Cars Recommendation Strip matching Screenshot 3 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-slate-900">Other vehicles in our fleet</h3>
              <button 
                onClick={onClose} 
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>View Full Showroom</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherCars.map((otherCar) => (
                <div
                  key={otherCar.id}
                  onClick={() => onSelectOtherCar(otherCar)}
                  className="bg-slate-50 hover:bg-white rounded-2xl p-4 border border-slate-200/80 cursor-pointer transition-all hover:shadow-md group"
                >
                  <img
                    src={otherCar.image}
                    alt={otherCar.name}
                    className="w-full h-28 object-contain mb-2 group-hover:scale-105 transition-transform"
                  />
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 truncate">
                    {otherCar.name}
                  </h4>
                  <div className="text-xs font-bold text-blue-600 mt-1">
                    PKR {otherCar.dailyRatePkr.toLocaleString()} / day
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
