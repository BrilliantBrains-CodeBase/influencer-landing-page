---
status: approved
client_name: Brilliant Brains
vertical: influencer-recruitment
total_sections: 10
blocked_reason:
---

# Section Inventory — Brilliant Brains

> Modelled after the Brilliant Brains ecommerce page (brilliantbrains.ai/ecommerce) structure.
> No FAQ section. No separate "How It Works." Clean and direct.

## Section list

| # | Section name | Priority | Notes |
|---|--------------|----------|-------|
| 1 | Header | mandatory | Sticky; logo + "Register Now" CTA button; no phone number |
| 2 | Hero | mandatory | Influencer-focused aspirational headline; single CTA scrolls to form |
| 3 | Brand logos marquee | high | Scrolling marquee of brands Brilliant Brains runs influencer campaigns for |
| 4 | Intro text | high | Image + paragraph — why Brilliant Brains for creators |
| 5 | Benefits cards | high | 4–6 cards with stats (like ecommerce services cards); payout speed, brand access, dedicated manager, creative freedom |
| 6 | Stats bar | high | Animated counters: creator count, brands, campaigns run, total payouts |
| 7 | Testimonials | high | Creator quotes carousel; name + niche + follower count |
| 8 | Why Brilliant Brains | high | Image + text block; agency credibility |
| 9 | Registration Form | mandatory | "Join the Network" form; id="register"; 8 fields; last content section |
| 10 | Footer | mandatory | Agency email, socials, copyright |

**Floating element:** WhatsApp button — bottom-right, persistent across all sections

---

## Recommended section order

1. Header (sticky)
2. Hero
3. Brand logos marquee
4. Intro text (image + para)
5. Benefits cards (with stats)
6. Stats bar (animated counters)
7. Testimonials (carousel)
8. Why Brilliant Brains (image + text)
9. Registration Form (`id="register"`)
10. Footer

---

## Notes for Designer Agent

- Mirror the visual language of brilliantbrains.ai/ecommerce — same font, same dark/light section alternation, same card style
- Hero CTA → anchor `href="#register"` scroll to form
- Stats bar numbers: animate on scroll (CountUp pattern, same as ecommerce page)
- Testimonials: carousel, same style as ecommerce testimonials section
- Registration Form replaces the "Let's talk growth" contact form pattern from ecommerce page
- No FAQ section on this page
- Mobile-first: form must be single-column, thumb-friendly
