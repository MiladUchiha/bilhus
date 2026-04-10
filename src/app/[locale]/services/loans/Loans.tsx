'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';


export default function LoansPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set([headerRef.current, partnersRef.current, benefitsRef.current, contactRef.current], {
      opacity: 0,
      y: 30
    });

    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    })
    .to(partnersRef.current, {
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
    }, "-=0.4")
    .to(contactRef.current, {
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
              <span className="font-normal">Billån</span> & Finansiering
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Vi samarbetar med ledande finansbolag för att erbjuda dig de bästa finansieringslösningarna. 
              Hitta det lån som passar just din situation och ekonomi.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Our Partners */}
          <div ref={partnersRef}>
            <div className="bg-white p-8 border border-gray-200 shadow-sm">
              <h2 className="text-3xl font-light text-gray-900 mb-6">
                Våra <span className="font-normal">Finanspartners</span>
              </h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    LF Finans (Länsförsäkringar)
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Marknadsledande finansbolag med stark lokal förankring och stabilitet. 
                    Erbjuder leasing, avbetalning och andra finansieringslösningar.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Fordonsfinansiering och billeasing</li>
                    <li>• Miljöfinansiering för elbilar</li>
                    <li>• Flexibla återbetalningsmöjligheter</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Svea Ekonomi
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Erfaren nordisk aktör inom finansiering med fokus på enkel och snabb process.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Snabb handläggning</li>
                    <li>• Digitala lösningar</li>
                    <li>• Konkurrenskraftiga villkor</li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    MyMoney & MoneyGo
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Moderna fintech-lösningar som erbjuder snabba och flexibla finansieringsalternativ.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Helt digital process</li>
                    <li>• Snabba beslut</li>
                    <li>• Anpassade lösningar</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits and Process */}
          <div ref={benefitsRef} className="space-y-8">
            <div className="bg-white p-8 border border-gray-200 shadow-sm">
              <h2 className="text-3xl font-light text-gray-900 mb-6">
                Därför välja <span className="font-normal">oss</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Flera finanspartners
                    </h3>
                    <p className="text-gray-600">
                      Vi jämför villkor från olika finansbolag för att hitta den bästa lösningen för dig.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Personlig rådgivning
                    </h3>
                    <p className="text-gray-600">
                      Våra finansexperter hjälper dig genom hela processen och hittar lösningen som passar dig bäst.
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
                      Moderna digitala processer gör att du kan få snabba beslut och komma igång direkt.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Flexibla lösningar
                    </h3>
                    <p className="text-gray-600">
                      Från traditionella lån till moderna leasing- och avbetalningslösningar.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Helhetslösning
                    </h3>
                    <p className="text-gray-600">
                      Vi hjälper dig med allt från bilval till finansiering, försäkring och service.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Process */}
            <div className="bg-blue-50 p-8 border border-blue-200">
              <h3 className="text-2xl font-light text-gray-900 mb-4">
                Så fungerar det
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                  <span className="text-gray-700">Kontakta oss för en kostnadsfri konsultation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                  <span className="text-gray-700">Vi analyserar din ekonomiska situation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                  <span className="text-gray-700">Vi presenterar de bästa alternativen från våra partners</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">4</div>
                  <span className="text-gray-700">Du väljer den lösning som passar dig bäst</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">5</div>
                  <span className="text-gray-700">Vi hjälper dig med ansökan och alla papper</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div ref={contactRef} className="mt-12">
          <div className="bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-light mb-4">
                Behöver du hjälp med <span className="font-normal">finansiering</span>?
              </h3>
              <p className="text-gray-300 mb-8">
                Våra finansexperter hjälper dig hitta den bästa lösningen för din situation. 
                Kontakta oss för en kostnadsfri konsultation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>0700 92 94 33</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@marsstabil.se</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link 
                  href="/contact/quote"
                  className="bg-white text-gray-900 px-8 py-3 text-center hover:bg-gray-100 transition-colors"
                >
                  Begär offert
                </Link>
                <Link 
                  href="/contact"
                  className="border border-white text-white px-8 py-3 text-center hover:bg-white hover:text-gray-900 transition-colors"
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