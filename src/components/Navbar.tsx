'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

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

  // Navigation items
  const navItems: NavItem[] = [
    { name: 'Startsida', href: '/' },
    { 
      name: 'Bilar', 
      href: '/cars',
      dropdown: [
        { 
          name: 'Nya bilar', 
          href: '/cars/new',
          description: 'Senaste modellerna från Hyundai',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )
        },
        { 
          name: 'Begagnade bilar', 
          href: '/cars/used',
          description: 'Kvalitetsgranskade begagnade fordon',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          )
        },
        { 
          name: 'Hyundai modeller', 
          href: '/cars/hyundai',
          description: 'i10, i20, i30, Kona, Tucson, Santa Fe, IONIQ',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        },
        { 
          name: 'Aixam mopedbilar', 
          href: '/cars/aixam',
          description: 'Körkortsfria alternativ för alla åldrar',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          )
        },
        { 
          name: 'Finansiering & leasing', 
          href: '/cars/financing',
          description: 'Flexibla betalningslösningar',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          )
        },
        { 
          name: 'Sälja bil till oss', 
          href: '/cars/sell',
          description: 'Vi köper din bil till bästa pris',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        }
      ]
    },
    { 
      name: 'Service & Verkstad', 
      href: '/service',
      dropdown: [
        { 
          name: 'Hyundai originalservice', 
          href: '/service/hyundai',
          description: 'Auktoriserad service med originaldelar',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        },
        { 
          name: 'Allmän bilservice', 
          href: '/service/general',
          description: 'Service för alla bilmärken',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          )
        },
        { 
          name: 'Besiktning', 
          href: '/service/inspection',
          description: 'Bilprovning och kontrollbesiktning',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m9-9a2 2 0 012 2v6a2 2 0 01-2 2H9m12-12a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2V5z" />
            </svg>
          )
        },
        { 
          name: 'Däck & fälgar', 
          href: '/service/tires',
          description: 'Däckbyte, balansering och hjulinställning',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          )
        },
        { 
          name: 'Reparationer & underhåll', 
          href: '/service/repairs',
          description: 'Komplett bilverkstad med expertteknikiker',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )
        },
        { 
          name: 'Boka tid online', 
          href: '/service/booking',
          description: 'Snabb och enkel tidsbokning',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )
        }
      ]
    },
    { 
      name: 'Tjänster', 
      href: '/services',
      dropdown: [
        { 
          name: 'Billån & finansiering', 
          href: '/services/loans',
          description: 'Konkurrenskraftiga billån',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          )
        },
        { 
          name: 'Försäkring', 
          href: '/services/insurance',
          description: 'Bilförsäkring genom våra partners',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          )
        },
        { 
          name: 'Värdering av bil', 
          href: '/services/valuation',
          description: 'Få en rättvis värdering av din bil',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        },
        { 
          name: 'Hemkörning', 
          href: '/services/delivery',
          description: 'Vi levererar bilen till dig',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )
        },
        { 
          name: 'Garantier', 
          href: '/services/warranties',
          description: 'Utökade garantier och skydd',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          )
        },
        { 
          name: 'Inbyte', 
          href: '/services/trade-in',
          description: 'Byt in din nuvarande bil',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          )
        }
      ]
    },
    { 
      name: 'Om oss', 
      href: '/about',
      dropdown: [
        { 
          name: 'Vår verkstad', 
          href: '/about/workshop',
          description: 'Modern utrustning och faciliteter',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          )
        },
        { 
          name: 'Hyundai auktorisation', 
          href: '/about/authorization',
          description: 'Officiell Hyundai-partner',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        },
        { 
          name: 'Personal & expertis', 
          href: '/about/staff',
          description: 'Erfarna och certifierade tekniker',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          )
        },
        { 
          name: 'Varför välja oss', 
          href: '/about/why-us',
          description: 'Vad som gör oss unika',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          )
        },
        { 
          name: 'Miljötänk', 
          href: '/about/environment',
          description: 'Vårt miljöengagemang',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          )
        }
      ]
    },
    { 
      name: 'Kontakt', 
      href: '/contact',
      dropdown: [
        { 
          name: 'Hitta hit', 
          href: '/contact/location',
          description: 'Vägbeskrivning och karta',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )
        },
        { 
          name: 'Öppettider', 
          href: '/contact/hours',
          description: 'När vi har öppet',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        },
        { 
          name: 'Ring oss', 
          href: '/contact/phone',
          description: 'Direktkontakt per telefon',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          )
        },
        { 
          name: 'Offertförfrågan', 
          href: '/contact/quote',
          description: 'Be om kostnadsfri offert',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )
        }
      ]
    }
  ];

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
                  isScrolled ? 'text-gray-900 hover:text-gray-700' : 'text-white hover:text-white/90'
                }`}
                style={{
                  textShadow: isScrolled ? 'none' : '2px 2px 8px rgba(0,0,0,0.8)'
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
                        isScrolled ? 'text-gray-900 hover:text-gray-700' : 'text-white hover:text-white/80'
                      } cursor-pointer`}
                      style={{
                        textShadow: isScrolled ? 'none' : '2px 2px 4px rgba(0,0,0,0.8)'
                      }}
                    >
                      {item.name}
                      <svg 
                        className={`ml-2 w-4 h-4 transition-all duration-300 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        } ${isScrolled ? 'text-gray-900' : 'text-white'}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        style={{
                          filter: isScrolled ? 'none' : 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8))'
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-sm xl:text-base font-medium transition-all duration-300 hover:scale-105 ${
                        isScrolled ? 'text-gray-900 hover:text-gray-700' : 'text-white hover:text-white/80'
                      }`}
                      style={{
                        textShadow: isScrolled ? 'none' : '2px 2px 4px rgba(0,0,0,0.8)'
                      }}
                      onClick={handleLinkClick}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Desktop Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div 
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-96 bg-white/98 backdrop-blur-3xl border border-gray-200/30 rounded-2xl shadow-2xl z-50 overflow-hidden"
                      style={{
                        backdropFilter: 'blur(40px) saturate(180%)',
                        boxShadow: '0 20px 40px -8px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2)'
                      }}
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleDropdownMouseLeave}
                    >
                      {/* Dropdown Header */}
                      <div className="px-6 py-5 bg-gradient-to-r from-gray-50/90 to-white/90 border-b border-gray-100/40">
                        <h3 className="text-lg font-light text-gray-900 tracking-tight">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 font-light">
                          {item.name === 'Bilar' && 'Nya och begagnade fordon'}
                          {item.name === 'Service & Verkstad' && 'Professionell bilservice'}
                          {item.name === 'Tjänster' && 'Kompletterande tjänster'}
                          {item.name === 'Om oss' && 'Lär känna oss bättre'}
                          {item.name === 'Kontakt' && 'Kom i kontakt med oss'}
                        </p>
                      </div>

                      {/* Dropdown Items */}
                      <div className="py-3 max-h-96 overflow-y-auto">
                        {item.dropdown.map((dropdownItem, index) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            onClick={handleLinkClick}
                            className="group relative block mx-3 px-5 py-4 hover:bg-gray-50/70 transition-all duration-300 border-l-2 border-transparent hover:border-gray-900 rounded-r-xl"
                          >
                            <div className="flex items-start space-x-4">
                              {/* Icon */}
                              <div className="flex-shrink-0 mt-1">
                                <div className="w-7 h-7 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300">
                                  <div className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300 scale-90">
                                    {dropdownItem.icon}
                                  </div>
                                </div>
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-baseline justify-between mb-1">
                                  <h4 className="font-medium text-gray-900 tracking-tight group-hover:text-black transition-colors duration-300 text-base">
                                    {dropdownItem.name}
                                  </h4>
                                  <span className="text-xs font-light text-gray-400 ml-2 group-hover:text-gray-600 transition-colors duration-300 tracking-wider">
                                    {String(index + 1).padStart(2, '0')}
                                  </span>
                                </div>
                                {dropdownItem.description && (
                                  <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed font-light">
                                    {dropdownItem.description}
                                  </p>
                                )}
                              </div>

                              {/* Arrow */}
                              <div className="flex-shrink-0 opacity-0 group-hover:opacity-60 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Dropdown Footer */}
                      <div className="px-6 py-4 bg-gradient-to-r from-gray-50/90 to-white/90 border-t border-gray-100/40">
                        <p className="text-xs text-gray-400 text-center font-light tracking-wide">
                          {item.name === 'Bilar' && 'Auktoriserad Hyundai & Aixam återförsäljare'}
                          {item.name === 'Service & Verkstad' && 'Certifierad verkstad med 24h garanti'}
                          {item.name === 'Tjänster' && 'Allt för din bil på ett ställe'}
                          {item.name === 'Om oss' && 'Över 20 års erfarenhet av bilbranschen'}
                          {item.name === 'Kontakt' && 'Vi finns här för att hjälpa dig'}
                        </p>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden relative w-10 h-10 flex flex-col justify-center items-center space-y-1.5 z-50"
              aria-label="Toggle menu"
            >
              <span 
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
                style={{
                  boxShadow: '0 0 4px rgba(0,0,0,0.8)'
                }}
              />
              <span 
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
                style={{
                  boxShadow: '0 0 4px rgba(0,0,0,0.8)'
                }}
              />
              <span 
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
                style={{
                  boxShadow: '0 0 4px rgba(0,0,0,0.8)'
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
                           {item.dropdown?.map((dropdownItem, index) => (
                             <Link
                               key={dropdownItem.name}
                               href={dropdownItem.href}
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
                             </Link>
                           ))}
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
                Auktoriserad service • Hyundai & Aixam
              </div>
              <div className="text-xs text-white/70">
                Arlandastad, Stockholm
              </div>
              <div className="flex justify-center space-x-4 pt-2">
                <a href="tel:08-123456" className="text-sm text-white/80 hover:text-white transition-colors">
                  08-123 456
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