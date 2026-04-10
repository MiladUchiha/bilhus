'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function AixamOriginalServicePage() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation with stagger
      const tl = gsap.timeline();
      
      gsap.set(['.hero-title', '.hero-subtitle', '.hero-cta'], {
        opacity: 0,
        y: 50
      });

      tl.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      })
      .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.8")
      .to('.hero-cta', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5");

      // Stats animation with enhanced effects
      gsap.fromTo('.stat-item', 
        { opacity: 0, scale: 0.8, y: 30 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 0.8, 
          stagger: 0.1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: '.stats-section',
            start: 'top 85%',
          }
        }
      );

      // Service cards with enhanced 3D animation
      gsap.fromTo('.service-card', 
        { opacity: 0, y: 60, rotationX: 15 },
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          duration: 1, 
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.basic-service-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Section headers animation
      gsap.fromTo('.section-header', 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.section-header',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Special service items with slide animation
      gsap.fromTo('.special-service-item', 
        { opacity: 0, x: -50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.special-services-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Price cards with bounce effect
      gsap.fromTo('.price-card', 
        { opacity: 0, scale: 0.9, y: 40 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: '.pricing-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/heropics/2.jpg"
            alt="Aixam mopedbilar service verkstad"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 hero-content">
          <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-8 tracking-tight leading-[0.9]"
              style={{
                textShadow: '3px 3px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)'
              }}>
            Aixam <span className="font-normal">Service</span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl lg:text-3xl text-white/95 mb-10 font-light leading-relaxed max-w-3xl mx-auto"
             style={{
               textShadow: '2px 2px 6px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.4)'
             }}>
            Specialiserad service för Aixam mopedbilar
          </p>
          <div className="hero-cta">
            <button className="group bg-white/15 backdrop-blur-lg border-2 border-white/30 text-white px-10 py-4 rounded-xl font-medium text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <span className="flex items-center">
                Boka Service Nu
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div ref={contentRef} className="service-content">
        {/* Service Stats */}
        <section className="stats-section py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-header text-2xl md:text-3xl font-light text-gray-900 mb-4 tracking-tight">
                Varför välja vår Aixam-service?
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="stat-item text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="text-lg font-medium text-gray-900 mb-2">Aixam Auktoriserad</div>
                  <div className="text-sm text-gray-600 font-light">Verkstad</div>
                </div>
              </div>
              <div className="stat-item text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-lg font-medium text-gray-900 mb-2">Originaldelar</div>
                  <div className="text-sm text-gray-600 font-light">Direkt från Aixam</div>
                </div>
              </div>
              <div className="stat-item text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  <div className="text-lg font-medium text-gray-900 mb-2">Specialiserad</div>
                  <div className="text-sm text-gray-600 font-light">Expertis</div>
                </div>
              </div>
              <div className="stat-item text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-lg font-medium text-gray-900 mb-2">Konkurrerande</div>
                  <div className="text-sm text-gray-600 font-light">Priser</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Basic Service Components */}
        <section className="basic-service-section py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center bg-blue-100 rounded-full px-6 py-2 mb-6">
                <span className="text-sm font-medium text-blue-800 tracking-wide uppercase">Vad ingår</span>
              </div>
              <h2 className="section-header text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight">
                Mopedbilar Service
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                Specialiserad service för Aixam mopedbilar enligt tillverkarens specifikationer
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Motor & Transmission */}
              <div className="service-card group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-8 group-hover:from-blue-600 group-hover:to-blue-800 transition-all duration-300">
                  <svg className="w-10 h-10 text-blue-700 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 group-hover:text-gray-800 transition-colors duration-300">Motor & Transmission</h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Kubota dieselmotor service</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">CVT-transmission kontroll</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Oljebyten enligt schema</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Luftfilter och bränslefilter</span>
                  </li>
                </ul>
              </div>

              {/* Electrical Systems */}
              <div className="service-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">Elsystem</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    <span className="font-light">Batterisystem kontroll</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    <span className="font-light">Belysning och signaler</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    <span className="font-light">Laddningssystem</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    <span className="font-light">Diagnos av felsystem</span>
                  </li>
                </ul>
              </div>

              {/* Safety & Comfort */}
              <div className="service-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">Säkerhet & Komfort</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    <span className="font-light">Bromssystem</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    <span className="font-light">Styrning och fjädring</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    <span className="font-light">Värme och ventilation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    <span className="font-light">Säkerhetsbälten</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="pricing-section py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center bg-blue-100 rounded-full px-6 py-2 mb-6">
                <span className="text-sm font-medium text-blue-800 tracking-wide uppercase">Prisexempel</span>
              </div>
              <h2 className="section-header text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight">
                Service för Aixam
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                Konkurrenskraftiga priser för alla Aixam mopedbilar
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Basic Service */}
              <div className="price-card group bg-gradient-to-br from-blue-50 to-white rounded-3xl p-10 shadow-xl hover:shadow-2xl border border-blue-200 hover:border-blue-300 transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mr-5 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-semibold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">Grundservice</h3>
                </div>
                
                <div className="mb-8">
                  <div className="text-5xl font-light text-gray-900 mb-3">Från 2.800 kr</div>
                  <div className="text-lg text-gray-600 font-light">Beroende på modell och årsmodell</div>
                </div>

                <ul className="space-y-3 text-gray-600 mb-6">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light">Motorolja och filter</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light">Säkerhetskontroll</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light">Vätskenivåer och topp</span>
                  </li>
                </ul>
              </div>

              {/* Extended Service */}
              <div className="price-card bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-10 shadow-xl text-white">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mr-5">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-semibold text-white">Stor Service</h3>
                </div>
                
                <div className="mb-8">
                  <div className="text-5xl font-light text-white mb-3">Från 4.800 kr</div>
                  <div className="text-lg text-white/90 font-light">Omfattande service enligt schema</div>
                </div>

                <ul className="space-y-3 text-white/90 mb-6">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-white/70 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light">Alla grundservice komponenter</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-white/70 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light">CVT-transmission service</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-white/70 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light">Komplett diagnos och kontroll</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Special Features */}
        <section className="special-services-section py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 tracking-tight">
                  Speciella Tjänster
                </h2>
                
                <div className="space-y-6">
                  <div className="special-service-item bg-blue-50 rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-medium text-gray-900 mb-3">Vinterberedskap</h3>
                    <p className="text-gray-600 font-light">Förberedelse för vinterbruk och kallstart</p>
                  </div>
                  
                  <div className="special-service-item bg-blue-50 rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-medium text-gray-900 mb-3">Skadesverkstad</h3>
                    <p className="text-gray-600 font-light">Professionella skadereparationer och karosserireparationer</p>
                  </div>

                  <div className="special-service-item bg-blue-50 rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-medium text-gray-900 mb-3">Karosserireparationer</h3>
                    <p className="text-gray-600 font-light">Plåt- och lackeringsarbeten för din mopedbal</p>
                  </div>

                  <div className="special-service-item bg-blue-50 rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-medium text-gray-900 mb-3">Accessoarer & Tillbehör</h3>
                    <p className="text-gray-600 font-light">Montering av original Aixam-tillbehör</p>
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 mt-12 tracking-tight">
                  Vad Vi Erbjuder
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-blue-400 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 font-light">Auktoriserad Aixam-verkstad</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-blue-400 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 font-light">Originaldelar i lager</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-blue-400 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 font-light">Snabb service och reparation</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-blue-400 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 font-light">Auktoriserad skadesverkstad</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-blue-400 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 font-light">Kostnadsfri offert</span>
                  </div>
                </div>
              </div>

              <div className="lg:pl-8">
                <Image
                  src="/heropics/3.jpg"
                  alt="Aixam mopedbilar service"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight leading-[0.9]"
                style={{
                  textShadow: '2px 2px 8px rgba(0,0,0,0.5)'
                }}>
              Boka Din Aixam Service Idag
            </h2>
            <p className="text-2xl md:text-3xl text-white/90 mb-12 font-light leading-relaxed max-w-3xl mx-auto"
               style={{
                 textShadow: '1px 1px 4px rgba(0,0,0,0.3)'
               }}>
              Auktoriserad service för alla Aixam mopedbilar
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group bg-white text-blue-900 px-12 py-5 rounded-2xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl">
                <span className="flex items-center justify-center">
                  Boka Online
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
              </button>
              <button className="group border-2 border-white/30 backdrop-blur-sm text-white px-12 py-5 rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 hover:scale-105 shadow-xl">
                <span className="flex items-center justify-center">
                  Ring Oss
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 