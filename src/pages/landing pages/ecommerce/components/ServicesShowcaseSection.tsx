import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

type Service = {
  id: number;
  title: string;
  subline: string;
  bullets: string[];
  description: string;

  usp1: string;
  usp1Text: string;
  usp2: string;
  usp2Text: string;

  statLeft: string;
  statLeftText: string;
  statRight: string;
  statRightText: string;

  image: string; // <-- mapped directly to <img src="">
};

export const services: Service[] = [
  {
    id: 1,
    title: "Performance Marketing",
    subline: "Every Click Engineered for ROI.",
    bullets: [
      "Meta & Google Ads (PMax, Advantage+)",
      "Search, Shopping, Display & YouTube",
      "Marketplace Ads (Amazon, Flipkart, Noon)",
      "Multi-country scaling",
      "Funnel & AOV optimization",
    ],
    description:
      "Precision-targeted paid media powered by AI and data-led experimentation.",

    usp1: "ROI Focused",
    usp1Text: "Every campaign optimized for ROAS, not vanity metrics",

    usp2: "Scalable Systems",
    usp2Text: "Built to scale across geographies and platforms",

    statLeft: "#1",
    statLeftText: "Growth Partner",
    statRight: "3.5X",
    statRightText: "Avg ROAS",

    image: "/Services/2.Performance-Marketing.jpg",
  },

  {
    id: 2,
    title: "Marketplace & E-Retail Management",
    subline: "Visibility, Conversion, Loyalty.",
    bullets: [
      "Marketplace onboarding & optimization",
      "Product SEO & reviews",
      "Sponsored ads & AMS",
      "Inventory & pricing automation",
      "SKU-level analytics",
    ],
    description:
      "End-to-end marketplace growth across Amazon, Flipkart, Noon & more.",

    usp1: "Marketplace Expertise",
    usp1Text: "Deep understanding of ranking & buy-box mechanics",

    usp2: "Automation Driven",
    usp2Text: "Reduced ops effort with smarter systems",

    statLeft: "12+",
    statLeftText: "Marketplaces",
    statRight: "40%",
    statRightText: "Sales Lift",

    image: "/Services/3.Marketplace-&-E-Retail-Management.jpg",
  },

  {
    id: 3,
    title: "Creative & Content Studio for E-Commerce",
    subline: "Scroll-Stopping Visuals that Convert.",
    bullets: [
      "Ad creatives & CGI visuals",
      "UGC & influencer-style videos",
      "Studio & lifestyle shoots",
      "AI avatars & virtual try-ons",
    ],
    description: "High-impact content engineered for performance marketing.",

    usp1: "High Engagement",
    usp1Text: "Creatives built for thumb-stopping attention",

    usp2: "Platform Optimized",
    usp2Text: "Designed for Meta, Google & marketplaces",

    statLeft: "#3",
    statLeftText: "IN 15 Countries",
    statRight: "1,250",
    statRightText: "Activations",

    image: "/Services/4.Creative-&-Content-Studio-for-E-Commerce.jpg",
  },

  {
    id: 4,
    title: "E-Commerce Automation & Retention",
    subline: "Smart Systems. Happier Customers.",
    bullets: [
      "WhatsApp & email automation",
      "Abandoned cart recovery",
      "Upsell & cross-sell flows",
      "Loyalty & review systems",
      "AI chatbots",
    ],
    description: "Retention-focused automation that recovers lost revenue.",

    usp1: "Retention First",
    usp1Text: "Turn one-time buyers into repeat customers",

    usp2: "Always-On Systems",
    usp2Text: "Automations that work 24/7",

    statLeft: "25%",
    statLeftText: "Revenue Saved",
    statRight: "4X",
    statRightText: "Repeat Rate",

    image: "/Services/5.E-Commerce-Automation-&-Retention.jpg",
  },

  {
    id: 5,
    title: "SEO, AEO & GEO Optimization",
    subline: "Be Found First – Even by AI.",
    bullets: [
      "Product & category SEO",
      "AI search optimization",
      "Local & map SEO",
      "Schema & voice search",
    ],
    description: "Visibility across Google, marketplaces & AI engines.",

    usp1: "Future-Proof SEO",
    usp1Text: "Optimized for AI-driven discovery",

    usp2: "Intent Focused",
    usp2Text: "Traffic that actually converts",

    statLeft: "300%",
    statLeftText: "Organic Growth",
    statRight: "#1",
    statRightText: "SERP Wins",

    image: "/Services/6.SEO,-AEO-&-GEO-Optimization.jpg",
  },

  {
    id: 6,
    title: "Data Science, Analytics & CRO",
    subline: "We Don't Guess. We Measure & Multiply.",
    bullets: [
      "A/B testing & CRO",
      "ROAS, LTV, CAC dashboards",
      "Heatmaps & funnel insights",
      "Predictive modeling",
    ],
    description: "Data-backed experimentation for continuous growth.",

    usp1: "Data Led",
    usp1Text: "Decisions powered by real insights",

    usp2: "Continuous Optimization",
    usp2Text: "Test, learn & scale faster",

    statLeft: "120+",
    statLeftText: "Experiments",
    statRight: "2.1X",
    statRightText: "CVR Lift",

    image: "/Services/7.Data-Science,-Analytics-&-CRO.jpg",
  },

  {
    id: 7,
    title: "Influencer & Affiliate Marketing",
    subline: "The New Word-of-Mouth Engine.",
    bullets: [
      "Influencer discovery & management",
      "Affiliate program setup",
      "Creator-led UGC",
      "Performance tracking",
    ],
    description: "Creator-powered growth with measurable impact.",

    usp1: "Authentic Reach",
    usp1Text: "Real creators, real audiences",

    usp2: "Performance Tracked",
    usp2Text: "CPA & ROI driven collaborations",

    statLeft: "500+",
    statLeftText: "Creators",
    statRight: "6X",
    statRightText: "Engagement",

    image: "/Services/8.Influencer-&-Affiliate-Marketing.jpg",
  },

  {
    id: 8,
    title: "Inventory & Operations Management",
    subline: "Simplify Growth. Automate Operations.",
    bullets: [
      "Central inventory dashboard",
      "Stock sync across platforms",
      "AI demand forecasting",
      "Logistics tracking",
    ],
    description: "Operational clarity for fast-scaling brands.",

    usp1: "Operational Control",
    usp1Text: "Real-time visibility across channels",

    usp2: "Forecast Ready",
    usp2Text: "AI-powered demand planning",

    statLeft: "99%",
    statLeftText: "Stock Accuracy",
    statRight: "-30%",
    statRightText: "Ops Cost",

    image: "/Services/9.Inventory-&-Operations-Management.jpg",
  },

  {
    id: 9,
    title: "E-Commerce Growth Consulting",
    subline: "Blueprints for 0 → 10X Scale.",
    bullets: [
      "Market entry strategy",
      "90-day growth roadmap",
      "Store & funnel audits",
      "Expansion playbooks",
    ],
    description: "Strategic clarity backed by execution expertise.",

    usp1: "Proven Frameworks",
    usp1Text: "Battle-tested growth playbooks",

    usp2: "Execution Ready",
    usp2Text: "Strategy + implementation support",

    statLeft: "0→10X",
    statLeftText: "Growth Journeys",
    statRight: "90 Days",
    statRightText: "Roadmaps",

    image: "/Services/10.E-Commerce-Growth-Consulting.jpg",
  },
];

