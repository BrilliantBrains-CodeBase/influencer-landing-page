import React from "react";
import { motion } from "framer-motion";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import {
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaFacebook,
  FaMapMarkerAlt,
  FaBuilding,
} from "react-icons/fa";
import { FaEnvelope, FaPhoneAlt, FaGlobe } from "react-icons/fa";

const FooterInfluencer: React.FC = () => {
  return (
    <ParallaxProvider>
      <footer className="relative bg-black overflow-hidden pt-18 md:pt-36 pb-16">
        {/* PARALLAX REVEAL TEXT */}
        <Parallax speed={-20}>
          <h2
            className="
              absolute top-0 left-1/2 -translate-x-1/2
              text-[14vw] sm:text-[12vw] lg:text-[8vw]
              font-semibold whitespace-nowrap pointer-events-none
              bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)]
              bg-clip-text text-transparent
            "
          >
            Brilliant Brains
          </h2>
        </Parallax>

        {/* FOOTER CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
            relative z-10
            max-w-7xl mx-auto
            rounded-3xl
            bg-neutral-900/90
            backdrop-blur
            px-6 py-10 md:px-10 md:py-12
            flex flex-col gap-8
          "
        >
          {/* TOP ROW */}
          <div className="flex flex-col md:flex-row justify-between items-stretch gap-8">
            {/* LEFT: LOGO + CONTACT */}
            <div className="text-white text-sm space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
              <a
                href="https://brilliantbrains.digital"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/Logo.png"
                  alt="Brilliant Brains"
                  className="h-28 w-28 md:h-32 md:w-32"
                />
              </a>

              <a
                href="https://brilliantbrains.digital"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-orange-400 transition-colors"
              >
                <FaGlobe className="text-orange-500" />
                brilliantbrains.digital
              </a>

              <a
                href="social@brilliantbrains.digital"
                className="flex items-center gap-2 hover:text-orange-400 transition-colors"
              >
                <FaEnvelope className="text-orange-500" />
                social@brilliantbrains.digital
              </a>

              <a
                href="tel:+917893757631"
                className="flex items-center gap-2 hover:text-orange-400 transition-colors"
              >
                <FaPhoneAlt className="text-orange-500" />
                +91 78937 57631
              </a>
            </div>

            {/* RIGHT: COMPANY + SOCIALS */}
            <div className="flex flex-col md:items-end items-center text-center md:text-right">
              <div className="mt-auto space-y-3">
                <h2 className="text-md md:text-xl text-white font-medium flex items-center gap-2 md:justify-end justify-center whitespace-nowrap">
                  <FaBuilding className="text-orange-500" />
                  Brilliant Brains AI Digital Marketing Pvt Ltd
                </h2>

                <p className="text-white flex gap-2 md:justify-end justify-center">
                  <FaMapMarkerAlt className="text-orange-500 mt-1" />
                  <span>
                    T HUB, Silpa Gram Craft Village,
                    <br />
                    Gachibowli, Hyderabad,
                    <br />
                    Telangana 500032, India
                  </span>
                </p>

                <div className="flex gap-4 pt-2 md:justify-end justify-center">
                  {[
                    {
                      icon: FaInstagram,
                      href: "https://www.instagram.com/brilliantbrains.aiagency/",
                    },
                    {
                      icon: FaLinkedinIn,
                      href: "https://www.linkedin.com/company/brilliant-brains-digital/posts/?feedView=all",
                    },
                    {
                      icon: FaYoutube,
                      href: "https://www.youtube.com/@brilliantbrains.digital",
                    },
                    {
                      icon: FaFacebook,
                      href: "https://www.facebook.com/brilliantbrains.growth",
                    },
                  ].map(({ icon: Icon, href }, index) => (
                    <a
                      key={index}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        w-10 h-10 rounded-full
                        bg-white/10 text-white
                        flex items-center justify-center
                        hover:bg-orange-500 hover:text-black
                        transition-all duration-300
                      "
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-gray-400 text-sm border-t border-white/10 pt-6">
            <p>
              © {new Date().getFullYear()} Brilliant Brains. Built for
              creators.
            </p>

            <a
              href="https://brilliantbrains.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Visit our website →
            </a>
          </div>
        </motion.div>
      </footer>
    </ParallaxProvider>
  );
};

export default FooterInfluencer;
