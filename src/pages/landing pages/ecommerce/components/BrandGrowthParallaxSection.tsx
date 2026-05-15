import React from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { motion } from "framer-motion";
import ServicesShowcaseSection from "./ServicesShowcaseSection";
import PerformanceHero from "./PerformanceHero";
import TestimonialsSection from "./TestimonialsSection";

const BrandGrowthParallaxSection: React.FC = () => {
  return (
    <ParallaxProvider>
      <section className="scroll-mt-24" id="info">
        <div className="max-w-7xl mx-auto bg-[#131313]  md:px-4 lg:pt-24 pt-16 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            {/* LEFT — HEADLINE */}
            <Parallax speed={-6}>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="
                  text-3xl md:text-4xl lg:text-5xl
                  font-medium leading-tight
                  bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)]
                  bg-clip-text text-transparent
                "
              >
                We Build Brands That
                <br />
                Grow and Thrive
              </motion.h2>
            </Parallax>

            {/* RIGHT — CONTENT */}
            <Parallax speed={4}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl"
              >
                Our services cover everything needed to transform your
                e-commerce brand from the ground up. From product-first design
                to data-driven marketing, we focus on performance, conversion
                optimization, and sustainable growth. These are just a few of
                the key elements that make up a successful e-commerce strategy,
                and we offer so much more to ensure your brand stands out in the
                crowded marketplace.
              </motion.p>
            </Parallax>

          </div>
          <ServicesShowcaseSection />
          <PerformanceHero />
          <TestimonialsSection />
        </div>
        
      </section>
      
    </ParallaxProvider>
  );
};

export default BrandGrowthParallaxSection;
