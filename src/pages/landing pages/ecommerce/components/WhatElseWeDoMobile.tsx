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

const WhatElseWeDoMobile: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(1);

    const scrollToAudit = () => {
    document
      .getElementById("get-audit")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="block lg:hidden bg-black py-16">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-neutral-900 rounded-3xl p-6">

          {/* Header */}
          <h2 className="text-white text-2xl font-medium mb-2">
            What Else We Do
            <br />
            at a Glance
          </h2>

          <p className="text-sm text-gray-400 mb-6">
            Our full-stack approach helps brands grow sustainably through
            design, data, automation, and performance marketing.
          </p>

          {/* Accordion */}
          <div className="space-y-3">
            {items.map((item) => {
              const isActive = activeId === item.id;

              return (
                <div key={item.id} className="rounded-2xl overflow-hidden">
                  {/* Badge */}
                  <button
                    onClick={() =>
                      setActiveId(isActive ? 0 : item.id)
                    }
                    className={`w-full text-left px-4 py-3 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? "text-black"
                        : "bg-neutral-800 text-white"
                    }`}
                    style={
                      isActive
                        ? {
                            background:
                              "linear-gradient(201.53deg, #FE8C5B -1.6%, #FE8D45 23.06%, #FE611C 48.66%, #FF8841 87.19%, #F44F17 102.98%)",
                          }
                        : undefined
                    }
                  >
                    {item.label}
                  </button>

                  {/* Content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="mt-3 bg-neutral-900 rounded-2xl p-4"
                      >
                        <div className="rounded-xl overflow-hidden mb-4">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-[160px] object-cover"
                          />
                        </div>

                        <h3 className="text-white text-base font-semibold mb-1">
                          {item.title}
                        </h3>

                        <p className="text-sm text-neutral-400 mb-2">
                          {item.subline}
                        </p>

                        <p className="text-sm text-gray-300 leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div
            className="mt-8 rounded-2xl p-5"
            style={{
              background:
                "linear-gradient(201.53deg, #FE8C5B -1.6%, #FE8D45 23.06%, #FE611C 48.66%, #FF8841 87.19%, #F44F17 102.98%)",
            }}
          >
            <p className="text-black text-lg font-medium mb-4">
              Free 15-minute
              <br />
              ecommerce growth audit
            </p>

            <button className="w-full bg-black text-white py-3 rounded-full text-sm font-medium hover:bg-neutral-900 transition-all" onClick={scrollToAudit}>
              Book your slot
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhatElseWeDoMobile;
