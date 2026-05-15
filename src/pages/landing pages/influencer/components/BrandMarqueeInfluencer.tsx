import React from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { motion } from "framer-motion";

const logos = [
  { id: 1, src: "/images/Logos/1.png", alt: "Brand 1" },
  { id: 2, src: "/images/Logos/2.png", alt: "Brand 2" },
  { id: 3, src: "/images/Logos/3.png", alt: "Brand 3" },
  { id: 4, src: "/images/Logos/4.png", alt: "Brand 4" },
  { id: 5, src: "/images/Logos/5.png", alt: "Brand 5" },
  { id: 6, src: "/images/Logos/6.png", alt: "Brand 6" },
  { id: 7, src: "/images/Logos/7.png", alt: "Brand 7" },
  { id: 8, src: "/images/Logos/8.png", alt: "Brand 8" },
  { id: 9, src: "/images/Logos/9.png", alt: "Brand 9" },
  { id: 10, src: "/images/Logos/10.png", alt: "Brand 10" },
  { id: 11, src: "/images/Logos/11.png", alt: "Brand 11" },
  { id: 12, src: "/images/Logos/12.png", alt: "Brand 12" },
  { id: 13, src: "/images/Logos/13.png", alt: "Brand 13" },
  { id: 14, src: "/images/Logos/14.png", alt: "Brand 14" },
  { id: 15, src: "/images/Logos/15.png", alt: "Brand 15" },
  { id: 16, src: "/images/Logos/16.png", alt: "Brand 16" },
  { id: 17, src: "/images/Logos/17.png", alt: "Brand 17" },
  { id: 18, src: "/images/Logos/18.png", alt: "Brand 18" },
  { id: 19, src: "/images/Logos/19.png", alt: "Brand 19" },
];

const duplicatedLogos = [...logos, ...logos];

const BrandMarqueeInfluencer: React.FC = () => {
  return (
    <ParallaxProvider>
      <section className="w-full bg-black px-4 md:px-6 py-8 md:py-10">
        <div className="max-w-7xl mx-auto bg-[#131313] rounded-3xl md:px-8 lg:pt-16 pt-10 overflow-hidden">

          {/* Headline + body — two column parallax (mirrors BrandGrowthParallaxSection) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start px-6 md:px-0 pb-10 md:pb-14">

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
                Campaigns Running
                <br />
                for India's Best Brands
              </motion.h2>
            </Parallax>

            <Parallax speed={4}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl"
              >
                We don't just connect you with brands — we match you. Our
                AI-powered engine pairs you only with campaigns that fit your
                niche, your audience, and your content style. No cold
                pitching. No mismatched briefs. Just deals that make sense —
                straight to your inbox.
              </motion.p>
            </Parallax>

          </div>

          {/* Logo strip — exact same pattern as AutoScrollLogoStrip */}
          <div className="relative flex pb-10 md:pb-14 overflow-hidden">
            <motion.div
              className="flex gap-4 md:gap-8 pr-4 md:pr-8"
              animate={{ x: [0, "-50%"] }}
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
      </section>
    </ParallaxProvider>
  );
};

export default BrandMarqueeInfluencer;
