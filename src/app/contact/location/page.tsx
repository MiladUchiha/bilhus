'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FindUsPage() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const infoCardsRef = useRef<HTMLDivElement>(null);
  const directionsRef = useRef<HTMLDivElement>(null);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const locationImages = [
    '/heropics/6.jpg', // Exterior/building view
    '/bilhus.jpg', // Workshop/interior view
    '/heropics/1.jpg', // Professional car service environment
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set([mapSectionRef.current, infoCardsRef.current, directionsRef.current], {
        opacity: 0,
        y: 40
      });

      // Hero animation
      const heroTl = gsap.timeline();
      heroTl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6");

      // Scroll-triggered animations
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: mapSectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      scrollTl.to(mapSectionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      })
      .to(infoCardsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      .to(directionsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Background image slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % locationImages.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [locationImages.length]);

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[70vh] sm:min-h-[80vh] flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-16 sm:py-24 overflow-hidden"
      >
        {/* Background Image Slideshow */}
        <div className="absolute inset-0 z-0">
          {locationImages.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-3000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image}
                alt={`Märsta Bilhus location ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                quality={90}
              />
            </div>
          ))}
          
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6 leading-[0.9]"
            style={{
              textShadow: '3px 3px 6px rgba(0,0,0,0.9), 0 0 15px rgba(0,0,0,0.5)'
            }}
          >
            Hitta till
            <br />
            <span className="font-normal">Oss</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl sm:text-2xl md:text-3xl font-light text-white max-w-2xl mx-auto leading-relaxed"
            style={{
              textShadow: '2px 2px 6px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.5)'
            }}
          >
            Maskingatan 12, Arlandastad
            <br />
            <span className="text-lg sm:text-xl">Perfekt beläget nära Arlanda</span>
          </p>
        </div>

        {/* Image indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden sm:flex space-x-2">
          {locationImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleImageChange(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 shadow-lg ${
                index === currentImageIndex 
                  ? 'bg-white scale-100' 
                  : 'bg-white/50 hover:bg-white/80 hover:scale-105'
              }`}
              aria-label={`Visa bild ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Interactive Map Section */}
      <section 
        ref={mapSectionRef}
        className="py-20 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-6">
              Interaktiv karta
            </h2>
            <p className="text-xl font-light text-gray-600 max-w-2xl mx-auto">
              Klicka på kartan för att få vägbeskrivning eller öppna i din föredragna kartapp
            </p>
          </div>

          {/* Large Interactive Map */}
          <div className="relative h-[500px] sm:h-[600px] bg-gray-200 border border-gray-300 overflow-hidden mb-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2026.5962836474654!2d17.9163447!3d59.6520228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d46c2f3e3d5%3A0x41e7c7c7c7c7c7c7!2sMaskingatan%2012%2C%20195%2060%20Arlandastad%2C%20Sweden!5e0!3m2!1sen!2sse!4v1703123456789!5m2!1sen!2sse"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Märsta Bilhus AB - Maskingatan 12, Arlandastad"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
            
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/5 via-transparent to-transparent"></div>
          </div>

          {/* Map Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
            <a 
              href="https://maps.google.com/?q=Märsta+Bilhus+AB,+Maskingatan+12,+195+60+Arlandastad"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 px-6 py-4 border border-gray-200 hover:border-gray-900 hover:bg-gray-900"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="font-medium">Google Maps</span>
            </a>
            
            <a 
              href="https://www.apple.com/maps/?q=Märsta+Bilhus+AB,+Maskingatan+12,+195+60+Arlandastad"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 px-6 py-4 border border-gray-200 hover:border-gray-900 hover:bg-gray-900"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium">Apple Maps</span>
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
              className="group flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 px-6 py-4 border border-gray-200 hover:border-gray-900 hover:bg-gray-900"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span className="font-medium">Vägbeskrivning</span>
            </button>
          </div>
        </div>
      </section>

      {/* Location Information Cards */}
      <section 
        ref={infoCardsRef}
        className="py-20 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-6">
              Lägesfördelar
            </h2>
            <p className="text-xl font-light text-gray-600 max-w-2xl mx-auto">
              Strategiskt placerad för maximal bekvämlighet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Arlanda Proximity */}
            <div className="group bg-white p-8 border border-gray-200 hover:border-gray-900 transition-all duration-300">
              <div className="w-12 h-12 bg-gray-100 group-hover:bg-gray-900 rounded-full flex items-center justify-center mb-6 transition-colors duration-300">
                <svg className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">
                5 min från Arlanda
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Perfekt för resenärer som vill lämna bilen för service medan de är bortrest. Vi kan hämta och lämna på flygplatsen.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                  <span>Terminal 2: 3 km</span>
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                  <span>Terminal 5: 4 km</span>
                </div>
              </div>
            </div>

            {/* E4 Access */}
            <div className="group bg-white p-8 border border-gray-200 hover:border-gray-900 transition-all duration-300">
              <div className="w-12 h-12 bg-gray-100 group-hover:bg-gray-900 rounded-full flex items-center justify-center mb-6 transition-colors duration-300">
                <svg className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">
                Nära E4:an
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Enkelt att hitta med utmärkt anslutning till både Stockholm och Uppsala. Avfart 195 Arlandastad.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                  <span>Stockholm City: 35 min</span>
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                  <span>Uppsala: 25 min</span>
                </div>
              </div>
            </div>

            {/* Parking & Facilities */}
            <div className="group bg-white p-8 border border-gray-200 hover:border-gray-900 transition-all duration-300 md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-gray-100 group-hover:bg-gray-900 rounded-full flex items-center justify-center mb-6 transition-colors duration-300">
                <svg className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">
                Bekväma faciliteter
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Gratis parkering, kundlounge och moderna verkstadsfaciliteter. Allt för att göra ditt besök så smidigt som möjligt.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                  <span>50+ parkeringsplatser</span>
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                  <span>Kundväntan med WiFi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Directions */}
      <section 
        ref={directionsRef}
        className="py-20 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-6">
              Detaljerad vägbeskrivning
            </h2>
            <p className="text-xl font-light text-gray-600 max-w-2xl mx-auto">
              Steg-för-steg instruktioner för att hitta till oss
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* From Stockholm */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-light text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4">1</span>
                  Från Stockholm
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mt-1 mr-4">
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Kör norrut på E4</h4>
                      <p className="text-gray-600">Följ E4 norrut från Stockholm centrum (ca 30 km)</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mt-1 mr-4">
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Ta avfart 195</h4>
                      <p className="text-gray-600">Avfart mot Arlandastad/Rosersberg</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mt-1 mr-4">
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Följ skyltar till Arlandastad</h4>
                      <p className="text-gray-600">Kör rakt fram i ca 2 km</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center mt-1 mr-4 text-xs">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Sväng höger in på Maskingatan</h4>
                      <p className="text-gray-600">Vi ligger på nummer 12, på höger sida</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* From Uppsala */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-light text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4">2</span>
                  Från Uppsala
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mt-1 mr-4">
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Kör söderut på E4</h4>
                      <p className="text-gray-600">Följ E4 söderut från Uppsala (ca 20 km)</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mt-1 mr-4">
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Ta avfart 195</h4>
                      <p className="text-gray-600">Avfart mot Arlandastad/Rosersberg</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mt-1 mr-4">
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Följ skyltar till Arlandastad</h4>
                      <p className="text-gray-600">Kör rakt fram i ca 2 km</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center mt-1 mr-4 text-xs">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Sväng höger in på Maskingatan</h4>
                      <p className="text-gray-600">Vi ligger på nummer 12, på höger sida</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Box */}
          <div className="mt-20 bg-gray-50 border border-gray-200 p-8 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Adress</h4>
                <div className="text-gray-600 space-y-1">
                  <p className="font-medium">Märsta Bilhus AB</p>
                  <p>Maskingatan 12</p>
                  <p>195 60 Arlandastad</p>
                  <p>Sverige</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Kontakt</h4>
                <div className="space-y-3">
                  <a 
                    href="tel:+46850555555" 
                    className="block text-gray-600 hover:text-gray-900 transition-colors duration-300"
                  >
                    📞 +46 8-505 555 55
                  </a>
                  <a 
                    href="mailto:info@marstabilhus.se" 
                    className="block text-gray-600 hover:text-gray-900 transition-colors duration-300"
                  >
                    ✉️ info@marstabilhus.se
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Öppettider</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between md:justify-start md:space-x-4">
                    <span className="text-gray-600">Mån-Fre</span>
                    <span className="text-gray-900 font-medium">08:00-17:00</span>
                  </div>
                  <div className="flex justify-between md:justify-start md:space-x-4">
                    <span className="text-gray-600">Lördag</span>
                    <span className="text-gray-900 font-medium">09:00-14:00</span>
                  </div>
                  <div className="flex justify-between md:justify-start md:space-x-4">
                    <span className="text-gray-600">Söndag</span>
                    <span className="text-gray-900 font-medium">Stängt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 