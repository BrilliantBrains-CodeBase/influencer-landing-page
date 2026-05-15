import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Sign Up",
    description: "Join the network in 60 seconds. No gatekeeping, no waiting lists.",
    isEnd: false,
    metric: undefined as string | undefined,
  },
  {
    number: "02",
    title: "Get Matched",
    description: "We connect you with brands that fit your niche, audience, and aesthetic.",
    isEnd: false,
    metric: undefined as string | undefined,
  },
  {
    number: "03",
    title: "Create & Post",
    description: "Deliver authentic content — your style, your voice, your audience.",
    isEnd: false,
    metric: undefined as string | undefined,
  },
  {
    number: "04",
    title: "Get Paid & Grow",
    description: "Creators in our network see an average 8X growth.",
    isEnd: true,
    metric: "8X",
  },
];

// Desktop: all 4 nodes visible at once, animation front-loaded
const DESKTOP_THRESHOLDS = [0.02, 0.16, 0.30, 0.44] as const;
// Mobile: nodes stacked vertically — spread evenly across full scroll range
const MOBILE_THRESHOLDS = [0.08, 0.33, 0.58, 0.82] as const;

const NodeCircle = ({
  done,
  step,
  size = "w-16 h-16",
}: {
  done: boolean;
  step: (typeof steps)[number];
  size?: string;
}) => (
  <div className="relative">
    <motion.div
      className="absolute -top-7 left-0 right-0 flex justify-center pointer-events-none"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: done ? 0 : 1, y: done ? 14 : 0 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
    >
      <span className="text-xs font-medium text-[#F95A1B] uppercase tracking-wider">
        Step
      </span>
    </motion.div>

    <motion.div
      className={`relative rounded-full flex items-center justify-center ${size} border border-neutral-700 bg-neutral-900 overflow-hidden shrink-0`}
      animate={
        done && step.isEnd
          ? { boxShadow: ["0 0 0px #F95A1B44", "0 0 22px #F95A1B88", "0 0 0px #F95A1B44"] }
          : {}
      }
      transition={done && step.isEnd ? { duration: 2, repeat: Infinity } : {}}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: "#F95A1B" }}
        initial={{ scale: 0 }}
        animate={{ scale: done ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <motion.span
        className="absolute z-10 font-semibold text-white text-base"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: done ? 0 : 1, scale: done ? 0.5 : 1 }}
        transition={{ duration: 0.25, ease: "easeIn" }}
      >
        {step.isEnd ? step.metric : step.number}
      </motion.span>
      <motion.svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        className="absolute z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: done ? 1 : 0 }}
        transition={{ duration: 0.05, delay: done ? 0.25 : 0 }}
      >
        <motion.path
          d="M5 12l4.5 4.5L19 7"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: done ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: done ? 0.25 : 0 }}
        />
      </motion.svg>
    </motion.div>
  </div>
);

const TextContent = ({ index, align }: { index: number; align: "left" | "right" | "center" }) => {
  const step = steps[index];
  return (
    <>
      <span className="bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)] bg-clip-text text-transparent text-xs font-semibold mb-1.5 block">
        {step.number}
      </span>
      <h3 className={`text-white font-semibold text-sm mb-1 ${align === "right" ? "text-right" : ""}`}>
        {step.title}
      </h3>
      <p className={`text-gray-400 text-xs leading-relaxed ${align === "right" ? "text-right" : ""}`}>
        {step.description}
      </p>
      {step.isEnd && (
        <p className={`mt-1.5 bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)] bg-clip-text text-transparent text-base font-medium ${align === "right" ? "text-right" : ""}`}>
          {step.metric} Growth
        </p>
      )}
    </>
  );
};

