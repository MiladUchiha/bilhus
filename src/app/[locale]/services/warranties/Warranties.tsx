'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';



export default function WarrantiesPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const warrantyTypesRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set([headerRef.current, warrantyTypesRef.current, partnersRef.current, benefitsRef.current, contactRef.current], {
      opacity: 0,
      y: 30
    });

    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    })
    .to(warrantyTypesRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6")
    .to(partnersRef.current, {
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
              <span className="font-normal">Garantier</span> & Trygghet
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Skydda din investering med omfattande garantier för begagnade bilar. 
              Vi samarbetar med ledande garantibolag för att ge dig trygghet och säkerhet.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Warranty Types */}
          <div ref={warrantyTypesRef}>
            <div className="bg-white p-8 border border-gray-200 shadow-sm">
              <h2 className="text-3xl font-light text-gray-900 mb-6">
                Våra <span className="font-normal">Garantialternativ</span>
              </h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Bilgaranti Premium
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Omfattande skydd för motor, växellåda, elektronik och andra viktiga komponenter.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li>✓ Motor och växellåda</li>
                    <li>✓ Elektronik och sensorer</li>
                    <li>✓ Klimatanläggning</li>
                    <li>✓ Styrning och bromsar</li>
                    <li>✓ Upp till 24 månader garanti</li>
                  </ul>
                </div>

                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Bilgaranti Basic
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Grundläggande skydd för de viktigaste komponenterna till ett förmånligt pris.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li>✓ Motor och växellåda</li>
                    <li>✓ Huvudsakliga elektronik</li>
                    <li>✓ Bränslesystem</li>
                    <li>✓ Upp till 12 månader garanti</li>
                  </ul>
                </div>

                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Elbilsgaranti
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Specialanpassad garanti för elbilar och laddhybrider med fokus på batterier och elteknik.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li>✓ Batteripaket och celler</li>
                    <li>✓ Laddningssystem</li>
                    <li>✓ Elmotorer och omriktare</li>
                    <li>✓ Avancerad batteridiagnostik</li>
                    <li>✓ Upp till 36 månader garanti</li>
                  </ul>
                </div>

                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Servicegaranti
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Garanti på utfört servicearbete och reservdelar i vår verkstad.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li>✓ Arbetsgaranti upp till 24 månader</li>
                    <li>✓ Reservdelsgaranti</li>
                    <li>✓ Besiktningsgaranti</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Partners and Benefits */}
          <div ref={partnersRef} className="space-y-8">
            <div className="bg-white p-8 border border-gray-200 shadow-sm">
              <h2 className="text-3xl font-light text-gray-900 mb-6">
                Våra <span className="font-normal">Garantipartners</span>
              </h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Garantigruppen
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Marknadsledande inom bilgarantier med omfattande nätverk av auktoriserade verkstäder.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Omfattande bilgarantier för alla märken</li>
                    <li>• Batteridiagnostik för elbilar</li>
                    <li>• Rikstäckande verkstadsnätverk</li>
                    <li>• Snabb skadehantering</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Fragus Group
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Nordisk ledare inom fordonsgarantier med 25 års erfarenhet och moderna lösningar.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• GOSafe garantisystem</li>
                    <li>• Specialgarantier för elfordon</li>
                    <li>• Digital kontraktshantering</li>
                    <li>• Nordisk täckning</li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Svenska Garantier
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Svenskt garantibolag med fokus på lokala lösningar och personlig service.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Anpassade garantilösningar</li>
                    <li>• Lokal kundsupport</li>
                    <li>• Flexibla villkor</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div ref={benefitsRef} className="bg-blue-50 p-8 border border-blue-200">
              <h3 className="text-2xl font-light text-gray-900 mb-4">
                Fördelar med våra <span className="font-normal">garantier</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">✓</div>
                  <span className="text-gray-700">Rikstäckande verkstadsnätverk</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">✓</div>
                  <span className="text-gray-700">24/7 support och roadside assistance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">✓</div>
                  <span className="text-gray-700">Snabb skadehantering och direktdebitering</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">✓</div>
                  <span className="text-gray-700">Originalkvalitativa reservdelar</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">✓</div>
                  <span className="text-gray-700">Flexibla garantitider och täckning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">✓</div>
                  <span className="text-gray-700">Specialkunskap inom elbilar</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Special Features */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 border border-gray-200 shadow-sm">
            <h3 className="text-2xl font-light text-gray-900 mb-4">
              <span className="font-normal">Elbilsspecialister</span>
            </h3>
            <p className="text-gray-600 mb-6">
              Med den växande elbilsmarknaden erbjuder vi avancerade garantilösningar 
              speciellt anpassade för elfordon.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">AVILOO batteridiagnostik</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Certifierad batteritestning</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">95% täckning av alla bilmärken</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 border border-gray-200 shadow-sm">
            <h3 className="text-2xl font-light text-gray-900 mb-4">
              <span className="font-normal">Försäljningsuppdrag</span>
            </h3>
            <p className="text-gray-600 mb-6">
              Vi hjälper även till med försäljningsuppdrag för din bil med 
              professionell marknadsföring och garantipaket.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Professionell bilpresentation</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Garantipaket för trygg försäljning</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Marknadsföring på flera plattformar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div ref={contactRef} className="mt-12">
          <div className="bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-light mb-4">
                Vill du veta mer om våra <span className="font-normal">garantier</span>?
              </h3>
              <p className="text-gray-300 mb-8">
                Våra garantiexperter hjälper dig hitta rätt skydd för din bil. 
                Få information om våra olika garantialternativ och vad som passar dig bäst.
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
                  Begär information
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