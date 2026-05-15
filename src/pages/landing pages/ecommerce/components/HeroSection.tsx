import React, { useEffect, useRef, useState } from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { motion, AnimatePresence } from "framer-motion";

const rotatingWords = [
  "E-Commerce Marketing",
  "Scalable Growth",
  "AI-Driven Strategies",
  "Smarter Campaigns",
  "Brilliant Brains"
];

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [scrollY, setScrollY] = useState<number>(0);
  const [wordIndex, setWordIndex] = useState<number>(0);

  /* Scroll listener */
  useEffect(() => {
    const handleScroll = (): void => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Rotating text */
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;

  return (
    <ParallaxProvider>
      <div className="bg-black">
        <section className="relative w-full h-screen overflow-hidden bg-black rounded-3xl -mt-300px md:mt-6">

          {/* ================= VIDEO BACKGROUND ================= */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <Parallax
              className="absolute inset-0"
              translateY={[-30, 30]}
            >
              <iframe
                ref={videoRef}
                className="
                  absolute top-1/2 left-1/2
                  w-[130vw] h-[130vh]
                  -translate-x-1/2 -translate-y-1/2
                  scale-110 md:scale-125
                  pointer-events-none
                "
                src="https://www.youtube.com/embed/kWjJUH69PjQ?autoplay=1&mute=1&controls=0&loop=1&playlist=kWjJUH69PjQ&modestbranding=1&rel=0&playsinline=1"
                title="Background Video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
              />
            </Parallax>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 rounded-3xl" />

          {/* ================= CONTENT ================= */}
          <div className="absolute inset-x-0 bottom-6 md:bottom-12 lg:bottom-16 2xl:bottom-16 z-10 max-w-7xl w-full mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row justify-between gap-6 w-full">

              {/* ===== LEFT TEXT ===== */}
              <motion.div
                className="text-left"
                style={{
                  opacity: Math.max(1 - scrollY / 400, 0),
                  transform: isDesktop
                    ? `translateY(${scrollY * 0.7}px)`
                    : "translateY(0px)",
                }}
              >
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-tight text-white">
                  Welcome to
                  <br />

                  {/* Rotating Underlined Text */}
                  <span className="relative inline-block min-h-[1.6em] min-w-md overflow-hidden whitespace-nowrap">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={rotatingWords[wordIndex]}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute left-0 top-0 underline decoration-4 underline-offset-8 whitespace-nowrap"
                      >
                        {rotatingWords[wordIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </h1>
              </motion.div>

              {/* ===== RIGHT CTA ===== */}
              <motion.div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                <motion.button
                  className="px-6 py-3 sm:px-8 sm:py-3.5 text-white rounded-full text-sm sm:text-base font-medium whitespace-nowrap"
                  style={{
                    background:
                      "linear-gradient(201.53deg, #FE8C5B -1.6%, #FE8D45 23.06%, #FE611C 48.66%, #FF8841 87.19%, #F44F17 102.98%)",
                  }}
                  whileHover={{ scale: 1.08 }}
                >
                  Book a free 15-min audit
                </motion.button>

                <motion.button
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 border-2 border-white/50 flex items-center justify-center"
                  whileHover={{ scale: 1.15 }}
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </motion.button>
              </motion.div>

            </div>
          </div>
        </section>
      </div>
    </ParallaxProvider>
  );
};

export default HeroSection;
