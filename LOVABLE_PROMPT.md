# ClearFuneralCosts - Project Prompt for Lovable

## 🎯 PROJECT OVERVIEW

### Purpose
ClearFuneralCosts is an independent funeral cost information service for UK families. The platform helps families understand funeral costs, compare options, and explore potential savings of £500-£2,500 through informed choices—all while maintaining dignity and respect during difficult times.

### Core Mission
- **Transparency**: Provide clear, accessible information based on official UK government data (CMA Standardised Price Lists)
- **Independence**: No commissions, referral fees, or payments from funeral directors or service providers
- **Compassion**: Designed for families navigating grief, with sensitivity and respect
- **Empowerment**: Help families make informed decisions without pressure or bias

### Target Audience
- **Primary**: UK families aged 55+ planning funerals
- **Secondary**: Anyone researching funeral costs in the UK
- **Key Characteristics**: 
  - May be grieving or under stress
  - Need clear, simple information
  - Require high readability (larger fonts, high contrast)
  - Value trust and independence

---

## 🏗️ PROJECT STRUCTURE

### Technology Stack
- **Current**: Static HTML/CSS/JavaScript
- **Target**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Styling**: Tailwind CSS (preserve existing color scheme)
- **State Management**: React hooks (useState, useEffect)
- **Forms**: React form handling with validation

### Key Pages
1. **Main Page** (`index.html`) - Hero section with cost information form
2. **Questionnaire** (`questionnaire.html`) - Multi-step form for premium reports
3. **Regional Pages** (`regions/*/index.html`) - Location-specific guidance
4. **Reports** (`reports/*.html`) - Free and premium cost analysis reports
5. **Checkout** (`checkout/*.html`) - Payment processing for premium reports

### Data Structure
- **Regional Data**: JSON files in `data/regions/` (north-west.json, south-east.json, south-west.json)
- **Form Data**: Postcode, service type, email
- **API Integration**: n8n webhooks for data processing, Supabase for database

---

## 🎨 BRAND GUIDELINES

### Color Palette

#### Primary Colors
- **Navy Primary**: `#1e3a5f` (CSS: `--primary-navy`)
  - Usage: Headers, hero sections, navigation, footer backgrounds
  - Represents: Trust, authority, professionalism

- **Navy Light**: `#2d5a8a` (CSS: `--navy-light`)
  - Usage: Hover states, secondary backgrounds

#### Accent Colors (Sage Green Family)
- **Sage Green**: `#5a7a5f` (CSS: `--accent-sage`) ⭐ PRIMARY ACCENT
  - Usage: ALL primary CTA buttons, interactive elements, links, focus states
  - Represents: Growth, hope, renewal, British garden tradition

- **Sage Green Light**: `#7a9a7f` (CSS: `--accent-sage-light`)
  - Usage: Hover states for buttons

- **Sage Green Pale**: `#e8f3ea` (CSS: `--accent-sage-pale`)
  - Usage: Background highlights, success message backgrounds

- **Sage Green Dark**: `#4a6a4f` (CSS: `--accent-sage-dark`)
  - Usage: Active/pressed button states

#### Neutral Colors
- **Neutral 900**: `#1a202c` - Primary body text
- **Neutral 800**: `#2d3748` - Secondary text
- **Neutral 700**: `#4a5568` - Tertiary text
- **Neutral 600**: `#718096` - Muted text, placeholders
- **Neutral 400**: `#cbd5e0` - Borders
- **Neutral 300**: `#e2e8f0` - Light borders, dividers
- **Neutral 200**: `#edf2f7` - Hover backgrounds
- **Neutral 100**: `#f7fafc` - Light backgrounds (secondary)
- **Neutral 50**: `#fafbfc` - Lightest backgrounds

#### Background Colors
- **Primary Background**: `#ffffff` (white)
- **Secondary Background**: `#f7fafc` (light cream)
- **Tertiary Background**: `#edf2f7` (light grey)

#### Semantic Colors
- **Success Green**: `#047857` (with light `#10b981` and pale `#d1fae5` variants)
- **Error Red**: `#b91c1c` (with light `#dc2626` and pale `#fee2e2` variants)
- **Warning Amber**: `#d97706` (with light `#f59e0b` and pale `#fef3c7` variants)
- **Info Blue**: `#1e40af` (with light `#3b82f6` and pale `#dbeafe` variants)

### Typography

#### Font Sizes (Optimized for 55+ Audience)
- **Base Text**: `20px` (1.25rem) - REQUIRED for all body text
- **Small Text**: `16px` (1rem) - Minimum for secondary text
- **Headings**:
  - H1: `48px` (3rem)
  - H2: `36px` (2.25rem)
  - H3: `28px` (1.75rem)
  - H4: `24px` (1.5rem)
  - H5: `20px` (1.25rem)
  - H6: `18px` (1.125rem)

