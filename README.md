# Waste Management & Recycling Consultancy HTML Template

EcoAudit is a commercial-grade, responsive, static HTML template designed for environmental consultancies, ESG advisors, zero-waste compliance boards, circular economy logistics firms, and corporate sustainability metrics tracking.

## Technical Stack

- **Structure**: Semantic HTML5 markup
- **Styling**: Custom CSS3 variables with built-in dark/light mode toggle
- **Grid Layout**: Bootstrap 5 grid-only framework (`assets/css/bootstrap.min.css`)
- **Icons**: Lucide SVG Icons library (asynchronous CDN injection)
- **Animations**: GSAP (GreenSock Animation Platform) for smooth scroll triggers and values values counting
- **Charts**: Custom HTML5 Canvas drawings (theme-aware, zero external chart dependency for lightning fast rendering speed)

## Core Features

1. **Global Theme Selector**: Switch between Light Mode (Forest Green primary, soft gray backgrounds) and Dark Mode (Slate primary, vibrant eco-green highlight accents) with state conservation inside local storage.
2. **Dynamic Client Portal Drawer**: A custom panel containing interactive canvas charts (Waste Diversion trend + Material audit breakdown), compliance checklists, and audit download sections accessible from any page via the navbar.
3. **Interactive Waste Audit Estimator**: A dynamic facility calculator (on `waste-audits.html`) that calculates projected diversion rates, landfill costs savings, CO2 equivalent metrics, and certification tiers.
4. **Structured Compliance Database**: A listing of state mandates (e.g., California SB 1383), RCRA regulations, and Scope 3 ESG guidelines with search panels and checklist sections.
5. **Zero-Waste TRUE Certification Guidance**: Details GBCI scoring frameworks with progress dials, scoring checklists, and action stages.
6. **Unified Mobile Menu**: Responsive burger menu with custom sub-accordion levels.

## Directory Structure

```text
/waste-management-recycling-consultancy/
│
├── index.html                  # Corporate Home Page
├── home-2.html                 # Industrial & Logistics Home Page
├── services.html               # Consultancy Capabilities Index
├── service-details.html        # Circular Supply Chain Details
├── zero-waste-certification.html # GBCI TRUE Certification Prep
├── waste-audits.html           # Stream Characterization & Calculator
├── compliance-guides.html      # Regulatory ESG Guides
├── case-studies.html           # Portfolios of Diversion Audits
├── case-study-details.html     # Automotive Supplier Case Detail
├── blog.html                   # Circularity News Index
├── blog-details.html           # SEC Disclosures Post Detail
├── contact.html                # Inquiry Form & Coordinates
├── login.html                  # Customer Portal Login Screen
├── signup.html                 # Customer Portal Signup Screen
├── 404.html                    # Misrouted Stream Error Screen
│
├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css   # Bootstrap Grid system
│   │   ├── style.css           # Custom variables & shared UI layout
│   │   ├── dark.css            # Dark mode variables & overrides
│   │   └── animations.css      # CSS hover transitions & keyframes
│   │
│   ├── js/
│   │   ├── main.js             # Nav scrolls, calculators & sidebar toggles
│   │   ├── theme-toggle.js     # Light/Dark controller & storage sync
│   │   └── animations.js       # GSAP reveals & Canvas chart renderers
│   │
│   └── images/
│       ├── hero/
│       ├── services/
│       ├── dashboard/
│       ├── case-studies/
│       ├── reports/
│       ├── sustainability/
│       ├── team/
│       └── blog/
│
└── README.md                   # Setup Documentation
```

## How to Set Up & Customize

1. **Color Adjustments**: You can customize global themes by editing colors inside the CSS variables block at the top of `assets/css/style.css` (for light mode) and `assets/css/dark.css` (for dark mode).
2. **Adding Assets**: Save custom icons, logo variations, or corporate team photos under designated subfolders inside `assets/images/` for structured asset referencing.
3. **Logo SVG**: Swap out the `<svg>` blocks inside header/footer layouts with your company's custom logotype graphic.
