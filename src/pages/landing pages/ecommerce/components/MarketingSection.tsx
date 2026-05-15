import React from "react";
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { motion } from 'framer-motion';

const MarketingSection: React.FC = () => {
  return (
    <ParallaxProvider>
      <section className="relative w-full bg-black py-20 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Asterisk and Description */}
            <Parallax translateY={[-20, 20]} className="space-y-8">
              {/* Asterisk Icon */}
              <motion.div
                initial={{ opacity: 0, rotate: -180 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <svg
                  className="w-16 h-16 sm:w-20 sm:h-20"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M50 10 L50 90 M10 50 L90 50 M20 20 L80 80 M80 20 L20 80"
                    stroke="#FF6B35"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>

              {/* Description Text */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <p className="text-white text-base sm:text-lg md:text-base leading-relaxed">
                  E-commerce marketing isn't just about products, it's an ecosystem that thrives on data, 
                  creativity, and seamless integration. Brilliant Brains doesn't just offer marketing 
                  services—we provide a full-circle 360° strategy that blends innovative design, technical 
                  performance and real-time data-driven insights. As the digital landscape evolves, 
                  businesses need strategies that adapt quickly and use powerful elements like AI, 
                  performance analytics, and multi-channel outreach to not only capture attention but 
                  convert traffic into loyal customers.
                </p>
              </motion.div>
            </Parallax>

            {/* Right Side - Main Heading */}
            <Parallax translateY={[20, -20]} className="lg:pl-8">
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <span 
                  className="bg-clip-text text-transparent"
                  style={{ background: 'linear-gradient(90deg, #F95A1B 0%, #E9DBB9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  E-commerce Marketing with Brilliant Brains
                </span>{" "}
                <span className="bg-clip-text text-transparent"
                  style={{ background: 'linear-gradient(90deg, #F95A1B 0%, #E9DBB9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  is Your Secret to Success with 360° Digital Marketing for Growth and Performance
                </span>
              </motion.h2>
            </Parallax>
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 rounded-full bg-orange-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-orange-600/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </section>
    </ParallaxProvider>
  );
};

export default MarketingSection;