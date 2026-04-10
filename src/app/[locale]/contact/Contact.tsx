'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import Button from '@/components/Button';

interface ContactMethod {
  title: string;
  description: string;
  value: string;
  href: string;
  icon: React.ReactNode;
  available: string;
}

const contactMethods: ContactMethod[] = [
  {
    title: 'Telefon',
    description: 'Ring oss direkt för snabb hjälp',
    value: '08-59 120 541',
    href: 'tel:08-59120541',
    available: 'Mån-Fre 09:00-18:00, Lör 11:00-15:00',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    )
  },
  {
    title: 'Mobil',
    description: 'Verkstad & service',
    value: '0700 92 94 34',
    href: 'tel:0700929434',
    available: 'Vardagar 08:00-19:00',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: 'E-post',
    description: 'Skicka oss ett meddelande',
    value: 'kundservice@marstabilhus.se',
    href: 'mailto:kundservice@marstabilhus.se',
    available: 'Svarar inom 24 timmar',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: 'Besök oss',
    description: 'Maskingatan 12, Arlandastad',
    value: 'Hitta hit',
    href: '/contact/location',
    available: 'Vardagar 09:00-18:00',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  }
];

export default function ContactPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const contactMethodsRef = useRef<HTMLDivElement>(null);
  const businessInfoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set([headerRef.current, contactMethodsRef.current, businessInfoRef.current], {
      opacity: 0,
      y: 30
    });

    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    })
    .to(contactMethodsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6")
    .to(businessInfoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4");
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Header */}
      <div ref={headerRef} className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
              Kontakta <span className="font-normal">Oss</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Vi finns här för att hjälpa dig med allt från bilservice till bilköp. 
              Hör av dig så svarar vi så snart vi kan.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Snabbt svar</h3>
                <p className="text-sm text-gray-600">Inom 24 timmar</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Personlig service</h3>
                <p className="text-sm text-gray-600">Skräddarsydda lösningar</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Expertkunskap</h3>
                <p className="text-sm text-gray-600">20+ års erfarenhet</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div ref={contactMethodsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
            Flera sätt att <span className="font-normal">nå oss</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Välj det sätt som passar dig bäst. Vi finns tillgängliga på flera kanaler.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 p-6">
              <div className="text-gray-600 mb-4">
                {method.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {method.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {method.description}
              </p>
              <div className="mb-4">
                {method.href.startsWith('/') ? (
                  <Link href={method.href}>
                    <Button variant="outline" size="sm" className="w-full">
                      {method.value}
                    </Button>
                  </Link>
                ) : (
                  <a href={method.href}>
                    <Button variant="outline" size="sm" className="w-full">
                      {method.value}
                    </Button>
                  </a>
                )}
              </div>
              <p className="text-xs text-gray-500">
                {method.available}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Business Information */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={businessInfoRef} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
              Våra kontaktuppgifter
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Vi finns här för dig! Kontakta oss direkt via telefon eller e-post för snabb hjälp.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Opening Hours */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Öppettider</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Måndag - Fredag</span>
                  <span className="font-medium">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lördag</span>
                  <span className="font-medium">11:00 - 15:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Söndag</span>
                  <span className="font-medium">Stängt</span>
                </div>
                <hr className="border-gray-200" />
                <div className="text-sm text-gray-500">
                  Lunch: 12:00 - 13:00 vardagar
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Hitta till oss</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">Märsta Bilhus</p>
                  <p className="text-gray-600">Maskingatan 12</p>
                  <p className="text-gray-600">195 60 Arlandastad</p>
                </div>
                <div className="text-sm text-gray-500">
                  <p>• 3 mil från Stockholm</p>
                  <p>• Nära Arlanda flygplats</p>
                  <p>• Gratis parkering</p>
                </div>
                <Link href="/contact/location">
                  <Button variant="outline" size="sm" className="w-full">
                    Se karta & vägbeskrivning
                  </Button>
                </Link>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Akuta ärenden</h3>
              <p className="text-red-700 text-sm mb-4">
                För brådskande bilproblem eller om du behöver direkt hjälp:
              </p>
              <a href="tel:0700929433">
                <Button variant="outline" size="sm" className="w-full border-red-300 text-red-700 hover:bg-red-100">
                  Ring 0700 92 94 33
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}