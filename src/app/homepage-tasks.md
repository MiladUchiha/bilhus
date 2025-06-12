# Märsta Bilhus Homepage - Development Tasks

## 1. Hero Section ✅ COMPLETED
**Goal**: Premium first impression with minimal design
- [x] Large typography treatment (Märsta Bilhus)
- [x] Clean tagline about services
- [x] Single CTA button with hover animation
- [x] Minimal footer info (authorized brands, location)
- [x] GSAP fade-in animation for text
- [x] Background image slideshow with controls
- [x] Enhanced visibility and text shadows
- [x] Mobile-responsive design
- [x] Proper text centering on mobile

---

## 2. Services Section
**Goal**: Clearly explain what they do without overwhelming
- [ ] Clean grid layout (2x2 or 1x4)
- [ ] Three main services:
  - Auktoriserad Service (Hyundai/Aixam)
  - Alla Bilmärken (All-brand repairs)
  - Bilförsäljning (Car sales)
- [ ] Minimal icons or no icons at all
- [ ] GSAP stagger animation on scroll
- [ ] Hover effects on service cards

---



## 4. About Section
**Goal**: Build trust and credibility
- [ ] Company history and expertise
- [ ] Location advantage (Arlandastad)
- [ ] Professional team photo or facility image
- [ ] Key stats (years in business, customers served)
- [ ] GSAP counter animations for statistics
- [ ] Parallax effect on background image

---

## 5. Contact Section ✅ COMPLETED
**Goal**: Make it easy to get in touch
- [x] Clean contact form
- [x] Location details and map
- [x] Operating hours
- [x] Phone/email/address
- [x] GSAP form field animations
- [x] Interactive map integration (Google Maps embedded with actual address)

---

## 6. Navigation 🚧 IN PROGRESS
**Goal**: Minimal, premium navigation experience
- [x] Clean header with logo
- [x] Minimal menu items (expanded for multiple pages)
- [x] GSAP menu animations
- [x] Mobile hamburger menu with smooth transitions
- [x] Scroll-based background transition
- [x] Responsive design with proper text shadows
- [ ] Smooth scroll navigation (to be implemented when sections are added)

---

## 7. Footer ✅ COMPLETED
**Goal**: Professional closure with essential info
- [x] Company information
- [x] Quick links
- [x] Contact details and opening hours
- [x] Legal links (privacy policy, terms)
- [x] Minimal design matching overall aesthetic
- [x] GSAP scroll animations
- [x] Smooth scroll navigation

---

## Animation Strategy (GSAP)

### Page Load Animations
- [ ] Hero text fade-in and slide-up
- [ ] Staggered animation for navigation items
- [ ] Logo fade-in

### Scroll Animations
- [ ] Section reveal animations (fade-in from bottom)
- [ ] Service cards stagger animation
- [ ] Statistics counter animations
- [ ] Parallax effects on background elements

### Interaction Animations
- [ ] Button hover effects
- [ ] Form field focus animations
- [ ] Menu open/close animations
- [ ] Smooth scroll between sections

### Performance Considerations
- [ ] Preload animations
- [ ] Reduce motion for accessibility
- [ ] Mobile-optimized animations
- [ ] Lazy load animations for below-fold content

---

## Content Strategy

### Tone of Voice
- Professional but approachable
- Swedish language
- Emphasis on trust and reliability
- Highlight convenience and expertise

### Key Messages
1. **Trustworthy**: Authorized service center
2. **Comprehensive**: All-brand service capability
3. **Expert**: All-brand capability
4. **Local**: Arlandastad location advantage

### SEO Considerations
- [ ] Meta tags for each section
- [ ] Alt text for images
- [ ] Structured data for business info
- [ ] Local SEO optimization for Arlandastad/Stockholm area

What Märsta Bilhus Does
Märsta Bilhus is a full-service automotive company located in Arlandastad (near Stockholm's Arlanda Airport). They operate as:

Car Dealership: Sells new and used vehicles of various brands
Authorized Service Center: Official warranty service for Hyundai and Aixam vehicles
All-Brand Workshop: Repairs and services all car makes while maintaining manufacturer warranties
Airport Service Specialist: Unique offering where customers can leave their cars for service while traveling abroad
Car Buyers: Also purchases vehicles from customers

Key Differentiator: Authorized service center for Hyundai & Aixam with all-brand capability, maintaining manufacturer warranties while providing comprehensive automotive services.
Design Approach
We're implementing a luxury minimalism strategy that positions Märsta Bilhus as a premium, trustworthy brand rather than a typical car dealership.
Design Philosophy:

Ultra-minimalistic - lots of white space, clean lines
Typography-driven - massive, elegant fonts do the talking
Subtle sophistication - GSAP animations that feel natural, not flashy
Premium positioning - think Apple or high-end fashion brands
Anti-car-dealership - avoiding cheesy 3D models, flashy colors, or typical automotive clichés

Technical Stack:

Next.js 15 with TypeScript
GSAP for smooth, subtle animations (fade-ins, parallax, text reveals)
Tailwind CSS for styling
Focus on performance and accessibility