import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // Replace with actual number before launch

const WhatsAppButton: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20want%20to%20join%20the%20Brilliant%20Brains%20creator%20network.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      <div
        className={`
          bg-white text-gray-800 text-xs font-medium px-3 py-1.5 rounded-full shadow-lg
          whitespace-nowrap transition-all duration-200
          ${hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"}
        `}
      >
        Chat with us on WhatsApp
      </div>

      {/* Button */}
      <div className="relative flex items-center justify-center">
        {/* Pulse ring */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40 animate-ping" />
        <div className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:bg-[#1ebe5b] transition-colors duration-200">
          <FaWhatsapp size={28} className="text-white" />
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
