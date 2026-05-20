# Horizon Web Labs

A production-grade fullstack premium agency website with a fully dynamic CMS admin dashboard, built with Next.js 15, MongoDB, and Framer Motion.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | JavaScript (no TypeScript) |
| Styling | Tailwind CSS v4 + custom glassmorphism utilities |
| Animations | Framer Motion |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT (HTTP-only cookies) + bcryptjs |
| Media | Cloudinary |
| Icons | Lucide React + React Icons (fa6) |
| Notifications | React Hot Toast |

## Quick Start

### 1. Install dependencies

```bash
cd horizon-web-labs
npm install
```

### 2. Configure environment variables

Create `.env.local` in the project root:

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/horizon-web-labs
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Create the first admin account

```bash
npm run dev
```

Then POST to `/api/auth/setup`:

```json
{
  "name": "Admin",
  "email": "weblabshorizon@gmail.com",
  "password": "your-password"
}
```

This endpoint is blocked after the first user is created.

### 4. Access the admin dashboard

Navigate to `http://localhost:3000/admin` and log in.

## Project Structure

```
horizon-web-labs/
├── app/
│   ├── page.js                    # Home page (with Navbar + Footer)
│   ├── layout.js                  # Root layout (fonts, Toaster, metadata)
│   ├── globals.css                # Design system, utilities
│   ├── sitemap.js                 # Dynamic sitemap (queries MongoDB)
│   ├── robots.js                  # Blocks /admin and /api
│   ├── (public)/                  # Public route group
│   │   ├── layout.jsx             # Wraps all public pages with Navbar + Footer
│   │   ├── about/page.jsx
│   │   ├── services/page.jsx
│   │   ├── projects/
│   │   │   ├── page.jsx           # Projects listing with category filter
│   │   │   └── [slug]/page.jsx    # Project detail with image gallery
│   │   ├── blog/page.jsx
│   │   └── contact/page.jsx
│   └── (admin)/admin/             # Admin CMS route group (auth-gated)
│       ├── layout.jsx             # Auth guard + sidebar
│       ├── page.jsx               # Dashboard overview
│       ├── hero/page.jsx
│       ├── navbar/page.jsx
│       ├── footer/page.jsx
│       ├── about/page.jsx
│       ├── services/page.jsx
│       ├── projects/page.jsx
│       ├── blogs/page.jsx
│       ├── messages/page.jsx
│       ├── testimonials/page.jsx
│       ├── faqs/page.jsx
│       ├── seo/page.jsx
│       └── settings/page.jsx
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx             # CMS-driven, sticky, mobile animated
│   │   └── Footer.jsx             # CMS-driven, social icons
│   ├── sections/
│   │   ├── Hero.jsx               # Mouse-follow gradient, AnimatedWords
│   │   ├── FeaturedProjects.jsx
│   │   ├── TechStack.jsx          # Auto-scrolling marquee
│   │   ├── Testimonials.jsx       # Auto-rotating carousel
│   │   ├── FAQSection.jsx         # AnimatePresence accordion
│   │   └── CTASection.jsx
│   ├── ui/
│   │   ├── Button.jsx             # 6 variants, sizes, loading state
│   │   ├── SectionHeading.jsx
│   │   ├── FloatingOrbs.jsx
│   │   ├── LoadingSkeleton.jsx
│   │   └── AnimatedText.jsx
│   └── admin/
│       ├── AdminSidebar.jsx       # Collapsible, mobile overlay
│       ├── AdminCard.jsx          # Card, Section, FormField utilities
│       └── ImageUpload.jsx        # Cloudinary base64 upload widget
├── models/
│   ├── User.js
│   ├── Service.js
│   ├── Project.js
│   ├── Blog.js
│   ├── Testimonial.js
│   ├── FAQ.js
│   ├── ContactMessage.js
│   └── SiteContent.js            # Single-document CMS store
├── lib/
│   ├── db.js                     # MongoDB singleton (global cache)
│   ├── jwt.js                    # signToken / verifyToken
│   ├── auth.js                   # withAuth HOC, getTokenFromRequest
│   ├── cloudinary.js             # uploadImage / deleteImage
│   └── response.js               # ok / created / error / serverError
├── hooks/
│   └── useAuth.js                # AuthProvider + useAuth context
├── utils/
│   └── helpers.js                # formatDate, slugify, truncate, cn
└── animations/
    └── variants.js               # fadeUp, fadeLeft, fadeRight, staggerContainer, ...
```

