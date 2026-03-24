# Shopify Migration Readiness Assessment — Avenue Z

## Project Overview

Build a multi-step interactive assessment tool for Avenue Z that evaluates whether a brand is ready to migrate to Shopify. The tool collects answers across 43 questions in 10 sections, calculates 4 scores using specific scoring logic, and displays a personalized results page with strengths, considerations, and a conditional CTA. It ends with lead capture.

**Client:** Avenue Z (digital commerce agency)
**Purpose:** Lead generation + qualification tool for Shopify migration prospects
**Deploy target:** Vercel

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State:** useReducer or Zustand for form wizard state
- **Scoring:** Client-side (no backend needed for scoring)
- **Deployment:** Vercel via GitHub
- **Lead capture:** Optional webhook integration (HubSpot/Zapier) on form submit

---

## Brand & Design System — Avenue Z

### Philosophy

Dark-first, high-contrast, premium tech aesthetic. Every surface should feel intentional. **Default to dark mode — do NOT build a light mode toggle.**

### Color Tokens

```css
/* Backgrounds */
--bg-primary:   #000000   /* page root */
--bg-surface:   #272727   /* cards, inputs, panels */
--bg-subtle:    #1a1a1a   /* section dividers */

/* Text */
--text-primary: #FFFFFF
--text-muted:   #8A8A8A

/* Accent colors */
--yellow:  #FFFC60
--green:   #60FF80
--cyan:    #60FDFF
--blue:    #39A0FF
--purple:  #6034FF
```

### Tailwind Config Extension

Add to `tailwind.config.ts` under `theme.extend`:

```typescript
colors: {
  'brand-yellow':  '#FFFC60',
  'brand-green':   '#60FF80',
  'brand-cyan':    '#60FDFF',
  'brand-blue':    '#39A0FF',
  'brand-purple':  '#6034FF',
  'bg-surface':    '#272727',
  'bg-subtle':     '#1a1a1a',
  'text-muted':    '#8A8A8A',
},
fontFamily: {
  sans: ['Nunito Sans', 'sans-serif'],
},
borderRadius: {
  pill: '9999px',
},
```

### Typography

Import in `app/layout.tsx`:

```typescript
import { Nunito_Sans } from 'next/font/google'

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '700', '800', '900'],
  variable: '--font-nunito',
})
```

Apply `className={nunitoSans.variable}` to `<html>` tag. Set `font-family: var(--font-nunito), sans-serif` on `body` via Tailwind (`font-sans` after config update).

### Gradients (use inline CSS, not Tailwind classes)

```css
/* Full brand gradient */
linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF, #39A0FF, #6034FF)

/* Revenue / warm */
linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF)

/* Reputation / cool */
linear-gradient(135deg, #60FDFF, #39A0FF, #6034FF)
```

**Where to apply gradients:**
- CTA button backgrounds
- Gradient text on bold display headings (`background-clip: text`)
- Section divider lines (1px height)
- Top-edge accent on KPI/score cards (2px `::before` pseudo-element)

### Component Patterns

**Cards:**
```css
background: #272727;
border-radius: 16px;
border: 1px solid rgba(255, 255, 255, 0.06);
padding: 24px;
```

**CTA Button (gradient fill):**
```css
background: linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF);
color: #000000;
border: none;
border-radius: 9999px;
padding: 14px 32px;
font-weight: 800;
font-size: 14px;
letter-spacing: 0.06em;
text-transform: uppercase;
cursor: pointer;
```

**Secondary Button (dark pill):**
```css
background: #3a3a3a;
color: #FFFFFF;
border: none;
border-radius: 9999px;
padding: 12px 24px;
font-weight: 700;
```

**Text Input:**
```css
background: #272727;
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 12px;
padding: 14px 18px;
color: #FFFFFF;
font-size: 16px;
```
On focus: `border-color: #60FDFF; box-shadow: 0 0 0 2px rgba(96,253,255,0.15)`

**Gradient Divider Line:**
```html
<div style="height:1px; background: linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF, #39A0FF, #6034FF)" />
```