const scrollToAudit = () => {
  document.getElementById("get-audit")?.scrollIntoView({ behavior: "smooth" });
};

const CARD_SCROLL = 320;
const FIXED_HEIGHT = "h-[720px]";

const ServicesShowcaseSection: React.FC = () => {
  const [active, setActive] = useState<Service>(services[0]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -CARD_SCROLL, behavior: "smooth" });

  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: CARD_SCROLL, behavior: "smooth" });

  return (
    <ParallaxProvider>
      <section className=" py-24">
        <div className="max-w-7xl mx-auto px-4">
          <Parallax speed={-6}>
            {/* ===== ROUNDED BACKGROUND ===== */}
            <div
              className={`
                rounded-3xl overflow-visible
                bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900
                ${FIXED_HEIGHT}
              `}
            >
              {/* CONTENT AREA */}
              <div className="p-10 md:p-14 max-w-3xl h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2
                      className="
    text-2xl md:text-4xl font-medium mb-4
    bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)]
    bg-clip-text text-transparent
  "
                    >
                      {active.title}
                    </h2>

                    {/* <p className="text-gray-300 mb-6">
                      {active.description}
                    </p> */}

                    <ul className="space-y-2 text-gray-200 text-sm mb-8">
                      {active.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-1 w-1 h-1 bg-white rounded-full flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="
    inline-flex rounded-full
    bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)]
    p-[1px]
  "
                    >
                      <button
                        className="
                                  rounded-full
                                  px-6 py-3
                                  text-sm font-medium
                                  bg-black
                                  text-white
                                  transition-colors duration-300
                                  hover:bg-transparent
                                  hover:text-black
                                "
                        onClick={scrollToAudit}
                      >
                        <span
                          className="bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)]
                              bg-clip-text text-transparent
                              drop-shadow-[0_2px_12px_rgba(249,90,27,0.25)] transition-colors duration-300
                                hover:bg-transparent
                                hover:text-black"
                        >
                          Book a free 15-min audit
                        </span>
                      </button>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ===== CARDS SECTION ===== */}
              <div className="relative px-2 pb-8">
                {/* Arrows */}
                <div className="hidden absolute -top-6 right-6 lg:-top-14 lg:right-6 md:flex gap-3 z-20">
                  <button
                    onClick={scrollLeft}
                    className="w-10 h-10 rounded-full border border-white/40 text-white hover:bg-white/10 transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={scrollRight}
                    className="w-10 h-10 rounded-full border border-white/40 text-white hover:bg-white/10 transition-colors"
                  >
                    →
                  </button>
                </div>

                {/* Scroll rail */}
                <div
                  ref={scrollRef}
                  className="overflow-x-auto overflow-y-visible scrollbar-hide  md:mt-2 "
                >
                  <div className="flex gap-6 w-max py-6 md:px-2 px-1">
                    
                    {services.map((s) => (
                      <motion.div
                        key={s.id}
                        onMouseEnter={() => setActive(s)}
                        whileHover={{ y: -8 }}
                        transition={{ duration: 0.25 }}
                        className={`
      w-[280px] h-[380px] rounded-2xl overflow-hidden
      flex flex-col justify-between cursor-pointer flex-shrink-0
      ${
        active.id === s.id
          ? "bg-neutral-900 ring-2 ring-orange-500"
          : "bg-neutral-800"
      }
    `}
                      >
                        {/* IMAGE AREA */}
                        <div className="h-[250px] bg-neutral-700 flex items-center justify-center">
                          <img
                              src={s.image}
                              alt={s.title}
                              className="h-full w-full object-cover"
                            />
                        </div>

                        {/* CONTENT */}
                        <div className="p-4 flex flex-col gap-3 text-white">
                          <h3 className="text-xl font-semibold bg-[linear-gradient(90deg,#F95A1B_0%,#F95A1B_100%)] bg-clip-text text-transparent leading-snug">
                            {s.title}
                          </h3>

                          {/* STATS */}
                          <div className="flex justify-between items-end text-sm">
                            <div>
                              <div className="text-lg font-semibold">
                                {s.statLeft}
                              </div>
                              <div className="text-[11px] opacity-60">
                                {s.statLeftText}
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-lg font-semibold">
                                {s.statRight}
                              </div>
                              <div className="text-[11px] opacity-60">
                                {s.statRightText}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Parallax>
        </div>
      </section>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </ParallaxProvider>
  );
};

export default ServicesShowcaseSection;
