import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxShn1PbisWDuHQKjkDWvCj11-Ccu0x2Dlbu5ucQNni9XRjxcRnmVoMzY-EcVphfODKqQ/exec";

type CreatorType = "UGC Creator" | "Influencer" | "Both — UGC + Influencer" | "";
type CollabPref = "Paid Only" | "Open to Barter" | "Both — Paid & Barter" | "";

const NICHES = [
  "Lifestyle",
  "Fashion & Style",
  "Beauty & Skincare",
  "Cooking & Food",
  "Nutrition & Diet",
  "Health & Wellness",
  "Gym & Fitness",
  "Athlete & Sports",
  "Parenting & Mom / Dad",
  "Podcast / Audio",
  "Travel & Adventure",
  "Mental Health & Mindfulness",
  "Other (specify)",
];

const FOLLOWER_STEPS = [
  "Under 2K",
  "2K - 5k",
  "5K – 10K",
  "10K – 50K",
  "50K – 100K",
  "100K – 500K",
  "500K – 1M",
  "1M+",
];

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement | null>(null);
  const nicheRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [creatorType, setCreatorType] = useState<CreatorType>("");
  const [collabPref, setCollabPref] = useState<CollabPref>("");
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [otherNiche, setOtherNiche] = useState("");
  const [followerIndex, setFollowerIndex] = useState(0);
  const [nicheOpen, setNicheOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (nicheRef.current && !nicheRef.current.contains(e.target as Node)) {
        setNicheOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleNiche = (niche: string) => {
    setSelectedNiches((prev) =>
      prev.includes(niche) ? prev.filter((n) => n !== niche) : [...prev, niche]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    if (!creatorType) return alert("Please select your creator type.");
    if (!collabPref) return alert("Please select your collaboration preference.");
    if (selectedNiches.length === 0) return alert("Please select at least one niche.");

    setLoading(true);

    const formData = new FormData(formRef.current);
    const nicheList = selectedNiches.includes("Other (specify)")
      ? [...selectedNiches.filter((n) => n !== "Other (specify)"), `Other: ${otherNiche}`]
      : selectedNiches;

    const payload = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      whatsapp: formData.get("whatsapp"),
      instagramHandle: formData.get("instagramHandle"),
      city: formData.get("city"),
      creatorType,
      collabPreference: collabPref,
      niches: nicheList.join(", "),
      followerRange: FOLLOWER_STEPS[followerIndex],
      submittedAt: new Date().toISOString(),
    };

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ action: "submit", ...payload }),
      });
      formRef.current.reset();
      setCreatorType("");
      setCollabPref("");
      setSelectedNiches([]);
      setOtherNiche("");
      setFollowerIndex(0);
      navigate("/influencer-thank-you");
    } catch (error) {
      console.error("Form submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const creatorTypes: CreatorType[] = ["UGC Creator", "Influencer", "Both — UGC + Influencer"];
  const collabPrefs: CollabPref[] = ["Paid Only", "Open to Barter", "Both — Paid & Barter"];
  const sliderPct = (followerIndex / (FOLLOWER_STEPS.length - 1)) * 100;

  return (
    <section id="register" className="bg-black py-6 md:py-12 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto bg-white rounded-3xl p-8 md:p-14"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* LEFT: Copy */}
          <div>
            <span className="text-xs font-medium text-[#F95A1B] uppercase tracking-widest mb-3 block">
              Join The Network
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 leading-tight">
              Your next brand deal
              <br />starts here.
            </h2>
            <p className="text-gray-600 max-w-md leading-relaxed mb-8 text-sm">
              Join 7,800+ creators already earning, growing, and building careers with India's best brands. Free to join. No commissions taken from your deals.
            </p>

            <div className="space-y-3">
              {[
                "Free to join. No commissions taken from your deals.",
                "Reviewed within 48 hours. No long waitlists.",
                "Trusted by 450+ brands across India and globally.",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#F95A1B]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="#F95A1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Core fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                name="fullName"
                required
                placeholder="Full Name *"
                className="rounded-full bg-gray-100 px-6 py-4 text-sm outline-none placeholder-gray-500"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email Address *"
                className="rounded-full bg-gray-100 px-6 py-4 text-sm outline-none placeholder-gray-500"
              />
              <input
                name="whatsapp"
                required
                placeholder="WhatsApp Number *"
                className="rounded-full bg-gray-100 px-6 py-4 text-sm outline-none placeholder-gray-500"
              />
              <input
                name="city"
                placeholder="City & State"
                className="rounded-full bg-gray-100 px-6 py-4 text-sm outline-none placeholder-gray-500"
              />
              <input
                name="instagramHandle"
                required
                placeholder="Instagram Handle * (@yourhandle)"
                className="rounded-full bg-gray-100 px-6 py-4 text-sm outline-none placeholder-gray-500 sm:col-span-2"
              />
            </div>

            {/* Creator type */}
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-1">
                I am a *
              </p>
              <div className="flex flex-wrap gap-2">
                {creatorTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setCreatorType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      creatorType === type
                        ? "bg-[#F95A1B] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Collab preference */}
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-1">
                Collaboration Preference *
              </p>
              <div className="flex flex-wrap gap-2">
                {collabPrefs.map((pref) => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => setCollabPref(pref)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      collabPref === pref
                        ? "bg-[#F95A1B] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
              {collabPref === "Both — Paid & Barter" && (
                <p className="text-xs text-[#F95A1B] mt-1 px-1">
                  Selecting both maximises your campaign matches.
                </p>
              )}
            </div>

            {/* Niche selection dropdown */}
            <div ref={nicheRef} className="relative">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-1">
                Your Niche *{" "}
                <span className="normal-case tracking-normal font-normal text-gray-400">
                  — select all that apply
                </span>
              </p>
              <button
                type="button"
                onClick={() => setNicheOpen((o) => !o)}
                className="w-full rounded-full bg-gray-100 px-6 py-4 text-sm text-left flex items-center justify-between outline-none"
              >
                <span className={selectedNiches.length === 0 ? "text-gray-500" : "text-gray-800 truncate pr-2"}>
                  {selectedNiches.length === 0
                    ? "Select your niche(s)"
                    : selectedNiches.length === 1
                    ? selectedNiches[0]
                    : `${selectedNiches[0]} +${selectedNiches.length - 1} more`}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className={`shrink-0 text-gray-400 transition-transform duration-200 ${nicheOpen ? "rotate-180" : ""}`}
                >
                  <path d="M2 4.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {nicheOpen && (
                <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="max-h-56 overflow-y-auto py-1">
                    {NICHES.map((niche) => {
                      const checked = selectedNiches.includes(niche);
                      return (
                        <button
                          key={niche}
                          type="button"
                          onClick={() => toggleNiche(niche)}
                          className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors"
                        >
                          <span
                            className={`w-4 h-4 rounded shrink-0 border flex items-center justify-center transition-colors ${
                              checked ? "bg-[#F95A1B] border-[#F95A1B]" : "border-gray-300"
                            }`}
                          >
                            {checked && (
                              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                                <path d="M1.5 4.5l2 2L7.5 2" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          <span className={checked ? "text-gray-900 font-medium" : "text-gray-600"}>
                            {niche}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {selectedNiches.includes("Other (specify)") && (
                <input
                  value={otherNiche}
                  onChange={(e) => setOtherNiche(e.target.value)}
                  placeholder="Tell us your niche"
                  className="mt-2.5 w-full rounded-full bg-gray-100 px-6 py-3.5 text-sm outline-none placeholder-gray-500"
                />
              )}
            </div>

            {/* Follower count slider */}
            <div>
              <div className="flex justify-between items-baseline mb-3 px-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Follower Count
                </p>
                <span className="text-sm font-semibold text-gray-800">
                  {FOLLOWER_STEPS[followerIndex]}
                </span>
              </div>
              <div className="px-1">
                <input
                  type="range"
                  min={0}
                  max={FOLLOWER_STEPS.length - 1}
                  step={1}
                  value={followerIndex}
                  onChange={(e) => setFollowerIndex(Number(e.target.value))}
                  className="w-full h-1.5 appearance-none rounded-full outline-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #F95A1B ${sliderPct}%, #e5e7eb ${sliderPct}%)`,
                  }}
                />
                <div className="flex justify-between mt-1.5 px-0.5">
                  <span className="text-[10px] text-gray-400">Under 2K</span>
                  <span className="text-[10px] text-gray-400">1M+</span>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 rounded-full px-6 py-4 text-sm font-semibold text-black bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)] hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Application & Join The Network →"}
            </button>

            <p className="text-center text-gray-400 text-xs mt-1">
              Your data is encrypted and stored securely. We never share your information without consent.
            </p>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default RegistrationForm;
