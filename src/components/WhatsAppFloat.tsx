
import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5519993070799', '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center animate-pulse hover:animate-none"
      aria-label="Conversar no WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </button>
  );
};

export default WhatsAppFloat;
