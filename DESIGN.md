# Design System: SynaptiQ

**Project Identity:** SynaptiQ — Adaptive Learning & Cognitive Telemetry Platform  
**Target Architecture:** Next.js 14 (App Router), Tailwind CSS v4, Framer Motion, Academic Slab-Serif Font Engine  
**Version:** 1.0.0  

---

## 1. Visual Theme & Atmosphere

SynaptiQ embodies an **Academic Slab-Serif & Analytical Laboratory** aesthetic. It bridges the intellectual gravity of university research environments with high-precision cognitive telemetry.

- **Atmosphere:** Scholarly, clinical, intentional, and reassuring. Avoids sterile corporate SaaS tropes and toy-like gamification.
- **Density Spectrum:**
  - *Student Learner Dashboard:* Daily App Balanced (5/10) — generous breathing room, structured course selection cards, focused intellectual quotes, and frictionless lecture access.
  - *Faculty Analytics Cockpit:* Cockpit Dense (8/10) — high-density diagnostic matrices, multi-tiered KPI cards, longitudinal outcome charts, and live pedagogical feedback loops.
- **Variance:** Offset Asymmetric (6/10) — multi-column responsive grids, structured bento cards, and asymmetric metric-to-chart ratios (e.g., 7-column concept mastery paired with 5-column cohort distribution).
- **Motion Intensity:** Fluid Restrained (5/10) — tactile `-4px` hover elevations, smooth border transitions, subtle micro-pulses for real-time telemetry beacons, and zero disorienting layout shifts.

---

## 2. Color Palette & Semantic Roles

The SynaptiQ color system is grounded in an institutional **Burgundy Pink** and **Porcelain White** palette, accented by clinical diagnostic indicators.

### 2.1 Core Neutral Canvas & Surfaces
| Token Name | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| **Canvas Porcelain** | `#F5F5F0` | Global page substrate; soft, paper-like warmth that prevents eye strain. |
| **Pure Surface Ivory** | `#FFFFFF` | Primary container, card surface, and modal background. |
| **Blush Wash / Rose Tint** | `#FFF5F8` | Hover fills, icon container badges, soft alert backdrops, and selected states. |
| **Charcoal Ink** | `#2D2D2D` | Primary typography, high-contrast headings, and dark metrics. |
| **Slate Neutral** | `#555555` | Secondary descriptions, captions, and course descriptions. |
| **Muted Pewter** | `#666666` | Helper text, metadata labels, and timestamps. |
| **Subtle Divider** | `rgba(139, 58, 98, 0.15)` | Card footer lines, table row boundaries, and horizontal rules. |

### 2.2 Brand & Identity Accents
| Token Name | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| **SynaptiQ Burgundy Pink** | `#8B3A62` | Signature brand color. Top navigation bars, primary CTAs, 2px card structural borders, active category pills. |
| **Deep Scholar Crimson** | `#5A1E3B` | Sub-header banner, dark institutional disclaimer bar, high-contrast badges. |
| **Burgundy Press / Hover** | `#6E2D4E` | Hover and active pressed states for primary buttons and high-emphasis links. |
| **Burgundy Stroke Border** | `rgba(139, 58, 98, 0.30)` | 1.5px borders on icon badges, dropdowns, and interactive containers. |
| **Burgundy Diffused Glow** | `rgba(139, 58, 98, 0.10)` | Ambient drop shadows under cards and interactive panes. |

### 2.3 Diagnostic & Cognitive Telemetry Accents
| Token Name | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| **Live Telemetry Emerald** | `#10B981` / `#34D399` | Real-time live status indicator, pulsating radar ping, benchmark achievement (>70%). |
| **Attention Amber** | `#F59E0B` / `#D97706` | Approaching benchmark warnings, moderate cognitive fatigue indicator. |
| **Intervention Coral** | `#EF4444` / `#DC2626` | Critical comprehension gap, below-benchmark student alerts, prerequisite deficits. |
| **Cognitive Cobalt** | `#2563EB` | Code playground execution, interactive visualizer links, secondary analytics. |

---

## 3. Typographic Architecture

SynaptiQ enforces a **Strict Two-Tier Font Architecture** engineered for high-density, production-grade developer and analytical interfaces (matching Linear, Vercel, and Supabase standards).

### 3.1 Strict Two-Tier Font Families
1. **Primary UI Sans (`Inter`):**
   ```css
   font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
   ```
   - **Applied to:** Interface chrome, headings, body copy, navigation, forms, buttons, tooltips, cards, dashboards, charts, and operational text.
   - **Characteristics:** Neutral, grotesque sans-serif with tight tracking on headings (`-0.02em` on H1, `-0.01em` on H2) for a grounded, engineered feel.

2. **Technical Monospace (`JetBrains Mono`):**
   ```css
   font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
   ```
   - **Applied to:** Code blocks, inline identifiers, variables, method names, complexity metrics (`O(log n)`), live digital telemetry timestamps (`HH:MM:SS`), course identifier codes (`CS204`, `CS301`), and tabular data.
   - **Features:** Strict tabular figures (`tabular-nums`) to eliminate jitter during real-time updates.