const TimelineInfluencer = () => {
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const [completedDesktop, setCompletedDesktop] = useState<[boolean, boolean, boolean, boolean]>(
    [false, false, false, false]
  );
  const [completedMobile, setCompletedMobile] = useState<[boolean, boolean, boolean, boolean]>(
    [false, false, false, false]
  );

  const { scrollYProgress: desktopProgress } = useScroll({
    target: desktopRef,
    offset: ["start 80%", "end 20%"],
  });

  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileRef,
    offset: ["start 85%", "end 15%"],
  });

  useMotionValueEvent(desktopProgress, "change", (latest) => {
    setCompletedDesktop(() => {
      const next = [false, false, false, false] as [boolean, boolean, boolean, boolean];
      DESKTOP_THRESHOLDS.forEach((t, i) => { if (latest >= t) next[i] = true; });
      return next;
    });
  });

  useMotionValueEvent(mobileProgress, "change", (latest) => {
    setCompletedMobile(() => {
      const next = [false, false, false, false] as [boolean, boolean, boolean, boolean];
      MOBILE_THRESHOLDS.forEach((t, i) => { if (latest >= t) next[i] = true; });
      return next;
    });
  });

  // Desktop: horizontal fill line — piecewise, pauses at each node
  const lineWidth = useTransform(
    desktopProgress,
    [0, 0.06, 0.16, 0.20, 0.30, 0.34, 0.44, 0.50],
    ["0%", "0%", "33.3%", "33.3%", "66.7%", "66.7%", "100%", "100%"]
  );

  // Desktop text
  const dText0Opacity = useTransform(desktopProgress, [0.06, 0.10], [0, 1]);
  const dText1Opacity = useTransform(desktopProgress, [0.20, 0.24], [0, 1]);
  const dText2Opacity = useTransform(desktopProgress, [0.34, 0.38], [0, 1]);
  const dText3Opacity = useTransform(desktopProgress, [0.48, 0.52], [0, 1]);
  const dTextOpacities = [dText0Opacity, dText1Opacity, dText2Opacity, dText3Opacity];

  const dText0Y = useTransform(desktopProgress, [0.06, 0.10], [14, 0]);
  const dText1Y = useTransform(desktopProgress, [0.20, 0.24], [14, 0]);
  const dText2Y = useTransform(desktopProgress, [0.34, 0.38], [14, 0]);
  const dText3Y = useTransform(desktopProgress, [0.48, 0.52], [14, 0]);
  const dTextYs = [dText0Y, dText1Y, dText2Y, dText3Y];

  // Mobile: vertical segment fills — spread across full scroll range
  const mSeg0Fill = useTransform(mobileProgress, [0.12, 0.33], ["0%", "100%"]);
  const mSeg1Fill = useTransform(mobileProgress, [0.38, 0.58], ["0%", "100%"]);
  const mSeg2Fill = useTransform(mobileProgress, [0.63, 0.82], ["0%", "100%"]);
  const mSegmentFills = [mSeg0Fill, mSeg1Fill, mSeg2Fill];

  // Mobile text
  const mText0Opacity = useTransform(mobileProgress, [0.12, 0.17], [0, 1]);
  const mText1Opacity = useTransform(mobileProgress, [0.38, 0.43], [0, 1]);
  const mText2Opacity = useTransform(mobileProgress, [0.63, 0.68], [0, 1]);
  const mText3Opacity = useTransform(mobileProgress, [0.86, 0.92], [0, 1]);
  const mTextOpacities = [mText0Opacity, mText1Opacity, mText2Opacity, mText3Opacity];

  const mText0Y = useTransform(mobileProgress, [0.12, 0.17], [14, 0]);
  const mText1Y = useTransform(mobileProgress, [0.38, 0.43], [14, 0]);
  const mText2Y = useTransform(mobileProgress, [0.63, 0.68], [14, 0]);
  const mText3Y = useTransform(mobileProgress, [0.86, 0.92], [14, 0]);
  const mTextYs = [mText0Y, mText1Y, mText2Y, mText3Y];

  return (
    <section className="bg-neutral-950 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">

        {/* Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-medium text-[#F95A1B] uppercase tracking-widest mb-4 block">
            The Process
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white leading-tight mb-4">
            From signup to brand deals —{" "}
            <span className="bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)] bg-clip-text text-transparent">
              in just 4 steps.
            </span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            No complicated onboarding. No waiting. Just sign up, get matched, and start earning.
          </p>
        </motion.div>

        {/* ===== DESKTOP TIMELINE ===== */}
        <div ref={desktopRef} className="hidden md:block">
          <div className="relative flex justify-between items-start pt-8">
            <div className="absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-neutral-800 z-0 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 h-full"
                style={{
                  width: lineWidth,
                  background: "linear-gradient(90deg, #F95A1B 0%, #E9DBB9 100%)",
                }}
              />
            </div>

            {steps.map((_, i) => (
              <div key={steps[i].number} className="relative z-10 flex flex-col items-center w-1/4">
                <NodeCircle done={completedDesktop[i]} step={steps[i]} />
                <motion.div
                  className="mt-8 px-3 text-center"
                  style={{ opacity: dTextOpacities[i], y: dTextYs[i] }}
                >
                  <TextContent index={i} align="center" />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== MOBILE TIMELINE ===== */}
        <div ref={mobileRef} className="block md:hidden">
          {steps.map((_, i) => {
            const textRight = i % 2 === 0;
            return (
              <div key={steps[i].number}>
                <div className="flex items-center pt-8">
                  <motion.div
                    className="flex-1 pr-4"
                    style={!textRight ? { opacity: mTextOpacities[i], y: mTextYs[i] } : { opacity: 0 }}
                  >
                    {!textRight && <TextContent index={i} align="right" />}
                  </motion.div>

                  <div className="shrink-0 relative z-10">
                    <NodeCircle done={completedMobile[i]} step={steps[i]} size="w-14 h-14" />
                  </div>

                  <motion.div
                    className="flex-1 pl-4"
                    style={textRight ? { opacity: mTextOpacities[i], y: mTextYs[i] } : { opacity: 0 }}
                  >
                    {textRight && <TextContent index={i} align="left" />}
                  </motion.div>
                </div>

                {i < steps.length - 1 && (
                  <div className="flex">
                    <div className="flex-1" />
                    <div className="w-14 flex justify-center">
                      <div className="w-0.5 h-14 bg-neutral-800 relative overflow-hidden">
                        <motion.div
                          className="absolute top-0 left-0 right-0"
                          style={{
                            height: mSegmentFills[i],
                            background: "linear-gradient(180deg, #F95A1B 0%, #E9DBB9 100%)",
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-1" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="flex justify-center mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 rounded-full font-semibold text-sm text-black"
            style={{
              background: "linear-gradient(201.53deg, #FE8C5B -1.6%, #FE8D45 23.06%, #FE611C 48.66%, #FF8841 87.19%, #F44F17 102.98%)",
            }}
          >
            Join Now →
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default TimelineInfluencer;
