import React, { useEffect, useRef, useState } from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { motion, useInView } from "framer-motion";

interface StatItemProps {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
  sublabel?: string;
  delay?: number;
}

const StatItem: React.FC<StatItemProps> = ({
  prefix = "",
  value,
  suffix,
  label,
  sublabel,
  delay = 0,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center text-center"
    >
      <div className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)] bg-clip-text text-transparent">
        {prefix}{count}{suffix}
      </div>
      <div className="text-white text-xs sm:text-sm font-medium mt-1">{label}</div>
      {sublabel && (
        <div className="text-gray-400 text-xs mt-0.5">{sublabel}</div>
      )}
    </motion.div>
  );
};

const HeroInfluencer: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ensureVideoPlays = (video: HTMLVideoElement | null) => {
      if (!video) return;
      video.play().catch(() => {
        const playOnInteraction = () => {
          video.play();
          document.removeEventListener("click", playOnInteraction);
          document.removeEventListener("touchstart", playOnInteraction);
        };
        document.addEventListener("click", playOnInteraction);
        document.addEventListener("touchstart", playOnInteraction);
      });
    };
    ensureVideoPlays(mobileVideoRef.current);
    ensureVideoPlays(desktopVideoRef.current);
  }, []);

  const scrollToRegister = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWhyJoin = () => {
    document.getElementById("why-join")?.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { prefix: "", value: 7800, suffix: "+", label: "Creators Onboarded", sublabel: "and growing" },
    { prefix: "", value: 450, suffix: "+", label: "Brand Campaigns", sublabel: "live & counting" },
    { prefix: "", value: 8, suffix: "X", label: "Avg Content ROI", sublabel: "per campaign" },
    { prefix: "₹", value: 12, suffix: "Cr+", label: "Creator Payouts", sublabel: "processed" },
  ];

  return (
    <ParallaxProvider>
      <section className="w-full bg-black rounded-3xl md:h-screen overflow-hidden">

        {/* ===== MOBILE LAYOUT ===== */}
        <div className="block md:hidden mt-20">
          <div className="relative w-full h-[55vh] overflow-hidden">
            <video
              ref={mobileVideoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            >
              <source src="/videos/influencer-hero-mobile.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>

          <div className="px-4 pt-6 pb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-medium px-3 py-1 rounded-full border border-[#F95A1B]/40 text-[#F95A1B] mb-4 inline-block">
                India's #1 Influencer Marketing Network
              </span>
              <h1 className="text-3xl font-semibold leading-tight text-white mt-3 mb-2">
                Create.{" "}
                <span className="bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)] bg-clip-text text-transparent">
                  Collab.
                </span>{" "}
                Cash In.
              </h1>
              <p className="text-gray-300 text-sm leading-relaxed mt-3 mb-6">
                Join 7,800+ creators already working with India's fastest-growing brands. One network. Endless collaborations. Real money. Real growth.
              </p>
            </motion.div>

            <div className="flex gap-3 mb-8">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={scrollToRegister}
                className="px-6 py-3 text-black rounded-full text-sm font-semibold"
                style={{
                  background:
                    "linear-gradient(201.53deg, #FE8C5B -1.6%, #FE8D45 23.06%, #FE611C 48.66%, #FF8841 87.19%, #F44F17 102.98%)",
                }}
              >
                Join The Network →
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={scrollToWhyJoin}
                className="px-5 py-3 rounded-full text-sm font-medium text-white border border-white/30 hover:border-white/60 transition-colors"
              >
                See How It Works
              </motion.button>
            </div>

            {/* Mobile stats row */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <StatItem key={i} {...s} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </div>

        {/* ===== DESKTOP LAYOUT ===== */}
        <div className="hidden md:block relative h-screen">
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <Parallax className="absolute inset-0" translateY={[-30, 30]}>
              <video
                ref={desktopVideoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
              >
                <source src="/videos/influencer-hero-desktop.mp4" type="video/mp4" />
              </video>
            </Parallax>
          </div>

          {/* Bottom gradient */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-[5]" />

          {/* Overlay content */}
          <div className="absolute inset-x-0 bottom-0 z-10 max-w-7xl mx-auto px-8 pb-8">
            <div className="flex justify-between items-end gap-8">
              {/* Left: headline + CTAs */}
              <motion.div
                style={{
                  opacity: Math.max(1 - scrollY / 400, 0),
                  transform: `translateY(${scrollY * 0.4}px)`,
                }}
              >
                <span className="text-xs font-medium px-3 py-1 rounded-full border border-[#F95A1B]/40 text-[#F95A1B] mb-4 inline-block">
                  #1 India's Influencer Marketing Network
                </span>
                <h1 className="text-5xl xl:text-6xl font-semibold leading-tight text-white mt-3 mb-4">
                  <span className="block">Create.</span>
                  <span className="block bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)] bg-clip-text text-transparent">
                    Collab.
                  </span>
                  <span className="block">Cash In.</span>
                </h1>
                <p className="text-gray-300 text-base leading-relaxed max-w-lg mb-6">
                  Join 7,800+ creators already working with India's fastest-growing brands. One network. Endless collaborations. Real money. Real growth.
                </p>
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={scrollToRegister}
                    className="px-8 py-3.5 text-black rounded-full font-semibold text-sm"
                    style={{
                      background:
                        "linear-gradient(201.53deg, #FE8C5B -1.6%, #FE8D45 23.06%, #FE611C 48.66%, #FF8841 87.19%, #F44F17 102.98%)",
                    }}
                  >
                    Join The Network →
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={scrollToWhyJoin}
                    className="px-7 py-3.5 rounded-full text-sm font-medium text-white border border-white/30 hover:border-white/60 transition-colors"
                  >
                    See How It Works
                  </motion.button>
                </div>
              </motion.div>

              {/* Right: stats */}
              <motion.div
                className="flex gap-8 lg:gap-12 pb-2"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {stats.map((s, i) => (
                  <StatItem key={i} {...s} delay={0.4 + i * 0.1} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </ParallaxProvider>
  );
};

export default HeroInfluencer;
