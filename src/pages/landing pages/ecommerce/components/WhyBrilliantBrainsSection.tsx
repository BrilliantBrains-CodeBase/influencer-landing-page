import React from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { motion } from "framer-motion";

const WhyBrilliantBrainsSection: React.FC = () => {
  return (
    <ParallaxProvider>
      <section className="w-full bg-black py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ================= LEFT : IMAGE ================= */}
            <Parallax speed={-10}>
              <motion.div
                className="relative w-full h-[360px] sm:h-[420px] md:h-[520px] rounded-2xl bg-neutral-800 overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                {/* Replace with actual image */}
                <img
                  src="/images/team-image.jpg"
                  alt="Brilliant Brains agency work"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Soft overlay for depth */}
                <div className="absolute inset-0 bg-black/20" />
              </motion.div>
            </Parallax>

            {/* ================= RIGHT : CONTENT ================= */}
            <Parallax speed={6}>
              <motion.div
                className="text-white"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-6">
                  Why Brilliant Brains is the Best Agency for
                  <br className="hidden sm:block" />
                  Your E-commerce Success
                </h2>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
                  At Brilliant Brains, we go beyond just marketing — we create
                  growth stories. With expertise spanning India, the UK, UAE,
                  and the Kingdom of Saudi Arabia, our innovative strategies
                  have fueled success across industries, delivering
                  unparalleled results in diverse global markets.
                  <br />
                  <br />
                  We transform your digital challenges into impactful
                  opportunities, helping you scale your brand sustainably and
                  efficiently.
                </p>
              </motion.div>
            </Parallax>

          </div>
        </div>
      </section>
    </ParallaxProvider>
  );
};

export default WhyBrilliantBrainsSection;
