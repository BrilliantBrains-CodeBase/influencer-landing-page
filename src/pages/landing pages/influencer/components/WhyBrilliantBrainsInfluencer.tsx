import React from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { motion } from "framer-motion";

const WhyBrilliantBrainsInfluencer: React.FC = () => {
  return (
    <ParallaxProvider>
      <section className="w-full bg-neutral-950 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* LEFT: Image */}
            <Parallax speed={-10}>
              <motion.div
                className="relative w-full h-[360px] sm:h-[420px] md:h-[520px] rounded-2xl bg-neutral-800 overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <img
                  src="/images/team-image.jpg"
                  alt="Brilliant Brains creator network"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </motion.div>
            </Parallax>

            {/* RIGHT: Content */}
            <Parallax speed={6}>
              <motion.div
                className="text-white"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <span className="text-xs font-medium text-[#F95A1B] uppercase tracking-widest mb-4 block">
                  The Network
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-6">
                  The network that works
                  <br className="hidden sm:block" />
                  for you — not just for brands.
                </h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl mb-6">
                  Brilliant Brains is built for creators first. With campaigns spanning India, UAE, USA, and the UK, our network gives you access to premium brand deals, guaranteed payments, and a dedicated manager — all in one place.
                </p>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
                  Whether you're a UGC creator with 500 followers or a macro influencer with 1M+, we match you with brands that actually make sense for your audience. Every campaign is backed by a signed agreement. Every payment arrives on time. No exceptions.
                </p>
              </motion.div>
            </Parallax>

          </div>
        </div>
      </section>
    </ParallaxProvider>
  );
};

export default WhyBrilliantBrainsInfluencer;
