import React, { useState } from 'react';
import { Car, CarCategory } from '../types';
import { Fuel, Users, Wind, ShieldCheck, ArrowUpRight, Search, CheckCircle, SlidersHorizontal, Eye } from 'lucide-react';

interface FleetSectionProps {
  cars: Car[];
  onSelectCar: (car: Car) => void;
  onBookCar: (car: Car) => void;
  selectedCategory?: string;
}

export const FleetSection: React.FC<FleetSectionProps> = ({
  cars,
  onSelectCar,
  onBookCar,
  selectedCategory: initialCategory = 'All'
}) => {
  const [activeCategory, setActiveCategory] = useState<CarCategory>(initialCategory as CarCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [transmissionFilter, setTransmissionFilter] = useState<'All' | 'Automatic' | 'Manual'>('All');
  const [maxPrice, setMaxPrice] = useState<number>(40000);

  const categories: CarCategory[] = ['All', 'SUV', 'Sedan', 'Economy', 'Luxury', 'Pickup'];

  const filteredCars = cars.filter(car => {
    const matchesCategory = activeCategory === 'All' || car.category === activeCategory;
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTransmission = transmissionFilter === 'All' || car.transmission === transmissionFilter;
    const matchesPrice = car.dailyRatePkr <= maxPrice;
    return matchesCategory && matchesSearch && matchesTransmission && matchesPrice;
  });

  return (
    <section id="vehicles" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching design image 2 */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100/60 px-3 py-1 rounded-md">
            Our Fleet Showroom
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            Select a vehicle group
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Explore our well-maintained rental fleet in Peshawar & Mardan. Transparent daily rates in PKR with no hidden fees.
          </p>
        </div>

        {/* Category Filter Tabs matching design image 2 pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat === 'All' ? 'All Vehicles' : cat}
              </button>
            );
          })}
        </div>

        {/* Secondary Search & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs mb-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by car name (e.g. Fortuner, Civic, Corolla)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm rounded-xl pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div className="md:col-span-3 flex items-center gap-2">
            <label className="text-xs font-medium text-slate-600 whitespace-nowrap">Transmission:</label>
            <select
              value={transmissionFilter}
              onChange={(e) => setTransmissionFilter(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">Auto & Manual</option>
              <option value="Automatic">Automatic Only</option>
              <option value="Manual">Manual Only</option>
            </select>
          </div>

          <div className="md:col-span-4 flex items-center gap-3">
            <div className="w-full">
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>Max PKR Rate:</span>
                <span className="font-bold text-blue-600">PKR {maxPrice.toLocaleString()}/day</span>
              </div>
              <input
                type="range"
                min="4000"
                max="40000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Empty state */}
        {filteredCars.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto">
            <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No cars match your criteria</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Try clearing your price filter or searching for another model.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchTerm('');
                setTransmissionFilter('All');
                setMaxPrice(40000);
              }}
              className="bg-blue-600 text-white font-semibold text-xs py-2 px-4 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Cars Grid matching screenshot 2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Card Header & Badge */}
              <div className="p-5 pb-0 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {car.brand} · {car.category}
                  </span>
                  {car.badge && (
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                      {car.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {car.name}
                </h3>

                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-blue-600">
                    PKR {car.dailyRatePkr.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ day</span>
                </div>
              </div>

              {/* Car Image Preview */}
              <div 
                className="relative my-3 px-4 py-2 cursor-pointer overflow-hidden"
                onClick={() => onSelectCar(car)}
              >
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-44 object-contain transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Specs Icons Strip */}
              <div className="px-5 py-3 bg-slate-50 border-t border-b border-slate-100 grid grid-cols-3 gap-2 text-[11px] text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{car.specs.gearBox}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Fuel className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{car.specs.fuel}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">AC Enabled</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={() => onSelectCar(car)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>

                <button
                  onClick={() => onBookCar(car)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Rent Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
