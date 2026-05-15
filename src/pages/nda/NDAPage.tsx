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
        This agreement link is missing required information. Please use the exact link sent to your email.
      </p>
      <a href="mailto:social@brilliantbrains.digital" className="mt-6 text-[#F95A1B] text-sm hover:underline">
        Contact support →
      </a>
    </div>
  );
}

// ─── Success state ────────────────────────────────────────────
function AgreementSigned({ name }: { name: string }) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-[#F95A1B]/10 flex items-center justify-center mb-5">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M5 14l6 6L23 7" stroke="#F95A1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="text-[#F95A1B] text-xs font-semibold uppercase tracking-widest mb-2">Agreement Signed</p>
      <h1 className="text-white text-2xl font-bold mb-3">Welcome to the Network, {name || "Creator"}!</h1>
      <p className="text-neutral-400 text-sm max-w-sm leading-relaxed">
        You're officially part of the Brilliant Brains Influencer Network.
        Our team will reach out on WhatsApp within 24 hours to get you started.
      </p>
      <div className="mt-8 p-5 bg-neutral-900 rounded-2xl max-w-xs w-full text-left space-y-3">
        {["Expect a WhatsApp message from our POC within 24 hours", "Profile matched to brand campaigns in your niche", "Clear briefs, signed deals, on-time payments"].map((item, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <span className="text-[#F95A1B] text-sm mt-0.5">✓</span>
            <span className="text-neutral-400 text-sm">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Agreement section component ─────────────────────────────
function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="text-white font-semibold text-base mb-3">
        <span className="text-[#F95A1B] mr-2">{number}.</span>{title}
      </h3>
      <div className="text-neutral-400 text-sm leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-[#F95A1B] shrink-0 mt-0.5">•</span>
      <span>{children}</span>
    </div>
  );
}

// ─── Main NDA Page ────────────────────────────────────────────
const NDAPage: React.FC = () => {
  const params        = new URLSearchParams(window.location.search);
  const email         = params.get("email") || "";
  const token         = params.get("token") || "";
  const nameParam     = params.get("name")  || "";

  const today         = new Date();
  const formattedDate = formatDate(today);

  const [signatureName, setSignatureName] = useState(nameParam);
  const [agreed,        setAgreed]        = useState(false);
  const [submitting,    setSubmitting]    = useState(false);
  const [done,          setDone]          = useState(false);

  if (!email || !token) return <InvalidLink />;
  if (done) return <AgreementSigned name={signatureName} />;

  const canSubmit = agreed && signatureName.trim().length > 0 && !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          action:        "complete_nda",
          email,
          token,
          signatureName: signatureName.trim(),
          signedAt:      new Date().toISOString(),
        }),
      });
    } catch {
      // fire-and-forget — no-cors means we can't read the response
    } finally {
      setSubmitting(false);
      setDone(true);
    }
  };

  return (
    <div className="min-h-screen bg-black">

      {/* ── Top bar ─────────────────────────────────── */}
      <header className="border-b border-white/10 px-6 py-5 sticky top-0 bg-black/80 backdrop-blur-sm z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/Logo.png" alt="Brilliant Brains" className="h-7 w-auto" />
            <span className="text-[#F95A1B] text-xs font-semibold uppercase tracking-widest hidden sm:block">
              Influencer Agreement
            </span>
          </div>
          <span className="text-neutral-500 text-xs">{formattedDate}</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10 pb-24">

        {/* ── Document title ───────────────────────── */}
        <div className="text-center mb-10">
          <p className="text-[#F95A1B] text-xs font-semibold uppercase tracking-widest mb-3">Confidential</p>
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">
            Non-Disclosure & Influencer Agreement
          </h1>
          <p className="text-neutral-500 text-sm">
            Entered into on <span className="text-white">{formattedDate}</span>
          </p>
        </div>

        {/* ── Agreement card ───────────────────────── */}
        <div className="bg-neutral-900/60 border border-white/5 rounded-2xl p-6 md:p-10 mb-8">

          {/* Parties */}
          <div className="mb-8 pb-8 border-b border-white/10">
            <h3 className="text-[#F95A1B] text-xs font-semibold uppercase tracking-widest mb-5">1. Parties Involved</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Agency */}
              <div className="bg-black/40 rounded-xl p-5">
                <p className="text-neutral-500 text-xs uppercase tracking-wider mb-3">The Agency</p>
                <p className="text-white font-semibold text-sm mb-1">Brilliant Brains Marketing Management – FZCO</p>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  T HUB, Silpa Gram Craft Village,<br />
                  Gachibowli, Hyderabad – 500032,<br />
                  Telangana, India
                </p>
                <p className="text-[#F95A1B] text-xs mt-2">social@brilliantbrains.digital</p>
                <p className="text-neutral-500 text-xs mt-3 italic">(Hereinafter referred to as the "Agency")</p>
              </div>

              {/* Influencer */}
              <div className="bg-black/40 rounded-xl p-5">
                <p className="text-neutral-500 text-xs uppercase tracking-wider mb-3">The Influencer</p>
                <p className="text-white font-semibold text-sm mb-1">{nameParam || "——"}</p>
                <p className="text-neutral-400 text-xs">
                  Email: <span className="text-white">{email}</span>
                </p>
                <p className="text-neutral-400 text-xs mt-1">Phone: ——</p>
                <p className="text-neutral-400 text-xs mt-1">Address: ——</p>
                <p className="text-neutral-500 text-xs mt-3 italic">(Hereinafter referred to as the "Influencer")</p>
              </div>
            </div>

            <p className="text-neutral-500 text-xs mt-4 text-center">
              Collectively referred to as the "Parties".
            </p>
          </div>

          {/* Section 2 */}
          <Section number="2" title="Definition of Confidential Information">
            <p>"Confidential Information" includes, but is not limited to:</p>
            <div className="space-y-1.5 mt-2">
              <Bullet>Campaign briefs, concepts, strategies, and creative direction</Bullet>
              <Bullet>Unreleased product details, pricing, offers, or launch timelines</Bullet>
              <Bullet>Internal business data including marketing strategies, operations, and financial insights</Bullet>
              <Bullet>Any communication (written, verbal, or digital) exchanged between the Agency, Brand, and Influencer</Bullet>
              <Bullet>Any non-public information shared as part of the collaboration</Bullet>
            </div>
            <p className="mt-3">All such information shall be treated as strictly confidential.</p>
          </Section>

          {/* Section 3 */}
          <Section number="3" title="Obligations of the Influencer">
            <p>The Influencer agrees to:</p>
            <div className="space-y-1.5 mt-2">
              <Bullet>Not disclose, publish, or discuss any Confidential Information prior to the approved go-live date</Bullet>
              <Bullet>Not share campaign-related information with any third party including brands, agencies, media, or individuals</Bullet>
              <Bullet>Maintain complete confidentiality of all materials, briefs, and communications shared by the Agency</Bullet>
              <Bullet>Use Confidential Information solely for the purpose of fulfilling the agreed collaboration</Bullet>
            </div>
          </Section>

          {/* Section 4 */}
          <Section number="4" title="Communication Protocol (Strict & Binding)">
            <div className="bg-[#F95A1B]/5 border border-[#F95A1B]/20 rounded-xl p-4 mb-3">
              <p className="text-[#F95A1B] text-xs font-semibold uppercase tracking-wider mb-2">Important</p>
              <p>
                The Influencer <strong className="text-white">shall not, under any circumstances, directly contact or communicate with the Brand</strong>.
              </p>
            </div>
            <div className="space-y-1.5">
              <Bullet>
                All communication including approvals, queries, negotiations, clarifications, or feedback must be conducted{" "}
                <strong className="text-white">only through the assigned Point of Contact (POC) from the Agency</strong>.
              </Bullet>
              <Bullet>
                The Agency shall remain the <strong className="text-white">sole and exclusive communication channel</strong> between the Influencer and the Brand.
              </Bullet>
            </div>
            <p className="mt-3">
              Any violation of this clause will be considered a <strong className="text-white">serious breach of this Agreement</strong>,
              and the Agency reserves the right to take strict action, including termination and legal recourse.
            </p>
          </Section>

          {/* Section 5 */}
          <Section number="5" title="Embargo / Go-Live Date">
            <p>
              The Influencer shall not post, publish, or reveal any campaign-related content before the agreed go-live date.
            </p>
            <div className="mt-3 bg-black/40 rounded-xl px-5 py-3 inline-block">
              <p className="text-neutral-400 text-xs">Go-Live Date</p>
              <p className="text-white font-semibold mt-0.5">To be confirmed by your Agency POC</p>
            </div>
            <p className="mt-3">Any premature disclosure will be treated as a breach of this Agreement.</p>
          </Section>

          {/* Section 6 */}
          <Section number="6" title="Permitted Disclosures">
            <p>The Influencer may disclose Confidential Information only to:</p>
            <div className="mt-2">
              <Bullet>Their manager, legal advisor, or authorized representative</Bullet>
            </div>
            <p className="mt-2">
              Provided that such individuals are informed of the confidential nature of the information and agree
              to be bound by similar confidentiality obligations.
            </p>
          </Section>

          {/* Section 7 */}
          <Section number="7" title="Duration of the Agreement">
            <p>
              This Agreement shall remain in effect for a period of{" "}
              <strong className="text-white">1 Year</strong> from the date of signing, or until such Confidential
              Information becomes publicly available through no fault of the Influencer, whichever is earlier.
            </p>
          </Section>

          {/* Section 9 — IP (Section 8 is intentionally absent in source document) */}
          <Section number="9" title="Intellectual Property Rights">
            <div className="space-y-1.5">
              <Bullet>
                All content created as part of this collaboration may be used, reproduced, edited, and promoted by
                the Brand and/or Agency across platforms including advertisements, digital media, and marketing campaigns.
              </Bullet>
              <Bullet>
                The Influencer grants the Agency and Brand a non-exclusive, royalty-free right to use such content.
              </Bullet>
            </div>
          </Section>

          {/* Section 10 */}
          <Section number="10" title="Consequences of Breach">
            <p>In the event of a breach of this Agreement by the Influencer:</p>
            <div className="space-y-1.5 mt-2">
              <Bullet>The Agency reserves the right to immediately terminate the collaboration</Bullet>
              <Bullet>Any pending payments or benefits may be withheld</Bullet>
              <Bullet>The Influencer may be held liable for damages, losses, or legal consequences arising from the breach</Bullet>
              <Bullet>The Agency may initiate legal action in case of serious violations</Bullet>
            </div>
          </Section>

          {/* Section 11 */}
          <Section number="11" title="Governing Law & Jurisdiction">
            <p>
              This Agreement shall be governed and interpreted in accordance with the laws of India.
              Only the courts situated in the city of <strong className="text-white">Hyderabad</strong> shall have the
              exclusive jurisdiction to decide upon any dispute or litigation between the Parties.
            </p>
          </Section>

        </div>

        {/* ── Signature form ───────────────────────── */}
        <div className="bg-neutral-900/60 border border-white/5 rounded-2xl p-6 md:p-10">
          <h2 className="text-white font-bold text-lg mb-1">Section 12 — Digital Signature</h2>
          <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
            By typing your full name and submitting below, you confirm that you have read, understood,
            and agree to all terms of this Non-Disclosure & Influencer Agreement.
            This constitutes a legally binding digital signature.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Agency sign-off (read-only display) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">For the Agency</p>
                <div className="bg-black/40 rounded-xl px-5 py-4">
                  <p className="text-white text-sm font-medium">Brilliant Brains Marketing Management – FZCO</p>
                  <p className="text-neutral-500 text-xs mt-1">Date: {formattedDate}</p>
                </div>
              </div>

              {/* Influencer signature input */}
              <div>
                <label htmlFor="sig" className="text-neutral-500 text-xs uppercase tracking-wider mb-2 block">
                  Influencer — Type Full Name as Signature *
                </label>
                <input
                  id="sig"
                  type="text"
                  required
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  placeholder="Your full legal name"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none placeholder-neutral-600 focus:border-[#F95A1B]/40 transition-colors"
                />
                <p className="text-neutral-600 text-xs mt-1.5">Date: {formattedDate}</p>
              </div>
            </div>

            {/* Consent checkbox */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    agreed ? "bg-[#F95A1B] border-[#F95A1B]" : "border-neutral-600 group-hover:border-neutral-400"
                  }`}
                >
                  {agreed && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5l2.5 2.5L8.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-neutral-400 text-sm leading-relaxed">
                I have carefully read and fully understand the terms of this Non-Disclosure & Influencer Agreement.
                I agree to be legally bound by all its terms and conditions.
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-full py-4 text-sm font-semibold transition-opacity bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)] text-black disabled:opacity-30"
            >
              {submitting ? "Submitting..." : "Sign & Submit Agreement →"}
            </button>

            <p className="text-center text-neutral-600 text-xs">
              Your digital signature is legally binding. A confirmation will be sent to{" "}
              <span className="text-neutral-400">{email}</span>.
            </p>
          </form>
        </div>

      </main>
    </div>
  );
};

export default NDAPage;