### 3.2 Type Scale Hierarchy & Hard 12px Floor
- **Hard Accessibility Floor:** STRICT RULE — NO TEXT UNDER 12PX. All micro-text (8px–11px) is permanently eliminated.
- **Display / H1:** `32px – 36px` | line-height: `40px – 44px` | weight: `700` | letter-spacing: `-0.02em`
- **H2:** `24px – 28px` | line-height: `32px – 36px` | weight: `700` | letter-spacing: `-0.01em`
- **H3:** `20px – 22px` | line-height: `28px – 30px` | weight: `600`
- **H4 / Subheading:** `16px – 18px` | line-height: `24px – 26px` | weight: `600`
- **Body / Documentation:** `15px – 16px` | line-height: `24px – 26px` | weight: `400`
- **UI Labels & Inputs:** `14px – 16px` | line-height: `20px – 24px` | weight: `500`
- **Secondary Metadata / Table Cells:** `13px – 14px` | line-height: `18px – 20px` | weight: `400` / `500`
- **Fine Metadata & Badges (The Floor):** `12px` | line-height: `16px` | weight: `500` / `600`
- **Code Blocks:** `14px` | line-height: `22px` | weight: `400`
- **Inline Code:** `13px` (or `0.9em`) | weight: `400` | background `rgba(0,0,0,0.05)` | padding `0.15em 0.4em` | radius `4px`

### 3.3 Weight & Emphasis Governance (4 Weights Only)
- **400 (Regular):** Default reading copy, explanations, and long paragraphs.
- **500 (Medium):** Navigation items, interactive controls, secondary data labels, badges.
- **600 (Semibold):** Subheadings, metric labels, card headers, table headers.
- **700 (Bold):** Page titles, primary numbers/KPI values.
- **Prohibitions:** Disallow font weights above 700 (no arbitrary 800/900). Never bold entire sentences. Limit italics strictly to literary quotes or mathematical variables.

---

## 4. Iconography & Vector Badge System

### 4.1 Strict Zero-Emoji Rule
No Unicode emojis (`🧠`, `📊`, `👋`, `🌳`, `🔍`, `📹`, `📚`, etc.) are permitted anywhere in the user interface, navigation bars, cards, button labels, or feedback banners.

### 4.2 Custom SVG Glyph Specifications
- **Stroke Width:** `2.0px` to `2.4px` consistent line weight.
- **Stroke Line Caps:** `strokeLinecap="round"`, `strokeLinejoin="round"`.
- **Color Matching:** SVG stroke or fill dynamically bound to `#8B3A62` (or `#FFFFFF` on dark top-bars).
- **Badge Container Standards:**
  - *Small Badge (Header / Controls):* `36px × 36px`, rounded `8px`, background `rgba(255, 255, 255, 0.18)` or `#FFF5F8`, border `1px solid rgba(139, 58, 98, 0.30)`.
  - *Medium Badge (Course Thumbnails):* `54px × 54px`, rounded `12px`, background `#FFF5F8`, border `1.5px solid rgba(139, 58, 98, 0.30)`.
- **Semantic Icon Mapping:**
  - **Brand / Neural Platform:** Dual-hemisphere synaptic network glyph.
  - **Tree & Graph Traversals:** Stylized branching hierarchy node tree with connecting edges.
  - **Sorting & Searching:** Three ordered vertical data bars paired with a magnifying search lens.
  - **Faculty Analytics:** Tri-bar comparative histogram vector.
  - **Course Lectures:** Rounded video camera glyph with play polygon.
  - **Fundamentals:** Dual-page open codex / textbook glyph.
  - **Quote of the Day:** Double quotation mark in solid `#8B3A62`.

---

## 5. Component Stylings & Behaviors

### 5.1 Top Navigation Bar
- **Surface:** Solid SynaptiQ Burgundy Pink (`#8B3A62`), `padding: 14px 32px`, bottom shadow `0 2px 8px rgba(0, 0, 0, 0.12)`.
- **Brand Title:** White `#FFFFFF`, weight `700`, `22px–24px` with subtitle `13px` in `rgba(255, 255, 255, 0.85)`.
- **Controls:** Consolidated action buttons with `rgba(255, 255, 255, 0.15)` fill and `rgba(255, 255, 255, 0.30)` borders.

### 5.2 Course & Content Cards
- **Base State:**
  - Background: Pure White (`#FFFFFF`).
  - Border: `2px solid #8B3A62`.
  - Radius: `12px` rounded corners.
  - Padding: `26px`.
  - Shadow: `0 2px 8px rgba(139, 58, 98, 0.10)`.
- **Hover & Interaction State:**
  - Transition: `all 0.22s ease-in-out`.
  - Translation: `translateY(-4px)`.
  - Background: Soft Blush (`#FFF5F8`).
  - Border Color: `#A0466E`.
  - Shadow: `0 6px 20px rgba(139, 58, 98, 0.18)`.

