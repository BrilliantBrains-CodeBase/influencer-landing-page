import React from 'react';
import { motion } from 'framer-motion';

const AutoScrollLogoStrip: React.FC = () => {
  // Sample logo items - replace with your actual logo URLs
const logos = [
  { id: 1, src: '/images/Logos/1.png', alt: 'Company 1' },
  { id: 2, src: '/images/Logos/2.png', alt: 'Company 2' },
  { id: 3, src: '/images/Logos/3.png', alt: 'Company 3' },
  { id: 4, src: '/images/Logos/4.png', alt: 'Company 4' },
  { id: 5, src: '/images/Logos/5.png', alt: 'Company 5' },
  { id: 6, src: '/images/Logos/6.png', alt: 'Company 6' },
  { id: 7, src: '/images/Logos/7.png', alt: 'Company 7' },
  { id: 8, src: '/images/Logos/8.png', alt: 'Company 8' },
  { id: 9, src: '/images/Logos/9.png', alt: 'Company 9' },
  { id: 10, src: '/images/Logos/10.png', alt: 'Company 10' },
  { id: 11, src: '/images/Logos/11.png', alt: 'Company 11' },
  { id: 12, src: '/images/Logos/12.png', alt: 'Company 12' },
  { id: 13, src: '/images/Logos/13.png', alt: 'Company 13' },
  { id: 14, src: '/images/Logos/14.png', alt: 'Company 14' },
  { id: 15, src: '/images/Logos/15.png', alt: 'Company 15' },
  { id: 16, src: '/images/Logos/16.png', alt: 'Company 16' },
  { id: 17, src: '/images/Logos/17.png', alt: 'Company 17' },
  { id: 18, src: '/images/Logos/18.png', alt: 'Company 18' },
  { id: 19, src: '/images/Logos/19.png', alt: 'Company 19' }
];

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="w-full bg-black py-8 md:py-12 overflow-hidden">
      <div className="relative flex">
        <motion.div
          className="flex gap-4 md:gap-8 pr-4 md:pr-8"
          animate={{
            x: [0, -50 + '%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 w-40 h-16 md:w-64 md:h-24 bg-gray-800 rounded-full flex items-center justify-center px-3 md:px-4"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AutoScrollLogoStrip;