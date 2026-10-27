import React from 'react';
import { LayoutDashboard, ShieldAlert, Zap, Settings, RefreshCw, Layers } from 'lucide-react';

interface AdminPanelBannerProps {
  onOpenAdmin: () => void;
}

export const AdminPanelBanner: React.FC<AdminPanelBannerProps> = ({ onOpenAdmin }) => {
  return (
    <section className="py-12 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-slate-800/90 via-slate-800/60 to-slate-900/90 rounded-3xl p-6 sm:p-10 border border-slate-700/80 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>Showroom Fleet Management Software</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Powered by Custom Admin Panel
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed">
              Manage fleet vehicles, update PKR rental rates in real-time, toggle vehicle availability, and handle incoming customer booking requests effortlessly.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5 text-blue-400" />
                Live PKR Rate Controller
              </span>
              <span className="flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
                Fleet Availability Toggle
              </span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                Customer Booking Inquiries
              </span>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <button
              onClick={onOpenAdmin}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5"
            >
              <LayoutDashboard className="w-5 h-5 text-white" />
              <span>Launch Demo Admin Panel</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
