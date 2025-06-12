'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Button from '@/components/Button';

gsap.registerPlugin(ScrollTrigger);

export default function GeneralServicePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const serviceTypesRef = useRef<HTMLElement>(null);
  const serviceLevelsRef = useRef<HTMLElement>(null);
  const intervalsRef = useRef<HTMLElement>(null);
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
    const sections = [serviceTypesRef.current, serviceLevelsRef.current, intervalsRef.current, ctaRef.current];
    
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
      {/* Hero Section with Sophisticated Layout */}
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
                  Allmän
                  <br />
                  <span className="font-normal text-gray-600">Bilservice</span>
                </h1>
                
                <div className="w-16 h-[1px] bg-gray-900"></div>
                
                <p className="text-xl sm:text-2xl font-light text-gray-600 leading-relaxed max-w-xl">
                  Professionell service för alla bilmärken med certifierade tekniker och modern utrustning
                </p>
              </div>

              {/* Trust Indicators - Minimal */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-6 text-sm font-light text-gray-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                    <span>Bibehållen nybilsgaranti</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                    <span>12 månaders garanti</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                    <span>Serviceprotokoll</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <Button variant="primary" size="lg" className="group">
                  <span>Boka tid</span>
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
                  src="/heropics/3.jpg"
                  alt="Märsta Bilhus verkstad"
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
                  <div className="text-2xl font-light text-gray-900 mb-1">20+</div>
                  <div className="text-sm font-light text-gray-600">års erfarenhet</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Types - Redesigned with Minimalistic Cards */}
      <section ref={serviceTypesRef} className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-xs font-light tracking-[0.2em] text-gray-400 uppercase mb-4 block">
              Våra tjänster
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
              Grundläggande Service
            </h2>
            <div className="w-16 h-[1px] bg-gray-900 mx-auto mb-6"></div>
            <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Alla servicetyper för att hålla din bil i toppskick
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Oil & Filters */}
            <div className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">Oljebyte & Filter</h3>
              <ul className="space-y-3 text-sm font-light text-gray-600">
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Motoroljebyte enligt specifikation
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Oljefilterbyte
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Luftfilterkontroll
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Kupéluftfilter/pollenfilter
                </li>
              </ul>
            </div>

            {/* Fluids & Level Control */}
            <div className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-6 group-hover:bg-green-100 transition-colors duration-300">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">Vätskor & Nivåer</h3>
              <ul className="space-y-3 text-sm font-light text-gray-600">
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Kylarvätska kontroll
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Bromsvätska
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Styrservoolja
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Växellådsolja
                </li>
              </ul>
            </div>

            {/* Safety Controls */}
            <div className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors duration-300">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">Säkerhetskontroll</h3>
              <ul className="space-y-3 text-sm font-light text-gray-600">
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Bromskontroll komplett
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Däckkontroll & tryck
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Lampkontroll
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Vindrutetorkare
                </li>
              </ul>
            </div>

            {/* Electronics & Battery */}
            <div className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center mb-6 group-hover:bg-yellow-100 transition-colors duration-300">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">Elektronik & Batteri</h3>
              <ul className="space-y-3 text-sm font-light text-gray-600">
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Batteritest & laddning
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Startmotor & generator
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Varningslampor
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Säkerhetssystem
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Levels - Premium Design */}
      <section ref={serviceLevelsRef} className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-xs font-light tracking-[0.2em] text-gray-400 uppercase mb-4 block">
              Servicenivåer
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
              Välj rätt service
            </h2>
            <div className="w-16 h-[1px] bg-gray-900 mx-auto mb-6"></div>
            <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Tre servicenivåer anpassade efter din bils behov
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Service */}
            <div className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-gray-900 mb-2 tracking-tight">Liten Service</h3>
                <p className="text-sm font-light text-gray-500 tracking-wide uppercase">Basservice</p>
              </div>
              <ul className="space-y-4 text-sm font-light text-gray-600 mb-8">
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Grundläggande oljebyte och filterbyte
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Inspektion av huvudkomponenter
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Smörjning av rörliga delar
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Kontroll av vätskeläckage
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Välj Basservice
              </Button>
            </div>

            {/* Medium Service - Featured */}
            <div className="group relative bg-gray-900 text-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-white text-gray-900 px-4 py-1 rounded-full text-xs font-medium tracking-wide uppercase">
                  Populärast
                </span>
              </div>
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-white mb-2 tracking-tight">Mellanservice</h3>
                <p className="text-sm font-light text-white/70 tracking-wide uppercase">Fullständig service</p>
              </div>
              <ul className="space-y-4 text-sm font-light text-white/80 mb-8">
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-white/60 mt-2 mr-3 flex-shrink-0"></span>
                  Allt från basservice plus utökade kontroller
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-white/60 mt-2 mr-3 flex-shrink-0"></span>
                  Rekommenderas var 12:e månad
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-white/60 mt-2 mr-3 flex-shrink-0"></span>
                  Omfattande säkerhetskontroller
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-white/60 mt-2 mr-3 flex-shrink-0"></span>
                  Serviceprotokoll med rekommendationer
                </li>
              </ul>
              <Button className="w-full bg-white text-gray-900 hover:bg-gray-100">
                Välj Mellanservice
              </Button>
            </div>

            {/* Major Service */}
            <div className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-100 transition-colors duration-300">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-gray-900 mb-2 tracking-tight">Storservice</h3>
                <p className="text-sm font-light text-gray-500 tracking-wide uppercase">Omfattande service</p>
              </div>
              <ul className="space-y-4 text-sm font-light text-gray-600 mb-8">
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Tändstiftsbyte
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Chassi- och upphängningskontroll
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Växellådsservice
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                  Säkerhetsfunktioner (krockkuddar)
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Välj Storservice
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Information Section with Image */}
      <section ref={intervalsRef} className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Content Side */}
            <div className="space-y-12">
              <div>
                <span className="text-xs font-light tracking-[0.2em] text-gray-400 uppercase mb-4 block">
                  Serviceintervaller
                </span>
                <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-6 tracking-tight">
                  När ska du <br />serva din bil?
                </h2>
                <div className="w-16 h-[1px] bg-gray-900 mb-8"></div>
                
                <div className="space-y-8">
                  <div className="border-l-2 border-blue-200 pl-6">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Allmän kontroll</h3>
                    <p className="text-gray-600 mb-2">Var 10 000-15 000 km eller en gång per år</p>
                    <p className="text-sm font-light text-gray-500">Grundläggande säkerhetskontroll och oljebyte</p>
                  </div>
                  
                  <div className="border-l-2 border-green-200 pl-6">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Årsservice</h3>
                    <p className="text-gray-600 mb-2">Beroende på körsträcka</p>
                    <p className="text-sm font-light text-gray-500">Omfattande kontroll av alla system</p>
                  </div>
                  
                  <div className="border-l-2 border-purple-200 pl-6">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Serviceboken</h3>
                    <p className="text-gray-600 mb-2">Följ servicebokens angivna intervaller</p>
                    <p className="text-sm font-light text-gray-500">För bibehållen nybilsgaranti</p>
                  </div>
                </div>
              </div>

              {/* Included Services */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-medium text-gray-900 mb-6">Inkluderat i service</h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    'Serviceprotokoll med rekommendationer',
                    'Stämpel i serviceboken',
                    'Bibehållen nybilsgaranti',
                    'Provkörning efter utfört arbete',
                    '12 månaders assistansförsäkring'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm font-light text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/heropics/4.jpg"
                  alt="Bilservice verkstad"
                  fill
                  className="object-cover"
                  quality={95}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -top-8 -right-8 bg-white rounded-xl shadow-2xl p-6 max-w-xs">
                <div className="text-center">
                  <div className="text-2xl font-light text-gray-900 mb-1">1000+</div>
                  <div className="text-sm font-light text-gray-600">nöjda kunder</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
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
            Kontakta oss
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6 tracking-tight">
            Boka din bilservice
          </h2>
          <div className="w-16 h-[1px] bg-white mx-auto mb-8"></div>
          <p className="text-xl font-light text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Låt våra certifierade tekniker ta hand om din bil med professionell service och moderna verktyg
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 group">
              <span>Boka tid online</span>
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