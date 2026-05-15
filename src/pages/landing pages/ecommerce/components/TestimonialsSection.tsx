import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

/* ================= TYPES ================= */

interface Testimonial {
  name: string;
  title: string;
  company: string;
  content: string;
  avatar?: string;
}

/* ================= DATA ================= */

const testimonials: Testimonial[] = [
  {
    name: "Aman Vachher",
    title: "Founder",
    company: "One Science Nutrition",
    avatar: "/avatars/aman.jpg",
    content:
      "Brilliant Brains helped us identify where users were dropping off and fixed those gaps quickly. Conversion rates improved steadily without aggressive changes that could have hurt the brand.",
  },
  {
    name: "Rohit Malhotra",
    title: "Founder",
    company: "D2C Skincare Brand",
    avatar: "/avatars/user1.jpg",
    content:
      "What stood out was their focus on fundamentals. Instead of pushing more spend, they improved our landing pages and funnel logic, which brought down CAC significantly.",
  },
  {
    name: "Neha Kapoor",
    title: "Head of Marketing",
    company: "Lifestyle E-commerce",
    avatar: "/avatars/user2.jpg",
    content:
      "Their team worked closely with ours and explained every change clearly. Reporting was clean and decisions were backed by data, not assumptions.",
  },
  {
    name: "Arjun Mehta",
    title: "Co-Founder",
    company: "Nutrition Startup",
    avatar: "/avatars/user3.jpg",
    content:
      "We saw consistent improvement month over month. The focus wasn’t just on ads, but also on product positioning and user experience.",
  },
  {
    name: "Sneha Iyer",
    title: "Growth Lead",
    company: "Consumer Brand",
    avatar: "/avatars/user4.jpg",
    content:
      "Brilliant Brains helped us structure experiments properly. Even when something didn’t work, we knew why, which helped us iterate faster.",
  },
  {
    name: "Kunal Verma",
    title: "Founder",
    company: "E-commerce Apparel Brand",
    avatar: "/avatars/user5.jpg",
    content:
      "They didn’t overpromise. The results came gradually but were sustainable, which is exactly what we were looking for.",
  },
  {
    name: "Pooja Nair",
    title: "Brand Manager",
    company: "Wellness Products",
    avatar: "/avatars/user6.jpg",
    content:
      "The collaboration felt more like an in-house team than an agency. Communication was smooth and timelines were respected.",
  },
  {
    name: "Siddharth Jain",
    title: "Founder",
    company: "Marketplace Startup",
    avatar: "/avatars/user7.jpg",
    content:
      "Their understanding of user behavior helped us improve checkout completion. Small changes, but a noticeable impact on revenue.",
  },
  {
    name: "Ananya Gupta",
    title: "Marketing Lead",
    company: "Beauty Brand",
    avatar: "/avatars/user8.jpg",
    content:
      "They balanced performance goals with brand consistency, which is rare. Our ads performed better without looking salesy.",
  },
  {
    name: "Rakesh Sharma",
    title: "CEO",
    company: "E-commerce Platform",
    avatar: "/avatars/user9.jpg",
    content:
      "The team was proactive and transparent. We always knew what was being tested and how it aligned with our growth goals.",
  },
];

/* 🔑 DUPLICATE FOR SEAMLESS LOOP */
const loopedTestimonials = [...testimonials, ...testimonials];

/* ================= CARD ================= */

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => (
  <motion.div
    className="bg-black rounded-2xl p-6 md:p-8 w-[280px] sm:w-[320px] md:w-[380px] flex-shrink-0 flex flex-col h-full"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    {/* Avatar */}
    {/* <img
      src={testimonial.avatar || ""}
      alt={testimonial.name}
      className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover mb-3"
    /> */}

    {/* Name */}
    <div className="mb-4">
      <h3 className="text-white text-base md:text-lg font-semibold">
        {testimonial.name}
      </h3>
      <p className="text-gray-400 text-xs md:text-sm">
        {testimonial.company
          ? `${testimonial.company}, ${testimonial.title}`
          : testimonial.title}
      </p>
    </div>

    {/* Content */}
    <p className="text-gray-300 text-xs md:text-sm leading-relaxed flex-grow">
      {testimonial.content}
    </p>
  </motion.div>
);

/* ================= SECTION ================= */

const TestimonialsSection: React.FC = () => {
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
    <section className="w-full py-16 lg:py-24 overflow-hidden">
      <div className="w-full">
        {/* Title */}
        <motion.div
          className="max-w-7xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="
  text-4xl md:text-5xl lg:text-6xl font-medium
  bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)]
  bg-clip-text text-transparent
"
          >
            Testimonials
          </h2>
        </motion.div>

        {/* Desktop */}
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

        {/* Mobile */}
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
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