#### Font Weights
- Regular: `400` (default body text)
- Medium: `500` (subheadings, emphasis)
- Semibold: `600` (headings)
- Bold: `700` (strong emphasis, key numbers)

#### Line Heights
- Normal: `1.6` (default for body text - REQUIRED)
- Relaxed: `1.8` (for dense content)
- Tight: `1.25-1.4` (for headings)

#### Font Family
- Primary: Georgia serif (traditional, trustworthy)
- Fallback: System serif fonts

### Accessibility Requirements
- **WCAG 2.1 AA Minimum** (4.5:1 contrast ratio)
- **WCAG AAA Target** (7:1 contrast ratio) for 55+ audience
- **Touch Targets**: Minimum 48px, recommended 56px for 55+ audience
- **Focus States**: 3px solid sage green outline with 3px offset
- **Never use color as the only indicator** - always include text/icons

---

## 📄 MAIN PAGE STRUCTURE

### Hero Section
**Purpose**: Immediate empathy and value proposition

**Components**:
1. **Headline**: "Losing someone you love is incredibly difficult"
2. **Subheadline**: Value proposition about saving money without compromising dignity
3. **Benefits List** (4 items with checkmark icons):
   - Typically save £500–£2,500 through informed choices
   - 100% independent—no commissions, no agenda
   - Official CMA data from 2,394 UK funeral providers
   - 2,847 families helped with confidence and dignity
4. **Trust Badge**: "4.8/5 satisfaction – 2,394 funeral providers analysed"

**Information Service Form** (Right side on desktop, below on mobile):
- **Title**: "Free Cost Information Service"
- **Subtitle**: "Understand funeral costs in your area and investigate your choices with no pressure or commitment"
- **Form Fields**:
  1. Postcode input (required, pattern validation)
  2. Service Type dropdown (required):
     - Traditional funeral service
     - Direct cremation (no service)
     - Simple service + cremation
     - Burial service
     - I'm not sure yet
  3. Email input (required, appears after postcode/service selection)
- **Estimate Preview** (shown after postcode/service selection):
  - Estimated Cost Range: "£2,800 – £4,500*"
  - Description: "Based on 23 funeral directors within 20 miles of your location"
  - Data freshness: "✓ Data updated: 18th September 2025 | Next update: 25th September 2025"
- **CTA Button**: "Get Your Free Strategy Overview" (disabled until email entered)
- **Subtext**: "Discover the 5 strategies that save families £1,200–£1,800 • 60 seconds"
- **Trust Indicators**: 🔒 Secure & Private | 📊 Official Government Data | ⚡ Instant Information | ℹ️ Information Only
- **Disclaimer**: "Independent information service – Verify prices with providers"

### Unique Value Proposition Section
**Title**: "Not Another Price Calculator"
**Subtitle**: Explanation of how this differs from competitors

**Comparison Cards** (2-column layout):
1. **Competitors Card**:
   - Badge: "Most Price Sites"
   - Title: "Show You Prices"
   - Features: Price comparison tables, Provider lists, Cost estimates
   - Missing: No strategy guidance, No implementation tools
   - Outcome: "You know prices but not how to negotiate or optimise"

2. **Our Approach Card** (highlighted):
   - Badge: "Our Approach"
   - Title: "Show You HOW to Save"
   - Features: All the prices PLUS, 5 proven savings strategies, Ready-to-use email templates, Phone negotiation scripts, 14-day action roadmap
   - Outcome: "You save £1,200–£1,800 with confidence and less stress"

**Explainer Text**: "Why This Matters" - explains the difference between information and implementation

### Service Definition Section
**Title**: "What Our Service Provides"
**Subtitle**: "We help UK families understand funeral costs through independent information analysis"

**3-Column Grid**:
1. **Independent Data Analysis**: Based on mandatory CMA government pricing data
2. **Information Service Only**: We aggregate publicly available data, no financial/legal advice
3. **All Funeral Traditions Respected**: From traditional Church of England to modern celebrations

### How It Works Section
**Title**: "Breakdown of Funeral Costs: What You Need to Know"
**Subtitle**: "Our compassionate approach combines official data with practical information"

**3-Step Grid**:
1. **Understanding Your Area**: Analyse official government pricing data from funeral directors and crematoria within 25 miles
2. **Exploring Your Options**: Clear comparison information about traditional funerals, direct cremation, and hybrid approaches
3. **Official Data You Can Trust**: All analysis based on official government data, updated weekly

### UK-Wide Statistics Section
**Title**: "UK-Wide Funeral Cost Analysis"
**Subtitle**: "Our independent analysis spans thousands of UK funeral providers"

