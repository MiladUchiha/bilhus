'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';


export default function InsurancePage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLDivElement>(null);
  const insuranceTypesRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set([headerRef.current, offerRef.current, insuranceTypesRef.current, benefitsRef.current, contactRef.current], {
      opacity: 0,
      y: 30
    });

    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    })
    .to(offerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6")
    .to(insuranceTypesRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")
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
              <span className="font-normal">Bilförsäkring</span> & Skydd
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Skydda din bil med rätt försäkring. Vi samarbetar med Länsförsäkringar för att erbjuda 
              dig trygghet och konkurrenskraftiga villkor för din nya bil.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Special Offer */}
        <div ref={offerRef} className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg">
            <div className="text-center">
              <h2 className="text-3xl font-light mb-4">
                <span className="font-normal">Provmånad</span> GRATIS
              </h2>
              <p className="text-xl mb-6">
                När du köper bil hos oss ingår en gratis provmånad med helförsäkring via Länsförsäkringar
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">30 dagar</div>
                  <div className="text-blue-100">Kostnadsfritt</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">Helförsäkring</div>
                  <div className="text-blue-100">Fullständigt skydd</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">Ingen bindning</div>
                  <div className="text-blue-100">Välj fritt därefter</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Insurance Types */}
          <div ref={insuranceTypesRef}>
            <div className="bg-white p-8 border border-gray-200 shadow-sm">
              <h2 className="text-3xl font-light text-gray-900 mb-6">
                Våra <span className="font-normal">Försäkringsalternativ</span>
              </h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Helförsäkring
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Det mest omfattande skyddet som täcker skador på din egen bil vid trafikolyckor och andra olyckshändelser.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li>✓ Trafikförsäkring (obligatorisk)</li>
                    <li>✓ Brand, stöld och glas</li>
                    <li>✓ Maskinskada upp till 15 000 mil</li>
                    <li>✓ Vagnskadeskydd</li>
                    <li>✓ Assistans och räddning</li>
                    <li>✓ Rättsskydd</li>
                  </ul>
                </div>

                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Halvförsäkring
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Bra grundskydd som täcker det mesta utom skador på din egen bil vid kollisioner.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li>✓ Trafikförsäkring (obligatorisk)</li>
                    <li>✓ Brand, stöld och glas</li>
                    <li>✓ Maskinskada upp till 15 000 mil</li>
                    <li>✓ Assistans och räddning</li>
                    <li>✓ Rättsskydd</li>
                  </ul>
                </div>

                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Trafikförsäkring
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Lagstadgad minimiförsäkring som täcker personskador och skador på andras egendom.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li>✓ Personskador på dig och andra</li>
                    <li>✓ Skador på andras fordon</li>
                    <li>✓ Skador på egendom</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div ref={benefitsRef} className="space-y-8">
            <div className="bg-white p-8 border border-gray-200 shadow-sm">
              <h2 className="text-3xl font-light text-gray-900 mb-6">
                Fördelar med <span className="font-normal">Länsförsäkringar</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Kostnadsfri stenskottslagning
                    </h3>
                    <p className="text-gray-600">
                      Laga stenskott utan kostnad - byte av hela rutan har låg självrisk.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Maskinskadeförsäkring
                    </h3>
                    <p className="text-gray-600">
                      Skydd för motor och elektronik upp till 10 år eller 15 000 mil.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Assistans och räddning
                    </h3>
                    <p className="text-gray-600">
                      Hjälp vid driftstopp, punktering eller andra problem på vägen.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Specialförsäkring för elbilar
                    </h3>
                    <p className="text-gray-600">
                      Särskilt skydd för batterier och laddkablar - anpassat för framtidens bilar.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Lokal förankring
                    </h3>
                    <p className="text-gray-600">
                      Länsförsäkringar är kundägt och lokalt förankrat i hela Sverige.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Enkla digitala tjänster
                    </h3>
                    <p className="text-gray-600">
                      Hantera din försäkring enkelt via app eller på webben.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Features */}
            <div className="bg-green-50 p-8 border border-green-200">
              <h3 className="text-2xl font-light text-gray-900 mb-4">
                Ingår i ditt <span className="font-normal">bilköp</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">✓</div>
                  <span className="text-gray-700">30 dagars gratis helförsäkring vid bilköp</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">✓</div>
                  <span className="text-gray-700">Hjälp med överlämning och registration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">✓</div>
                  <span className="text-gray-700">Rådgivning för bästa försäkringslösning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">✓</div>
                  <span className="text-gray-700">Fortsättning med förmånliga villkor</span>
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
                Behöver du hjälp med <span className="font-normal">bilförsäkring</span>?
              </h3>
              <p className="text-gray-300 mb-8">
                Våra försäkringsexperter hjälper dig hitta rätt skydd för din bil. 
                Få personlig rådgivning och konkurrenskraftiga villkor.
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