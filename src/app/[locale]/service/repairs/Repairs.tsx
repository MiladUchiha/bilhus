'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function RepairsPage() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
            trigger: '.repairs-services-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

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
            src="/heropics/1.jpg"
            alt="Bilreparationer verkstad"
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
            Bil<span className="font-normal">reparationer</span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl lg:text-3xl text-white/95 mb-10 font-light leading-relaxed max-w-3xl mx-auto"
             style={{
               textShadow: '2px 2px 6px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.4)'
             }}>
            Professionell felsökning och reparation av alla bilmärken
          </p>
          <div className="hero-cta">
            <Link href="/service/booking" className="group bg-white/15 backdrop-blur-lg border-2 border-white/30 text-white px-10 py-4 rounded-xl font-medium text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-flex items-center">
              <span className="flex items-center">
                Boka Reparation Nu
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div ref={contentRef} className="service-content">
        {/* Service Stats */}
        <section className="stats-section py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-header text-2xl md:text-3xl font-light text-gray-900 mb-4 tracking-tight">
                Varför välja vår verkstad?
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="stat-item text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                  </div>
                  <div className="text-lg font-medium text-gray-900 mb-2">Modern Diagnos</div>
                  <div className="text-sm text-gray-600 font-light">Avancerad utrustning</div>
                </div>
              </div>
              <div className="stat-item text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-lg font-medium text-gray-900 mb-2">Snabb Service</div>
                  <div className="text-sm text-gray-600 font-light">Effektiv reparation</div>
                </div>
              </div>
              <div className="stat-item text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="text-lg font-medium text-gray-900 mb-2">Rättvisa Priser</div>
                  <div className="text-sm text-gray-600 font-light">Transparent kostnad</div>
                </div>
              </div>
              <div className="stat-item text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-lg font-medium text-gray-900 mb-2">Kvalitetsgaranti</div>
                  <div className="text-sm text-gray-600 font-light">På allt arbete</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Repair Services */}
        <section className="repairs-services-section py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center bg-gray-100 rounded-full px-6 py-2 mb-6">
                <span className="text-sm font-medium text-gray-700 tracking-wide uppercase">Våra tjänster</span>
              </div>
              <h2 className="section-header text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight">
                Felsökning & Reparationer
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                Vi utför alla typer av bilreparationer med modern utrustning och erfarna tekniker
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Engine Repairs */}
              <div className="service-card group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-8 group-hover:from-gray-900 group-hover:to-gray-700 transition-all duration-300">
                  <svg className="w-10 h-10 text-gray-700 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 group-hover:text-gray-800 transition-colors duration-300">Motor & Transmission</h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Motordiagnos och reparation</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Växellådsservice</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Koppling och svänghjul</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Turbo och kompressor</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Avgassystem</span>
                  </li>
                </ul>
              </div>

              {/* Brake System */}
              <div className="service-card group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-8 group-hover:from-gray-900 group-hover:to-gray-700 transition-all duration-300">
                  <svg className="w-10 h-10 text-gray-700 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 group-hover:text-gray-800 transition-colors duration-300">Bromssystem</h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Bromsbelägg och skivor</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">ABS-system</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Handbroms</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Bromsledningar</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Bromscylinder</span>
                  </li>
                </ul>
              </div>

              {/* Suspension & Steering */}
              <div className="service-card group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-8 group-hover:from-gray-900 group-hover:to-gray-700 transition-all duration-300">
                  <svg className="w-10 h-10 text-gray-700 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 group-hover:text-gray-800 transition-colors duration-300">Fjädring & Styrning</h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Stötdämpare och fjädrar</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Kuggstångsstyrning</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Främre drivknutar</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Styrstag och kulled</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Hjulinställning</span>
                  </li>
                </ul>
              </div>

              {/* Electrical Systems */}
              <div className="service-card group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-8 group-hover:from-gray-900 group-hover:to-gray-700 transition-all duration-300">
                  <svg className="w-10 h-10 text-gray-700 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 group-hover:text-gray-800 transition-colors duration-300">Elsystem</h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Batteri och laddningssystem</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Startmotor och generator</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Belysning och säkringar</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">ECU och sensorer</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Tändning och insprutning</span>
                  </li>
                </ul>
              </div>

              {/* Climate & Comfort */}
              <div className="service-card group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-8 group-hover:from-gray-900 group-hover:to-gray-700 transition-all duration-300">
                  <svg className="w-10 h-10 text-gray-700 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 group-hover:text-gray-800 transition-colors duration-300">Klimat & Komfort</h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">AC-system och kylmedel</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Kupévärmare</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Sätesvärme</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Fönsterhissar</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Taklucka</span>
                  </li>
                </ul>
              </div>

              {/* Cooling System */}
              <div className="service-card group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-8 group-hover:from-gray-900 group-hover:to-gray-700 transition-all duration-300">
                  <svg className="w-10 h-10 text-gray-700 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 group-hover:text-gray-800 transition-colors duration-300">Kylsystem</h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Kylare och kondensor</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Vattenpump</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Termostat</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Kylfläkt</span>
                  </li>
                  <li className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light text-base">Kylarslangar</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Diagnostic Process */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-tight">
                Vår Felsökningsprocess
              </h2>
              <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
                Vi använder modern diagnostisk utrustning för att snabbt identifiera problem
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Initial Diagnos</h3>
                <p className="text-gray-600 font-light">Datordiagnos för att identifiera felkoder och symptom</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Detaljerad Undersökning</h3>
                <p className="text-gray-600 font-light">Manuell kontroll och testning av misstänkta komponenter</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Offert</h3>
                <p className="text-gray-600 font-light">Transparent prisuppgift innan reparation påbörjas</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Reparation</h3>
                <p className="text-gray-600 font-light">Professionell reparation med kvalitetssäkring</p>
              </div>
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight leading-[0.9]"
                style={{
                  textShadow: '2px 2px 8px rgba(0,0,0,0.5)'
                }}>
              Behöver Du Hjälp Med Din Bil?
            </h2>
            <p className="text-2xl md:text-3xl text-white/90 mb-12 font-light leading-relaxed max-w-3xl mx-auto"
               style={{
                 textShadow: '1px 1px 4px rgba(0,0,0,0.3)'
               }}>
              Kontakta oss för professionell felsökning och reparation
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/service/booking" className="group bg-white text-gray-900 px-12 py-5 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl inline-flex items-center justify-center">
                <span className="flex items-center justify-center">
                  Boka Tid
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
              </Link>
              <Link href="/contact/quote" className="group border-2 border-white/30 backdrop-blur-sm text-white px-12 py-5 rounded-2xl font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105 shadow-xl inline-flex items-center justify-center">
                <span className="flex items-center justify-center">
                  Ring För Offert
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}