**3-Column Stats Grid**:
- 2,394: Funeral directors analysed (official CMA data)
- £1,247: Average savings documented
- 4.8/5: Satisfaction rating

### Value Section (Pricing Plans)
**Title**: "Understanding Your Options to Reduce Funeral Expenses"

**2-Column Plan Comparison**:
1. **Free Analysis** (£0):
   - Cost breakdown information for your postcode
   - 3 main service scenarios explained
   - Local market overview for comparison
   - Understanding of potential cost ranges
   - Limitations: General information only, No specific provider contacts, No implementation roadmap
   - CTA: "Understand the Costs"

2. **Complete Guide** (£49) - Recommended:
   - Badge: "MOST COMPREHENSIVE"
   - Personalised cost calculations
   - Provider contact information & phone numbers
   - 14-day implementation roadmap
   - Conversation scripts & email templates
   - Timing strategy information
   - 60-day email support for questions
   - Information confidence guarantee
   - CTA: "Get Transparent Pricing (£49)"

**Guarantee Box**: "Information Confidence - If our detailed guidance doesn't help you better understand your options, we offer a full refund within 60 days."

### Testimonials Section
**Title**: "What UK Families Say About Our Service"
**Subtitle**: "Real experiences from families across the UK who used our compassionate guidance"

**3-Column Testimonial Grid**:
Each testimonial includes:
- Quote text
- Author name and location
- Avatar image (with placeholder fallback)
- Strategies used
- Total saved amount

### Choose Your Area Section
**Title**: "Choose Your Area"
**Subtitle**: "Get local expertise for your region"

**Region Cards Grid**:
- South East (Available now)
- South West (Available now)
- North West (Available now)

### Final CTA Section
**Headline**: "Ready to Explore Your Funeral Options?"
**Subheadline**: "Join thousands of UK families who've used our compassionate information service"
**CTAs**: 
- Primary: "View Cost Breakdown" (links to form)
- Secondary: "Learn More" (links to how it works)
**Guarantee Text**: "Independent information • No pressure • Support commitment on premium plans"

### FAQ Section
**Title**: "Essential Questions"
**Subtitle**: "Quick answers about our information service"

**Accordion FAQ Items** (6 questions):
1. Is this a fully licensed service?
2. Do you receive commissions from funeral directors?
3. How current is your data?
4. Is this a financial service?
5. What makes the detailed guidance different?
6. Do you guarantee savings?

### About Section
**Title**: "About ClearFuneralCosts"
**Tagline**: "Born from personal experience, built with compassion"

**Content Blocks**:
1. **Our Story**: Personal narrative about creating the service
2. **Our Mission**: Core purpose and values
3. **Why We're Independent**: 3-column grid explaining no commissions, transparent funding, your decisions
4. **Our Commitment**: Promise to families

### Footer
**3-Column Layout**:
1. **Branding**: ClearFuneralCosts logo, description, contact email
2. **Information**: Links to Privacy Policy, Cost Analysis, Blog
3. **Disclaimer**: "Information service only. This service provides general price information for exploration purposes. We do not provide financial, legal, or funeral planning advice. All decisions remain entirely yours."

**Footer Bottom**: Copyright notice

---

## 🎯 KEY FUNCTIONAL REQUIREMENTS

### Form Functionality
1. **Postcode Validation**:
   - Pattern: UK postcode format (e.g., "BN1 4GH")
   - Real-time validation
   - Error messages for invalid format

2. **Service Type Selection**:
   - Dropdown with 5 options
   - Required field
   - Triggers estimate preview

3. **Email Collection**:
   - Appears after postcode/service selection
   - Email validation
   - Required for form submission

4. **Estimate Preview**:
   - Shows after postcode/service selection
   - Dynamic cost range based on location
   - Data freshness indicator
   - Unlock notice explaining email requirement

5. **Form Submission**:
   - Disabled until all fields valid
   - Submit to API endpoint (n8n webhook)
   - Success message/redirect
   - Error handling

### Interactive Elements
- **FAQ Accordion**: Expand/collapse functionality
- **Smooth Scrolling**: For anchor links
- **Form Validation**: Real-time feedback
- **Loading States**: For form submission
- **Responsive Navigation**: Mobile menu if needed

### SEO Requirements
- **Meta Tags**: Title, description, Open Graph, Twitter Cards
- **Schema.org Markup**: Organization, WebSite, FAQPage, BreadcrumbList
- **Semantic HTML**: Proper heading hierarchy, ARIA labels
- **Alt Text**: All images have descriptive alt text
- **Canonical URLs**: Proper canonical tags

---

## 📱 RESPONSIVE DESIGN

### Breakpoints
- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: < 480px

