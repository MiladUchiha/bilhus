
'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';

interface ServiceOffering {
  title: string;
  description: string;
  features: string[];
  image: string;
  href: string;
  icon: React.ReactNode;
  price?: string;
  duration?: string;
}

const services: ServiceOffering[] = [
  {
    title: 'Hyundai Originalservice',
    description: 'Auktoriserad service med originaldelar och certifierade tekniker enligt Hyundais serviceprogram.',
    features: [
      'Originaldelar från Hyundai',
      'Certifierade tekniker',
      'Garantibevarande service',
      'Servicehistorik i Hyundai-system',
      'Maskindiagnostik',
      '24 månaders garanti på utfört arbete'
    ],
    image: '/1349/original.jpg',
    href: '/service/hyundai',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    price: 'Kontakta oss för pris',
    duration: 'Enligt serviceprogram'
  },
  {
    title: 'Allmän Bilservice',
    description: 'Professionell service för alla bilmärken med hög kvalitet och konkurrenskraftiga priser.',
    features: [
      'Service för alla märken',
      'Kvalitetsdelar från kända leverantörer',
      'Erfarna tekniker',
      'Transparent prissättning',
      'Digital rapport',
      '12 månaders garanti'
    ],
    image: '/1349/verkstad.jpg',
    href: '/service/general',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    price: 'Kontakta oss för pris',
    duration: 'Enligt behov'
  },
  
  {
    title: 'Däck & Fälgar',
    description: 'Komplett däckservice med däckbyte, balansering, hjulinställning och förvaring.',
    features: [
      'Däckbyte sommar/vinter',
      'Hjulbalansering',
      'Hjulinställning',
      'Däckförvaring',
      'Fälgreparationer',
      'Däcktryckskontroll'
    ],
    image: '/1349/SoMe - Hjulskifte Video Höst/Vinter.mp4',
    href: '/service/tires',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    price: 'Kontakta oss för pris',
    duration: 'Snabb service'
  },
  {
    title: 'Reparationer & Underhåll',
    description: 'Kompletta reparationer och förebyggande underhåll för att hålla din bil i toppskick.',
    features: [
      'Motorreparationer',
      'Bromssystem',
      'Växellådor',
      'Avgassystem',
      'Klimatanläggning',
      'Elektriska system'
    ],
    image: '/1349/repair.jpg',
    href: '/service/repairs',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    price: 'Offert på begäran',
    duration: 'Varierar'
  }
];

export default function ServicePage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set([headerRef.current, introRef.current, servicesRef.current, ctaRef.current], {
      opacity: 0,
      y: 30
    });

    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    })
    .to(introRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6")
    .to(servicesRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")
    .to(ctaRef.current, {
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
              Service & <span className="font-normal">Verkstad</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Professionell bilservice för alla märken i moderna faciliteter nära Arlanda. 
              Auktoriserad Hyundai med expertis och kvalitet i fokus.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Snabb service</h3>
                <p className="text-sm text-gray-600">Oftast samma dag eller inom 24h</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Kvalitetsgaranti</h3>
                <p className="text-sm text-gray-600">12-24 månaders garanti på arbete</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Transparent info</h3>
                <p className="text-sm text-gray-600">Tydlig kommunikation och priser</p>
              </div>
            </div>
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Kontakta oss för bokning
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Service Intro */}
      <div ref={introRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-6">
              Modern verkstad med <span className="font-normal">expertis</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Vår verkstad är utrustad med den senaste tekniken och våra tekniker har 
              mångårig erfarenhet av bilreparationer. Vi arbetar med alla bilmärken 
              och är auktoriserade för Hyundai originalservice.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Auktoriserad Hyundai-verkstad</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Certifierade tekniker</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Modern utrustning och diagnosverktyg</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Miljövänliga arbetsmetoder</span>
              </div>
            </div>
            <Link href="/about/workshop">
              <Button variant="outline" size="lg">
                Se vår verkstad
              </Button>
            </Link>
          </div>
          <div className="relative">
            <Image
              src="/1349/original.jpg"
              alt="Märsta Bilhus verkstad"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div ref={servicesRef} className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
              Våra <span className="font-normal">Tjänster</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Vi erbjuder ett komplett utbud av biltjänster för att hålla din bil i perfekt skick.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {service.image.endsWith('.mp4') ? (
                    <video
                      src={service.image}
                      autoPlay
                      loop
                      muted
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full">
                    <div className="text-gray-700">
                      {service.icon}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                    {service.features.length > 3 && (
                      <p className="text-sm text-gray-500">
                        +{service.features.length - 3} fler fördelar
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                    {service.price && (
                      <span className="font-medium">{service.price}</span>
                    )}
                    {service.duration && (
                      <span>{service.duration}</span>
                    )}
                  </div>
                  
                  <Link href={service.href}>
                    <Button variant="primary" size="md" className="w-full">
                      Läs mer
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking CTA */}
      <div ref={ctaRef} className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-light mb-6">
            Behöver din bil service?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Boka tid online eller ring oss direkt. Vi erbjuder flexibla tider 
            och kan ofta ta emot din bil samma dag.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="hero" size="lg">
                Kontakta oss för bokning
              </Button>
            </Link>
            <a href="tel:+46859120541">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
                Ring 08 591 205 41
              </Button>
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-semibold mb-2">Öppettider</h3>
              <p className="text-gray-300 text-sm">
                Mån-Fre: 07:30-16:30<br />
                Lör-Sön: Stängt<br />
                Verkstadstider
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Plats</h3>
              <p className="text-gray-300 text-sm">
                Maskingatan 12<br />
                195 60 Arlandastad<br />
                3 mil från Stockholm
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Kontakt</h3>
              <p className="text-gray-300 text-sm">
                Verkstad: 08 591 205 41<br />
                Bilförsäljning: 0700 929 433<br />
                info@marstabilhus.se
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}