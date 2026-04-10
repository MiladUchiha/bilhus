'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const contactMethodsRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set([contactMethodsRef.current, infoRef.current, mapRef.current], {
        opacity: 0,
        y: 40
      });

      // Create scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate elements in sequence
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      .to([contactMethodsRef.current, infoRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      }, "-=0.2")
      .to(mapRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");

    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-white py-20 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 mb-6"
          >
            Kontakta
            <br />
            <span className="font-normal">Oss</span>
          </h2>
          <p 
            ref={subtitleRef}
            className="text-xl sm:text-2xl font-light text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Vi finns här för att hjälpa dig med alla dina bilbehov
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Contact Methods */}
          <div ref={contactMethodsRef} className="order-2 lg:order-1">
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">
                Kontakta oss direkt
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Välj det sätt som passar dig bäst för att komma i kontakt med oss.
              </p>
            </div>

            <div className="space-y-6">
              {/* Phone Contact */}
              <div className="bg-gray-50 border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Ring oss direkt</h4>
                    <p className="text-gray-600">Snabbaste sättet att få hjälp</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Bilförsäljning:</span>
                    <a href="tel:0700929433" className="text-lg font-medium text-blue-600 hover:text-blue-800">
                      0700 929 433
                    </a>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Verkstad:</span>
                    <a href="tel:08-59120541" className="text-lg font-medium text-blue-600 hover:text-blue-800">
                      08-59 120 541
                    </a>
                  </div>
                </div>
              </div>

              {/* Email Contact */}
              <div className="bg-gray-50 border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Skicka e-post</h4>
                    <p className="text-gray-600">Vi svarar inom 24 timmar</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Verkstad:</span>
                  <a href="mailto:kundservice@marstabilhus.se" className="text-lg font-medium text-green-600 hover:text-green-800">
                    kundservice@marstabilhus.se
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Försäljning:</span>
                  <a href="mailto:info@marstabilhus.se" className="text-lg font-medium text-green-600 hover:text-green-800">
                    info@marstabilhus.se
                  </a>
                </div>
              </div>

              {/* Visit Us */}
              <div className="bg-gray-50 border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Besök oss</h4>
                    <p className="text-gray-600">Välkommen till vår verkstad</p>
                  </div>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p className="font-medium text-gray-900">Maskingatan 12</p>
                  <p>195 60 Arlandastad</p>
                  <p className="text-sm">• Gratis parkering • 5 min från Arlanda</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div ref={infoRef} className="order-1 lg:order-2">
            <div className="space-y-8">
              {/* Direct Contact */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6">
                  Kontaktinformation
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Telefon</h4>
                    <div className="space-y-3">
                      <div>
                        <a 
                          href="tel:+46700929433" 
                          className="text-xl text-gray-600 hover:text-gray-900 transition-colors duration-300 block"
                        >
                          0700 929 433
                        </a>
                        <span className="text-sm text-gray-500">Bilförsäljning</span>
                      </div>
                      <div>
                        <a 
                          href="tel:+46859120541" 
                          className="text-xl text-gray-600 hover:text-gray-900 transition-colors duration-300 block"
                        >
                          08 591 205 41
                        </a>
                        <span className="text-sm text-gray-500">Verkstad / Service</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">E-post</h4>
                    <a 
                      href="mailto:info@marstabilhus.se" 
                      className="text-xl text-gray-600 hover:text-gray-900 transition-colors duration-300 block"
                    >
                      info@marstabilhus.se
                    </a>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Adress</h4>
                    <div className="text-xl text-gray-600 leading-relaxed">
                      Maskingatan 12<br />
                      195 60 Arlandastad<br />
                      Sverige
                    </div>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="border-t border-gray-200 pt-8">
                <h4 className="text-lg font-medium text-gray-900 mb-6">Öppettider</h4>
                
                <div className="space-y-4">
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-900 mb-2">Bilförsäljning</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Måndag - Torsdag</span>
                        <span className="text-gray-900 font-medium">09:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fredag</span>
                        <span className="text-gray-900 font-medium">09:00 - 17:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lördag</span>
                        <span className="text-gray-900 font-medium">11:00 - 15:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Söndag</span>
                        <span className="text-gray-900 font-medium">Enligt överenskommelse</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Verkstad</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Måndag - Fredag</span>
                        <span className="text-gray-900 font-medium">07:30 - 16:30</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lördag - Söndag</span>
                        <span className="text-gray-900 font-medium">Stängt</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 border border-gray-200">
                  <p className="text-sm text-gray-600">
                    <strong>Tips:</strong> Ring i förväg för att boka tid. Akuta reparationer kan ibland tas emot utanför ordinarie öppettider.
                  </p>
                </div>
              </div>

              {/* Location Benefits */}
              <div className="border-t border-gray-200 pt-8">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Varför Arlandastad?</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-gray-900">Perfekt för resenärer</p>
                      <p className="text-gray-600">Lämna bilen för service medan du reser</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-gray-900">Nära E4:an</p>
                      <p className="text-gray-600">Enkelt att hitta och komma till</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-gray-900">Gratis parkering</p>
                      <p className="text-gray-600">Inga parkeringsavgifter under besöket</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div ref={mapRef} className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6 text-center">
            Hitta till oss
          </h3>
          
          {/* Interactive Google Maps Embed */}
          <div className="relative h-96 bg-gray-200 border border-gray-300 overflow-hidden rounded-none">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2026.5962836474654!2d17.9163447!3d59.6520228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d46c2f3e3d5%3A0x41e7c7c7c7c7c7c7!2sMaskingatan%2012%2C%20195%2060%20Arlandastad%2C%20Sweden!5e0!3m2!1sen!2sse!4v1703123456789!5m2!1sen!2sse"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Märsta Bilhus AB - Maskingatan 12, Arlandastad"
              className="grayscale hover:grayscale-0 transition-all duration-300"
            />
            
            {/* Custom overlay for styling */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <a 
              href="https://maps.google.com/?q=Märsta+Bilhus+AB,+Maskingatan+12,+195+60+Arlandastad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors duration-300 px-4 py-2 border border-gray-200 hover:border-gray-900"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Öppna i Google Maps
            </a>
            
            <a 
              href="https://www.apple.com/maps/?q=Märsta+Bilhus+AB,+Maskingatan+12,+195+60+Arlandastad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors duration-300 px-4 py-2 border border-gray-200 hover:border-gray-900"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Apple Maps
            </a>
            
            <button
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords;
                    const destination = "Maskingatan 12, 195 60 Arlandastad";
                    window.open(`https://www.google.com/maps/dir/${latitude},${longitude}/${encodeURIComponent(destination)}`, '_blank');
                  });
                } else {
                  window.open('https://maps.google.com/?q=Märsta+Bilhus+AB,+Maskingatan+12,+195+60+Arlandastad', '_blank');
                }
              }}
              className="inline-flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors duration-300 px-4 py-2 border border-gray-200 hover:border-gray-900"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Få vägbeskrivning
            </button>
          </div>
          
          {/* Address and directions info */}
          <div className="mt-8 bg-gray-50 border border-gray-200 p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Adress</h4>
                <p className="text-gray-600 mb-2">
                  <strong>Märsta Bilhus AB</strong><br />
                  Maskingatan 12<br />
                  195 60 Arlandastad<br />
                  Sverige
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Vägbeskrivning</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p>Från E4: Ta avfart 195 mot Arlandastad</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p>5 minuter från Arlanda Airport</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p>Gratis parkering på plats</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="text-center bg-gray-50 border border-gray-200 p-8 sm:p-12">
          <h3 className="text-2xl font-light text-gray-900 mb-4">
            Akut hjälp?
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            För akuta reparationer eller nödsituationer, ring oss direkt. Vi försöker alltid hjälpa till även utanför ordinarie öppettider.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+46700929433"
              className="inline-block group relative px-8 sm:px-12 py-4 text-base sm:text-lg font-medium text-white bg-red-600 hover:bg-red-700 transition-all duration-300 overflow-hidden text-center"
            >
              <span className="relative z-10">Bilförsäljning: 0700 929 433</span>
              <div className="absolute inset-0 bg-red-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </a>
            <a 
              href="tel:+46859120541"
              className="inline-block group relative px-8 sm:px-12 py-4 text-base sm:text-lg font-medium text-white bg-red-600 hover:bg-red-700 transition-all duration-300 overflow-hidden text-center"
            >
              <span className="relative z-10">Verkstad: 08 591 205 41</span>
              <div className="absolute inset-0 bg-red-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
