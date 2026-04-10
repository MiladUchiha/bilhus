'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

interface DropdownItem {
  name: string;
  href: string;
  description?: string;
  icon: React.ReactNode;
}

interface NavItem {
  name: string;
  href: string;
  dropdown?: DropdownItem[];
}

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLUListElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const pathname = usePathname();
  const t = useTranslations();
  
  // Pages that have light/white backgrounds at the top
  const lightBackgroundPages = [
    '/contact',
    '/about',
    '/service',
    '/services',
    '/cars',
  ];
  
  // Pages that should have white text despite being in lightBackgroundPages
  const darkHeroPages = [
    '/service/hyundai',
    '/service/aixam',
    '/service/repairs',
  ];
  
  const hasLightBackground = lightBackgroundPages.some(page => pathname.startsWith(page)) && 
                         !darkHeroPages.some(page => pathname.startsWith(page));

  // Navigation items
  const getNavItems = (): NavItem[] => [
    { name: t('navigation.home'), href: '/' },
    { 
      name: t('navigation.cars'), 
      href: '/cars',
      dropdown: [
        { 
          name: t('cars.dropdown.allCars'), 
          href: '/cars',
          description: t('cars.dropdown.allCarsDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          )
        },
        
        
        
        { 
          name: t('cars.dropdown.aixamCars'), 
          href: 'https://marstabilhus.aixam-mopedbil.se/',
          description: t('cars.dropdown.aixamCarsDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          )
        },
        { 
          name: t('cars.dropdown.financing'), 
          href: '/cars/financing',
          description: t('cars.dropdown.financingDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          )
        },
        { 
          name: t('cars.dropdown.sellCar'), 
          href: '/cars/sell',
          description: t('cars.dropdown.sellCarDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        }
      ]
    },
    { 
      name: t('navigation.service'), 
      href: '/service',
      dropdown: [
        { 
          name: t('service.dropdown.allServices'), 
          href: '/service',
          description: t('service.dropdown.allServicesDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          )
        },
        { 
          name: t('service.dropdown.hyundaiService'), 
          href: '/service/hyundai',
          description: t('service.dropdown.hyundaiServiceDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        },
        { 
          name: t('service.dropdown.aixamService'), 
          href: '/service/aixam',
          description: t('service.dropdown.aixamServiceDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-4a2 2 0 00-2-2H8z" />
            </svg>
          )
        },
        { 
          name: t('service.dropdown.generalService'), 
          href: '/service/general',
          description: t('service.dropdown.generalServiceDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          )
        },
        { 
          name: t('service.dropdown.inspection'), 
          href: '/service/inspection',
          description: t('service.dropdown.inspectionDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m9-9a2 2 0 012 2v6a2 2 0 01-2 2H9m12-12a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2V5z" />
            </svg>
          )
        },
        { 
          name: t('service.dropdown.tires'), 
          href: '/service/tires',
          description: t('service.dropdown.tiresDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          )
        },
        { 
          name: t('service.dropdown.repairs'), 
          href: '/service/repairs',
          description: t('service.dropdown.repairsDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )
        },
        { 
          name: t('service.dropdown.booking'), 
          href: '/service/booking',
          description: t('service.dropdown.bookingDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )
        }
      ]
    },
    { 
      name: t('navigation.services'), 
      href: '/services',
      dropdown: [
        { 
          name: t('services.dropdown.loans'), 
          href: '/services/loans',
          description: t('services.dropdown.loansDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          )
        },
        { 
          name: t('services.dropdown.insurance'), 
          href: '/services/insurance',
          description: t('services.dropdown.insuranceDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          )
        },
        { 
          name: t('services.dropdown.valuation'), 
          href: '/services/valuation',
          description: t('services.dropdown.valuationDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        },
        { 
          name: t('services.dropdown.delivery'), 
          href: '/services/delivery',
          description: t('services.dropdown.deliveryDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )
        },
        { 
          name: t('services.dropdown.warranties'), 
          href: '/services/warranties',
          description: t('services.dropdown.warrantiesDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          )
        },
        { 
          name: t('services.dropdown.tradeIn'), 
          href: '/services/trade-in',
          description: t('services.dropdown.tradeInDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          )
        }
      ]
    },
    { 
      name: t('navigation.about'), 
      href: '/about',
      dropdown: [
        { 
          name: t('about.dropdown.company'), 
          href: '/about',
          description: t('about.dropdown.companyDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          )
        },
        { 
          name: t('about.dropdown.workshop'), 
          href: '/about/workshop',
          description: t('about.dropdown.workshopDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          )
        },
        { 
          name: t('about.dropdown.authorization'), 
          href: '/about/authorization',
          description: t('about.dropdown.authorizationDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        },
        { 
          name: t('about.dropdown.staff'), 
          href: '/about/staff',
          description: t('about.dropdown.staffDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          )
        },
        { 
          name: t('about.dropdown.whyUs'), 
          href: '/about/why-us',
          description: t('about.dropdown.whyUsDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          )
        },
        { 
          name: t('about.dropdown.environment'), 
          href: '/about/environment',
          description: t('about.dropdown.environmentDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          )
        }
      ]
    },
    { 
      name: t('navigation.contact'), 
      href: '/contact',
      dropdown: [
        { 
          name: t('contact.dropdown.contactUs'), 
          href: '/contact',
          description: t('contact.dropdown.contactUsDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )
        },
        { 
          name: t('contact.dropdown.location'), 
          href: '/contact/location',
          description: t('contact.dropdown.locationDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )
        },
        { 
          name: t('contact.dropdown.hours'), 
          href: '/contact/hours',
          description: t('contact.dropdown.hoursDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        },
        { 
          name: t('contact.dropdown.phone'), 
          href: '/contact/phone',
          description: t('contact.dropdown.phoneDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          )
        },
        { 
          name: t('contact.dropdown.quote'), 
          href: '/contact/quote',
          description: t('contact.dropdown.quoteDescription'),
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )
        }
      ]
    }
  ];

  const navItems = getNavItems();

  // Initial GSAP animation
  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set([logoRef.current, menuItemsRef.current], {
      opacity: 0,
      y: -20
    });

    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    })
    .to(menuItemsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6");
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
      gsap.set(mobileMenuRef.current, { display: 'flex' });
      gsap.fromTo(mobileMenuRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    } else {
      // Re-enable body scroll
      document.body.style.overflow = 'unset';
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(mobileMenuRef.current, { display: 'none' });
        }
      });
    }
  };

  const handleLinkClick = () => {
    if (isMenuOpen) {
      document.body.style.overflow = 'unset';
      setIsMenuOpen(false);
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(mobileMenuRef.current, { display: 'none' });
        }
      });
    }
    setActiveDropdown(null);
    setMobileActiveDropdown(null);
  };

  const handleMobileDropdownToggle = (itemName: string) => {
    setMobileActiveDropdown(mobileActiveDropdown === itemName ? null : itemName);
  };

  // Desktop dropdown handlers with proper timeout management
  const handleMouseEnter = (itemName: string) => {
    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    // Add delay to allow moving cursor to dropdown
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
    setHoverTimeout(timeout);
  };

  const handleDropdownMouseEnter = () => {
    // Clear timeout when entering dropdown
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleDropdownMouseLeave = () => {
    setActiveDropdown(null);
  };

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        document.body.style.overflow = 'unset';
        setIsMenuOpen(false);
        gsap.set(mobileMenuRef.current, { display: 'none' });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            
            {/* Logo */}
            <div ref={logoRef} className="flex-shrink-0">
              <Link 
                href="/" 
                className={`text-xl sm:text-2xl lg:text-2xl font-light tracking-tight transition-colors duration-300 ${
                  isScrolled || hasLightBackground ? 'text-gray-900 hover:text-gray-700' : 'text-white hover:text-white/90'
                }`}
                style={{
                  textShadow: isScrolled || hasLightBackground ? 'none' : '2px 2px 8px rgba(0,0,0,0.8)'
                }}
              >
                <span>
                  Märsta <span className="font-normal">Bilhus</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <ul 
              ref={menuItemsRef}
              className="hidden lg:flex space-x-8 xl:space-x-12"
            >
              {navItems.map((item) => (
                <li 
                  key={item.name} 
                  className="relative group"
                  onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.dropdown ? (
                    <div
                      className={`flex items-center text-sm xl:text-base font-medium transition-all duration-300 hover:scale-105 ${
                        isScrolled || hasLightBackground ? 'text-gray-900 hover:text-gray-700' : 'text-white hover:text-white/80'
                      } cursor-pointer`}
                      style={{
                        textShadow: isScrolled || hasLightBackground ? 'none' : '2px 2px 4px rgba(0,0,0,0.8)'
                      }}
                    >
                      {item.name}
                      <svg 
                        className={`ml-2 w-4 h-4 transition-all duration-300 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        } ${isScrolled || hasLightBackground ? 'text-gray-900' : 'text-white'}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        style={{
                          filter: isScrolled || hasLightBackground ? 'none' : 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8))'
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-sm xl:text-base font-medium transition-all duration-300 hover:scale-105 ${
                        isScrolled || hasLightBackground ? 'text-gray-900 hover:text-gray-700' : 'text-white hover:text-white/80'
                      }`}
                      style={{
                        textShadow: isScrolled || hasLightBackground ? 'none' : '2px 2px 4px rgba(0,0,0,0.8)'
                      }}
                      onClick={handleLinkClick}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Desktop Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div 
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-96 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
                      style={{
                        backdropFilter: 'blur(24px) saturate(180%)',
                        background: 'rgba(0, 0, 0, 0.75)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      }}
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleDropdownMouseLeave}
                    >
                      {/* Dropdown Header */}
                      <div className="px-6 py-5 bg-black/20 backdrop-blur border-b border-white/10">
                        <h3 className="text-lg font-medium text-white tracking-tight">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-300 mt-1 font-light">
                          {item.name === t('navigation.cars') && t('dropdownHeaders.cars')}
                          {item.name === t('navigation.service') && t('dropdownHeaders.service')}
                          {item.name === t('navigation.services') && t('dropdownHeaders.services')}
                          {item.name === t('navigation.about') && t('dropdownHeaders.about')}
                          {item.name === t('navigation.contact') && t('dropdownHeaders.contact')}
                        </p>
                      </div>

                      {/* Dropdown Items */}
                      <div className="py-3 max-h-96 overflow-y-auto custom-scrollbar">
                        {item.dropdown.map((dropdownItem, index) => {
                          const LinkComponent = dropdownItem.href.startsWith('http') ? 'a' : Link;
                          const linkProps = dropdownItem.href.startsWith('http') 
                            ? { href: dropdownItem.href, target: "_blank", rel: "noopener noreferrer" }
                            : { href: dropdownItem.href };
                          
                          return (
                            <LinkComponent
                              key={dropdownItem.name}
                              {...linkProps}
                              onClick={handleLinkClick}
                              className="group relative block mx-3 px-5 py-4 hover:bg-white/5 hover:backdrop-blur transition-all duration-300 border-l-2 border-transparent hover:border-white/30 rounded-r-xl"
                            >
                            <div className="flex items-start space-x-4">
                              {/* Icon */}
                              <div className="flex-shrink-0 mt-1">
                                <div className="w-7 h-7 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 border border-white/10">
                                  <div className="text-gray-300 group-hover:text-white transition-colors duration-300 scale-90">
                                    {dropdownItem.icon}
                                  </div>
                                </div>
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-baseline justify-between mb-1">
                                  <h4 className="font-medium text-white tracking-tight group-hover:text-gray-100 transition-colors duration-300 text-base">
                                    {dropdownItem.name}
                                  </h4>
                                  <span className="text-xs font-light text-gray-400 ml-2 group-hover:text-gray-300 transition-colors duration-300 tracking-wider">
                                    {String(index + 1).padStart(2, '0')}
                                  </span>
                                </div>
                                {dropdownItem.description && (
                                  <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed font-light">
                                    {dropdownItem.description}
                                  </p>
                                )}
                              </div>

                              {/* Arrow */}
                              <div className="flex-shrink-0 opacity-0 group-hover:opacity-70 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </LinkComponent>
                          );
                        })}
                      </div>

                      {/* Dropdown Footer */}
                      <div className="px-6 py-4 bg-black/20 backdrop-blur border-t border-white/10">
                        <p className="text-xs text-gray-400 text-center font-light tracking-wide">
                          {item.name === t('navigation.cars') && t('dropdownFooters.cars')}
                          {item.name === t('navigation.service') && t('dropdownFooters.service')}
                          {item.name === t('navigation.services') && t('dropdownFooters.services')}
                          {item.name === t('navigation.about') && t('dropdownFooters.about')}
                          {item.name === t('navigation.contact') && t('dropdownFooters.contact')}
                        </p>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Language Switcher - Desktop */}
            <div className="hidden lg:block">
              <LanguageSwitcher isScrolled={isScrolled} hasLightBackground={hasLightBackground} />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden relative w-10 h-10 flex flex-col justify-center items-center space-y-1.5 z-50"
              aria-label="Toggle menu"
            >
              <span 
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                } ${isScrolled || hasLightBackground ? 'bg-gray-900' : 'bg-white'}`}
                style={{
                  boxShadow: isScrolled || hasLightBackground ? 'none' : '0 0 4px rgba(0,0,0,0.8)'
                }}
              />
              <span 
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                } ${isScrolled || hasLightBackground ? 'bg-gray-900' : 'bg-white'}`}
                style={{
                  boxShadow: isScrolled || hasLightBackground ? 'none' : '0 0 4px rgba(0,0,0,0.8)'
                }}
              />
              <span 
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                } ${isScrolled || hasLightBackground ? 'bg-gray-900' : 'bg-white'}`}
                style={{
                  boxShadow: isScrolled || hasLightBackground ? 'none' : '0 0 4px rgba(0,0,0,0.8)'
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 lg:hidden bg-black/95 backdrop-blur-xl hidden"
        style={{ display: 'none' }}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-6 border-b border-white/20 pt-20">
            <div className="text-2xl font-light text-white">
              Märsta <span className="font-normal">Bilhus</span>
            </div>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <div key={item.name} className="border-b border-white/10 last:border-b-0 pb-4 last:pb-0">
                  {item.dropdown ? (
                    <div>
                      {/* Main Item with Dropdown */}
                      <button
                        onClick={() => handleMobileDropdownToggle(item.name)}
                        className="w-full flex items-center justify-between py-4 px-4 text-left text-xl font-medium text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                      >
                        <span>{item.name}</span>
                        <svg 
                          className={`w-5 h-5 text-white transition-transform duration-300 ${
                            mobileActiveDropdown === item.name ? 'rotate-180' : ''
                          }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Mobile Dropdown Items */}
                      <div className={`overflow-hidden transition-all duration-400 ${
                        mobileActiveDropdown === item.name 
                          ? 'max-h-screen opacity-100 mt-4' 
                          : 'max-h-0 opacity-0'
                      }`}>
                                                 <div className="ml-4 space-y-1">
                           {item.dropdown?.map((dropdownItem, index) => {
                             const LinkComponent = dropdownItem.href.startsWith('http') ? 'a' : Link;
                             const linkProps = dropdownItem.href.startsWith('http') 
                               ? { href: dropdownItem.href, target: "_blank", rel: "noopener noreferrer" }
                               : { href: dropdownItem.href };
                             
                             return (
                               <LinkComponent
                                 key={dropdownItem.name}
                                 {...linkProps}
                                 onClick={handleLinkClick}
                                 className="group block py-4 px-5 hover:bg-white/8 transition-all duration-500 border-l-2 border-transparent hover:border-white/40"
                               >
                               <div className="flex items-center justify-between">
                                 <div className="flex-1">
                                   <div className="flex items-baseline space-x-3 mb-2">
                                     <span className="text-xs font-light text-white/40 tracking-widest uppercase">
                                       {String(index + 1).padStart(2, '0')}
                                     </span>
                                     <div className="font-medium text-white/90 tracking-tight group-hover:text-white transition-colors duration-300">
                                       {dropdownItem.name}
                                     </div>
                                   </div>
                                   {dropdownItem.description && (
                                     <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300 leading-relaxed font-light ml-6">
                                       {dropdownItem.description}
                                     </div>
                                   )}
                                 </div>
                                 <div className="flex-shrink-0 opacity-0 group-hover:opacity-60 transition-all duration-500 ml-4">
                                   <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                                   </svg>
                                 </div>
                               </div>
                             </LinkComponent>
                             );
                           })}
                         </div>
                      </div>
                    </div>
                  ) : (
                    /* Simple Navigation Item */
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      className="block py-4 px-4 text-xl font-medium text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Mobile Menu Footer */}
          <div className="border-t border-white/20 p-6">
            <div className="text-center space-y-3">
              <div className="text-sm text-white/90 font-medium">
                Auktoriserad service/skadeverkstad • Hyundai & Aixam
              </div>
              <div className="text-xs text-white/70">
                Arlandastad, Stockholm
              </div>
              <div className="flex justify-center space-x-4 pt-2">
                <a href="tel:0859120541" className="text-sm text-white/80 hover:text-white transition-colors">
                08-59 120 541
                </a>
                <span className="text-white/40">•</span>
                <a href="mailto:info@marstabilhus.se" className="text-sm text-white/80 hover:text-white transition-colors">
                  info@marstabilhus.se
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 