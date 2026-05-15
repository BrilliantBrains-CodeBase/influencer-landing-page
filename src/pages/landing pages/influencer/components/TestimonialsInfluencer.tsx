import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface Testimonial {
  name: string;
  handle: string;
  followers: string;
  niche: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Ananya Mehta",
    handle: "@ananyalifestyle",
    followers: "280K followers",
    niche: "Lifestyle",
    content:
      "I went from 2 brand collabs a quarter to 12 a month after joining. The team handles everything — I just create. My income grew 6X in 5 months.",
  },
  {
    name: "Rohan Kapoor",
    handle: "@ugcwithrohan",
    followers: "UGC Creator",
    niche: "Fitness & Nutrition",
    content:
      "As a UGC creator with under 5K followers, I was invisible to brands. Brilliant Brains gave me access to 8 campaigns in my first month. Absolute game changer.",
  },
  {
    name: "Shreya Pillai",
    handle: "@shreyacooks",
    followers: "190K followers",
    niche: "Cooking & Food",
    content:
      "The dedicated manager is the real MVP. She negotiated my rate up 40% and handled all the brand back-and-forth. I literally just showed up and created.",
  },
  {
    name: "Meera Iyer",
    handle: "@meerabeauty",
    followers: "340K followers",
    niche: "Beauty & Skincare",
    content:
      "The barter campaigns alone covered my entire skincare shelf for 6 months — and two of those converted to paid deals. This network delivers.",
  },
  {
    name: "Arjun Sethi",
    handle: "@arjunlifts",
    followers: "95K followers",
    niche: "Gym & Fitness",
    content:
      "Brilliant Brains matched me with One Science Nutrition within the first week. Brief was clear, collab was smooth, payment was on time. 10/10 experience.",
  },
];

const loopedTestimonials = [...testimonials, ...testimonials];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => (
  <motion.div
    className="bg-neutral-900 rounded-2xl p-6 md:p-8 w-[280px] sm:w-[320px] md:w-[380px] flex-shrink-0 flex flex-col h-full"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    {/* Quote mark */}
    <div className="text-[#F95A1B] text-4xl font-serif leading-none mb-3 select-none">"</div>

    <p className="text-gray-300 text-sm leading-relaxed flex-grow mb-5">
      {testimonial.content}
    </p>

    <div>
      <h3 className="text-white text-base font-semibold">{testimonial.name}</h3>
      <p className="text-[#E9DBB9] text-xs mt-0.5">{testimonial.handle}</p>
      <div className="flex items-center gap-2 mt-1.5">
        <span className="text-gray-500 text-xs">{testimonial.followers}</span>
        <span className="text-gray-700 text-xs">·</span>
        <span className="text-gray-500 text-xs">{testimonial.niche}</span>
      </div>
    </div>
  </motion.div>
);

const TestimonialsInfluencer: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollInterval: ReturnType<typeof setInterval> | null = null;
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null;

    const halfWidth = container.scrollWidth / 2;

    const start = () => {
      if (scrollInterval) return;
      scrollInterval = setInterval(() => {
        container.scrollLeft += 1;
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft = 0;
        }
      }, 20);
    };

    const stop = () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
      }
      if (resumeTimeout) clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(start, 2000);
    };

    start();
    container.addEventListener("mouseenter", stop);
    container.addEventListener("wheel", stop);
    container.addEventListener("mousedown", stop);
    container.addEventListener("touchstart", stop);
    container.addEventListener("mouseleave", start);

    return () => {
      if (scrollInterval) clearInterval(scrollInterval);
      if (resumeTimeout) clearTimeout(resumeTimeout);
    };
  }, []);

  return (
    <section className="w-full bg-black py-16 lg:py-24 overflow-hidden">
      <div className="w-full">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-medium text-[#F95A1B] uppercase tracking-widest mb-3 block">
            Creator Stories
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)] bg-clip-text text-transparent">
            They Joined. They Grew.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-4">
            Real creators. Real results.
          </p>
        </motion.div>

        {/* Desktop carousel */}
        <div className="hidden md:block">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-scroll px-6 scrollbar-hide"
            style={{ scrollbarWidth: "none" }}
          >
            {loopedTestimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>
        </div>

        {/* Mobile snap scroll */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-scroll px-4 snap-x snap-mandatory scrollbar-hide">
            {testimonials.map((t, i) => (
              <div key={i} className="snap-start">
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default TestimonialsInfluencer;