**Gradient Text Heading:**
```css
background: linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF, #39A0FF, #6034FF);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
font-weight: 800;
```

### Layout Tone

- Dark backgrounds everywhere (#000000 page root)
- One question or question group per screen for focus
- Generous whitespace and padding
- Professional but approachable — this is a B2B tool for ecommerce decision-makers

---

## Application Structure

### Flow

```
Intro Screen → Section 1–10 (questions) → Lead Capture → Results Page
```

### Screens

1. **Intro/Welcome Screen** — headline, body copy, "Start Assessment" CTA
2. **10 Question Sections** — each section shows its questions as a step (or multiple sub-steps)
3. **Lead Capture** — Q41 (name), Q42 (email), Q43 (CTA preference)
4. **Results Page** — scores, summary, strengths, considerations, CTA

### Progress

Show a progress bar or step indicator. Consider showing section names.

---

## Question Configuration

### Question Types to Build

| Type | Component | Used By |
|------|-----------|---------|
| `short_text` | Text input | Q1, Q41 |
| `website` | URL input with validation | Q2 |
| `email` | Email input with validation | Q42 |
| `single_select` | Radio buttons or card selectors | Q3, Q4, Q5, Q6, Q7, Q10, Q11, Q15, Q16, Q21, Q22, Q24, Q25, Q27, Q29, Q30, Q34, Q36, Q37, Q39, Q43 |
| `multi_select` | Checkboxes | Q8, Q13, Q17, Q18, Q20, Q23, Q28, Q31, Q33, Q35, Q38 |
| `opinion_scale` | 1–5 scale (buttons or slider) | Q12, Q14, Q26, Q32 |
| `ranking` | Drag-and-drop or numbered ranking (top 3) | Q9 |
| `long_text` | Textarea | Q40 |

---

## All 43 Questions — Complete Reference

### Section 1: Company + Commerce Profile

**Q1.** What is the name of your brand?
- Type: short_text
- Scored: No

**Q2.** What is your website URL?
- Type: website
- Scored: No

**Q3.** Which best describes your business model?
- Type: single_select
- Options: DTC, B2B, Hybrid DTC + B2B, Wholesale, Marketplace, Other
- Score category: Shopify Fit
- Scoring: DTC = 2, Hybrid DTC + B2B = 2, B2B = 1, Wholesale = 1, Marketplace = 1, Other = 0

**Q4.** What platform are you on today?
- Type: single_select
- Options: Magento / Adobe Commerce, WooCommerce, BigCommerce, Salesforce Commerce Cloud, SAP Commerce, Custom platform, Shopify already, Other
- Scored: No

**Q5.** What is your approximate annual ecommerce revenue?
- Type: single_select
- Options: Under $1M, $1M–$5M, $5M–$20M, $20M–$100M, $100M+, Prefer not to say
- Scored: No

**Q6.** Roughly how many active SKUs do you manage?
- Type: single_select
- Options: Fewer than 100, 100–1,000, 1,000–10,000, 10,000–50,000, 50,000+
- Score category: Complexity
- Scoring: 50,000+ = 2, 1,000–10,000 or 10,000–50,000 = 1, Fewer than 100 or 100–1,000 = 0

**Q7.** How many regions, storefronts, or languages do you support?
- Type: single_select
- Options: One market only, Multiple regions one storefront, Multiple storefronts, Multiple languages/currencies, Complex global setup
- Score category: Complexity
- Scoring: Complex global setup = 2, Multiple storefronts or Multiple languages/currencies = 1, Multiple regions one storefront = 1, One market only = 0

### Section 2: Why Migrate Now?

**Q8.** What is driving interest in Shopify?
- Type: multi_select
- Options: Lower maintenance costs, Better site speed, Easier merchandising/content updates, Better conversion performance, Simpler integrations, International expansion, Better checkout experience, Better app ecosystem, Replatforming pressure from current platform, Other
- Score category: Shopify Fit
- Scorable items: 9 (exclude "Other")
- Scoring: normalized = (checked_scorable / 9) × 2

**Q9.** What are your top 3 goals?
- Type: ranking (top 3)
- Items: Increase conversion rate, Increase revenue, Improve site speed, Improve marketer autonomy, Reduce dev dependency, Expand internationally, Improve operations, Reduce total cost of ownership
- Scored: No

**Q10.** Do you have a target launch window?
- Type: single_select
- Options: 0–3 months, 3–6 months, 6–12 months, 12+ months, Just exploring
- Score category: Migration Readiness
- Scoring: 0–3 months = 2, 3–6 months = 2, 6–12 months = 1, 12+ months = 0, Just exploring = 0

**Q11.** Who is sponsoring this initiative internally?
- Type: single_select
- Options: CEO / Founder, Ecommerce leadership, Marketing leadership, IT / Engineering, Operations, No clear sponsor yet
- Score category: Shopify Fit
- Scoring: CEO / Founder = 2, Ecommerce leadership = 2, Marketing leadership = 1, IT / Engineering = 1, Operations = 1, No clear sponsor yet = 0

### Section 3: Current Platform Pain Points

**Q12.** How difficult is it to make routine site updates today?
- Type: opinion_scale (1–5, Very easy → Very difficult)
- Score category: Shopify Fit
- Scoring: 4–5 = 2, 3 = 1, 1–2 = 0

**Q13.** Which current pain points apply?
- Type: multi_select
- Options: Slow page speed, Hard to launch campaigns, Too much developer dependency, Checkout limitations, Search / filtering issues, Poor mobile UX, Promotion / discount limitations, Integration issues, Reporting / analytics gaps, Frequent bugs / outages
- Score category: Shopify Fit
- Scorable items: 10 (no exclusions)
- Scoring: normalized = (checked / 10) × 2

**Q14.** How satisfied are you with your current checkout experience?
- Type: opinion_scale (1–5, Very dissatisfied → Very satisfied)
- Score category: Shopify Fit
- Scoring: 1–2 = 2 (dissatisfied = good fit), 3 = 1, 4–5 = 0

**Q15.** How often does your current platform slow down business execution?
- Type: single_select
- Options: Rarely, Monthly, Weekly, Daily, Constantly
- Score category: Shopify Fit
- Scoring: Constantly = 2, Daily = 2, Weekly = 1, Monthly = 1, Rarely = 0

### Section 4: Catalog Complexity

**Q16.** How would you describe your catalog?
- Type: single_select
- Options: Simple catalog, Moderate variants/options, Large catalog with advanced rules, Highly complex/custom catalog
- Score category: Complexity
- Scoring: Highly complex/custom = 2, Moderate variants/options or Large catalog with advanced rules = 1, Simple catalog = 0

**Q17.** Do you currently sell any of the following?
- Type: multi_select
- Options: Bundles / kits, Subscriptions, Personalized products, Configurable products, Preorders / backorders, Gift cards, B2B pricing, None of the above
- Score category: Complexity
- Scorable items: 7 (exclude "None of the above")
- Scoring: normalized = (checked_scorable / 7) × 2

**Q18.** Do you need advanced merchandising features?
- Type: multi_select
- Options: Faceted filtering, Nested filtering, Dynamic collections, Search boosting / burying, Product recommendations, Multi-catalog structure, Region-specific assortment, None
- Score category: Complexity
- Scorable items: 7 (exclude "None")
- Scoring: normalized = (checked_scorable / 7) × 2

### Section 5: Content + SEO Readiness

**Q19.** How important is organic search to your ecommerce revenue?
- Type: single_select
- Options: Low, Moderate, High, Critical
- Scored: No

**Q20.** Which SEO/content assets do you already have prepared?
- Type: multi_select
- Options: Redirect map, Metadata inventory, Content inventory, Sitemap, Top landing page list, Structured data plan, None of the above
- Score category: Definition Confidence
- Scorable items: 6 (exclude "None of the above")
- Scoring: normalized = (checked_scorable / 6) × 2

**Q21.** How much content would need to be migrated?
- Type: single_select
- Options: Minimal, Moderate, Large amount, Unsure
- Score category: Complexity
- Scoring: Large amount = 2, Moderate = 1, Minimal = 0, Unsure = 1

**Q22.** Who manages website content today?
- Type: single_select
- Options: Marketing team, Ecommerce team, IT / Dev team, Agency / partner, Shared ownership
- Score category: Definition Confidence
- Scoring: Marketing team = 2, Ecommerce team = 2, IT / Dev team = 1, Agency / partner = 1, Shared ownership = 1

### Section 6: Integrations + Systems

**Q23.** Which systems must connect to Shopify?
- Type: multi_select
- Options: ERP, OMS, PIM, CRM, ESP / marketing automation, Loyalty, Reviews, Subscription platform, Search / personalization, Tax engine, Fraud tools, 3PL / WMS, CDP / analytics, Other
- Score category: Complexity
- Scorable items: 13 (exclude "Other")
- Scoring: normalized = (checked_scorable / 13) × 2

**Q24.** How would you describe your current integration environment overall?
- Type: single_select
- Options: Mostly native / app-based integrations, Mix of native middleware and custom integrations, Mostly custom API integrations, Heavy middleware / iPaaS reliance, Significant manual processes, Not sure
- Score category: Complexity
- Scoring: Mostly custom API or Heavy middleware = 2, Mix of native middleware and custom = 1, Mostly native / app-based = 0, Significant manual processes = 1, Not sure = 1

**Q25.** Are there mission-critical custom workflows that must be preserved?
- Type: single_select
- Options: Yes, No, Unsure
- Score category: Definition Confidence
- Scoring: Yes = 2 (clearly identified), No = 2 (clearly answered), Unsure = 0

**Q26.** How confident are you in your product, customer, and order data quality?
- Type: opinion_scale (1–5, Low confidence → High confidence)
- Score category: Definition Confidence
- Scoring: 4–5 = 2, 3 = 1, 1–2 = 0

### Section 7: Operations + Fulfillment

**Q27.** How complex is your fulfillment setup?
- Type: single_select
- Options: Single warehouse, Multiple warehouses, 3PL-managed, International / multi-node, Very complex hybrid model
- Score category: Complexity
- Scoring: Very complex hybrid or International / multi-node = 2, Multiple warehouses or 3PL-managed = 1, Single warehouse = 0

**Q28.** Which operational requirements apply?
- Type: multi_select
- Options: International shipping, Split shipments, Store pickup / BOPIS, Returns portal, Subscription fulfillment, Wholesale ordering, Marketplace fulfillment, None of the above
- Score category: Complexity
- Scorable items: 7 (exclude "None of the above")
- Scoring: normalized = (checked_scorable / 7) × 2

**Q29.** Where does inventory truth live today?
- Type: single_select
- Options: Ecommerce platform, ERP, OMS, WMS / 3PL, Multiple systems, Not sure
- Score category: Complexity
- Scoring: Multiple systems = 2, ERP or OMS or WMS/3PL = 1, Ecommerce platform = 0, Not sure = 1

**Q30.** Are fulfillment or returns pain points affecting customer experience?
- Type: single_select
- Options: Yes significantly, Somewhat, Not really, Unsure
- Score category: Complexity
- Scoring: Yes significantly = 2, Somewhat = 1, Not really = 0, Unsure = 1

### Section 8: Checkout + Payments + Compliance

**Q31.** Which payment complexity applies?
- Type: multi_select
- Options: Multiple gateways, Local payment methods, Multi-currency, Buy now pay later, Subscription payments, PO / net terms for B2B, Minimal complexity
- Score category: Complexity
- Scorable items: 6 (exclude "Minimal complexity")
- Scoring: normalized = (checked_scorable / 6) × 2

**Q32.** How important is checkout customization to your business?
- Type: opinion_scale (1–5, Not important → Critical)
- Score category: Complexity
- Scoring: 4–5 = 2, 3 = 1, 1–2 = 0

**Q33.** Which compliance requirements need special attention in this migration?
- Type: multi_select
- Options: GDPR / international privacy requirements, CCPA / U.S. privacy requirements, Accessibility / ADA or WCAG requirements, PCI / payment security requirements, Age-restricted or regulated products, None beyond standard ecommerce requirements, Not sure
- Score category: Complexity
- Scorable items: 5 (exclude "None beyond standard ecommerce requirements" and "Not sure")
- Scoring: normalized = (checked_scorable / 5) × 2

### Section 9: Team + Governance Readiness

**Q34.** Who will own ecommerce after launch?
- Type: single_select
- Options: Marketing, Ecommerce, IT / Engineering, Operations, Agency / external partner, Shared ownership
- Score category: Definition Confidence
- Scoring: Marketing = 2, Ecommerce = 2, IT / Engineering = 1, Operations = 1, Agency / external partner = 1, Shared ownership = 1

**Q35.** What internal resources do you have for migration?
- Type: multi_select
- Options: Ecommerce lead, Technical lead, Developer resources, SEO/content owner, Data/integration owner, QA/UAT support, Executive sponsor, No dedicated team yet
- Score category: Migration Readiness
- Scorable items: 7 (exclude "No dedicated team yet")
- Scoring: normalized = (checked_scorable / 7) × 2

**Q36.** Is budget approved?
- Type: single_select
- Options: Yes, In progress, No, Unsure
- Score category: Migration Readiness
- Scoring: Yes = 2, In progress = 1, No = 0, Unsure = 0

**Q37.** Are requirements documented?
- Type: single_select
- Options: Fully documented, Partially documented, Not yet, Unsure
- Score category: Definition Confidence
- Scoring: Fully documented = 2, Partially documented = 1, Not yet = 0, Unsure = 0

### Section 10: Migration Readiness Checkpoint

**Q38.** Which of the following are already in place?
- Type: multi_select
- Options: Product data cleanup underway, Customer/order migration scope defined, Design system or brand guidelines ready, Redirect strategy planned, Integration owners assigned, Testing/UAT plan drafted, Launch window agreed, Implementation partner selected, None of the above
- Score category: Migration Readiness
- Scorable items: 8 (exclude "None of the above")
- Scoring: normalized = (checked_scorable / 8) × 2

**Q39.** How would you describe overall migration readiness today?
- Type: single_select
- Options: Ready to scope now, Mostly ready need discovery, Early-stage planning, Not ready yet
- Score category: Migration Readiness
- Scoring: Ready to scope now = 2, Mostly ready need discovery = 1, Early-stage planning = 0, Not ready yet = 0

**Q40.** What is your biggest migration concern?
- Type: long_text
- Scored: No

### Lead Capture

**Q41.** What is your name?
- Type: short_text
- Scored: No

**Q42.** What is your work email?
- Type: email
- Scored: No

**Q43.** Would you like a readiness review with our team?
- Type: single_select
- Options: Yes book a discovery call, Yes send me my score and next steps, Not yet
- Scored: No

---

## Scoring Engine — Complete Specification

### Four Scores

| Score | Questions | Max Points | Formula |
|-------|-----------|------------|---------|
| Shopify Fit | Q3, Q8, Q11, Q12, Q13, Q14, Q15 | 14 | (sum / 14) × 100 |
| Migration Readiness | Q10, Q35, Q36, Q38, Q39 | 10 | (sum / 10) × 100 |
| Definition Confidence | Q20, Q22, Q25, Q26, Q34, Q37 | 12 | (sum / 12) × 100 |
| Complexity | Q6, Q7, Q16, Q17, Q18, Q21, Q23, Q24, Q27, Q28, Q29, Q30, Q31, Q32, Q33 | 30 | (sum / 30) × 100 → map to band |

**FINAL DECISION:** Shopify Fit uses exactly 7 questions (Q3, Q8, Q11, Q12, Q13, Q14, Q15) with a max of 14 points. The source document header says "8 questions" but the detailed table lists only 7 — the table is the source of truth. Do NOT add a phantom 8th question. Use (sum / 14) × 100.

### Not Scored

Q1, Q2, Q4, Q5, Q9, Q19, Q40, Q41, Q42, Q43

### Multi-Select Normalization Formula

```
normalized_score = (items_checked_that_are_scorable / total_scorable_items) × 2
```

Round to 1 decimal place. If only null options are selected, score = 0.

**Null options** (excluded from scorable count):
- "None of the above"
- "Other"
- "Not sure"
- "Minimal complexity"
- "No dedicated team yet"
- "None beyond standard ecommerce requirements"
- "None"

### Multi-Select Scorable Item Counts

| Question | Scorable Items | Excluded |
|----------|---------------|----------|
| Q8 | 9 | "Other" |
| Q13 | 10 | — |
| Q17 | 7 | "None of the above" |
| Q18 | 7 | "None" |
| Q20 | 6 | "None of the above" |
| Q23 | 13 | "Other" |
| Q28 | 7 | "None of the above" |
| Q31 | 6 | "Minimal complexity" |
| Q33 | 5 | "None beyond standard…", "Not sure" |
| Q35 | 7 | "No dedicated team yet" |
| Q38 | 8 | "None of the above" |

### Opinion Scale Scoring

| Question | Category | 2 pts | 1 pt | 0 pts |
|----------|----------|-------|------|-------|
| Q12 | Shopify Fit | Scale 4–5 (difficult) | Scale 3 | Scale 1–2 (easy) |
| Q14 | Shopify Fit | Scale 1–2 (dissatisfied) | Scale 3 | Scale 4–5 (satisfied) |
| Q26 | Definition Confidence | Scale 4–5 (high confidence) | Scale 3 | Scale 1–2 (low) |
| Q32 | Complexity | Scale 4–5 (critical) | Scale 3 | Scale 1–2 (not important) |

### Complexity Standard Question Scoring

Higher complexity = higher score. This is NOT negative — it indicates scope.

| Question | 2 pts (high) | 1 pt | 0 pts (low) |
|----------|-------------|------|-------------|
| Q6 | 50,000+ | 1,000–50,000 | <1,000 |
| Q7 | Complex global setup | Multiple regions/storefronts/langs/currencies | One market only |
| Q16 | Highly complex/custom | Moderate or Large w/ advanced rules | Simple |
| Q21 | Large amount | Moderate | Minimal |
| Q24 | Custom API or heavy middleware | Mix | Mostly native/app-based |
| Q27 | Very complex hybrid or intl multi-node | Multiple warehouses or 3PL | Single warehouse |
| Q29 | Multiple systems | ERP, OMS, or WMS/3PL | Ecommerce platform |
| Q30 | Yes significantly | Somewhat | Not really |
| Q32 | Scale 4–5 | Scale 3 | Scale 1–2 |

"Unsure" / "Not sure" on complexity questions → score 1.

### Output Bands

**Shopify Fit:**
- 80–100: Strong fit
- 60–79: Good fit
- 40–59: Fit needs validation
- Below 40: Fit unclear

**Migration Readiness:**
- 80–100: Ready to scope now
- 60–79: Discovery-ready
- 40–59: Early planning stage
- Below 40: Foundational work needed

**Definition Confidence:**
- 80–100: Clearly defined
- 60–79: Mostly defined
- 40–59: Several unknowns remain
- Below 40: Too undefined for accurate scoping

**Complexity (percentage → band):**
- 0–25%: Low — Straightforward migration, standard Shopify capabilities likely sufficient
- 26–50%: Moderate — Some custom requirements, may need select apps or middleware
- 51–75%: High — Significant custom work expected across multiple dimensions
- 76–100%: Enterprise / architect-led — Complex multi-system environment requiring detailed architecture and phased approach

---

## Results Page — Complete Specification

### Layout

Display 3 numeric scores (out of 100) + 1 complexity band rating.

### Score Cards

Each score card shows:
- Score name
- Numeric value / 100 (or band label for complexity)
- Band label (e.g., "Strong fit")
- One-line description

### Summary Paragraph

Use the brand name from Q1. Template:

> [Brand] appears to be [a strong / a good / a possible] fit for Shopify. Your responses suggest your team is [ready to begin discovery / in early planning / not yet ready for scoping], with a [low / moderate / high / enterprise-level] degree of migration complexity. [Some / Several / Few] important requirements may still need to be clarified before accurate scoping can begin.

### Top Strengths (auto-populate up to 3)

Pull from highest-scoring areas. Example pool:
- Clear business case for migration
- Strong internal sponsorship
- Well-defined requirements
- Strong content and SEO preparedness
- Manageable integration environment
- High confidence in data quality
- Clear ownership and internal resources

### Top Considerations (auto-populate up to 3)

Pull from lowest-scoring areas or highest complexity signals. Example pool:
- Requirements need further definition before scoping
- Integration landscape may increase implementation complexity
- SEO and content migration planning is still incomplete
- Ownership or internal resourcing needs to be clarified
- Checkout or payment requirements may require deeper discovery
- Operational complexity may affect implementation approach

### Conditional CTA Logic

| Condition | CTA Text |
|-----------|----------|
| High Fit + High Readiness | Book a migration consultation |
| High Fit + Mid Readiness | Start discovery planning |
| High Complexity | Talk to a migration expert |
| Low Definition Confidence | Clarify your migration requirements |
| Low Fit / Unclear Fit | Explore whether Shopify is the right fit |

### Helper Copy (below scores)

> A strong Shopify Fit Score does not always mean a simple migration. Some businesses are an excellent fit for Shopify but still require a more complex implementation.
>
> Likewise, a lower Readiness or Definition Confidence Score does not mean Shopify is the wrong choice. It may simply mean there are still open questions to resolve before accurate planning and scoping can begin.

---

## Build Order

### Phase 1: Data Layer + Scoring Engine
1. Create `src/data/questions.ts` — all 43 questions with types, options, section assignments, scoring config
2. Create `src/lib/scoring.ts` — all calculation logic, normalization, band mapping
3. Create `src/lib/results.ts` — strengths/considerations auto-population, summary generation, CTA selection
4. Write tests for scoring engine

### Phase 2: Form Wizard UI
5. Build wizard shell component (step management, progress bar, back/next navigation)
6. Build question input components (one per type)
7. Wire up state management
8. Add validation (required fields, email/URL format)

### Phase 3: Results Page
9. Build score card components
10. Build summary section with dynamic copy
11. Build strengths + considerations lists
12. Build conditional CTA section
13. Style to match Avenue Z brand

### Phase 4: Polish + Deploy
14. Intro/welcome screen
15. Lead capture section
16. Section transition headers
17. Mobile responsiveness
18. Animations/transitions between steps
19. Push to GitHub → deploy to Vercel
20. Optional: webhook for lead data

---

## File Structure

```
src/
  app/
    page.tsx              # Main assessment page
    layout.tsx            # Root layout with fonts, metadata
    globals.css           # Tailwind + custom styles
  components/
    assessment/
      AssessmentWizard.tsx    # Main wizard shell
      ProgressBar.tsx         # Progress indicator
      SectionHeader.tsx       # Section title/description
      IntroScreen.tsx         # Welcome screen
      ResultsPage.tsx         # Final results display
      ScoreCard.tsx           # Individual score display
      LeadCapture.tsx         # Q41-Q43 lead form
    questions/
      ShortText.tsx
      WebsiteInput.tsx
      EmailInput.tsx
      SingleSelect.tsx
      MultiSelect.tsx
      OpinionScale.tsx
      RankingInput.tsx
      LongText.tsx
  data/
    questions.ts           # All 43 questions config
    sections.ts            # Section definitions
  lib/
    scoring.ts             # Scoring engine
    results.ts             # Results generation logic
    types.ts               # TypeScript interfaces
  hooks/
    useAssessment.ts       # Custom hook for assessment state
```

---

## Important Notes

- Shopify Fit uses 7 questions (max 14 points). The source doc header says "8" but the detailed table lists 7 — the table is authoritative. Do not guess or add an 8th question.
- Complexity is NOT a negative score — display it as a neutral rating, not a "bad" indicator.
- Multi-select scores MUST be normalized to 0–2 scale. Do NOT sum raw item counts.
- Every multi-select question contributes equally (max 2 points) regardless of how many options it has.
- "Unsure" / "Not sure" on complexity questions = 1 point (assume moderate until validated).
- The ranking question (Q9) is NOT scored — it's for qualitative context only.
- Lead capture data should be stored/sent somewhere useful (webhook, email, etc.).