## Admin Dashboard Features

| Section | What You Can Edit |
|---|---|
| Dashboard | Live stats: services, projects, messages, blogs; recent activity |
| Hero | Badge text, heading, subheading, CTA buttons, stats grid |
| Navbar | Logo text, navigation links (label/href/active toggle), CTA button |
| Footer | Tagline, copyright, social URLs, contact info, link columns |
| About | Story, mission, vision, hero image, team members, journey timeline |
| Services | Full CRUD — title, slug, description, icon, image, features, pricing |
| Projects | Full CRUD — thumbnail, gallery, tech stack, category, URLs |
| Blog | Full CRUD — content, thumbnail, tags, publish/draft, featured |
| Testimonials | Full CRUD — star rating, avatar, name, position, review |
| FAQs | Full CRUD — question, answer, category, display order |
| Messages | Two-panel inbox with search, filter, mark-read, delete |
| SEO | Site title, meta description (char counter), keywords, OG image, robots.txt |
| Settings | Profile info, create additional admin accounts |

## API Reference

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | — | Login, sets HTTP-only cookie |
| POST | `/api/auth/logout` | — | Clears auth cookie |
| GET | `/api/auth/me` | JWT | Returns current user |
| POST | `/api/auth/setup` | — | Creates first admin (one-time) |

### CMS Content
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/content?section=hero` | — | Returns one section or all |
| PUT | `/api/content` | JWT | Patch-updates a section |

### Collections
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/services` | — | All services (`?featured=true`) |
| POST | `/api/services` | JWT | Create service |
| GET/PUT/DELETE | `/api/services/[id]` | GET: — / rest: JWT | Service CRUD |
| GET | `/api/projects` | — | All projects (`?featured`, `?category`) |
| POST | `/api/projects` | JWT | Create project |
| GET/PUT/DELETE | `/api/projects/[id]` | GET: — / rest: JWT | Project CRUD |
| GET | `/api/blogs` | — | All blogs (public: published only) |
| POST | `/api/blogs` | JWT | Create blog post |
| GET | `/api/contact` | JWT | All messages + unread count |
| POST | `/api/contact` | — | Submit contact form |
| POST | `/api/upload` | JWT | Upload image to Cloudinary |
| DELETE | `/api/upload` | JWT | Delete image from Cloudinary |
| GET | `/api/dashboard` | JWT | Aggregate stats |

## Design System

### Brand Colors

```css
--bg-primary: #050816
--color-primary: #7c3aed    /* violet-600 */
--color-secondary: #06b6d4  /* cyan-500 */
--color-accent: #8b5cf6     /* violet-500 */
--text-primary: #f8fafc
--text-muted: #94a3b8
```

### CSS Utilities

```css
.glass          /* glassmorphism card */
.glass-strong   /* stronger glass for modals */
.gradient-text  /* violet-to-cyan text gradient */
.grid-pattern   /* subtle dot grid background */
```

### Animation Variants (`animations/variants.js`)

```js
fadeUp, fadeLeft, fadeRight, fadeIn, scaleIn   // entrance variants
staggerContainer, staggerFast                   // parent containers
pageTransition                                  // page-level wrapper
cardHover                                       // whileHover on cards
```

## Deployment (Vercel)

1. Push to GitHub
2. Import repo in Vercel
3. Add all environment variables from `.env.local`
4. Set **Framework Preset** to Next.js
5. Deploy

Cloudinary, MongoDB Atlas, and JWT work out-of-the-box on Vercel's serverless functions. No additional configuration needed.

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `MONGODB_URI` | Yes | MongoDB Atlas connection string |
| `JWT_SECRET` | Yes | Min 32-char random string |
| `CLOUDINARY_CLOUD_NAME` | Yes | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Yes | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Yes | Cloudinary API secret |
| `NEXT_PUBLIC_SITE_URL` | Yes | Full URL incl. protocol (no trailing slash) |
