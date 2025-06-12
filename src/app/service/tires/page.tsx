'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Button from '@/components/Button';

gsap.registerPlugin(ScrollTrigger);

export default function TiresPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const tireServicesRef = useRef<HTMLElement>(null);
  const tpmsRef = useRef<HTMLElement>(null);
  const wheelServicesRef = useRef<HTMLElement>(null);
  const alignmentRef = useRef<HTMLElement>(null);
  const storageRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation with staggered entrance
    const tl = gsap.timeline();
    
    gsap.set([heroRef.current, imageRef.current], {
      opacity: 0,
      y: 30
    });

    tl.to(heroRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out"
    })
    .to(imageRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.6");

    // Scroll-triggered animations for sections
    const sections = [tireServicesRef.current, tpmsRef.current, wheelServicesRef.current, alignmentRef.current, storageRef.current, ctaRef.current];
    
    sections.forEach((section) => {
      if (section) {
        gsap.fromTo(section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            
            {/* Content Side */}
            <div ref={heroRef} className="space-y-8">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-xs font-light tracking-[0.2em] text-gray-400 uppercase">
                    Service & Verkstad
                  </span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-gray-900 leading-[0.9]">
                  Däck &
                  <br />
                  <span className="font-normal text-gray-600">Fälgar</span>
                </h1>
                
                <div className="w-16 h-[1px] bg-gray-900"></div>
                
                <p className="text-xl sm:text-2xl font-light text-gray-600 leading-relaxed max-w-xl">
                  Kompletta tjänster för däck, fälgar och hjulinställning med modern utrustning
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-6 text-sm font-light text-gray-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                    <span>TPMS-certifierade</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                    <span>Professionell balansering</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                    <span>Däckförvaring</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <Button variant="primary" size="lg" className="group">
                  <span>Boka däckservice</span>
                  <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Image Side */}
            <div ref={imageRef} className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/heropics/4.jpg"
                  alt="Märsta Bilhus däckservice"
                  fill
                  className="object-cover"
                  quality={95}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Info Card */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-xl shadow-2xl p-6 max-w-xs">
                <div className="text-center">
                  <div className="text-2xl font-light text-gray-900 mb-1">15-30</div>
                  <div className="text-sm font-light text-gray-600">minuter däckbyte</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tire Services */}
      <section ref={tireServicesRef} className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-xs font-light tracking-[0.2em] text-gray-400 uppercase mb-4 block">
              Däckservice
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
              Professionell Däckservice
            </h2>
            <div className="w-16 h-[1px] bg-gray-900 mx-auto mb-6"></div>
            <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Säsongsskifte, montering, balansering och reparationer
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Seasonal Change */}
            <div className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">Säsongsskifte</h3>
              <ul className="space-y-3 text-sm font-light text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Sommar/vinter från 249 kr
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Säkerhetskontroll vid varje byte
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Mönsterdjup och lufttryck
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Efterdragning efter 5-10 mil
                </li>
              </ul>
              <div className="text-xs font-light text-gray-500 bg-gray-50 rounded-lg p-3">
                Tidsåtgång: 15-30 minuter
              </div>
            </div>

            {/* Tire Mounting & Balancing */}
            <div className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-6 group-hover:bg-green-100 transition-colors duration-300">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">Montering & Balansering</h3>
              <ul className="space-y-3 text-sm font-light text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Montering av nya däck på fälg
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Ventilbyte vid montering
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Hjulbalansering för smidig körning
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Korrekt åtdragning med momentnyckel
                </li>
              </ul>
            </div>

            {/* Tire Repair */}
            <div className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors duration-300">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">Däckreparation</h3>
              <ul className="space-y-3 text-sm font-light text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Punkteringsreparation och patchning
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Snabb och effektiv reparation
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Bedömning om däck kan lagas
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Professionell säkerhetsbedömning
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TPMS Service */}
      <section ref={tpmsRef} className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/heropics/2.jpg"
                  alt="TPMS däcktrycksövervakning"
                  fill
                  className="object-cover"
                  quality={95}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <div className="space-y-6">
                <span className="text-xs font-light tracking-[0.2em] text-gray-400 uppercase">
                  TPMS-Service
                </span>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight leading-[0.9]">
                  Däcktrycks<br />
                  <span className="font-normal text-gray-600">övervakning</span>
                </h2>
                
                <div className="w-16 h-[1px] bg-gray-900"></div>
                
                <p className="text-lg font-light text-gray-600 leading-relaxed">
                  TPMS-system är obligatoriskt på nya bilar från november 2014. Vi hanterar alla typer av sensorer och programmering.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">TPMS-system</h3>
                  <ul className="space-y-3 text-sm font-light text-gray-600">
                    <li className="flex items-start">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                      Direkta sensorer i hjulet
                    </li>
                    <li className="flex items-start">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                      Indirekta via ABS-system
                    </li>
                    <li className="flex items-start">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                      Varning vid tryckfall över 20%
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Våra tjänster</h3>
                  <ul className="space-y-3 text-sm font-light text-gray-600">
                    <li className="flex items-start">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                      Avläsning och reparation
                    </li>
                    <li className="flex items-start">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                      Programmering av nya sensorer
                    </li>
                    <li className="flex items-start">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                      Byte av sensorer (5 års livslängd)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wheel Services */}
      <section ref={wheelServicesRef} className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-xs font-light tracking-[0.2em] text-gray-400 uppercase mb-4 block">
              Fälgservice
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
              Reparation & Lackering
            </h2>
            <div className="w-16 h-[1px] bg-gray-900 mx-auto mb-6"></div>
            <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Professionell fälgreparation och lackering för alla fälgtyper
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Wheel Repair */}
            <div className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-6 group-hover:bg-orange-100 transition-colors duration-300">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">Fälgreparation</h3>
              <ul className="space-y-3 text-sm font-light text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Reparation av kantstötta fälgar
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Fälgriktning till godkända toleranser
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Svetsning av sprickor
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Diamond cut-svarvning med CNC
                </li>
              </ul>
            </div>

            {/* Wheel Painting */}
            <div className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-6 group-hover:bg-purple-100 transition-colors duration-300">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2a2 2 0 002-2V5a2 2 0 00-2-2zM9 9h12M9 15h12" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">Lackering & Finish</h3>
              <ul className="space-y-3 text-sm font-light text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Blästring för repor och korrosion
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Lackering i originalkulörer
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Pulverlackering för hållbarhet
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Klarlackering för bästa skydd
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Wheel Alignment */}
      <section ref={alignmentRef} className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <span className="text-xs font-light tracking-[0.2em] text-gray-400 uppercase">
                  Hjulinställning
                </span>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight leading-[0.9]">
                  Perfekt<br />
                  <span className="font-normal text-gray-600">hjulgeometri</span>
                </h2>
                
                <div className="w-16 h-[1px] bg-gray-900"></div>
                
                <p className="text-lg font-light text-gray-600 leading-relaxed">
                  Fyrhjulsinställning för optimal körkänsla, längre däcklivslängd och lägre bränslekonsumtion.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">När behövs hjulinställning?</h3>
                  <ul className="space-y-3 text-sm font-light text-gray-600">
                    <li className="flex items-start">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                      Bilen drar åt ena sidan
                    </li>
                    <li className="flex items-start">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                      Ojämnt däckslitage
                    </li>
                    <li className="flex items-start">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                      Ratten står inte rakt
                    </li>
                    <li className="flex items-start">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                      Efter körning på gropar
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="text-sm font-medium text-gray-900 mb-2">Rekommendation</div>
                  <div className="text-sm font-light text-gray-600">1 gång per år eller var 1500 mil</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/heropics/5.jpg"
                  alt="Hjulinställning"
                  fill
                  className="object-cover"
                  quality={95}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tire Storage */}
      <section ref={storageRef} className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-light tracking-[0.2em] text-gray-400 uppercase mb-4 block">
              Däckhotell
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
              Trygg Däckförvaring
            </h2>
            <div className="w-16 h-[1px] bg-gray-900 mx-auto mb-6"></div>
            <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Professionell förvaring av dina däck i optimala förhållanden
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-gray-900">Inkluderat i service</h3>
                  <ul className="space-y-4 text-sm font-light text-gray-600">
                    <li className="flex items-start">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                      Trygg förvaring i svalt och mörkt utrymme
                    </li>
                    <li className="flex items-start">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                      Rengöring och kontroll av däck
                    </li>
                    <li className="flex items-start">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                      Totalkostnad inklusive däckbyte
                    </li>
                    <li className="flex items-start">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                      Rabatt på fälgreparation
                    </li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-gray-900">Däcktyper vi hanterar</h3>
                  <ul className="space-y-4 text-sm font-light text-gray-600">
                    <li className="flex items-start">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                      Sommardäck (min 1,6 mm, rek 3 mm)
                    </li>
                    <li className="flex items-start">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                      Vinterdäck (min 3 mm vid vinterväglag)
                    </li>
                    <li className="flex items-start">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                      Helårsdäck för grundanvändning
                    </li>
                    <li className="flex items-start">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                      Kompletta hjul (däck + fälg)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6 tracking-tight">
              Fördelar med professionell service
            </h2>
            <div className="w-16 h-[1px] bg-gray-900 mx-auto"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Längre livslängd</h3>
              <p className="text-sm font-light text-gray-600">Optimal hjulinställning förlänger däckens livslängd avsevärt</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Lägre bränslekostnad</h3>
              <p className="text-sm font-light text-gray-600">Korrekt inställning minskar rullmotståndet och sparar bränsle</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Säkrare körning</h3>
              <p className="text-sm font-light text-gray-600">Bättre väggrepp och stabilitet i alla väderförhållanden</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Bättre prestanda</h3>
              <p className="text-sm font-light text-gray-600">Förbättrad körkänsla och minskad risk för vattenplaning</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-32 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-8 tracking-tight leading-tight">
            Boka din<br />
            <span className="font-normal">däckservice idag</span>
          </h2>
          
          <p className="text-xl font-light text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Låt våra experter ta hand om dina däck och fälgar. Kontakta oss för rådgivning och tidsbokning.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="xl" className="bg-white text-gray-900 hover:bg-gray-100">
              <span>Boka tid online</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </Button>
            
            <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10">
              <span>Ring oss: 08-123 456</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
} 