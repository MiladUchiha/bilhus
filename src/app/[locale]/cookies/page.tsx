'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CookiesPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(contentRef.current, 
          { 
            opacity: 0, 
            y: 30 
          },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            ease: "power2.out"
          }
        );
      }
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Header */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-gray-900 mb-6">
            Cookies
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Information om hur Märsta Bilhus hanterar cookies och din personliga data
          </p>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          
          {/* Main Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-6">
              Märsta Bilhus och din data
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                Märsta Bilhus ansvarar för hanteringen av din data. Märsta Bilhus skyddar dina personuppgifter och arbetar aktivt för att du ska få en så bra upplevelse som möjligt. Här kan du läsa mer om hur Märsta Bilhus hanterar din personliga data och hur datan du delar med oss kan påverka din upplevelse på sajten.
              </p>
            </div>
          </div>

          {/* What are cookies */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h3 className="text-2xl font-light text-gray-900 mb-6">
              Vad är cookies?
            </h3>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                Cookies är små textfiler som lagras i din webbläsare när du besöker en webbplats. De hjälper oss att förbättra din upplevelse genom att komma ihåg dina preferenser och ge dig relevant innehåll.
              </p>
            </div>
          </div>

          {/* How we use cookies */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h3 className="text-2xl font-light text-gray-900 mb-6">
              Hur vi använder cookies
            </h3>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                Vi använder cookies för att:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Skydda din data och säkerställa webbplatsens säkerhet</li>
                <li>Anpassa tjänster och erbjudanden till dina behov</li>
                <li>Förbättra användarupplevelsen på vår webbplats</li>
                <li>Analysera hur webbplatsen används för att kunna förbättra den</li>
              </ul>
            </div>
          </div>

          {/* Types of cookies */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h3 className="text-2xl font-light text-gray-900 mb-6">
              Typer av cookies vi använder
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Nödvändiga cookies
                </h4>
                <p className="text-gray-700">
                  Dessa cookies är nödvändiga för att webbplatsen ska fungera korrekt och kan inte stängas av.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Funktionella cookies
                </h4>
                <p className="text-gray-700">
                  Dessa cookies hjälper oss att komma ihåg dina val och preferenser för att förbättra din upplevelse.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Analytiska cookies
                </h4>
                <p className="text-gray-700">
                  Dessa cookies hjälper oss att förstå hur besökare interagerar med webbplatsen så att vi kan förbättra den.
                </p>
              </div>
            </div>
          </div>

          {/* Your choices */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h3 className="text-2xl font-light text-gray-900 mb-6">
              Dina val
            </h3>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                Du kan när som helst välja att acceptera eller avvisa cookies genom att ändra inställningarna i din webbläsare. Observera att om du väljer att blockera alla cookies kan vissa funktioner på webbplatsen påverkas.
              </p>
              <p>
                För mer information om hur du hanterar cookies i din webbläsare, besök din webbläsares hjälpsidor.
              </p>
            </div>
          </div>

          {/* Contact information */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h3 className="text-2xl font-light text-gray-900 mb-6">
              Kontakta oss
            </h3>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                Om du har frågor om vår hantering av cookies eller personuppgifter, är du välkommen att kontakta oss:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-2">
                  <p><strong>Märsta Bilhus AB</strong></p>
                  <p>Maskingatan 12</p>
                  <p>195 60 Arlandastad</p>
                  <p>
                    <a href="mailto:kundservice@marstabilhus.se" className="text-blue-600 hover:text-blue-800">
                      kundservice@marstabilhus.se
                    </a>
                  </p>
                  <p>
                    <a href="tel:+46700929433" className="text-blue-600 hover:text-blue-800">
                      0700 929 433
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}