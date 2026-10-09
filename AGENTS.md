# BBC Academy - AI Agent Context Guide

> This file provides full project context for any AI agent continuing work on this codebase.
> Read this before touching any file.

---

## Project Overview

**Client:** BBC Academy
**Type:** Mixed Martial Arts & Combat Sports Training Center
**Location:** Twin Cities (Islamabad + Rawalpindi), Pakistan
**Stack:** Pure HTML5 + Vanilla CSS + Vanilla JavaScript (no frameworks, no build tools)
**Dev Server:** python -m http.server 3000 (run from project root)

---

## File Structure

BBC Academy/
  index.html          - Single-page website, all sections
  css/
    style.css         - All styles, single file, organized by section
  js/
    main.js           - Navigation, FAQ accordion, scroll spy
  assets/
    logo-white.png    - White BBC Academy logo (used in nav + footer)
    hero-bg.jpg       - Hero section background (dark fighter image)
    about-training.jpg - About section portrait photo
  AGENTS.md           - This file

---

## Design System - CRITICAL RULES

### Color Palette (CSS Variables in :root)
| Token                  | Value                       | Usage                                   |
|------------------------|-----------------------------|-----------------------------------------|
| --color-bg             | #000000                     | Primary dark background                 |
| --color-surface        | #121212                     | Card/component backgrounds              |
| --color-surface-hover  | #1a1a1a                     | Hover state for surfaces                |
| --color-text-primary   | #ffffff                     | Headings, primary text                  |
| --color-text-secondary | #d4d4d4                     | Body text on dark                       |
| --color-text-muted     | #8a8a8a                     | Labels, meta text                       |
| --color-gold           | #f59e0b                     | Champion Gold - the sole accent color   |
| --color-gold-hover     | #fbbf24                     | Gold hover state                        |
| --color-gold-muted     | rgba(245,158,11,0.15)       | Gold tint for card backgrounds          |
| --color-gold-border    | rgba(245,158,11,0.35)       | Gold border / featured cards            |
| --color-border         | rgba(255,255,255,0.12)      | Default card border                     |
| --color-border-subtle  | rgba(255,255,255,0.07)      | Divider lines                           |

### Typography
| Variable        | Font                | Usage                               |
|-----------------|---------------------|-------------------------------------|
| --font-display  | Oswald (500-700)    | All headings, section titles, brand |
| --font-body     | Plus Jakarta Sans   | All body copy, labels, buttons      |

Fonts imported from Google Fonts - already in <head>.

### Layout
- Container: max-width 1200px, centered with margin 0 auto
- Container padding: 0 40px desktop, 0 20px mobile
- Section padding: 100px 0 desktop, 72px 0 mobile
- --nav-height: 76px

---

## Strict Design Rules (User Preferences - NEVER BREAK THESE)

1. NO emojis anywhere in HTML, CSS, or JS - ever.
2. NO button pop-up / scale hover effects - only static color/border transitions.
3. NO blue tints or hues - all backgrounds must be pure neutral black/grey.
4. Champion Gold (#f59e0b) is the ONLY accent color.
5. Transition duration: 0.18s ease (--transition) for all interactions.
6. Headings: Use --font-display (Oswald), always uppercase.
7. Body text: Use --font-body (Plus Jakarta Sans).

---

## Sections Implemented (ALL COMPLETE)

| Section              | ID          | Background                         |
|----------------------|-------------|------------------------------------|
| Navigation           | siteHeader  | rgba(10,10,10,0.92) / transparent  |
| Hero                 | home        | Dark image overlay, content BL     |
| Certifications Ticker| (in hero)   | #ffffff - white band               |
| About                | about       | #0d0d0d                            |
| Services             | services    | #000000                            |
| Reviews              | reviews     | #0a0a0a                            |
| Pricing              | pricing     | #f5f5f0 (light off-white)          |
| FAQ                  | faq         | #000000                            |
| Locations            | locations   | #0a0a0a                            |
| CTA / Contact        | contact     | Dark green gradient #0f3d1f        |
| Footer               | site-footer | #050505                            |

---

## Key Pricing Data

| Plan                      | Admission        | Monthly              |
|---------------------------|------------------|----------------------|
| Individual                | Rs. 1,000        | Rs. 5,000/month      |
| Dual Enrollment (2 people)| Rs. 500 each     | Rs. 4,500/month each |

---

## Branch Locations

| Branch           | Address                                                               |
|------------------|-----------------------------------------------------------------------|
| Headquarters     | Street 6, Opposite D-Watson Pharmacy, Ghauri Town Phase 4A, Islamabad|
| Training Branch  | Sector 1, Airport Housing Society, Rawalpindi                         |

---

## Disciplines Offered

1. Karate - Shotokan + Olympic style, WKF-certified, belt grading
2. Boxing - Technical pad work, heavy bag, sparring
3. Mixed Martial Arts - Flagship program, IMMAF methodology
4. Kickboxing - Dutch system, WAKO-certified
5. Fitness & Fat Loss - HIIT combat circuits, no experience needed
6. Katana & Weapons - Traditional Kenjutsu, solar defense, rare in Pakistan

---

## JavaScript Interactions

- Header: Adds .scrolled class on scroll > 20px
- Mobile Nav: Opens/closes drawer (#mobileDrawer) with backdrop (#mobileBackdrop)
- FAQ Accordion: One-open-at-a-time, uses aria-expanded + .is-open class on .faq-answer
- Scroll Spy: Updates .active class on .nav-link based on scroll position

---

## Do NOT Change

- Logo files in assets/ - do not regenerate unless user asks
- CSS variable names in :root - referenced everywhere
- The neutral dark aesthetic
- The CTA section IS green - user explicitly wanted green CTA
- Pricing numbers - confirmed by user

---

## Known Placeholders (User Must Update for Production)

- Google Maps iframe src - uses approximate coordinates, replace with real embed codes from Google Maps
- Phone number: +92 300 0000000 - placeholder, user must replace
- WhatsApp link: https://wa.me/923000000000 - placeholder, user must replace

---

## Git Remote

origin -> CodesxTalha/BBC-Academy on GitHub

Use descriptive commits:
  feat: complete services section
  fix: mobile nav drawer z-index

---

Last updated: All sections complete - Hero, About, Services, Reviews, Pricing, FAQ, Locations, CTA, Footer.
