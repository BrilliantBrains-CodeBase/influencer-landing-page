import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Reel {
  shortcode: string;
  thumbnail: string;
  creatorName: string;
  handle: string;
  niche: string;
  earningBefore: string;
  earningAfter: string;
  growthLabel: string;
}

const reels: Reel[] = [
  {
    shortcode: "DXt26hMCbUz",
    thumbnail: "/images/reels/DXt26hMCbUz.jpg",
    creatorName: "Priya Sharma",
    handle: "@priya.creates",
    niche: "Lifestyle",
    earningBefore: "₹22K/mo",
    earningAfter: "₹1.8L/mo",
    growthLabel: "3.2× income growth",
  },
  {
    shortcode: "DW2-UhMANwh",
    thumbnail: "/images/reels/DW2-UhMANwh.jpg",
    creatorName: "Rohan Verma",
    handle: "@ugcrohan",
    niche: "UGC Creator",
    earningBefore: "₹15K/mo",
    earningAfter: "₹90K/mo",
    growthLabel: "6× brand deals",
  },
  {
    shortcode: "DXwfw1hT0Fv",
    thumbnail: "/images/reels/DXwfw1hT0Fv.jpg",
    creatorName: "Neha Agarwal",
    handle: "@neha.cooks",
    niche: "Food",
    earningBefore: "₹30K/mo",
    earningAfter: "₹2.1L/mo",
    growthLabel: "7× ROI for brands",
  },
  {
    shortcode: "DXi5xA7k12F",
    thumbnail: "/images/reels/DXi5xA7k12F.jpg",
    creatorName: "Arjun Dev",
    handle: "@arjunlifts",
    niche: "Fitness",
    earningBefore: "₹12K/mo",
    earningAfter: "₹75K/mo",
    growthLabel: "5× earnings",
  },
];

const trackReels = [...reels, ...reels, ...reels, ...reels];

const CARD_W = 260;
const CARD_IMG_H = 300;
const CARD_INFO_H = 130;
const CARD_H = CARD_IMG_H + CARD_INFO_H; // 430
const MAX_SCALE = 1.25;
// Container must fit the center card at full scale so overflow-hidden doesn't clip it
const CONTAINER_H = Math.ceil(CARD_H * MAX_SCALE) + 40; // 578
const GAP = 24;

