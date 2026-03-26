# Squarespace Build Checklist (Phase 5 MVP)

## How To Use
- Build pages in this order: `Home -> Member Space -> Services -> About -> Contact`.
- Complete global setup first, then page sections top to bottom.
- Keep one primary CTA per page.

## 0) Global Setup (Before Page Builds)
- [ ] Set site-wide typography tokens (H1-H4, body, caption, button)
- [ ] Set site-wide color roles (background, text, accent, button, border)
- [ ] Set spacing system (section padding, content max width, vertical rhythm)
- [ ] Set button system (primary/secondary styles + hover/focus)
- [ ] Set image treatment rules (crop ratio, corner radius, overlay behavior)
- [ ] Set form style defaults (inputs, labels, validation, success state)
- [ ] Set navigation shell (desktop + mobile behavior)
- [ ] Create reusable section presets where possible

## 1) Home
### Page Goal
- Felt orientation in under 5 seconds, then one clean next action.

### Section Stack (Top -> Bottom)
- [ ] Section 1: Full-bleed hero media (single image or short loop video)
- [ ] Section 2: 1-2 line orientation copy (overlay or below hero)
- [ ] Section 3: Single primary CTA button (`Become a Member`)

### Build Checks
- [ ] No explanatory paragraphs on this page
- [ ] Above-the-fold hierarchy is readable on mobile
- [ ] CTA points to Member Space page

## 2) Member Space
### Page Goal
- Convert aligned visitors into members.

### Section Stack (Top -> Bottom)
- [ ] Section 1: Value proposition headline + short supporting text
- [ ] Section 2: “What’s Included” feature list (3-7 items)
- [ ] Section 3: The Method relationship block
- [ ] Section 4: Testimonials (2-4)
- [ ] Section 5: Preview mechanism block (“Start Here” sample if used)
- [ ] Section 6: Conversion strip with primary CTA (`Become a Member`) + secondary (`Log In`)

### Build Checks
- [ ] Benefits are concrete and scannable
- [ ] Signup flow works end-to-end
- [ ] Login link routes correctly for existing members

## 3) Services
### Page Goal
- Help users self-select the right entry point.

### Section Stack (Top -> Bottom)
- [ ] Section 1: Ecosystem overview intro
- [ ] Section 2: Member Space block (who it’s for + outcome + CTA)
- [ ] Section 3: The Method block (learning/body literacy framing)
- [ ] Section 4: Studio block marked `Phase 02` / `Coming Soon`
- [ ] Section 5: Decision CTA strip (`Join Member Space` / `Contact`)

### Build Checks
- [ ] Entry points are clearly differentiated
- [ ] Studio is positioned as future state, not broken path
- [ ] No section feels like duplicate copy of About

## 4) About
### Page Goal
- Establish viewpoint, trust, and human connection.

### Section Stack (Top -> Bottom)
- [ ] Section 1: Philosophy anchor statement
- [ ] Section 2: Founder/practitioner intro (image + short bio)
- [ ] Section 3: Why Member Space + Method exists
- [ ] Section 4: Transition CTA (`Enter Member Space` / `View Services`)

### Build Checks
- [ ] Tone stays warm and concise (no over-explaining)
- [ ] Founder presence supports trust but is not influencer-led
- [ ] CTA paths are valid and obvious

## 5) Contact
### Page Goal
- Fast, low-friction inquiries.

### Section Stack (Top -> Bottom)
- [ ] Section 1: Short invitation copy
- [ ] Section 2: Contact form (short fields only)
- [ ] Section 3: Direct email display (`Tegan@theroutineservice.com`)

### Build Checks
- [ ] Form can be completed in under 60 seconds
- [ ] Confirmation/success message is clear
- [ ] Email address is clickable on mobile

## Navigation + Routing Checklist
- [ ] Main nav includes: Home, About, Services, Member Space, Contact
- [ ] Member `Log In` is visible and distinct from signup CTA
- [ ] Footer mirrors key routes + includes contact path
- [ ] No dead-end links

## Content Quality Checklist
- [ ] Language avoids overplayed wellness terms called out in intake
- [ ] Copy avoids fear/deficit framing
- [ ] Messaging emphasizes clarity, agency, and embodied progress
- [ ] Page headlines are specific, not generic

## Visual QA Checklist
- [ ] Strong contrast and readable type sizes across breakpoints
- [ ] Consistent image style and cropping
- [ ] Spacing rhythm is consistent between sections
- [ ] Motion is subtle and purposeful only

## Accessibility + Technical QA
- [ ] Proper heading order (`H1` once, then `H2/H3`)
- [ ] Alt text on meaningful images
- [ ] Buttons and links have clear labels
- [ ] Keyboard focus visibility present
- [ ] Basic SEO fields set (page title, meta description, social image)

## Final Pre-Handoff Checks (Phase 5 -> Phase 6)
- [ ] All MVP page briefs implemented
- [ ] Mobile QA complete for all pages
- [ ] Primary conversion path tested from Home -> Member Space signup
- [ ] Content owner review complete
- [ ] Open issues logged for implementation/migration phase

## Change Log
- **2026-02-10:** Created block-level Squarespace build checklist for MVP pages
