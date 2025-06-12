'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CarShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample car data - in a real app, this would come from an API
  const cars = [
    {
      id: 1,
      brand: 'Hyundai',
      model: 'i30',
      year: 2023,
      price: '289 000',
      mileage: '1 500',
      fuelType: 'Bensin',
      transmission: 'Automat',
      image: '/heropics/1.jpg', // Using hero images as placeholders
      features: ['Apple CarPlay', 'Backkamera', 'LED-strålkastare']
    },
    {
      id: 2,
      brand: 'Hyundai',
      model: 'Tucson',
      year: 2022,
      price: '425 000',
      mileage: '12 000',
      fuelType: 'Hybrid',
      transmission: 'Automat',
      image: '/heropics/2.jpg',
      features: ['AWD', 'Panoramatak', 'Adaptiv farthållare']
    },
    {
      id: 3,
      brand: 'Aixam',
      model: 'City',
      year: 2023,
      price: '189 000',
      mileage: '800',
      fuelType: 'Bensin',
      transmission: 'Automat',
      image: '/heropics/3.jpg',
      features: ['Utan körkort', 'Ekonomisk', 'Perfekt för staden']
    },
    {
      id: 4,
      brand: 'Hyundai',
      model: 'Kona Electric',
      year: 2023,
      price: '389 000',
      mileage: '2 300',
      fuelType: 'El',
      transmission: 'Automat',
      image: '/heropics/4.jpg',
      features: ['Snabbladdning', '484 km räckvidd', 'Miljövänlig']
    },
    {
      id: 5,
      brand: 'Hyundai',
      model: 'Santa Fe',
      year: 2022,
      price: '559 000',
      mileage: '8 500',
      fuelType: 'Diesel',
      transmission: 'Automat',
      image: '/heropics/5.jpg',
      features: ['7-sits', 'Dragkrok', 'Premium interiör']
    }
  ];

  const totalSlides = cars.length;
  const slidesToShow = 3; // Show 3 cars at once on desktop

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

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (totalSlides - slidesToShow + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides, slidesToShow]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (totalSlides - slidesToShow + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? totalSlides - slidesToShow : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
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
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl p-3 rounded-full transition-all duration-300 hover:scale-110 border border-gray-200"
            aria-label="Föregående bil"
          >
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl p-3 rounded-full transition-all duration-300 hover:scale-110 border border-gray-200"
            aria-label="Nästa bil"
          >
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Car Cards Container */}
          <div className="overflow-hidden mx-12">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
                width: `${(totalSlides / slidesToShow) * 100}%`
              }}
            >
              {cars.map((car, index) => (
                <div
                  key={car.id}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / totalSlides}%` }}
                >
                  <div className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl group">
                    {/* Car Image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={car.image}
                        alt={`${car.brand} ${car.model}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Price Badge */}
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-none">
                        <span className="text-lg font-medium text-gray-900">
                          {car.price} kr
                        </span>
                      </div>

                      {/* Fuel Type Badge */}
                      <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-none">
                        <span className="text-sm font-medium text-white">
                          {car.fuelType}
                        </span>
                      </div>
                    </div>

                    {/* Car Details */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-2xl font-light text-gray-900 mb-2">
                          {car.brand} {car.model}
                        </h3>
                        <p className="text-lg text-gray-600">
                          {car.year} • {car.mileage} mil
                        </p>
                      </div>

                      {/* Specifications */}
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

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Utrustning</h4>
                        <div className="space-y-2">
                          {car.features.slice(0, 3).map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mr-3"></div>
                              <span className="text-sm text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-col gap-3">
                        <button className="w-full bg-gray-900 text-white py-3 px-6 hover:bg-gray-800 transition-colors duration-300">
                          Se mer information
                        </button>
                        <button className="w-full border border-gray-300 text-gray-900 py-3 px-6 hover:border-gray-900 transition-colors duration-300">
                          Boka provkörning
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides - slidesToShow + 1 }).map((_, index) => (
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
            <button className="group relative px-8 sm:px-12 py-4 text-base sm:text-lg font-medium text-white bg-gray-900 hover:bg-gray-800 transition-all duration-300 overflow-hidden">
              <span className="relative z-10">Se alla bilar</span>
              <div className="absolute inset-0 bg-gray-800 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
            
            <button className="group relative px-8 sm:px-12 py-4 text-base sm:text-lg font-medium text-gray-900 bg-transparent border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 overflow-hidden">
              <span className="relative z-10">Kontakta oss</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 