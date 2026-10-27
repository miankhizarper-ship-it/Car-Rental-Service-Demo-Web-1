import React, { useState } from 'react';
import { Car, BookingRequest } from '../types';
import { 
  X, LayoutDashboard, Plus, Edit3, Check, Save, ToggleLeft, ToggleRight, 
  Trash2, DollarSign, Calendar, Users, Phone, CheckCircle, Clock, AlertCircle, RefreshCw 
} from 'lucide-react';

interface AdminPanelModalProps {
  cars: Car[];
  bookings: BookingRequest[];
  onClose: () => void;
  onUpdateCarRate: (carId: string, newRate: number) => void;
  onToggleCarAvailability: (carId: string) => void;
  onAddNewCar: (newCar: Car) => void;
  onUpdateBookingStatus: (bookingId: string, newStatus: BookingRequest['status']) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  cars,
  bookings,
  onClose,
  onUpdateCarRate,
  onToggleCarAvailability,
  onAddNewCar,
  onUpdateBookingStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'fleet' | 'bookings'>('fleet');
  const [editingCarId, setEditingCarId] = useState<string | null>(null);
  const [editingRate, setEditingRate] = useState<number>(0);
  const [showAddCarForm, setShowAddCarForm] = useState(false);

  // New Car Form State
  const [newCarName, setNewCarName] = useState('');
  const [newCarBrand, setNewCarBrand] = useState('Toyota');
  const [newCarCategory, setNewCarCategory] = useState<Car['category']>('SUV');
  const [newCarRate, setNewCarRate] = useState(15000);
  const [newCarSeats, setNewCarSeats] = useState(5);
  const [newCarFuel, setNewCarFuel] = useState('Petrol');
  const [newCarTransmission, setNewCarTransmission] = useState<'Automatic' | 'Manual'>('Automatic');
  const [newCarDesc, setNewCarDesc] = useState('');

  // Stats calculation
  const totalFleet = cars.length;
  const activeRentals = bookings.filter(b => b.status === 'Confirmed').length;
  const pendingInquiries = bookings.filter(b => b.status === 'Pending').length;
  const totalMonthlyEarningsPkr = bookings
    .filter(b => b.status === 'Confirmed' || b.status === 'Completed')
    .reduce((sum, b) => sum + b.totalAmountPkr, 0) + 485000;

  const handleStartEdit = (car: Car) => {
    setEditingCarId(car.id);
    setEditingRate(car.dailyRatePkr);
  };

  const handleSaveEdit = (carId: string) => {
    onUpdateCarRate(carId, editingRate);
    setEditingCarId(null);
  };

