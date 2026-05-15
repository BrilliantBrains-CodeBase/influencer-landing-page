import React from "react";
import { motion } from "framer-motion";

const InfluencerThankYou: React.FC = () => {
  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-2xl w-full bg-neutral-900/80 backdrop-blur rounded-3xl px-8 py-14 md:px-12 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,90,27,0.15),transparent_60%)] pointer-events-none" />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="mx-auto mb-6 w-16 h-16 rounded-full bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)] flex items-center justify-center"
        >
          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4 bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)] bg-clip-text text-transparent"
        >
          You're in the network!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-gray-300 text-sm md:text-base leading-relaxed max-w-md mx-auto"
        >
          Your application has been received.
          <br />
          We'll review your profile within 48 hours and reach out on WhatsApp with your first brand match.
        </motion.p>

        <div className="my-8 h-px bg-white/10" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/influencer"
            className="px-6 py-3 rounded-full text-sm font-semibold text-black bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)] hover:opacity-90 transition"
          >
            Back to page
          </a>
          <a
            href="https://brilliantbrains.digital"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full text-sm font-medium text-white border border-white/20 hover:bg-white hover:text-black transition"
          >
            Visit website
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default InfluencerThankYou;
