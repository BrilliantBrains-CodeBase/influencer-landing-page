import React from "react";
import { motion } from "framer-motion";

const EcommerceThankYou: React.FC = () => {
  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="
          max-w-2xl w-full
          bg-neutral-900/80 backdrop-blur
          rounded-3xl
          px-8 py-14 md:px-12
          text-center
          relative overflow-hidden
        "
      >
        {/* subtle glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,90,27,0.15),transparent_60%)] pointer-events-none" />

        {/* CHECK ICON */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="
            mx-auto mb-6 w-16 h-16 rounded-full
            bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)]
            flex items-center justify-center
          "
        >
          <svg
            className="w-8 h-8 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="
            text-3xl sm:text-4xl md:text-5xl font-medium mb-4
            bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)]
            bg-clip-text text-transparent
          "
        >
          Thank you for booking
        </motion.h1>

        {/* MESSAGE */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-gray-300 text-sm md:text-base leading-relaxed max-w-md mx-auto"
        >
          Your e-commerce growth audit request has been received.
          <br />
          Our team will review your details and reach out shortly.
        </motion.p>

        {/* DIVIDER */}
        <div className="my-8 h-px bg-white/10" />

        {/* ACTIONS */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* <Link
            to="/"
            className="
              px-6 py-3 rounded-full text-sm font-medium
              text-black
              bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)]
              hover:opacity-90 transition
            "
          >
            Back to home
          </Link> */}

          <a
            href="https://brilliantbrains.digital"
            target="_blank"
            rel="noopener noreferrer"
            className="
              px-6 py-3 rounded-full text-sm font-medium
              text-white border border-white/20
              hover:bg-white hover:text-black transition
            "
          >
            Visit website
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EcommerceThankYou;