### Mobile Considerations
- **Font Sizes**: Can reduce by 1-2px MAXIMUM (never below 16px for important content)
- **Touch Targets**: Minimum 48px, recommended 56px
- **Form Layout**: Stack vertically on mobile
- **Hero Section**: Stack content vertically
- **Grid Layouts**: Convert to single column
- **Navigation**: Consider mobile menu if needed

---

## 🚀 IMPLEMENTATION GUIDELINES FOR LOVABLE

### Component Structure
Break the page into logical React components:

1. **Header** (`Header.tsx`)
   - Logo with link
   - "Independent Information" badge

2. **Hero** (`Hero.tsx`)
   - Headline and subheadline
   - Benefits list
   - Trust badge

3. **InformationForm** (`InformationForm.tsx`)
   - Form fields (postcode, service type, email)
   - Estimate preview
   - CTA button
   - Trust indicators

4. **UniqueValue** (`UniqueValue.tsx`)
   - Comparison cards
   - Explainer text

5. **ServiceDefinition** (`ServiceDefinition.tsx`)
   - 3-column grid

6. **HowItWorks** (`HowItWorks.tsx`)
   - 3-step grid

7. **Statistics** (`Statistics.tsx`)
   - Stats grid

8. **PricingPlans** (`PricingPlans.tsx`)
   - Plan comparison cards

9. **Testimonials** (`Testimonials.tsx`)
   - Testimonial cards grid

10. **Regions** (`Regions.tsx`)
    - Region cards

11. **FinalCTA** (`FinalCTA.tsx`)
    - CTA section

12. **FAQ** (`FAQ.tsx`)
    - Accordion FAQ items

13. **About** (`About.tsx`)
    - About content blocks

14. **Footer** (`Footer.tsx`)
    - Footer content

### Styling Approach
- Use Tailwind CSS utility classes
- Create custom Tailwind config with brand colors
- Use CSS variables for colors (matching brandbook)
- Maintain BEM-like naming convention in component names
- Use Tailwind's responsive utilities

### State Management
- Use React hooks (useState, useEffect)
- Form state management
- Form validation logic
- API call handling

### TypeScript Interfaces
```typescript
interface FormData {
  postcode: string;
  serviceType: string;
  email: string;
}

interface EstimateData {
  costRange: string;
  description: string;
  lastUpdated: string;
  nextUpdate: string;
}

interface Testimonial {
  quote: string;
  author: string;
  location: string;
  strategies: string;
  saved: string;
  avatar?: string;
}
```

---

## ✅ SUCCESS CRITERIA

### Visual
- ✅ Matches existing design exactly
- ✅ All colors from brandbook
- ✅ Typography meets 55+ requirements
- ✅ Responsive on all breakpoints
- ✅ High contrast for accessibility

### Functional
- ✅ Form validation works correctly
- ✅ Estimate preview appears dynamically
- ✅ FAQ accordion expands/collapses
- ✅ All links work correctly
- ✅ Form submission handles errors gracefully

### Performance
- ✅ Fast page load
- ✅ Optimized images
- ✅ Efficient React rendering

### Accessibility
- ✅ WCAG AA compliance (AAA preferred)
- ✅ Keyboard navigation works
- ✅ Screen reader friendly
- ✅ Focus states visible
- ✅ Touch targets adequate size

---

## 📝 ADDITIONAL NOTES

### Tone & Language
- **Compassionate**: Acknowledge difficulty of situation
- **Respectful**: Honor dignity and traditions
- **Clear**: Simple, direct language
- **British**: Use British English spelling and terminology
- **No Pressure**: Emphasize "information only", "no commitment"

### Key Messaging
- "Independent" - emphasize no commissions
- "Official data" - CMA government data
- "Save money without compromising dignity"
- "Information service only" - not financial advice
- "Compassionate guidance" - support during difficult times

### Trust Signals
- Official CMA data source
- Number of families helped
- Satisfaction rating
- No commissions guarantee
- Independent status
- Data freshness indicators

---

## 🎨 VISUAL REFERENCES

### Color Usage Examples
- **Primary Buttons**: Sage green background (#5a7a5f), white text
- **Secondary Buttons**: Transparent background, sage green border and text
- **Headers**: Navy background (#1e3a5f), white text
- **Cards**: White background, neutral borders
- **Accent Cards**: Sage green pale background (#e8f3ea), sage green border

### Layout Patterns
- **Hero**: Split layout (content left, form right on desktop)
- **Sections**: Centered container with max-width
- **Grids**: Responsive grid (3 columns desktop, 1 column mobile)
- **Spacing**: Generous padding for readability

---

**This prompt provides comprehensive guidance for recreating the ClearFuneralCosts main page in Lovable while maintaining brand consistency, accessibility standards, and user experience.**

