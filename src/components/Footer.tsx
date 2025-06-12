'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    const ctx = gsap.context(() => {
      // Set initial states
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
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate footer content
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

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Hem', href: '#hero' },
    { name: 'Tjänster', href: '#services' },
    { name: 'Om Oss', href: '#about' },
    { name: 'Kontakt', href: '#contact' }
  ];

  const services = [
    { name: 'Auktoriserad Service', href: '#services' },
    { name: 'Bilreparationer', href: '#services' },
    { name: 'Bilförsäljning', href: '#services' },
    { name: 'Värdering', href: '#contact' }
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      let targetElement: HTMLElement | null = null;
      
      // Map section IDs to actual elements
      switch (targetId) {
        case 'hero':
          targetElement = document.querySelector('main > div:first-child') as HTMLElement;
          break;
        case 'services':
          targetElement = document.querySelector('[class*="ServicesSection"], section:nth-of-type(2)') as HTMLElement;
          break;
        case 'about':
          targetElement = document.querySelector('[class*="AboutSection"], section:nth-of-type(3)') as HTMLElement;
          break;
        case 'contact':
          targetElement = document.querySelector('[class*="ContactSection"], section:nth-of-type(4)') as HTMLElement;
          break;
        default:
          targetElement = document.getElementById(targetId);
      }
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="bg-gray-50 text-gray-900 py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div ref={contentRef} className="mb-12 sm:mb-16">
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
                  Din pålitliga partner för bilservice och försäljning i Arlandastad sedan 1999.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Kontakt
                  </h4>
                  <div className="space-y-2">
                    <a 
                      href="tel:+46850555555" 
                      className="text-gray-900 hover:text-gray-600 transition-colors duration-300 block"
                    >
                      +46 8-505 555 55
                    </a>
                    <a 
                      href="mailto:info@marstabilhus.se" 
                      className="text-gray-900 hover:text-gray-600 transition-colors duration-300 block"
                    >
                      info@marstabilhus.se
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
                    <a
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="text-gray-900 hover:text-gray-600 transition-colors duration-300 text-lg"
                    >
                      {link.name}
                    </a>
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
                    <a
                      href={service.href}
                      onClick={(e) => handleSmoothScroll(e, service.href)}
                      className="text-gray-900 hover:text-gray-600 transition-colors duration-300 text-lg"
                    >
                      {service.name}
                    </a>
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
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Måndag - Fredag</span>
                    <span className="text-gray-900 font-medium">08:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lördag</span>
                    <span className="text-gray-900 font-medium">09:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Söndag</span>
                    <span className="text-gray-900 font-medium">Stängt</span>
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
                    <span>Alla Bilmärken</span>
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
                    <span>25+ års expertis</span>
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
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
              <p className="text-gray-500 text-sm">
                © {currentYear} Märsta Bilhus AB. Alla rättigheter förbehållna.
              </p>
              <div className="flex space-x-6 text-sm">
                <a 
                  href="#privacy" 
                  className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
                >
                  Integritetspolicy
                </a>
                <a 
                  href="#terms" 
                  className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
                >
                  Villkor
                </a>
                <a 
                  href="#cookies" 
                  className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
                >
                  Cookies
                </a>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-500 mb-1">Akut service</p>
              <a 
                href="tel:+46850555555"
                className="text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors duration-300"
              >
                +46 8-505 555 55
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="text-center text-xs text-gray-400">
              <p className="mb-2">
                Märsta Bilhus AB - Organisationsnummer: 556123-4567 | Momsregistrerat
              </p>
              <p>
                Auktoriserad återförsäljare och serviceverkstad för Hyundai och Aixam. 
                Certifierad service av alla bilmärken med bibehållen tillverkargaranti.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 