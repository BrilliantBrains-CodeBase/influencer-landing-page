import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Clock,
  BarChart3,
  UserCheck,
  TrendingUp,
  Shield,
} from "lucide-react";

const cards = [
  {
    icon: Zap,
    title: "Precision Brand Matching",
    description:
      "Our AI-powered matching engine connects you only to brands that align with your niche, audience demographics, and content style. No mismatched pitches, ever.",
  },
  {
    icon: Clock,
    title: "Faster Payments, Always",
    description:
      "Guaranteed payouts within 15 days of content delivery. No invoice chasing, no payment delays — just your money, on time, every time.",
  },
  {
    icon: BarChart3,
    title: "Full Campaign Transparency",
    description:
      "Real-time dashboard showing your reach, engagement, and earnings per campaign. Know exactly how your content is performing the moment it goes live.",
  },
  {
    icon: UserCheck,
    title: "Dedicated Creator Manager",
    description:
      "Every creator gets a personal account manager who handles briefs, negotiations, and brand communication — so you can focus on creating.",
  },
  {
    icon: TrendingUp,
    title: "8X Growth Playbooks",
    description:
      "Access exclusive workshops, content frameworks, and trend alerts curated by our strategy team. Creators in our network grow 8X faster on average.",
  },
  {
    icon: Shield,
    title: "Legal Protection Built-in",
    description:
      "Every collaboration comes with a clear brief, signed agreement, and IP protection. We have your back legally, commercially, and creatively.",
  },
];

const WhyJoinSection: React.FC = () => {
  return (
    <section id="why-join" className="w-full bg-black py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">

        {/* Heading */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-medium text-[#F95A1B] uppercase tracking-widest mb-3 block">
            Why Join
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)] bg-clip-text text-transparent">
            Why Brilliant Brains
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-4 max-w-xl leading-relaxed">
            We don't just connect creators with brands — we build careers, track results, and make every collab count.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-neutral-900 rounded-2xl p-6 flex flex-col gap-4 hover:bg-neutral-800 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F95A1B]/10 flex items-center justify-center flex-shrink-0">
                <card.icon size={20} className="text-[#F95A1B]" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-base mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoinSection;
