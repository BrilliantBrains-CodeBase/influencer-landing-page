import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwhIY1zskCEGVgixwluR6Iu1MUZT9MrEJVYvHmFpdOX7HzlR6NudQ-ORvZDKmc_wKea/exec";

const GetAudit: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate=useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);

    const formData = new FormData(formRef.current);

    const payload = {
      brandStage: formData.get("brandStage"),
      scaleTimeline: formData.get("scaleTimeline"),
      adBudget: formData.get("adBudget") || "",
      dateTime: formData.get("dateTime"),
      brandWebsite: formData.get("brandWebsite"),
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      email: formData.get("email") || "",
    };

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors", // REQUIRED for Google Apps Script
        body: JSON.stringify(payload),
      });

      setSuccess(true);
      formRef.current.reset();
      navigate('/ecommerce-thank-you');
    } catch (error) {
      console.error("Form submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="get-audit"
      className="bg-black py-6 md:py-12 scroll-mt-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto bg-white rounded-3xl p-8 md:p-14"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">
              Let’s talk
              <br />
              growth
            </h2>
            <p className="text-gray-700 max-w-md leading-relaxed">
              Brilliant Brains blends product-first design, technical
              performance and data-driven marketing to turn traffic into loyal
              customers. We help D2C and ecommerce brands scale sustainably.
            </p>
          </div>

          {/* RIGHT FORM */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* BRAND STAGE */}
            <select
              name="brandStage"
              required
              className="rounded-full bg-gray-100 px-6 py-4 text-sm outline-none"
            >
              <option value="">Brand stage</option>
              <option>Just Launched</option>
              <option>Early Traction</option>
              <option>Growth Stage</option>
              <option>Scaling Up</option>
              <option>Established Brand</option>
            </select>

            {/* SCALE TIMELINE */}
            <select
              name="scaleTimeline"
              required
              className="rounded-full bg-gray-100 px-6 py-4 text-sm outline-none"
            >
              <option value="">Scaling timeline</option>
              <option>Immediately</option>
              <option>In the next 30 days</option>
              <option>In the next 60 days</option>
            </select>

            {/* AD BUDGET (OPTIONAL) */}
            <input
              name="adBudget"
              placeholder="Monthly Ad Budget (optional)"
              className="rounded-full bg-gray-100 px-6 py-4 text-sm outline-none"
            />

            {/* DATE & TIME */}
            <input
              name="dateTime"
              type="datetime-local"
              required
              className="
                rounded-full bg-gray-100 px-6 py-4 text-sm outline-none
                [&::-webkit-calendar-picker-indicator]:opacity-80
              "
            />

            {/* BRAND */}
            <input
              name="brandWebsite"
              required
              placeholder="Brand Name / Website"
              className="rounded-full bg-gray-100 px-6 py-4 text-sm outline-none"
            />

            {/* NAME */}
            <input
              name="fullName"
              required
              placeholder="Full name"
              className="rounded-full bg-gray-100 px-6 py-4 text-sm outline-none"
            />

            {/* PHONE */}
            <input
              name="phone"
              required
              placeholder="Phone number"
              className="rounded-full bg-gray-100 px-6 py-4 text-sm outline-none"
            />

            {/* EMAIL (OPTIONAL) */}
            <input
              name="email"
              placeholder="Email (optional)"
              className="rounded-full bg-gray-100 px-6 py-4 text-sm outline-none"
            />

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="
                md:col-span-2 mt-4
                rounded-full px-6 py-4
                text-sm font-medium text-black
                bg-[linear-gradient(90deg,#F95A1B_0%,#E9DBB9_100%)]
                hover:opacity-90 transition
              "
            >
              {loading
                ? "Submitting..."
                : "Book your free 15-min audit →"}
            </button>

            {success && (
              <p className="md:col-span-2 text-green-600 text-sm mt-2">
                ✅ Submitted successfully. We’ll contact you shortly.
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default GetAudit;
