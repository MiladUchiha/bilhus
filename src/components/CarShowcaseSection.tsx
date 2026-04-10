'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useCars } from '../context/CarContext';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Car {
  id: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  originalPrice?: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  image: string;
  features: string[];
  shareUrl?: string;
  licensePlate?: string;
  monthlyPayment?: number;
  interestRate?: string;
}

export default function CarShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const { cars: allCars, loading, error } = useCars();
  const cars = allCars.slice(0, 9);

  const totalSlides = cars.length;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set(carouselRef.current, {
        opacity: 0,
        y: 30
      });

      gsap.set(cardsRef.current, {
        opacity: 0,
        scale: 0.95
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
      .to(carouselRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.2")
      .to(cardsRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.4");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Get slides to show based on screen size
  const [slidesToShow, setSlidesToShow] = useState(1);
  
  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(1);
      }
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  const maxIndex = Math.max(0, totalSlides - slidesToShow);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= slidesToShow) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex, totalSlides, slidesToShow]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }

    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section 
      ref={sectionRef}
      className="bg-white py-20 sm:py-32 px-4 sm:px-6 lg:px-8"
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
            Aktuella
            <br />
            <span className="font-normal">Bilar</span>
          </h2>
          <p 
            ref={subtitleRef}
            className="text-xl sm:text-2xl font-light text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Upptäck vårt utbud av kvalitetsgranskade fordon
          </p>
        </div>

        {/* Carousel Container */}
        <div ref={carouselRef} className="relative">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              <span className="ml-4 text-lg text-gray-600">Hämtar aktuella bilar...</span>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-gray-900 text-white px-6 py-2 hover:bg-gray-800 transition-colors"
              >
                Försök igen
              </button>
            </div>
          )}

          {/* Cars Display - Simple centered grid when few cars */}
          {!loading && cars.length > 0 && totalSlides <= slidesToShow && (
            <div className="flex justify-center gap-8 flex-wrap">
              {cars.map((car: Car, index: number) => (
                <div
                  key={car.id}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
                >
                  <div className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl group">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={car.image}
                        alt={`${car.brand} ${car.model}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/heropics/1.jpg' }}
                      />
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-none">
                        <div className="text-right">
                          {car.originalPrice ? (
                            <>
                              <span className="text-lg font-bold text-red-600 block">{car.price} kr</span>
                              <span className="text-sm text-gray-500 line-through block">{car.originalPrice} kr</span>
                            </>
                          ) : (
                            <span className="text-lg font-medium text-gray-900 block">{car.price} kr</span>
                          )}
                          {car.monthlyPayment && (
                            <span className="text-sm text-gray-600 block mt-1">{car.monthlyPayment.toLocaleString('sv-SE')} kr/mån</span>
                          )}
                        </div>
                      </div>
                      <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-none">
                        <span className="text-sm font-medium text-white">{car.fuelType}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-2xl font-light text-gray-900 mb-2">{car.brand} {car.model}</h3>
                        <p className="text-lg text-gray-600">{car.year} &bull; {car.mileage} mil</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                        <div>
                          <span className="text-gray-500">Bränsle:</span>
                          <span className="text-gray-900 font-medium ml-2">{car.fuelType}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Växellåda:</span>
                          <span className="text-gray-900 font-medium ml-2">{car.transmission}</span>
                        </div>
                      </div>
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Utrustning</h4>
                        <div className="space-y-2">
                          {car.features?.slice(0, 3).map((feature: string, featureIndex: number) => (
                            <div key={featureIndex} className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mr-3"></div>
                              <span className="text-sm text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <Link href={`/cars/${car.id}`} className="w-full bg-gray-900 text-white py-3 px-6 hover:bg-gray-800 transition-colors duration-300 text-center block">
                          Se mer information
                        </Link>
                        <Link href="/contact" className="w-full border border-gray-300 text-gray-900 py-3 px-6 hover:border-gray-900 transition-colors duration-300 text-center block">
                          Boka provkörning
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Cars Display - Carousel when many cars */}
          {!loading && cars.length > 0 && totalSlides > slidesToShow && (
            <>
              {/* Navigation Arrows - Desktop only */}
              <button
                onClick={prevSlide}
                className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl p-3 rounded-full transition-all duration-300 hover:scale-110 border border-gray-200"
                aria-label="Föregående bil"
              >
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl p-3 rounded-full transition-all duration-300 hover:scale-110 border border-gray-200"
                aria-label="Nästa bil"
              >
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Car Cards Container */}
              <div className="overflow-hidden lg:mx-12">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * (100 / (totalSlides || 1))}%)`,
                    width: `${(totalSlides / slidesToShow) * 100}%`,
                  }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {cars.map((car: Car, index: number) => (
                    <div
                      key={car.id}
                      ref={(el) => { cardsRef.current[index] = el; }}
                      className="flex-shrink-0 px-4"
                      style={{ width: `${100 / totalSlides}%` }}
                    >
                      <div className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl group">
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={car.image}
                            alt={`${car.brand} ${car.model}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/heropics/1.jpg' }}
                          />
                          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-none">
                            <div className="text-right">
                              {car.originalPrice ? (
                                <>
                                  <span className="text-lg font-bold text-red-600 block">{car.price} kr</span>
                                  <span className="text-sm text-gray-500 line-through block">{car.originalPrice} kr</span>
                                </>
                              ) : (
                                <span className="text-lg font-medium text-gray-900 block">{car.price} kr</span>
                              )}
                              {car.monthlyPayment && (
                                <span className="text-sm text-gray-600 block mt-1">{car.monthlyPayment.toLocaleString('sv-SE')} kr/mån</span>
                              )}
                            </div>
                          </div>
                          <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-none">
                            <span className="text-sm font-medium text-white">{car.fuelType}</span>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="mb-4">
                            <h3 className="text-2xl font-light text-gray-900 mb-2">{car.brand} {car.model}</h3>
                            <p className="text-lg text-gray-600">{car.year} &bull; {car.mileage} mil</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                            <div>
                              <span className="text-gray-500">Bränsle:</span>
                              <span className="text-gray-900 font-medium ml-2">{car.fuelType}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Växellåda:</span>
                              <span className="text-gray-900 font-medium ml-2">{car.transmission}</span>
                            </div>
                          </div>
                          <div className="mb-6">
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Utrustning</h4>
                            <div className="space-y-2">
                              {car.features?.slice(0, 3).map((feature: string, featureIndex: number) => (
                                <div key={featureIndex} className="flex items-center">
                                  <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mr-3"></div>
                                  <span className="text-sm text-gray-600">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col gap-3">
                            <Link href={`/cars/${car.id}`} className="w-full bg-gray-900 text-white py-3 px-6 hover:bg-gray-800 transition-colors duration-300 text-center block">
                              Se mer information
                            </Link>
                            <Link href="/contact" className="w-full border border-gray-300 text-gray-900 py-3 px-6 hover:border-gray-900 transition-colors duration-300 text-center block">
                              Boka provkörning
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots Navigation */}
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-gray-900 scale-110'
                        : 'bg-gray-300 hover:bg-gray-500'
                    }`}
                    aria-label={`Gå till slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 sm:mt-20">
          <div className="max-w-3xl mx-auto mb-8">
            <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">
              Hittar du inte vad du letar efter?
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Vi hjälper dig att hitta rätt bil. Kontakta oss för personlig rådgivning.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/cars"
              className="group relative px-8 sm:px-12 py-4 text-base sm:text-lg font-medium text-white bg-gray-900 hover:bg-gray-800 transition-all duration-300 overflow-hidden inline-block text-center"
            >
              <span className="relative z-10">Visa mer</span>
              <div className="absolute inset-0 bg-gray-800 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </Link>
            
            <Link 
              href="/contact"
              className="group relative px-8 sm:px-12 py-4 text-base sm:text-lg font-medium text-gray-900 bg-transparent border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 overflow-hidden inline-block text-center"
            >
              <span className="relative z-10">Kontakta oss</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}