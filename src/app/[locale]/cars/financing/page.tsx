'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import MonthlyPaymentCalculator from '@/components/MonthlyPaymentCalculator';
import Link from 'next/link';

export default function FinancingPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set([headerRef.current, calculatorRef.current, benefitsRef.current], {
      opacity: 0,
      y: 30
    });

    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    })
    .to(calculatorRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6")
    .to(benefitsRef.current, {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
              <span className="font-normal">Finansiering</span> & Betalning
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Beräkna din månadskostnad och hitta en finansieringslösning som passar dig. 
              Vi erbjuder flexibla betalningsalternativ med konkurrenskraftiga räntor.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator */}
          <div ref={calculatorRef}>
            <div className="mb-4 p-3 bg-gray-100 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  📊 Exempel med bil för 250 000 kr. Välj en specifik bil för exakta beräkningar.
                </p>
                <Link href="/cars" className="text-sm bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
                  Se våra bilar
                </Link>
              </div>
            </div>
            <MonthlyPaymentCalculator 
              carPrice={250000}
              interestRate="6.95"
              className="sticky top-8"
            />
          </div>

          {/* Benefits and Information */}
          <div ref={benefitsRef} className="space-y-8">
            <div className="bg-white p-8 border border-gray-200 shadow-sm">
              <h2 className="text-3xl font-light text-gray-900 mb-6">
                Våra <span className="font-normal">Fördelar</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Konkurrenskraftiga räntor från 6,95%
                    </h3>
                    <p className="text-gray-600">
                      Vi samarbetar med ledande finansbolag för att erbjuda dig de bästa räntorna på marknaden.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      0 kr kontantinsats möjlig
                    </h3>
                    <p className="text-gray-600">
                      För företagskunder erbjuder vi möjlighet till 100% finansiering utan kontantinsats.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Flexibla lånetider
                    </h3>
                    <p className="text-gray-600">
                      Välj lånetid från 1-7 år för att hitta en månadsbetalning som passar din ekonomi.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Snabb handläggning
                    </h3>
                    <p className="text-gray-600">
                      Få svar på din låneansökan inom 24 timmar. Vi hjälper dig genom hela processen.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Inbyte av din nuvarande bil
                    </h3>
                    <p className="text-gray-600">
                      Vi tar gärna din bil i inbyte och räknar av värdet från köpesumman.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Insurance Information */}
            <div className="bg-blue-50 p-8 border border-blue-200">
              <h3 className="text-2xl font-light text-gray-900 mb-4">
                <span className="font-normal">Försäkring</span> Inkluderat
              </h3>
              <p className="text-gray-700 mb-4">
                Vi erbjuder förmånlig prova-på-helförsäkring utan bindningstid från PayDrive:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">14 dagar GRATIS helförsäkring</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">3 månader för endast 1,195 kr</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Ingen bindningstid</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-900 text-white p-8">
              <h3 className="text-2xl font-light mb-4">
                Behöver du <span className="font-normal">hjälp</span>?
              </h3>
              <p className="text-gray-300 mb-6">
                Våra finansieringsexperter hjälper dig hitta den bästa lösningen för dig.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>0700 92 94 33</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>08 591 205 41</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/contact/quote"
                  className="bg-white text-gray-900 px-6 py-3 text-center hover:bg-gray-100 transition-colors"
                >
                  Begär offert
                </Link>
                <Link 
                  href="/contact"
                  className="border border-white text-white px-6 py-3 text-center hover:bg-white hover:text-gray-900 transition-colors"
                >
                  Kontakta oss
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}