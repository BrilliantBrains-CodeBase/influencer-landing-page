import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Item = {
  id: number;
  label: string;
  title: string;
  subline: string;
  description: string;
  image: string;
};

const items: Item[] = [
  {
    id: 1,
    label: "Mobile App Design & Development",
    title: "Mobile App Design & Development",
    subline: "Building intuitive and powerful mobile experiences for businesses that grow.",
    description:
      "At Brilliant Brains, we specialise in native and cross-platform app development for iOS, Android, Flutter, and React Native. Our UI/UX design focuses on enhancing user experience for mobile commerce and booking apps. We incorporate AI-driven personalisation, ASO optimisation, and continuous maintenance to keep your app scalable and relevant.",
    image: "/cards/1.-.Mobile-App-Design-Development.jpg",
  },
  {
    id: 2,
    label: "SEO, AEO & GEO Optimization",
    title: "SEO, AEO & GEO Optimization",
    subline: "Optimising your digital presence to be found first, even by AI.",
    description:
      "We optimise product pages, blogs, and category structures while implementing AI Engine Optimisation for platforms like ChatGPT, Gemini, and Perplexity. Our local SEO and voice search strategies help hybrid retail and clinic-based businesses rank higher.",
    image: "/cards/2.SEO,AEO-&-GEO-Optimization.jpg",
  },
  {
    id: 3,
    label: "AI, Automation & CRM",
    title: "AI, Automation & CRM",
    subline: "Automating marketing with AI-driven efficiency and personalised experiences.",
    description:
      "From AI chatbots and voice agents to WhatsApp and email automation, we help brands personalise journeys at scale. CRM integrations with HubSpot, Zoho, Salesforce, and Odoo ensure predictive lead scoring, retention automation, and smarter workflows.",
    image: "/cards/3.-AI-automation-&-CRM-Option--B.jpg",
  },
  {
    id: 4,
    label: "Data Science & Analytics",
    title: "Data Science & Analytics",
    subline: "We don’t guess. We measure, predict, and optimise for higher conversions.",
    description:
      "Our CRO-focused data science team uses funnel heatmaps, attribution modelling, LTV analysis, and cohort tracking. With Brilliant Insights™, we deliver real-time analytics to optimise campaigns and scale sustainably.",
    image: "/cards/4.Data-Science-and-Analytics.jpg",
  },
  {
    id: 5,
    label: "Business Strategy & Growth Consulting",
    title: "Business Strategy & Growth Consulting",
    subline: "Roadmaps for scale, from entry to global expansion.",
    description:
      "We provide 90-day growth blueprints, market-entry strategies for UAE, KSA, and the UK, store audits, funnel optimisation, and retention planning to help brands grow with clarity and confidence.",
    image: "/cards/5.Business-Strategy-and-Growth-Consulting.jpg",
  },
  {
    id: 6,
    label: "Media & Production Suite",
    title: "Media & Production Suite",
    subline: "Crafting content that elevates your brand across all platforms.",
    description:
      "Our media services include lifestyle and product shoots, founder films, cinematic drone videos, 3D & CGI commercials, and multilingual voiceovers that drive attention and measurable conversions.",
    image: "/cards/6.Media-&-Production-Suite.jpg",
  },
  {
    id: 7,
    label: "Additional & Premium Services",
    title: "Additional & Premium Services",
    subline: "Specialised services for a competitive edge.",
    description:
      "We deliver AI product try-ons, AR experiences, CX optimisation, cross-border localisation for Arabic markets, and investor-ready corporate pitch decks to help brands expand internationally.",
    image: "/cards/7.Additional-&-Premium-Services.jpg",
  },
  {
    id: 8,
    label: "Social Media Marketing & Content Creation",
    title: "Social Media Marketing & Content Creation",
    subline: "Turning social platforms into high-conversion engines.",
    description:
      "We build high-engagement campaigns across Instagram, TikTok, LinkedIn, and YouTube. From UGC influencer programs to animation, video editing, and multilingual localisation, we create content that converts.",
    image: "/cards/8.Social-Media-Marketing-&-content-creation.jpg",
  },
];

const WhatElseWeDo: React.FC = () => {
  const [active, setActive] = useState<Item>(items[0]);

  const scrollToAudit = () => {
    document
      .getElementById("get-audit")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hidden lg:block bg-black py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-neutral-900 rounded-3xl p-12">

          {/* Header */}
          <div className="flex justify-between mb-12">
            <h2 className="text-white text-4xl font-medium">
              What Else We Do
              <br />
              at a Glance
            </h2>

            <p className="max-w-md text-sm text-gray-400">
              Beyond performance marketing, we build intelligent systems,
              creative engines, and scalable growth strategies.
            </p>
          </div>

          {/* Content */}
          <div className="flex gap-12 items-center">

            {/* LEFT FIXED CARD */}
            <div className="w-[340px] relative h-[440px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0 bg-white rounded-2xl p-5"
                >
                  <div className="rounded-xl overflow-hidden mb-4">
                    <img
                      src={active.image}
                      alt={active.title}
                      className="w-full h-[180px] object-cover"
                    />
                  </div>

                  <h3 className="text-black text-lg font-semibold mb-1">
                    {active.title}
                  </h3>

                  <p className="text-sm text-neutral-600 mb-3">
                    {active.subline}
                  </p>

                  <p className="text-sm text-neutral-700 leading-tight">
                    {active.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* BADGES */}
            <div className="flex-1 flex flex-wrap items-center gap-3">
              {items.map((item) => (
                <motion.button
                  key={item.id}
                  onMouseEnter={() => setActive(item)}
                  whileHover={{ scale: 1.04 }}
                  className={`
                    px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors
                    ${
                      active.id === item.id
                        ? "bg-orange-500 text-black"
                        : "bg-neutral-950 text-white hover:bg-neutral-700"
                    }
                  `}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div
            className="mt-12 rounded-2xl p-6 flex items-center justify-between"
            style={{
              background:
                "linear-gradient(201.53deg, #FE8C5B -1.6%, #FE8D45 23.06%, #FE611C 48.66%, #FF8841 87.19%, #F44F17 102.98%)",
            }}
          >
            <p className="text-black text-xl font-medium">
              Free 15-minute
              <br />
              ecommerce growth audit
            </p>

            <button className="px-6 py-3 rounded-full text-sm font-medium bg-black text-white hover:bg-neutral-900 transition-all hover:scale-105" onClick={scrollToAudit}>
              Book your free 15 min audit
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhatElseWeDo;
