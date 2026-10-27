import React, { useState } from 'react';
import { MessageCircle, X, Send, PhoneCall, CheckCircle2 } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  onOpenWithText: (text: string) => void;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = "+923009876543",
  onOpenWithText
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMessage, setQuickMessage] = useState('');

  const quickPrompts = [
    "Hi, I want to inquire about renting a Fortuner or Prado.",
    "What are the daily rates for Honda Civic and Corolla?",
    "Do you offer doorstep delivery in Peshawar or Mardan?",
    "Need a car with driver for airport pick-up tomorrow."
  ];

  const handleSend = (msgText?: string) => {
    const textToSend = msgText || quickMessage || "Hello Car Rental Peshawar, I want to rent a car.";
    onOpenWithText(textToSend);
    setIsOpen(false);
    setQuickMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Quick Chat Popover */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-fade-in">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">Car Rental WhatsApp</h4>
                <span className="text-[10px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
                  Online · Instant Response
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompts Body */}
          <div className="p-4 space-y-3 bg-slate-50 text-xs">
            <p className="text-slate-500 font-medium text-[11px]">Choose a quick inquiry topic:</p>
            <div className="space-y-2">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="w-full text-left bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 p-2.5 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all text-xs font-medium"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-2">
              <textarea
                rows={2}
                placeholder="Type your custom message..."
                value={quickMessage}
                onChange={(e) => setQuickMessage(e.target.value)}
                className="w-full bg-white border border-slate-200 text-slate-800 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
              <button
                onClick={() => handleSend()}
                className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Start WhatsApp Chat</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
        aria-label="Contact via WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white" />
        <MessageCircle className="w-7 h-7 fill-white" />
      </button>

    </div>
  );
};