const ReelsGallerySection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);

  useEffect(() => {
    const totalWidth = reels.length * (CARD_W + GAP);

    const animate = () => {
      if (!pausedRef.current) {
        scrollRef.current += 0.8;
        if (scrollRef.current >= totalWidth) scrollRef.current = 0;
      }

      const track = trackRef.current;
      if (track) {
        const centerX = window.innerWidth / 2;
        Array.from(track.children).forEach((card, i) => {
          const el = card as HTMLElement;
          const setIdx = Math.floor(i / reels.length);
          const baseX = (i % reels.length) * (CARD_W + GAP) + setIdx * totalWidth;
          let x = baseX - scrollRef.current;
          if (x < -CARD_W - GAP) x += totalWidth * 4;

          const dist = Math.abs(centerX - (x + CARD_W / 2));
          const norm = Math.min(dist / 400, 1);
          el.style.transform = `translate3d(${x}px, ${norm * 30}px, 0) scale(${1.25 - norm * 0.5})`;
          el.style.opacity = String(1 - norm * 0.6);
        });
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const openReel = (reel: Reel) => {
    pausedRef.current = true;
    setSelectedReel(reel);
  };

  const closeReel = () => {
    pausedRef.current = false;
    setSelectedReel(null);
  };

  return (
    <section className="bg-black py-16 lg:py-24">
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)] bg-clip-text text-transparent"
        >
          Creator Content That Converts
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mt-4 text-gray-400 text-sm md:text-base max-w-xl mx-auto"
        >
          Real reels. Real results. See what our creators produce for brands
          just like yours.
        </motion.p>
      </div>

      {/* Scrolling gallery — kept mounted so rAF keeps running; hidden when a reel is playing */}
      <div
        className="relative overflow-hidden"
        style={{
          height: `${CONTAINER_H}px`,
          display: selectedReel ? "none" : "block",
        }}
      >
        <div ref={trackRef} className="absolute inset-0 flex items-center">
          {trackReels.map((reel, i) => (
            <div
              key={i}
              className="absolute rounded-2xl overflow-hidden cursor-pointer group bg-neutral-900"
              style={{
                width: CARD_W,
                height: CARD_H,
                transformOrigin: "center center",
                willChange: "transform, opacity",
                top: "50%",
                marginTop: `-${CARD_H / 2}px`,
              }}
              onClick={() => openReel(reel)}
            >
              {/* Thumbnail — single play button on hover */}
              <div className="relative" style={{ height: CARD_IMG_H }}>
                <img
                  src={reel.thumbnail}
                  alt={reel.creatorName}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-14 h-14 rounded-full bg-[#F95A1B]/90 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Info card below thumbnail */}
              <div
                className="px-4 pt-3 pb-4 flex flex-col gap-1"
                style={{ height: CARD_INFO_H }}
              >
                <span className="text-[10px] font-medium text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full self-start">
                  {reel.niche}
                </span>
                <p className="text-white text-sm font-semibold leading-tight">{reel.creatorName}</p>
                <p className="text-[#E9DBB9] text-xs">{reel.handle}</p>
                <div className="mt-auto flex items-center gap-2 text-xs">
                  <span className="text-gray-500 line-through">{reel.earningBefore}</span>
                  <svg className="w-3 h-3 text-orange-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="text-orange-400 font-semibold">{reel.earningAfter}</span>
                </div>
                <p className="text-green-400 text-[10px] font-medium">↑ {reel.growthLabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline player — replaces gallery within the section */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div
            key="inline-player"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="max-w-5xl mx-auto px-6"
          >
            {/* Back button */}
            <button
              onClick={closeReel}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to reels
            </button>

            <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
              {/* Instagram embed */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <iframe
                  src={`https://www.instagram.com/reel/${selectedReel.shortcode}/embed/`}
                  width="380"
                  height="673"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  className="rounded-2xl"
                  style={{ display: "block", maxWidth: "calc(100vw - 48px)" }}
                />
              </div>

              {/* Creator info card */}
              <div className="flex-1 bg-neutral-900 rounded-2xl p-6 md:p-8 self-center w-full md:w-auto">
                <span className="text-xs font-medium text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full">
                  {selectedReel.niche}
                </span>

                <h3 className="text-white text-2xl font-semibold mt-4 leading-tight">
                  {selectedReel.creatorName}
                </h3>
                <p className="text-[#E9DBB9] text-sm mt-1">{selectedReel.handle}</p>

                <div className="mt-6 space-y-4">
                  <p className="text-gray-500 text-xs uppercase tracking-widest font-medium">
                    Earnings after joining Brilliant Brains
                  </p>

                  <div className="flex items-end gap-6">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Before</p>
                      <p className="text-xl text-gray-400 line-through">{selectedReel.earningBefore}</p>
                    </div>
                    <div className="text-orange-400 text-xl pb-0.5">→</div>
                    <div>
                      <p className="text-gray-300 text-xs mb-1">After</p>
                      <p
                        className="text-3xl font-bold bg-clip-text text-transparent"
                        style={{ backgroundImage: "linear-gradient(90deg, #F95A1B 0%, #E9DBB9 100%)" }}
                      >
                        {selectedReel.earningAfter}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                    <span className="text-green-400 text-lg font-bold">↑</span>
                    <span className="text-green-400 font-semibold text-sm">{selectedReel.growthLabel}</span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="mt-6 w-full py-3 rounded-full text-black font-semibold text-sm cursor-pointer"
                  style={{ background: "linear-gradient(90deg, #F95A1B 0%, #E9DBB9 100%)" }}
                >
                  Join The Network →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ReelsGallerySection;
