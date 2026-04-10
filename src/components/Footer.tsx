'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Simple approach: always ensure footer is visible
    const ensureVisibility = () => {
      if (contentRef.current && bottomRef.current) {
        gsap.set([contentRef.current, bottomRef.current, sectionsRef.current], {
          opacity: 1,
          y: 0
        });
      }
    };

    // Ensure visibility immediately
    ensureVisibility();

    // Try to add scroll animation only if conditions are right
    const ctx = gsap.context(() => {
      if (typeof window !== 'undefined' && footerRef.current && typeof ScrollTrigger !== 'undefined') {
        try {
          // Only animate on the homepage or if page is at the top
          const isHomepage = window.location.pathname === '/';
          const isPageTop = window.scrollY < 100;
          
          if (isHomepage && isPageTop) {
            // Set initial animation states
            gsap.set([contentRef.current, bottomRef.current], {
              opacity: 0,
              y: 30
            });

            gsap.set(sectionsRef.current, {
              opacity: 0,
              y: 20
            });

            // Create scroll-triggered animation
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: footerRef.current,
                start: "top 95%",
                end: "bottom 10%",
                toggleActions: "play none none reverse"
              }
            });

            tl.to(contentRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out"
            })
            .to(sectionsRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out"
            }, "-=0.4")
            .to(bottomRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out"
            }, "-=0.2");
          }
        } catch {
          // If anything fails, ensure visibility
          ensureVisibility();
        }
      }
    }, footerRef);

    // Fallback timer
    const fallbackTimer = setTimeout(ensureVisibility, 100);

    return () => {
      clearTimeout(fallbackTimer);
      ctx.revert();
    };
  }, []);

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Hem', href: '/' },
    { name: 'Tjänster', href: '/service' },
    { name: 'Om Oss', href: '/about' },
    { name: 'Kontakt', href: '/contact' }
  ];

  const services = [
    { name: 'Auktoriserad Service', href: '/service' },
    { name: 'Bilreparationer', href: '/service' },
    { name: 'Bilförsäljning', href: '/cars' },
    { name: 'Värdering', href: '/contact' }
  ];

  return (
    <footer 
      ref={footerRef}
      className="bg-gray-50 text-gray-900 py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32"
      style={{ opacity: 1, transform: 'translateY(0)' }} // CSS fallback
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div ref={contentRef} className="mb-12 sm:mb-16" style={{ opacity: 1, transform: 'translateY(0)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
            
            {/* Company Info */}
            <div 
              ref={(el) => {
                sectionsRef.current[0] = el;
              }}
              className="lg:col-span-2"
            >
              <div className="mb-8">
                <h3 className="text-3xl sm:text-4xl font-light tracking-tight mb-4">
                  Märsta
                  <br />
                  <span className="font-normal">Bilhus</span>
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                  Din pålitliga partner för bilservice och försäljning i Arlandastad sedan mitten på 70-talet.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Kontakt
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <a 
                        href="tel:+46700929433" 
                        className="text-gray-900 hover:text-gray-600 transition-colors duration-300 block"
                      >
                        0700 929 433
                      </a>
                      <span className="text-xs text-gray-500">Bilförsäljning</span>
                    </div>
                    <div>
                      <a 
                        href="tel:+46859120541"
                        className="text-gray-900 hover:text-gray-600 transition-colors duration-300 block"
                      >
                        08 591 205 41
                      </a>
                      <span className="text-xs text-gray-500">Verkstad</span>
                    </div>
                    <a 
                      href="mailto:kundservice@marstabilhus.se" 
                      className="text-gray-900 hover:text-gray-600 transition-colors duration-300 block"
                    >
                      kundservice@marstabilhus.se
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Adress
                  </h4>
                  <div className="text-gray-600 leading-relaxed">
                    Maskingatan 12<br />
                    195 60 Arlandastad<br />
                    Sverige
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div 
              ref={(el) => {
                sectionsRef.current[1] = el;
              }}
              className=""
            >
              <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">
                Snabblänkar
              </h4>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-900 hover:text-gray-600 transition-colors duration-300 text-lg"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div
              ref={(el) => {
                sectionsRef.current[2] = el;
              }}
              className=""
            >
              <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">
                Tjänster
              </h4>
              <ul className="space-y-4">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="text-gray-900 hover:text-gray-600 transition-colors duration-300 text-lg"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="mt-12 pt-12 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                  Öppettider
                </h4>
                <div className="space-y-3 text-gray-600 text-sm">
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Bilförsäljning</div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Mån-Tors</span>
                        <span className="text-gray-900">09:00-18:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fredag</span>
                        <span className="text-gray-900">09:00-17:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lördag</span>
                        <span className="text-gray-900">11:00-15:00</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Verkstad</div>
                    <div className="flex justify-between">
                      <span>Mån-Fre</span>
                      <span className="text-gray-900">07:30-16:30</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                  Auktoriseringar
                </h4>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
                    <span>Hyundai Service</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
                    <span>Aixam Service</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
                    <span>Auktoriserad skadeverkstad</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                  Fördelar
                </h4>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
                    <span>Gratis parkering</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
                    <span>Nära Arlanda</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
                    <span>45+ års expertis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div 
          ref={bottomRef}
          className="border-t border-gray-200 pt-8"
          style={{ opacity: 1, transform: 'translateY(0)' }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
              <p className="text-gray-500 text-sm">
                © {currentYear} Märsta Bilhus AB. Alla rättigheter förbehållna.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link
                  href="/cookies"
                  className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
                >
                  Integritetspolicy
                </Link>
                <Link
                  href="/cookies"
                  className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
                >
                  Villkor
                </Link>
                <Link 
                  href="/cookies" 
                  className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
                >
                  Cookies
                </Link>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-500 mb-1">Akut service</p>
              <div className="space-y-1">
                <a 
                  href="tel:+46700929433"
                  className="text-base font-medium text-gray-900 hover:text-gray-600 transition-colors duration-300 block"
                >
                  0700 929 433
                </a>
                <a 
                  href="tel:+46859120541"
                  className="text-base font-medium text-gray-900 hover:text-gray-600 transition-colors duration-300 block"
                >
                  08 591 205 41
                </a>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="text-center text-xs text-gray-400">
              <p className="mb-2">
                Märsta Bilhus AB - Organisationsnummer: 556631-7201 | Momsregistrerat
              </p>
              <p>
                Auktoriserad serviceverkstad för Hyundai och Aixam. 
                Certifierad service av alla bilmärken med bibehållen tillverkargaranti.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 