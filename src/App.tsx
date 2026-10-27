import React, { useState } from 'react';
import { INITIAL_CARS, INITIAL_BOOKINGS } from './data/cars';
import { Car, BookingSearch, BookingRequest } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServiceHighlights } from './components/ServiceHighlights';
import { FleetSection } from './components/FleetSection';
import { CarDetailsModal } from './components/CarDetailsModal';
import { AdminPanelBanner } from './components/AdminPanelBanner';
import { AdminPanelModal } from './components/AdminPanelModal';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';

export default function App() {
  const [cars, setCars] = useState<Car[]>(INITIAL_CARS);
  const [bookings, setBookings] = useState<BookingRequest[]>(INITIAL_BOOKINGS);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCarForModal, setSelectedCarForModal] = useState<Car | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  // WhatsApp Redirect Helper
  const handleOpenWhatsApp = (message?: string) => {
    const defaultMsg = "Hello Car Rental Peshawar & Mardan team, I am interested in renting a car.";
    const text = encodeURIComponent(message || defaultMsg);
    window.open(`https://wa.me/923009876543?text=${text}`, '_blank');
  };

  // Quick Search handler
  const handleSearchSubmit = (search: BookingSearch) => {
    if (search.carType && search.carType !== 'All') {
      setSelectedCategoryFilter(search.carType);
    } else {
      setSelectedCategoryFilter('All');
    }
    setActiveTab('vehicles');
    
    // Smooth scroll to vehicles
    setTimeout(() => {
      const el = document.getElementById('vehicles');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Car Details Modal triggers
  const handleSelectCar = (car: Car) => {
    setSelectedCarForModal(car);
  };

  const handleBookCarDirectly = (car: Car) => {
    const msg = `*RENTAL BOOKING INQUIRY* 🚗
*Vehicle:* ${car.name} (${car.brand})
*Daily Rate:* PKR ${car.dailyRatePkr.toLocaleString()}/day
*Category:* ${car.category}

Hi! I want to check availability for renting this car in Peshawar / Mardan.`;
    handleOpenWhatsApp(msg);
  };

  // Admin Panel state updates
  const handleUpdateCarRate = (carId: string, newRate: number) => {
    setCars(prev => prev.map(c => c.id === carId ? { ...c, dailyRatePkr: newRate } : c));
  };

  const handleToggleCarAvailability = (carId: string) => {
    setCars(prev => prev.map(c => c.id === carId ? { ...c, isAvailable: !c.isAvailable } : c));
  };

  const handleAddNewCar = (newCar: Car) => {
    setCars(prev => [newCar, ...prev]);
  };

  const handleUpdateBookingStatus = (bookingId: string, newStatus: BookingRequest['status']) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Render sections based on active tab or all on home */}
        {(activeTab === 'home' || activeTab === 'details') && (
          <>
            <HeroSection
              onSearch={handleSearchSubmit}
              onOpenWhatsApp={handleOpenWhatsApp}
              onViewAllCars={() => {
                setActiveTab('vehicles');
                const el = document.getElementById('vehicles');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <ServiceHighlights />
          </>
        )}

        {(activeTab === 'home' || activeTab === 'vehicles' || activeTab === 'details') && (
          <FleetSection
            cars={cars}
            onSelectCar={handleSelectCar}
            onBookCar={handleBookCarDirectly}
            selectedCategory={selectedCategoryFilter}
          />
        )}

        {/* Admin Panel Teaser Banner */}
        <AdminPanelBanner onOpenAdmin={() => setIsAdminOpen(true)} />

        {(activeTab === 'home' || activeTab === 'about') && (
          <AboutSection onOpenWhatsApp={handleOpenWhatsApp} />
        )}

        {(activeTab === 'home' || activeTab === 'contact') && (
          <ContactSection onOpenWhatsApp={handleOpenWhatsApp} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={setActiveTab}
        onOpenWhatsApp={handleOpenWhatsApp}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating WhatsApp Quick-Chat Button */}
      <WhatsAppButton onOpenWithText={handleOpenWhatsApp} />

      {/* Car Details Modal View */}
      {selectedCarForModal && (
        <CarDetailsModal
          car={selectedCarForModal}
          allCars={cars}
          onClose={() => setSelectedCarForModal(null)}
          onSelectOtherCar={(car) => setSelectedCarForModal(car)}
          onOpenWhatsApp={handleOpenWhatsApp}
        />
      )}

      {/* Interactive Admin Panel Modal */}
      {isAdminOpen && (
        <AdminPanelModal
          cars={cars}
          bookings={bookings}
          onClose={() => setIsAdminOpen(false)}
          onUpdateCarRate={handleUpdateCarRate}
          onToggleCarAvailability={handleToggleCarAvailability}
          onAddNewCar={handleAddNewCar}
          onUpdateBookingStatus={handleUpdateBookingStatus}
        />
      )}
    </div>
  );
}
