'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Button from '@/components/Button';

gsap.registerPlugin(ScrollTrigger);

export default function BilbesiktningPage() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Hero animations
    gsap.set([titleRef.current, descriptionRef.current, heroImageRef.current], {
      opacity: 0,
      y: 40
    });

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out"
    })
    .to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.8")
    .to(heroImageRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out"
    }, "-=0.6");

    // Animate sections on scroll
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        gsap.fromTo(section, {
          opacity: 0,
          y: 60
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });
      }
    });

    // CTA animation
    if (ctaRef.current) {
      gsap.fromTo(ctaRef.current, {
        opacity: 0,
        y: 40
      }, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const checklistSections = [
    {
      id: 'safety',
      title: 'Säkerhetsystem & belysning',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      items: [
        'Strålkastare, blinkers och bromsljus',
        'Reflexer och backspeglar',
        'Registreringsskyltens lampa',
        'Varnings- och kontrollampor',
        'Signalanordning (tuta)',
        'Varningstriangel (ska finnas i bilen)',
        'Säkerhetsbälten fram och bak',
        'Krockkudde och varningsmärken',
        'Startspärr för automatväxel'
      ]
    },
    {
      id: 'wheels',
      title: 'Däck & hjulsystem',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      items: [
        'Mönsterdjup minst 1,6 mm sommardäck, 3 mm vinterdäck',
        'Däck utan skador',
        'Kontroll att hjulen är rätt monterade',
        'Hjulen sitter fast ordentligt'
      ]
    },
    {
      id: 'brakes',
      title: 'Bromssystem',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      items: [
        'Bromsarna fungerar lika bra på båda sidor',
        'Tillräcklig bromskraft',
        'Avstånd mellan bromspedal och golv',
        'Parkeringsbromsen fungerar',
        'Bromsvätskans nivå'
      ]
    },
    {
      id: 'structure',
      title: 'Kaross & struktur',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      items: [
        'Stommen inte rostig eller skadad',
        'Balkar, fästen och synliga bromssdelar',
        'Karossens ut- och insida utan vassa kanter',
        'Dörrar och huvlåsning'
      ]
    },
    {
      id: 'environment',
      title: 'Miljökontroll',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      items: [
        'Bensindrivna bilar från 2002, dieseldrivna från 2004',
        'Elektronisk miljökontroll (OBD-kontroll)',
        'Koloxid (CO) och kolväten (HC) på bensinbilar',
        'Dieselfordon - röktäthet i avgaser',
        'Lambdavärde och bullernivå'
      ]
    },
    {
      id: 'engine',
      title: 'Motor & drivlina',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      items: [
        'Kontroll att det inte läcker bränsle',
        'Oljenivå i motorn',
        'Batteriet sitter fast ordentligt',
        'Motor och växellåda sitter fast och läcker inte olja',
        'Hjulupphängning och styrsystem',
        'Fjädring och stötdämpning',
        'Drivknutar och drivaxlar'
      ]
    },
    {
      id: 'interior',
      title: 'Inredning & komfort',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      items: [
        'Vindrutetorkare och spolare',
        'Ratt och förarsäte',
        'Vindruta utan skador',
        'Hastighetsmätare'
      ]
    },
    {
      id: 'special',
      title: 'Specialutrustning & provkörning',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      items: [
        'Löstagbar dragkrok (ta med nyckel)',
        'Gasinstallation och läckagekontroll',
        'Lastsäkringsutrustning',
        'Kontroll av bromsar, hastighetsmätare, signalanordning',
        'Vindrutetorkare och vindrutespolare',
        'Slutlig bedömning av skick och körbarhet'
      ]
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <span className="text-xs font-light tracking-[0.2em] text-gray-500 uppercase mb-6 block">
                Bilbesiktning
              </span>
              
              <h1 
                ref={titleRef}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-gray-900 mb-8 leading-[0.9]"
              >
                Professionell
                <br />
                <span className="font-normal">bilbesiktning</span>
              </h1>
              
              <div className="w-16 h-[1px] bg-gray-900 mb-8"></div>
              
              <p 
                ref={descriptionRef}
                className="text-lg sm:text-xl font-light text-gray-600 mb-8 leading-relaxed"
              >
                Auktoriserad bilprovning med modern utrustning och certifierade besiktningsmän. 
                Vi genomför noggranna kontroller enligt Transportstyrelsens krav för att säkerställa 
                att din bil är säker och miljövänlig.
              </p>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-6 text-sm font-light text-gray-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                    <span>Auktoriserad besiktningsstation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                    <span>Certifierade besiktningsmän</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                    <span>Modern testutrustning</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-8">
                <Button variant="primary" size="lg" className="group">
                  <span>Boka besiktning</span>
                  <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Image Side */}
            <div ref={heroImageRef} className="order-1 lg:order-2">
              <div className="relative h-96 sm:h-[500px] lg:h-[600px] bg-gray-200 border border-gray-300 rounded-none overflow-hidden">
                <Image
                  src="/heropics/3.jpg"
                  alt="Bilbesiktning på Märsta Bilhus"
                  fill
                  className="object-cover"
                  quality={90}
                  priority
                />
                {/* Overlay for better contrast */}
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspection Intervals Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={addToRefs} className="text-center mb-16">
            <span className="text-xs font-light tracking-[0.2em] text-gray-500 uppercase mb-4 block">
              Besiktningsintervaller
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6 tracking-tight text-gray-900">
              När ska bilen besiktigas?
            </h2>
            <div className="w-16 h-[1px] bg-gray-900 mx-auto mb-8"></div>
            <p className="text-lg font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Besiktningsintervaller beror på bilens ålder och användning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white border border-gray-200 p-8 hover:shadow-xl transition-all duration-500">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                  <span className="text-2xl font-light text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-4 tracking-tight">Första besiktning</h3>
                <p className="text-3xl font-light text-gray-900 mb-2">36</p>
                <p className="text-sm font-light text-gray-500 tracking-wide uppercase">månader efter ibruktagande</p>
              </div>
            </div>

            <div className="group bg-gray-900 text-white border border-gray-900 p-8 hover:shadow-xl transition-all duration-500">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors duration-300">
                  <span className="text-2xl font-light text-white">2</span>
                </div>
                <h3 className="text-xl font-light text-white mb-4 tracking-tight">Andra besiktning</h3>
                <p className="text-3xl font-light text-white mb-2">24</p>
                <p className="text-sm font-light text-white/70 tracking-wide uppercase">månader efter första</p>
              </div>
            </div>

            <div className="group bg-white border border-gray-200 p-8 hover:shadow-xl transition-all duration-500">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6 group-hover:bg-green-100 transition-colors duration-300">
                  <span className="text-2xl font-light text-green-600">∞</span>
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-4 tracking-tight">Därefter</h3>
                <p className="text-3xl font-light text-gray-900 mb-2">14</p>
                <p className="text-sm font-light text-gray-500 tracking-wide uppercase">månader mellan besiktningar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspection Checklist Sections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={addToRefs} className="text-center mb-20">
            <span className="text-xs font-light tracking-[0.2em] text-gray-500 uppercase mb-4 block">
              Kontrollpunkter
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6 tracking-tight text-gray-900">
              Vad kontrolleras vid besiktning?
            </h2>
            <div className="w-16 h-[1px] bg-gray-900 mx-auto mb-8"></div>
            <p className="text-lg font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">
              En fullständig genomgång av alla säkerhets- och miljökritiska system
            </p>
          </div>

          <div className="space-y-16">
            {checklistSections.map((section, index) => (
              <div key={section.id} ref={addToRefs} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                      <div className="text-gray-600">
                        {section.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-light text-gray-900 tracking-tight">
                      {section.title}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start">
                        <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-4 flex-shrink-0"></div>
                        <p className="text-base font-light text-gray-600 leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="relative h-64 sm:h-80 lg:h-96 bg-gray-100 border border-gray-200 overflow-hidden">
                    <Image
                      src="/heropics/4.jpg"
                      alt={section.title}
                      fill
                      className="object-cover"
                      quality={80}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-32 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/heropics/2.jpg"
            alt="Märsta Bilhus"
            fill
            className="object-cover opacity-20"
            quality={90}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-light tracking-[0.2em] text-gray-400 uppercase mb-4 block">
            Boka idag
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6 tracking-tight">
            Professionell bilbesiktning
          </h2>
          <div className="w-16 h-[1px] bg-white mx-auto mb-8"></div>
          <p className="text-xl font-light text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Auktoriserad besiktningsstation med certifierade besiktningsmän och modern utrustning
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 group">
              <span>Boka besiktning</span>
              <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
              Ring oss: 08-123 456
            </Button>
          </div>
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-sm font-light text-gray-400">
              Öppet vardagar 7:00-17:00 • Lördagar 8:00-14:00
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}