  const handleAddCarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCarName) return;

    const createdCar: Car = {
      id: `car-${Date.now()}`,
      name: newCarName,
      brand: newCarBrand,
      category: newCarCategory,
      dailyRatePkr: Number(newCarRate),
      transmission: newCarTransmission,
      fuelType: newCarFuel,
      seats: Number(newCarSeats),
      airConditioner: true,
      image: '/src/assets/images/hero_car_showroom_1793097354491.jpg',
      badge: 'Available Now',
      description: newCarDesc || 'Newly added vehicle in Peshawar & Mardan fleet.',
      isAvailable: true,
      specs: {
        gearBox: newCarTransmission,
        fuel: newCarFuel as any,
        doors: 4,
        airConditioner: true,
        seats: Number(newCarSeats),
        distanceLimit: '250 km / day'
      },
      equipment: ['AC', 'Power Steering', 'ABS Brakes', 'Central Locking']
    };

    onAddNewCar(createdCar);
    setShowAddCarForm(false);
    setNewCarName('');
    setNewCarDesc('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-slate-900 text-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-800 relative my-auto flex flex-col">
        
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md z-20 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest block">Custom Fleet Management</span>
              <h2 className="text-xl font-black text-white">Showroom Admin Dashboard</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          
          {/* KPI Dashboard Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
              <span className="text-xs text-slate-400 font-medium block">Total Vehicles</span>
              <div className="text-2xl font-black text-white mt-1">{totalFleet}</div>
              <span className="text-[10px] text-emerald-400 font-semibold block mt-1">In Peshawar & Mardan</span>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
              <span className="text-xs text-slate-400 font-medium block">Active Rentals</span>
              <div className="text-2xl font-black text-blue-400 mt-1">{activeRentals}</div>
              <span className="text-[10px] text-blue-300 block mt-1">Currently on road</span>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
              <span className="text-xs text-slate-400 font-medium block">Pending Inquiries</span>
              <div className="text-2xl font-black text-amber-400 mt-1">{pendingInquiries}</div>
              <span className="text-[10px] text-amber-300 block mt-1">Needs confirmation</span>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
              <span className="text-xs text-slate-400 font-medium block">Monthly Revenue</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">
                PKR {totalMonthlyEarningsPkr.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">Updated real-time</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex gap-3">
              <button
                onClick={() => setActiveTab('fleet')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'fleet'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Fleet & Rate Manager ({cars.length})
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'bookings'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Customer Booking Requests ({bookings.length})
              </button>
            </div>

            {activeTab === 'fleet' && (
              <button
                onClick={() => setShowAddCarForm(!showAddCarForm)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 px-3.5 rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Vehicle to Fleet</span>
              </button>
            )}
          </div>

          {/* Add New Car Form Drawer */}
          {showAddCarForm && (
            <form onSubmit={handleAddCarSubmit} className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 space-y-4 animate-fade-in">
              <h3 className="text-sm font-bold text-amber-400">Add New Showroom Vehicle</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Car Model & Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kia Tucson AWD"
                    value={newCarName}
                    onChange={(e) => setNewCarName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white p-2.5 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Brand</label>
                  <select
                    value={newCarBrand}
                    onChange={(e) => setNewCarBrand(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white p-2.5 rounded-lg"
                  >
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Kia">Kia</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Suzuki">Suzuki</option>
                    <option value="MG">MG</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    value={newCarCategory}
                    onChange={(e) => setNewCarCategory(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 text-white p-2.5 rounded-lg"
                  >
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Economy">Economy</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Pickup">Pickup</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Daily PKR Rate</label>
                  <input
                    type="number"
                    required
                    value={newCarRate}
                    onChange={(e) => setNewCarRate(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 text-white p-2.5 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Transmission</label>
                  <select
                    value={newCarTransmission}
                    onChange={(e) => setNewCarTransmission(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 text-white p-2.5 rounded-lg"
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Seats</label>
                  <input
                    type="number"
                    value={newCarSeats}
                    onChange={(e) => setNewCarSeats(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 text-white p-2.5 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCarForm(false)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs"
                >
                  Save Car to Showroom
                </button>
              </div>
            </form>
          )}

          {/* TAB 1: FLEET TABLE */}
          {activeTab === 'fleet' && (
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/50">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Vehicle</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Daily Rate (PKR)</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {cars.map((car) => {
                    const isEditing = editingCarId === car.id;
                    return (
                      <tr key={car.id} className="hover:bg-slate-900/80 transition-colors">
                        <td className="p-3.5 font-bold text-white flex items-center gap-3">
                          <img src={car.image} alt={car.name} className="w-10 h-8 object-contain rounded bg-slate-800 p-1" />
                          <div>
                            <span className="block">{car.name}</span>
                            <span className="text-[10px] text-slate-500 font-normal">{car.brand} · {car.transmission}</span>
                          </div>
                        </td>

                        <td className="p-3.5">
                          <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[11px]">
                            {car.category}
                          </span>
                        </td>

                        <td className="p-3.5 font-bold text-amber-400">
                          {isEditing ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                value={editingRate}
                                onChange={(e) => setEditingRate(Number(e.target.value))}
                                className="w-24 bg-slate-900 border border-blue-500 text-white p-1 rounded text-xs"
                              />
                              <button
                                onClick={() => handleSaveEdit(car.id)}
                                className="bg-blue-600 text-white p-1 rounded hover:bg-blue-500"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <span>PKR {car.dailyRatePkr.toLocaleString()}</span>
                          )}
                        </td>

                        <td className="p-3.5">
                          <button
                            onClick={() => onToggleCarAvailability(car.id)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                              car.isAvailable
                                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                                : 'bg-red-950/80 text-red-400 border border-red-800'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${car.isAvailable ? 'bg-emerald-400' : 'bg-red-400'}`} />
                            {car.isAvailable ? 'Available Now' : 'Rented / Maintenance'}
                          </button>
                        </td>

                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => handleStartEdit(car)}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded text-[11px] font-medium"
                          >
                            Update Rate
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: BOOKINGS TABLE */}
          {activeTab === 'bookings' && (
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/50">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">ID & Date</th>
                    <th className="p-3.5">Customer & Phone</th>
                    <th className="p-3.5">Requested Car</th>
                    <th className="p-3.5">City & Dates</th>
                    <th className="p-3.5">Total Rate</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-900/80 transition-colors">
                      <td className="p-3.5 font-bold text-blue-400">
                        {b.id}
                        <span className="block text-[10px] text-slate-500 font-normal">{b.createdAt}</span>
                      </td>

                      <td className="p-3.5 font-semibold text-white">
                        {b.customerName}
                        <span className="block text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-emerald-400" /> {b.phone}
                        </span>
                      </td>

                      <td className="p-3.5 font-medium text-slate-200">
                        {b.carName}
                        <span className="block text-[10px] text-slate-400">
                          {b.withDriver ? 'Driver Included' : 'Self-Drive'}
                        </span>
                      </td>

                      <td className="p-3.5 text-slate-300">
                        {b.city}
                        <span className="block text-[10px] text-slate-500">{b.pickupDate} to {b.returnDate} ({b.days} Days)</span>
                      </td>

                      <td className="p-3.5 font-extrabold text-amber-400">
                        PKR {b.totalAmountPkr.toLocaleString()}
                      </td>

                      <td className="p-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          b.status === 'Confirmed' ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700' :
                          b.status === 'Pending' ? 'bg-amber-900/60 text-amber-300 border border-amber-700' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {b.status}
                        </span>
                      </td>

                      <td className="p-3.5 text-right space-x-1">
                        {b.status === 'Pending' && (
                          <button
                            onClick={() => onUpdateBookingStatus(b.id, 'Confirmed')}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-1 rounded text-[10px] font-bold"
                          >
                            Approve
                          </button>
                        )}
                        {b.status === 'Confirmed' && (
                          <button
                            onClick={() => onUpdateBookingStatus(b.id, 'Completed')}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded text-[10px] font-bold"
                          >
                            Mark Complete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
