# Hedge Resource Centre (HRC) Ghana

> Corporate website for Hedge Resource Centre — a leader in resource consulting, professional training, skills development, and advisory services in Tema, Ghana since 2004.

**Live site:** [https://www.hrcghana.com](https://www.hrcghana.com)

---

## Tech Stack

| Category              | Technology                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| **Framework**         | [Next.js](https://nextjs.org/) 13.5.1 (App Router)                                            |
| **Language**          | [TypeScript](https://www.typescriptlang.org/) 5.2                                               |
| **Styling**           | [Tailwind CSS](https://tailwindcss.com/) 3.3 + [shadcn/ui](https://ui.shadcn.com/) components |
| **Animation**         | [Framer Motion](https://www.framer.com/motion/) 12 + Custom CSS animations                    |
| **Font**              | [Inter](https://rsms.me/inter/) via Next.js font optimization (`next/font`)                   |
| **Icons**             | [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/) |
| **Forms & Validation**| [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) + `@hookform/resolvers` |
| **Scheduling**        | [Calendly](https://calendly.com/) inline widget via `next/script`                             |
| **CRM**               | [HubSpot API](https://developers.hubspot.com/) (`@hubspot/api-client`)                        |
| **Email**             | [Resend](https://resend.com/)                                                                 |
| **State Management**  | React `useState` / `useEffect` + custom hooks (`use-toast`)                                   |
| **Date Handling**     | [date-fns](https://date-fns.org/) + [react-day-picker](https://react-day-picker.js.org/)     |
| **Charts**            | [Recharts](https://recharts.org/)                                                             |
| **Carousel**          | [Embla Carousel](https://www.embla-carousel.com/) (`embla-carousel-react`)                    |
| **Notifications**     | [Sonner](https://sonner.emilkowal.ski/) + shadcn Toast                                        |
| **Misc UI**           | [cmdk](https://cmdk.paco.me/), [Input OTP](https://input-otp.vercel.app/), [Vaul](https://vaul.emilkowal.ski/) (drawer) |
| **Image Processing**  | [sharp](https://sharp.pixelplumbing.com/) (image generation & optimization)                   |
| **Deployment**        | Ready for [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or any Node.js host |

---

## Project Structure

```
├── app/                      # Next.js App Router pages
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout (SEO metadata, structured data, header/footer)
│   ├── globals.css           # Global styles, Tailwind directives, brand tokens
│   ├── about/                # About Us page
│   ├── services/             # Services page (Training, Skills Dev, Research, etc.)
│   ├── projects/             # Projects, Products & Clients page
│   ├── booking/              # Appointment booking page (Calendly integration)
│   ├── contact/              # Contact page with form
│   ├── why-choose-us/        # Why Choose Us page
│   ├── scheduling/           # Redirects to /booking
│   └── admin/leads/          # Admin dashboard for HubSpot CRM leads
├── components/               # React components
│   ├── ui/                   # shadcn/ui primitives (button, card, dialog, etc.)
│   ├── Header.tsx            # Site header with responsive navigation
│   ├── Footer.tsx            # Site footer with links, social, newsletter
│   ├── HeroSection.tsx       # Homepage hero with image slideshow
│   ├── ServicesSection.tsx   # Services grid
│   ├── AboutSection.tsx      # About section with mission & values
│   ├── WhyChooseUs.tsx       # Differentiators section
│   ├── ContactSection.tsx    # Contact form section
│   ├── ProductsClientsProjects.tsx  # Tabbed portfolio (Products, Clients, Projects)
│   ├── BookingWidget.tsx     # Multi-step booking flow (Service → Details → Calendly)
│   ├── PageHero.tsx          # Reusable inner page hero banner
│   ├── Logo.tsx              # SVG logo component
│   ├── Counter.tsx           # Animated number counter
│   ├── BackToTop.tsx         # Scroll-to-top button
│   ├── WhatsAppButton.tsx    # Floating WhatsApp CTA
│   └── BookNowButton.tsx     # Floating book-now CTA
├── lib/                      # Shared utilities & configuration
│   ├── constants.ts          # Centralized site config (URLs, social links, brand info)
│   ├── crm.ts                # HubSpot CRM client (contact sync, lead fetching)
│   └── utils.ts              # Utility functions (cn merge)
├── hooks/                    # Custom React hooks
│   └── use-toast.ts          # Toast notification hook
├── public/                   # Static assets
│   ├── og-image.jpg          # Open Graph image (1200×630)
│   ├── og-image.svg          # SVG source for OG image
│   ├── logo.png              # PNG logo (200×200)
│   ├── logo.svg              # SVG logo source
│   ├── sitemap.xml           # XML sitemap
│   └── robots.txt            # Robots exclusion file
├── next.config.js            # Next.js configuration (redirects, headers, images)
├── tailwind.config.ts         # Tailwind CSS theme configuration
└── tsconfig.json             # TypeScript configuration
```

---

## Features

### Pages
- **Home** — Hero slideshow, about summary, services overview, differentiators, contact CTA
- **Services** — 6 core services: Training, Skills Development, Admin Support, Research, Assessment, Advisory
- **About** — Company history, mission, vision, core values, achievements
- **Projects/Products/Clients** — Tabbed portfolio showcasing work and clientele
- **Booking** — Multi-step appointment scheduler (Select Service → Contact Details → Calendly)
- **Contact** — Contact form with HubSpot CRM sync
- **Why Choose Us** — Differentiators with FAQ schema
- **Admin** — Protected CRM leads dashboard

### SEO
- Comprehensive JSON-LD structured data (Organization, LocalBusiness, WebSite, BreadcrumbList, Service, FAQPage, AboutPage)
- Open Graph + Twitter Card meta tags with OG image
- Sitemap XML & robots.txt
- Canonical URLs, meta descriptions, keywords
- Google Search Console verification ready
- Skip-to-content accessibility link
- Semantic HTML5 heading hierarchy

### Performance
- Next.js App Router with static page generation
- Image lazy loading with explicit dimensions (reduces CLS)
- Security headers (HSTS, X-Content-Type-Options, Referrer-Policy)
- DNS prefetch for external resources
- Cache-optimized static assets
- Preconnect hints for third-party origins

### CRM & Automation
- **HubSpot** integration via `@hubspot/api-client`
- Automatic contact creation/update on form submissions
- Deal tracking per interaction (enquiry, booking initiated, booking confirmed)
- Admin dashboard at `/admin/leads?secret=YOUR_SECRET`

---

## Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd hedge-resource-centre

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file in the project root:

```env
# HubSpot CRM (required for form submissions & admin dashboard)
HUBSPOT_ACCESS_TOKEN=your-private-app-token

# Admin dashboard protection
ADMIN_SECRET=your-secure-random-string

# Calendly scheduling URL (optional, has default)
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/hrcghana/consultation

# Google Search Console verification (optional)
# Add your verification code in app/layout.tsx → metadata → verification → google
```

### Build for Production

```bash
npm run build
npm start
```

---

## Scripts

| Command           | Description                |
| ----------------- | -------------------------- |
| `npm run dev`     | Start development server   |
| `npm run build`   | Build for production       |
| `npm start`       | Start production server    |
| `npm run lint`    | Run ESLint                 |

---

## License

© 2024 Hedge Resource Centre. All rights reserved.
