import React, { useState } from "react";

const SCRIPT_URL = import.meta.env.VITE_INFLUENCER_SCRIPT_URL as string;

function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
}

// ─── Invalid link state ───────────────────────────────────────
function InvalidLink() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 7v5m0 4h.01M21 11a10 10 0 11-20 0 10 10 0 0120 0z" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <h1 className="text-white text-xl font-semibold mb-2">Invalid or Expired Link</h1>
      <p className="text-neutral-500 text-sm max-w-xs leading-relaxed">
        This link is missing required information. Please use the exact link sent to your email.
      </p>
      <a href="mailto:social@brilliantbrains.digital" className="mt-6 text-[#F95A1B] text-sm hover:underline">
        Contact support →
      </a>
    </div>
  );
}

// ─── Success state ────────────────────────────────────────────
function DetailsSubmitted({ email }: { email: string }) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-[#F95A1B]/10 flex items-center justify-center mb-5">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M5 14l6 6L23 7" stroke="#F95A1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="text-[#F95A1B] text-xs font-semibold uppercase tracking-widest mb-2">Details Submitted</p>
      <h1 className="text-white text-2xl font-bold mb-3">You're all set!</h1>
      <p className="text-neutral-400 text-sm max-w-sm leading-relaxed">
        Your NDA Agreement will be prepared and sent to{" "}
        <span className="text-white">{email}</span> shortly for your review and signing.
      </p>
      <div className="mt-8 p-5 bg-neutral-900 rounded-2xl max-w-xs w-full text-left space-y-3">
        {[
          "Check your email for the NDA Agreement document",
          "Review and sign the agreement digitally",
          "Our POC will reach out on WhatsApp to get you started",
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <span className="text-[#F95A1B] text-sm mt-0.5">✓</span>
            <span className="text-neutral-400 text-sm">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Read-only detail card ─────────────────────────────────────
function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-black/40 border border-white/5 rounded-xl px-5 py-4">
      <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">{label}</p>
      <p className="text-white text-sm font-medium truncate">{value || "—"}</p>
    </div>
  );
}

// ─── Main NDA Info Collection Page ───────────────────────────
const NDAPage: React.FC = () => {
  const params  = new URLSearchParams(window.location.search);
  const email   = params.get("email")  || "";
  const token   = params.get("token")  || "";
  const name    = params.get("name")   || "";
  const phone   = params.get("phone")  || "";
  const handle  = params.get("handle") || "";

  const today         = new Date();
  const agreementDate = formatDate(today);

  const [address,    setAddress]    = useState("");
  const [panCard,    setPanCard]    = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done,       setDone]       = useState(false);

  if (!email || !token) return <InvalidLink />;
  if (done) return <DetailsSubmitted email={email} />;

  const canSubmit = address.trim().length > 0 && panCard.trim().length > 0 && !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          action:        "request_nda",
          email,
          token,
          name,
          handle,
          phone,
          address:       address.trim(),
          panCard:       panCard.trim(),
          agreementDate,
        }),
      });
    } catch {
      // fire-and-forget
    } finally {
      setSubmitting(false);
      setDone(true);
    }
  };

  return (
    <div className="min-h-screen bg-black">

      {/* ── Header ──────────────────────────────── */}
      <header className="border-b border-white/10 px-6 py-5 sticky top-0 bg-black/80 backdrop-blur-sm z-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/Logo.png" alt="Brilliant Brains" className="h-7 w-auto" />
            <span className="text-[#F95A1B] text-xs font-semibold uppercase tracking-widest hidden sm:block">
              NDA Initiation
            </span>
          </div>
          <span className="text-neutral-500 text-xs">{agreementDate}</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10 pb-24">

        {/* ── Page title ───────────────────────── */}
        <div className="mb-8">
          <p className="text-[#F95A1B] text-xs font-semibold uppercase tracking-widest mb-2">Step 1 of 1</p>
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-neutral-400 text-sm leading-relaxed">
            We need a few additional details to initiate your NDA Agreement.
            Your information below has been pre-filled from your application.
          </p>
        </div>

        {/* ── Read-only details ─────────────────── */}
        <div className="mb-8">
          <p className="text-neutral-500 text-xs uppercase tracking-wider mb-3">Your Details</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DetailCard label="Full Name"        value={name} />
            <DetailCard label="Instagram Handle" value={handle} />
            <DetailCard label="WhatsApp"         value={phone} />
            <DetailCard label="Email"            value={email} />
            <DetailCard label="Agreement Date"   value={agreementDate} />
          </div>
        </div>

        {/* ── Info collection form ──────────────── */}
        <div className="bg-neutral-900/60 border border-white/5 rounded-2xl p-6 md:p-8">
          <p className="text-neutral-500 text-xs uppercase tracking-wider mb-5">Additional Information Required</p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-white text-sm font-medium mb-2">
                Address <span className="text-[#F95A1B]">*</span>
              </label>
              <input
                id="address"
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="City, State, Country"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none placeholder-neutral-600 focus:border-[#F95A1B]/40 transition-colors"
              />
            </div>

            {/* PAN Card */}
            <div>
              <label htmlFor="pan" className="block text-white text-sm font-medium mb-2">
                PAN Card Number <span className="text-[#F95A1B]">*</span>
              </label>
              <input
                id="pan"
                type="text"
                required
                value={panCard}
                onChange={(e) => setPanCard(e.target.value.toUpperCase())}
                placeholder="ABCDE1234F"
                maxLength={10}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none placeholder-neutral-600 focus:border-[#F95A1B]/40 transition-colors font-mono tracking-widest"
              />
              <p className="text-neutral-600 text-xs mt-1.5">
                Your PAN is used only for the agreement document and is kept confidential.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-full py-4 text-sm font-semibold transition-opacity bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)] text-black disabled:opacity-30"
            >
              {submitting ? "Submitting..." : "Submit & Initiate Agreement →"}
            </button>

            <p className="text-center text-neutral-600 text-xs">
              By submitting, you agree to share this information with Brilliant Brains for the purpose of generating your NDA Agreement.
            </p>
          </form>
        </div>

      </main>
    </div>
  );
};

export default NDAPage;
