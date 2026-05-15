import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

interface StatCardProps {
  value: string;
  label: string;
  suffix?: string;
  prefix?: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  suffix = "",
  prefix = "",
  delay = 0,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Extract numeric value
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = numericValue / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center text-center"
    >
      <div className="text-5xl md:text-6xl lg:text-7xl font-medium mb-3">
        <span className="bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)] bg-clip-text text-transparent">
          {prefix}
          {count}
          {suffix}
        </span>
      </div>
      <div className="text-sm text-gray-300 leading-snug">{label}</div>
    </motion.div>
  );
};

const PerformanceHero: React.FC = () => {
  const titleControls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      titleControls.start("visible");
    }
  }, [isInView, titleControls]);

  return (
    <ParallaxProvider>
      <div
        ref={ref}
        className="w-full text-white overflow-hidden rounded-3xl py-4"
      >
        {/* Desktop View */}
        <div className="hidden md:block py-16 px-8 lg:px-16 flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left Column - Title */}
              <Parallax speed={-5}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
                >
                  <div className="text-sm text-gray-400 mb-6">
                    Brilliant Brains:
                  </div>
                  <h1 className="text-3xl lg:text-3xl xl:text-4xl font-semibold leading-tight">
                    Delivering Unmatched Performance for 80+ Brands Globally
                  </h1>
                </motion.div>
              </Parallax>

              {/* Right Column - Stats */}
              <Parallax speed={3}>
                <div className="grid grid-cols-3 gap-8 lg:gap-12">
                  <StatCard
                    value="12"
                    suffix="x"
                    label="ROI on Average Campaigns"
                    delay={0.2}
                  />
                  <StatCard
                    value="50"
                    prefix="$"
                    suffix="M"
                    label="in Sales Generated for multiple brands"
                    delay={0.4}
                  />
                  <StatCard
                    value="60"
                    suffix="%"
                    label="Conversion Rate Growth"
                    delay={0.6}
                  />
                </div>
              </Parallax>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="text-xs text-gray-400 mb-4">Brilliant Brains</div>
              <h1 className="text-2xl font-semibold leading-tight">
                Delivering Unmatched Performance for 80+ Brands Globally
              </h1>
            </motion.div>

            <div className="grid grid-cols-3 gap-8 lg:gap-12">
              <StatCard
                value="12"
                suffix="x"
                label="ROI on Average Campaigns"
                delay={0.2}
              />
              <StatCard
                value="50"
                prefix="$"
                suffix="M"
                label="in Sales Generated for multiple brands"
                delay={0.4}
              />
              <StatCard
                value="60"
                suffix="%"
                label="Conversion Rate Growth"
                delay={0.6}
              />
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-slate-700 via-slate-500 to-slate-400 mt-8"></div>
      </div>
    </ParallaxProvider>
  );
};

export default PerformanceHero;
