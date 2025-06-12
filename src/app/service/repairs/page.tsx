'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  services: {
    name: string;
    details: string[];
    icon: React.ReactNode;
  }[];
}

export default function RepairsPage() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  const serviceIcons = {
    engine: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    brakes: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    electrical: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    transmission: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    exhaust: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 002 2v6a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 00-2 2v6a2 2 0 01-2 2H9z" />
      </svg>
    ),
    suspension: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    ),
    ac: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 11-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
      </svg>
    ),
    diagnostic: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m9-9a2 2 0 012 2v6a2 2 0 01-2 2H9m12-12a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2V5z" />
      </svg>
    )
  };

  const serviceSections: ServiceSection[] = [
    {
      id: 'engine',
      title: 'Motorreparationer',
      subtitle: 'Expertservice för din motor',
      description: 'Professionell motorservice och reparationer med originaldelar och avancerad diagnostik.',
      image: '/heropics/1.jpg',
      services: [
        {
          name: 'Kamremsbyte',
          details: [
            'Kritiskt underhåll enligt serviceplanen',
            'Kamrem vs kamkedja - båda slits och behöver bytas',
            'Vattenpump byts ofta samtidigt för kostnadseffektivitet',
            'Förhindrar omfattande och dyr motorreparation'
          ],
          icon: serviceIcons.engine
        },
        {
          name: 'Motorservice & felsökning',
          details: [
            'Motorlampa - OBD-diagnostik för att hitta fel',
            '"Limp home-mode" vid motorproblem',
            'Glödstiftsbyten för dieselbilar',
            'Luftfilter och bränslefilterbyte'
          ],
          icon: serviceIcons.diagnostic
        }
      ]
    },
    {
      id: 'brakes',
      title: 'Bromssystem',
      subtitle: 'Säker och pålitlig bromsservice',
      description: 'Komplett bromsservice för optimal säkerhet och prestanda i alla väderförhållanden.',
      image: '/heropics/2.jpg',
      services: [
        {
          name: 'Bromsreparationer',
          details: [
            'Bromsbelägg och bromsskivor',
            'Bromsok och bromscylinder',
            'Bromsvätskebyte och luftning av bromssystem',
            'ABS-systemfelsökning och reparation',
            'Vid normalt slitage: 3 beläggbyten per bromsskivbyte'
          ],
          icon: serviceIcons.brakes
        }
      ]
    },
    {
      id: 'electrical',
      title: 'Elektriska system',
      subtitle: 'Modern elektronik och diagnostik',
      description: 'Avancerad elektronikservice för moderna fordon med komplex elektrisk utrustning.',
      image: '/heropics/3.jpg',
      services: [
        {
          name: 'Startmotor & generator',
          details: [
            'Generator laddar batteri och driver elektriska system',
            'Testbänksprovning för lokalisering av fel',
            'Renovering av startmotor och generator',
            'Varningssignaler: svaga ljus, startproblem'
          ],
          icon: serviceIcons.electrical
        },
        {
          name: 'Batterier & elsystem',
          details: [
            'Batteritest och laddningskontroll',
            'Felsökning av elektriska problem',
            'Kabel- och anslutningsreparationer'
          ],
          icon: serviceIcons.electrical
        }
      ]
    },
    {
      id: 'transmission',
      title: 'Koppling & växellåda',
      subtitle: 'Precisionservice för drivlina',
      description: 'Expertservice av koppling och växellåda för smidig kraftöverföring.',
      image: '/heropics/4.jpg',
      services: [
        {
          name: 'Kopplingsreparationer',
          details: [
            'Kopplingsslirning och tröghet',
            'Manuella och automatiska växellådor',
            'Växellådsoljor och drivlinereparationer',
            'Växellåda och transmission - komplicerade system'
          ],
          icon: serviceIcons.transmission
        }
      ]
    },
    {
      id: 'exhaust',
      title: 'Avgassystem',
      subtitle: 'Miljövänlig och effektiv avgasrening',
      description: 'Komplett avgasservice för optimal prestanda och miljöpåverkan.',
      image: '/heropics/5.jpg',
      services: [
        {
          name: 'Avgasreparationer',
          details: [
            'Ljuddämpare och avgasrör',
            'Katalysatorer och lambdasonder',
            'Svetsning och reparation av avgassystem',
            'Maximal motoreffekt och lägre bränsleförbrukning'
          ],
          icon: serviceIcons.exhaust
        }
      ]
    },
    {
      id: 'suspension',
      title: 'Styrning & upphängning',
      subtitle: 'Komfort och köregenskaper',
      description: 'Professionell service av chassi och fjädringssystem för optimal väghållning.',
      image: '/heropics/6.jpg',
      services: [
        {
          name: 'Styrsystem',
          details: [
            'Styrservovätska och inspektion av rör',
            'Styrled och styrväxel',
            'Hjulinställning påverkas av försummelse'
          ],
          icon: serviceIcons.suspension
        },
        {
          name: 'Fjädring & stötdämpare',
          details: [
            'Påverkar väghållning och bromsfunktion',
            'Fjädrar, stötdämpare, spindelleder och länkarmar',
            'Felsökning av skakig och ojämn körning'
          ],
          icon: serviceIcons.suspension
        }
      ]
    }
  ];

  const specialServices = [
    {
      title: 'AC-service',
      description: 'Klimatanläggning',
      details: [
        'Påfyllning av köldmedium',
        'System arbetar med tryck upp till 20 bar',
        'Temperaturer från under 0 till 80 grader',
        'Regelbunden service för optimal funktion'
      ],
      icon: serviceIcons.ac
    },
    {
      title: 'Felsökning & diagnostik',
      description: 'Modern diagnostikutrustning',
      details: [
        'Grundlig kontroll utifrån kundens beskrivning',
        'Modern diagnostikutrustning för alla bilmärken',
        'OBD-läsning av felkoder'
      ],
      icon: serviceIcons.diagnostic
    },
    {
      title: 'Besiktningsreparationer',
      description: 'Ackrediterad verkstad',
      details: [
        'Släcka 2:or från besiktning',
        'Ackrediterad verkstad för besiktningsåtgärder'
      ],
      icon: serviceIcons.diagnostic
    }
  ];

  const maintenanceServices = [
    {
      title: 'Förebyggande underhåll',
      details: [
        'Regelbunden motorservice för att undvika dyra skador',
        'Byte av slitdelar enligt serviceintervaller',
        'Oljeservice och filtertjänster'
      ]
    },
    {
      title: 'Hjullager & upphängning',
      details: [
        'Hjullagerbyte',
        'Kulleder och länkarmsbyten',
        'Spindelleder och fjädringskomponenter'
      ]
    },
    {
      title: 'Elbilsservice',
      details: [
        'Specialkompetens för högspänningsarbeten',
        'Chassikontroll på grund av extra vikt från batterier',
        'Underredeskontroll för batterisskador'
      ]
    }
  ];

  const guarantees = [
    {
      title: '3 års garanti',
      description: 'På reparationer och reservdelar'
    },
    {
      title: '12 månaders assistans',
      description: 'Assistansförsäkring vid service'
    },
    {
      title: 'Fast pris',
      description: 'Innan arbete påbörjas'
    },
    {
      title: 'Transparenta priser',
      description: 'Utan dolda kostnader'
    }
  ];

  const warningSignals = [
    'Ovanliga ljud från motorn eller chassit',
    'Varningslampor i instrumentbrädan',
    'Minskad prestanda eller högre bränsleförbrukning',
    'Ovanliga lukter från bilen',
    'Förändrat körbeteende eller vibrationer',
    'Startproblem eller ojämn tomgång'
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
      );

      // Content sections animation
      gsap.fromTo(".service-section", 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Service cards animation
      gsap.fromTo(".service-card", 
        { opacity: 0, y: 30, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6, 
          stagger: 0.1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".service-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/heropics/1.jpg"
            alt="Professionell bilreparation"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/60"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 leading-tight">
            Reparation &
            <br />
            <span className="font-normal">Underhåll</span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-light mb-8 max-w-3xl mx-auto leading-relaxed">
            Alla tjänster för din bil under ett tak
            <br className="hidden sm:block" />
            Professionell service med moderna verktyg
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              Boka reparation
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-black">
              Ring för akut hjälp
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div ref={contentRef} className="relative">
        {/* Service Sections */}
        {serviceSections.map((section, index) => (
          <section 
            key={section.id}
            className={`service-section min-h-screen flex items-center py-20 ${
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Content */}
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-4">
                      {section.title}
                    </h2>
                    <p className="text-xl md:text-2xl font-light text-gray-600 mb-6">
                      {section.subtitle}
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {section.description}
                    </p>
                  </div>

                  {/* Services */}
                  <div className="space-y-6">
                    {section.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white">
                            {service.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-medium text-gray-900 mb-3">
                              {service.name}
                            </h3>
                            <ul className="space-y-2">
                              {service.details.map((detail, detailIndex) => (
                                <li key={detailIndex} className="flex items-start space-x-2">
                                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                  <span className="text-gray-700 leading-relaxed">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image */}
                <div className={`relative h-96 lg:h-[600px] rounded-2xl overflow-hidden ${
                  index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''
                }`}>
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Special Services */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6">
                Specialtjänster
              </h2>
              <p className="text-xl md:text-2xl font-light text-gray-300 max-w-3xl mx-auto">
                Avancerade tjänster för moderna fordon
              </p>
            </div>

            <div className="service-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specialServices.map((service, index) => (
                <div key={index} className="service-card bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mb-6 font-light">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start space-x-3">
                        <span className="w-1.5 h-1.5 bg-white/60 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-gray-300 leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Maintenance Services */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-6">
                Underhållstjänster
              </h2>
              <p className="text-xl md:text-2xl font-light text-gray-600 max-w-3xl mx-auto">
                Förebyggande underhåll för längre livslängd
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {maintenanceServices.map((service, index) => (
                <div key={index} className="service-card bg-gray-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-medium text-gray-900 mb-6">
                    {service.title}
                  </h3>
                  <ul className="space-y-3">
                    {service.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start space-x-3">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700 leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Warning Signals */}
        <section className="py-20 bg-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-6">
                  När behöver du
                  <br />
                  <span className="font-normal text-red-600">reparation?</span>
                </h2>
                <p className="text-xl font-light text-gray-600 mb-8">
                  Kom ihåg att agera snabbt vid dessa varningssignaler för att undvika större skador.
                </p>
                <Button variant="primary" size="lg">
                  Kontakta oss nu
                </Button>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-medium text-gray-900 mb-6">
                  Varningssignaler:
                </h3>
                <ul className="space-y-4">
                  {warningSignals.map((signal, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      </div>
                      <span className="text-gray-700 leading-relaxed">{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantees */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6">
                Garantier &
                <br />
                <span className="font-normal">Trygghet</span>
              </h2>
              <p className="text-xl md:text-2xl font-light text-gray-300 max-w-3xl mx-auto">
                Din trygghet är vår prioritet
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {guarantees.map((guarantee, index) => (
                <div key={index} className="service-card text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">
                    {guarantee.title}
                  </h3>
                  <p className="text-gray-300 font-light">
                    {guarantee.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-6">
              Redo att boka
              <br />
              <span className="font-normal">service?</span>
            </h2>
            <p className="text-xl md:text-2xl font-light text-gray-600 mb-10 max-w-2xl mx-auto">
              Kontakta oss idag för professionell bilservice och reparationer
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="xl">
                Boka tid online
              </Button>
              <Button variant="outline" size="xl">
                Ring oss: 08-123 456
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 