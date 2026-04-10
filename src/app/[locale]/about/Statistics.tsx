'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import Button from '@/components/Button';

interface Statistic {
  number: string;
  label: string;
  description: string;
}

const statistics: Statistic[] = [
  {
    number: "45+",
    label: "År i branschen",
    description: "Grundat i mitten på 70-talet med gedigen erfarenhet"
  },
  {
    number: "500+",
    label: "Nöjda kunder",
    description: "Årligen betjänar vi hundratals nöjda kunder"
  },
  {
    number: "98%",
    label: "Kundnöjdhet",
    description: "Baserat på kundrecensioner och återkommande kunder"
  },
  {
    number: "2",
    label: "Auktoriseringar",
    description: "Auktoriserad service för Hyundai och Aixam"
  }
];

export default function AboutPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set([headerRef.current, storyRef.current, statsRef.current, valuesRef.current], {
      opacity: 0,
      y: 30
    });

    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    })
    .to(storyRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6")
    .to(statsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")
    .to(valuesRef.current, {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
              Om <span className="font-normal">Märsta Bilhus</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Sedan mitten på 70-talet har vi hjälpt bilägare i Stockholmsområdet med 
              kvalitetsservice, pålitlig bilförsäljning och expertis inom bilbranschen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Kontakta oss
                </Button>
              </Link>
              <Link href="/service">
                <Button variant="outline" size="lg">
                  Se våra tjänster
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div ref={storyRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-6">
              Vår <span className="font-normal">Historia</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Märsta Bilhus AB grundades i mitten på 70-talet som ett familjeföretag 
              med en vision att erbjuda professionell bilservice och kvalitetsbilar 
              till bilägare i Stockholmsområdet. Vi är en märkesoberoende handlare i Arlandastad 
              som tar hand om våra kunder som en del av familjen.
            </p>
            <p className="text-gray-600 mb-6">
              Som ett litet familjeföretag erbjuder vi personlig service och trygghet 
              för våra kunder. Vi är auktoriserad serviceverkstad för Hyundai och 
              auktoriserad återförsäljare och verkstad för Aixam mopedbil.
            </p>
            <p className="text-gray-600 mb-8">
              Vår verkstad reparerar och servar din bil på ett fackmannamässigt 
              sätt enligt tillverkarens instruktioner, vilket innebär att du 
              behåller nybilsgarantin på bilen om sådan finns kvar.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Familjeföretag</h4>
                  <p className="text-gray-600">Ett litet familjeföretag som tar hand om våra kunder personligt</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Strategisk placering</h4>
                  <p className="text-gray-600">Beläget i Arlandastad, perfekt för resenärer</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Alla bilmärken</h4>
                  <p className="text-gray-600">Vi säljer, köper, byter och förmedlar alla märken</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gray-200 aspect-[4/3] rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p className="text-sm">Märsta Bilhus</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div ref={statsRef} className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
              Märsta Bilhus i <span className="font-normal">Siffror</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Vår framgång mäts i antalet nöjda kunder och den tillit 
              vi har byggt upp under fyra decennier.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="text-4xl sm:text-5xl font-light text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {stat.label}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
            Vad vi <span className="font-normal">erbjuder</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vi erbjuder komplett service för alla dina bilbehov under samma tak.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Auktoriserad Service</h3>
            <p className="text-gray-600 mb-4">
              Auktoriserad serviceverkstad för Hyundai och Aixam med bibehållen garanti.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Alla Bilmärken</h3>
            <p className="text-gray-600 mb-4">
              Service och reparation av alla bilmärken med fackmannamässig kvalitet.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Bilförsäljning</h3>
            <p className="text-gray-600 mb-4">
              Vi säljer, köper, byter och förmedlar kvalitetsgranskade begagnade bilar.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div ref={valuesRef} className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light mb-4">
              Våra <span className="font-normal">Värderingar</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Dessa principer guidar allt vi gör och formar vår relation med våra kunder.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Kvalitet</h3>
              <p className="text-gray-300">
                Vi använder endast kvalitetsdelar och utför arbete enligt 
                tillverkarens instruktioner för att bibehålla garantier.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Trygghet</h3>
              <p className="text-gray-300">
                Som ett familjeföretag erbjuder vi trygghet och säkerhet för våra kunder 
                med personlig och professionell hantering av alla ärenden.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Service</h3>
              <p className="text-gray-300">
                Personlig service där varje kund är viktig. Vi erbjuder även 
                lånebilar för att lösa dina transportbehov.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/contact">
              <Button variant="hero" size="lg">
                Kontakta oss idag
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-6">
            Vill du veta mer om oss?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Kom och besök oss i Arlandastad eller kontakta oss för att lära dig mer 
            om våra tjänster och hur vi kan hjälpa dig med din bil.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Hitta till oss
              </Button>
            </Link>
            <a href="tel:+46700929433">
              <Button variant="outline" size="lg">
                Ring oss: 0700 929 433
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}