### 5.3 Metric & KPI Cards
- **Primary Metric Value:** Rendered in Primary UI Sans (`Inter`), `28px–32px`, weight `700`, using `tabular-nums` for alignment.
- **Metric Label:** Positioned cleanly in `13px–14px`, weight `500–600`, readable tone `#8B3A62` or `#475569`.
- **Status Indicators:** Standardized baseline alignment; placed next to the primary number or anchored top-right.
- **Subtext Footnotes:** Fixed at `12px` with distinct vertical separation (`border-t border-rose-100 pt-2.5`).

### 5.4 Buttons
- **Primary Button:**
  - Background: `#8B3A62`.
  - Text: `#FFFFFF`, weight `600`, `14px`.
  - Radius: `8px`.
  - Padding: `11px 20px`.
  - Behavior: Aligned vector arrow right with `gap: 8px`. Hover shifts to `#6E2D4E`. Active scale down `0.98`.
- **Secondary / Ghost Button:**
  - Background: `rgba(255, 255, 255, 0.15)` on burgundy or `#FFF5F8` on canvas.
  - Border: `1px solid rgba(139, 58, 98, 0.3)`.
  - Text: `#8B3A62` or `#FFFFFF`.

### 5.5 Form Controls & Dropdown Selectors
- **Course Selector:**
  - Background: `rgba(255, 255, 255, 0.15)` or `#FFFFFF`.
  - Border: `1px solid rgba(255, 255, 255, 0.25)` or `2px solid #8B3A62`.
  - Label: `12px`, weight `500`.
  - Font: Primary UI Sans (`Inter`) with bold selection values.
  - Dropdown Options: High-contrast slate typography (`text-slate-800`).

### 5.6 Telemetry Live Indicator
- **Pulse Beacon:** Dual-ring emerald badge (`#34D399`) with continuous `animate-ping` behind a solid dot.
- **Clock Display:** `JetBrains Mono` (`font-mono`), `tabular-nums`, high-contrast white text, updated once per second via synchronous timer.

---

## 6. Layout Principles & Grid Architecture

### 6.1 Container Containment
- **Maximum Width:**
  - Student Dashboard: `1200px` max-width with `margin: 0 auto`.
  - Faculty Analytics: `max-w-7xl` (`1280px`) with `px-4 sm:px-8`.
- **Whitespace Rhythm:** Vertical section spacing at `32px` to `48px`. Card grid gap at `24px`.

### 6.2 Responsive Multi-Column Grids
- **Student Dashboard:** `grid-template-columns: repeat(auto-fit, minmax(400px, 1fr))`.
- **Faculty Analytics:** 12-column responsive layout:
  - 7-Column Concept-wise Competency Chart.
  - 5-Column Cohort Mastery Donut & Distribution Panel.
  - Full-width Pedagogical Workflow banner.
- **Mobile Collapse (< 768px):**
  - All grids strictly collapse into single-column layouts.
  - Minimum touch target for all buttons and dropdowns: `44px × 44px`.
  - Input font size minimum `16px` to prevent automatic zoom on mobile browsers.
  - Zero horizontal overflow.

---

## 7. Motion & Interaction Philosophy

1. **Hardware Acceleration:** Animations and transitions must exclusively utilize `transform` and `opacity` properties to prevent costly layout reflows.
2. **Tactile Feedback:** Cards elevate `-4px` on hover; buttons depress by `1px` on active click.
3. **Telemetry Beacon:** The emerald live dot pulses rhythmically at `1.5s` cycle intervals to provide passive feedback that data is actively monitored.
4. **Transition Standard:** `0.22s ease-in-out` for all hover and interactive visual changes.

---

## 8. Anti-Patterns & Prohibited Design Practices

The following patterns are **strictly banned** across the SynaptiQ codebase:

| Prohibited Anti-Pattern | Reason / Correction |
| :--- | :--- |
| **Legacy / Serif Fonts** | Strictly prohibited. No Rockwell, Clarendon, Besley, Georgia, Times, or arbitrary display fonts. Use only Inter and JetBrains Mono. |
| **Sub-12px Micro-Text** | Strictly prohibited. No text under 12px anywhere. |
| **Weights Above 700** | No `font-extrabold` (800) or `font-black` (900). Use 400, 500, 600, or 700 only. |
| **Emojis Anywhere** | Emojis degrade technical credibility. Always use tailored SVG vector graphics. |
| **Neon Cyberpunk / AI Glows** | No electric cyan, neon purple, or dark cyberpunk glow aesthetics. |
| **Pure Black (`#000000`)** | Harsh contrast. Use Charcoal Ink (`#2D2D2D`) or Slate (`#1F2937`). |
| **Generic Placeholder Terms** | No "DEMO", "SIMULATED DATA", "Lorem Ipsum", or "John Doe". Use realistic academic cohorts and student identifiers. |
| **Over-Instrumented Meta Clutter** | No pseudo-intellectual uppercase clutter or redundant telemetry flags. Prune at least 30% of unnecessary decorative badges. |
| **Overlapping Elements** | Never stack absolute-positioned typography over imagery or cards. |
| **Layout Jitter** | Never use non-tabular numbers for live ticking clocks or animated percentages. Always apply `tabular-nums`. |
