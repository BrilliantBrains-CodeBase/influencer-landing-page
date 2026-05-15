import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItemProps {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}

const StatItem: React.FC<StatItemProps> = ({
  prefix = "",
  value,
  suffix,
  label,
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center text-center"
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-medium mb-2">
        <span className="bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)] bg-clip-text text-transparent">
          {prefix}{count}{suffix}
        </span>
      </div>
      <div className="text-gray-300 text-sm leading-snug max-w-[120px]">{label}</div>
    </motion.div>
  );
};

const secondaryStats = [
  { value: "48 Hours", label: "Average profile approval time" },
  { value: "15 Days", label: "Maximum payment processing time" },
  { value: "92%", label: "Creator retention after first campaign" },
];

const StatsBar: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="w-full bg-neutral-950 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">

        <motion.p
          className="text-center text-gray-500 text-xs uppercase tracking-widest mb-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Numbers that speak
        </motion.p>
        <motion.h2
          className="text-center text-2xl md:text-3xl font-medium text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Not promises. Proof.
        </motion.h2>

        {/* Primary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          <StatItem prefix="" value={7800} suffix="+" label="Creators Onboarded" delay={0.1} />
          <StatItem prefix="" value={450} suffix="+" label="Brand Campaigns Run" delay={0.2} />
          <StatItem prefix="" value={8} suffix="X" label="Avg Content ROI" delay={0.3} />
          <StatItem prefix="₹" value={12} suffix="Cr+" label="Creator Payouts Processed" delay={0.4} />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-10" />

        {/* Secondary stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {secondaryStats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <span className="text-xl md:text-2xl font-semibold bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)] bg-clip-text text-transparent mb-1">
                {s.value}
              </span>
              <span className="text-gray-400 text-sm">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
