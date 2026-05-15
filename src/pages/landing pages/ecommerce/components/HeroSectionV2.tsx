import React, { useEffect, useState, useRef } from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { motion, AnimatePresence } from "framer-motion";

const rotatingWords = [
"Brilliant Results",
"Brilliant Performance",
"Brilliant Marketing",
"Brilliant Conversions",
"Brilliant Scaling",
"Brilliant Impact",
];

const HeroSectionV2: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Ensure videos play and loop properly
  useEffect(() => {
    const ensureVideoPlays = (video: HTMLVideoElement | null) => {
      if (!video) return;
      
      video.play().catch(() => {
        // Autoplay failed, user interaction required
        const playOnInteraction = () => {
          video.play();
          document.removeEventListener('click', playOnInteraction);
          document.removeEventListener('touchstart', playOnInteraction);
        };
        document.addEventListener('click', playOnInteraction);
        document.addEventListener('touchstart', playOnInteraction);
      });
    };

    ensureVideoPlays(mobileVideoRef.current);
    ensureVideoPlays(desktopVideoRef.current);
  }, []);

  const scrollToAudit = () => {
    document
      .getElementById("get-audit")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToDown = () => {
    document.getElementById("info")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ParallaxProvider>
      <section className="w-full bg-black rounded-3xl md:h-screen overflow-hidden">
        {/* ================= MOBILE LAYOUT ================= */}
        <div className="block md:hidden mt-20">
          {/* Video at top */}
          <div className="relative w-full h-[60vh] overflow-hidden">
            <video
              ref={mobileVideoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/images/hero-poster.jpg"
              className="w-full h-full object-cover"
            >
              <source src="/videos/hero-mobile-v2.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Content below video */}
          <div className="px-4 pt-6 pb-10">
            <motion.h1
              className="text-xl font-medium leading-tight text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-white text-lg bg-clip-text text-transparent">
                #1 Growth Marketing Agency
              </span>
              <br />
              <span className="bg-[linear-gradient(90deg,#F95A1B_0%,#F95A1B_100%)] bg-clip-text text-transparent">
                Top Rated AI Digital Marketing Experts
              </span>
              <br />

              <span className="relative block w-full min-h-[1.5em] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingWords[wordIndex]}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="
                      absolute left-0 top-0 block w-full
                      underline decoration-4 underline-offset-8
                      decoration-[#F95A1B]
                      bg-[linear-gradient(90deg,#F95A1B_0%,#F95A1B_100%)]
                      bg-clip-text text-transparent
                    "
                  >
                    For {rotatingWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <div className="flex gap-4 mt-6">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 text-white rounded-full text-sm font-medium"
                style={{
                  background:
                    "linear-gradient(201.53deg, #FE8C5B -1.6%, #FE8D45 23.06%, #FE611C 48.66%, #FF8841 87.19%, #F44F17 102.98%)",
                }}
                onClick={scrollToAudit}
              >
                Book a free 15-min audit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.15 }}
                className="w-14 h-14 rounded-full bg-white/10 border-2 border-white/50 flex items-center justify-center"
                onClick={scrollToDown}
              >
                <svg
                  className="w-6 h-6 text-white"
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
            </div>
          </div>
        </div>

        {/* ================= DESKTOP LAYOUT ================= */}
        <div className="hidden md:block relative h-screen">
          {/* Video */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <Parallax className="absolute inset-0" translateY={[-30, 30]}>
              <video
                ref={desktopVideoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/images/hero-poster.jpg"
                className="
                  absolute top-1/2 left-1/2
                  min-w-full min-h-full
                  -translate-x-1/2 -translate-y-1/2
                  object-cover
                "
              >
                <source src="/videos/herosectionvideo.mp4" type="video/mp4" />
              </video>
            </Parallax>
          </div>

          {/* Bottom gradient overlay */}
          <div
            className="
              pointer-events-none
              absolute inset-x-0 bottom-0
              h-64
              bg-gradient-to-t
              from-black/90
              via-black/60
              to-transparent
              z-[5]
            "
          />

          {/* Overlay content */}
          <div className="absolute inset-x-0 bottom-4 z-10 max-w-7xl mx-auto px-8">
            <div className="flex justify-between items-center">
              <motion.div
                style={{
                  opacity: Math.max(1 - scrollY / 400, 0),
                  transform: `translateY(${scrollY * 0.7}px)`,
                }}
              >
                <h1 className="text-4xl font-medium leading-tight">
                  <span className="bg-white text-xl bg-clip-text text-transparent">
                    #1 Growth Marketing Agency
                  </span>
                  <br />
                  <span className="bg-[linear-gradient(90deg,#F95A1B_0%,#F95A1B_100%)] bg-clip-text text-transparent">
                    Top Rated AI Digital Marketing Experts
                  </span>
                  <br />

                  <span className="relative inline-block min-h-[1.6em] min-w-xl overflow-hidden whitespace-nowrap">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={rotatingWords[wordIndex]}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="
                          absolute left-0 top-0
                          decoration-[#F95A1B]
                          bg-[linear-gradient(90deg,#F95A1B_0%,#F95A1B_100%)]
                          bg-clip-text text-transparent
                        "
                      >
                        <span>For </span>
                        <span className="underline decoration-4 underline-offset-8">
                          {rotatingWords[wordIndex]}
                        </span>
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </h1>
              </motion.div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  className="px-8 py-3 text-white rounded-full font-medium"
                  style={{
                    background:
                      "linear-gradient(201.53deg, #FE8C5B -1.6%, #FE8D45 23.06%, #FE611C 48.66%, #FF8841 87.19%, #F44F17 102.98%)",
                  }}
                  onClick={scrollToAudit}
                >
                  Book a free 15-min audit
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.15 }}
                  className="w-14 h-14 rounded-full bg-white/10 border-2 border-white/50 flex items-center justify-center"
                  onClick={scrollToDown}
                >
                  <svg
                    className="w-6 h-6 text-white"
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </ParallaxProvider>
  );
};

export default HeroSectionV2;