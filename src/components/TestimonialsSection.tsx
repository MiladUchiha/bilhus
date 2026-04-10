'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Testimonial {
  id: number;
  name: string;
  location: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
  car?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Enis Maljici",
    location: "",
    service: "Bilköp",
    rating: 5,
    comment: "Jag köpte nyligen en bil från Märsta bilhus och jag är verkligen väldigt nöjd med mitt köp. Personalens bemötande var utmärkt; de var trevliga, hjälpsamma och mycket professionella genom hela processen. De tog sig tid att svara på alla mina frågor och gjorde att jag kände mig trygg i mitt val. Jag rekommenderar verkligen Märsta bilhus till alla som letar efter en ny bil!",
    date: "2024-02-20"
  },
  {
    id: 2,
    name: "Ahmad Mnawar",
    location: "",
    service: "Bilköp",
    rating: 5,
    comment: "Jag köpte en bil. riktigt fin service, trevliga personal och jag fick en riktig smidig affär! Rekommenderas starkt!",
    date: "2024-01-20"
  },
  {
    id: 3,
    name: "radkobg radkobg",
    location: "Bulgarien",
    service: "Bilköp (Volkswagen Touran, gas)",
    rating: 5,
    comment: "Jag köpte en Volkswagen Turan på gas för tre år sedan. Bilen är fortfarande felfri. Ja, det finns rost undertill vilket är normalt, men allt annat är perfekt. Jag bytte bakre bromsbelägg och skivor efter 100 000 km. Ja, bromsok rostar, därför behövs periodiskt underhåll – det gäller allt. Jag körde bilen hem till Bulgarien utan problem och den fungerar fortfarande utmärkt. Tack för affären och lycka till!",
    date: "2023-11-15"
  },
  {
    id: 4,
    name: "Dmitry Grishchenko",
    location: "Stockholm",
    service: "Bilservice",
    rating: 5,
    comment: "Använt dem två gånger för service av min bil. Bästa priset jag hittat i Stockholm, servicen är väl dokumenterad. Erbjuder gratis lånebil (KIA Picanto, automat). Du kan lita på att de bara byter lampor, torkarblad etc. om det verkligen behövs. Trevlig och hjälpsam personal.",
    date: "2023-05-10"
  },
  {
    id: 5,
    name: "Azad Jalil",
    location: "",
    service: "Försäkring, service och finans",
    rating: 5,
    comment: "Bilhus AB hjälpte mig med allt från försäkring till service och gav jätte förmånlig finans! Tack underbart bemötande! Bra servis från fösta gången. Fick kontakt med en super bra säljare som hjälpte oss med allt som gick smidigt och enkelt redan från första stund. Mycket nöjda och absolut ett återkommande kund!",
    date: "2023-05-01"
  },
  {
    id: 6,
    name: "JO.Joker Gamer",
    location: "",
    service: "Bilköp",
    rating: 5,
    comment: "Har handlat min fina bil av detta seriösa företag, riktigt fin service, trevliga personal och erbjöd en riktig smidig affär! Rekommenderas starkt!",
    date: "2023-04-15"
  },
  {
    id: 7,
    name: "Petra Wilund",
    location: "Gävle",
    service: "Akut bilservice",
    rating: 5,
    comment: "Otroligt trevliga och hjälpsamma när vi kom från Gävle och vår bil började gå dåligt. Tog in vår bil direkt, felsökte, fixade och gav goda råd. Tack så hemskt mycket! Konserten var bra och vi hann dit i tid och kom hem igen utan minsta problem tack vare er.",
    date: "2019-06-10"
  },
  {
    id: 8,
    name: "Alex K",
    location: "",
    service: "Bilköp",
    rating: 5,
    comment: "Jag har varit i många bilsalonger i jakt efter min första bil, och kan med all säkerhet säga att det är svårt att hitta ett bättre bemötande både från ägaren och personalen än det ni får uppleva på Märsta Bilhus. Stort tack för er tid, tålamod och den kompetens ni erbjuder till kunden! Rekommenderar detta ställe STARKT!",
    date: "2021-05-01"
  },
  {
    id: 9,
    name: "Alicja Löfqvist",
    location: "",
    service: "Bilköp",
    rating: 5,
    comment: "En seriös bilhandlare. Mycket bra service och trevligt bemötande. Rekommenderar starkt.",
    date: "2018-04-01"
  }
];

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const testimonialCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set(testimonialsRef.current, {
        opacity: 0,
        y: 30
      });

      gsap.set(testimonialCardsRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 20
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
      .to(testimonialsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.2")
      .to(testimonialCardsRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.4");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('sv-SE', { 
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section 
      ref={sectionRef}
      className="bg-white py-20 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 mb-6"
          >
            {t('title')}
            <br />
            <span className="font-normal">säger</span>
          </h2>
          <p 
            ref={subtitleRef}
            className="text-xl sm:text-2xl font-light text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Main Featured Testimonial */}
        <div ref={testimonialsRef} className="mb-16 sm:mb-20">
          <div className="bg-gray-50 border border-gray-200 p-8 sm:p-12 lg:p-16 text-center min-h-[500px] sm:min-h-[550px] lg:min-h-[600px] flex flex-col justify-between">
            <div className="max-w-4xl mx-auto flex flex-col justify-between h-full">
              {/* Rating */}
              <div className="flex justify-center mb-8">
                {renderStars(testimonials[currentIndex].rating)}
              </div>

              {/* Quote */}
              <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 leading-relaxed flex-1 flex items-center justify-center px-4">
                <span>&ldquo;{testimonials[currentIndex].comment}&rdquo;</span>
              </blockquote>

              {/* Author Info */}
              <div className="border-t border-gray-200 pt-8 mt-8">
                <div className="text-xl font-light text-gray-900 mb-3">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-gray-600 mb-3 font-medium">
                  {testimonials[currentIndex].location}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-gray-500">
                  <span>{testimonials[currentIndex].service}</span>
                  {testimonials[currentIndex].car && (
                    <>
                      <span className="hidden sm:inline text-gray-300">•</span>
                      <span>{testimonials[currentIndex].car}</span>
                    </>
                  )}
                  <span className="hidden sm:inline text-gray-300">•</span>
                  <span>{formatDate(testimonials[currentIndex].date)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gray-900 scale-110' 
                    : 'bg-gray-300 hover:bg-gray-500'
                }`}
                aria-label={`Gå till recension ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Grid of Testimonial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-20 sm:mb-24">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => {
                testimonialCardsRef.current[index] = el;
              }}
              className="group relative bg-white border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/30 p-8 sm:p-10 hover:-translate-y-1"
            >
              {/* Rating */}
              <div className="flex mb-6">
                {renderStars(testimonial.rating)}
              </div>

              {/* Comment */}
              <p className="text-gray-600 mb-8 leading-relaxed text-base sm:text-lg">
                &ldquo;{testimonial.comment}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-gray-200 pt-6">
                <div className="font-medium text-gray-900 mb-2 text-lg">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {testimonial.service}{testimonial.location ? ` \u2022 ${testimonial.location}` : ''}
                </div>
              </div>

              {/* Hover Effect - Subtle left border */}
              <div className="absolute left-0 top-0 w-1 h-0 bg-gray-900 group-hover:h-full transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 sm:pt-20 border-t border-gray-100">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">90%</div>
            <div className="text-sm sm:text-base text-gray-600 font-medium tracking-wide">{t('stats.satisfaction')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">500+</div>
            <div className="text-sm sm:text-base text-gray-600 font-medium tracking-wide">{t('stats.customers')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">4.0</div>
            <div className="text-sm sm:text-base text-gray-600 font-medium tracking-wide">Genomsnittlig rating</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 sm:mt-20">
          <div className="max-w-3xl mx-auto mb-8">
            <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">
              {t('cta.title')}
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Kontakta oss idag för att uppleva vår prisade service själv.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact" 
              className="group relative px-8 sm:px-12 py-4 text-base sm:text-lg font-medium text-white bg-gray-900 hover:bg-gray-800 transition-all duration-300 overflow-hidden inline-block text-center"
            >
              <span className="relative z-10">Kontakta oss</span>
              <div className="absolute inset-0 bg-gray-800 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </Link>
            <Link 
              href="/about" 
              className="group relative px-8 sm:px-12 py-4 text-base sm:text-lg font-medium text-gray-900 bg-transparent border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 overflow-hidden inline-block text-center"
            >
              <span className="relative z-10">Läs mer om oss</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}