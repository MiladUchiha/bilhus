'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Button from './Button';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = [
    '/heropics/1.jpg',
    '/heropics/2.jpg',
    '/heropics/3.jpg',
    '/heropics/4.jpg',
    '/heropics/5.jpg',
    '/heropics/6.jpg'
  ];

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Set initial states
    gsap.set([titleRef.current, taglineRef.current, ctaRef.current, footerRef.current], {
      opacity: 0,
      y: 20
    });

    // Animate elements in sequence - no continuous animations
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power2.out"
    })
    .to(taglineRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.8")
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    .to(footerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4");

  }, []);

  // Background image slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // Slightly longer for better user experience

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleCTAClick = () => {
    // Smooth scroll to contact section (will be implemented later)
    console.log('Navigate to booking');
  };

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <main 
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-8 sm:py-12 overflow-hidden"
    >
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Märsta Bilhus ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              quality={90}
            />
          </div>
        ))}
        
        {/* Enhanced dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60 sm:bg-black/45"></div>
        
        {/* Enhanced gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80 sm:from-black/30 sm:via-transparent sm:to-black/70"></div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center max-w-6xl mx-auto">
        <h1 
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-light tracking-tight text-white mb-6 sm:mb-8 leading-[0.85] sm:leading-[0.9]"
          style={{
            textShadow: '3px 3px 6px rgba(0,0,0,0.9), 0 0 15px rgba(0,0,0,0.5), 1px 1px 3px rgba(0,0,0,1)'
          }}
        >
          Märsta
          <br />
          <span className="font-normal">Bilhus</span>
        </h1>
        
        <p 
          ref={taglineRef}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white mb-8 sm:mb-12 max-w-4xl leading-relaxed px-4 sm:px-0"
          style={{
            textShadow: '2px 2px 6px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.5), 1px 1px 3px rgba(0,0,0,1)'
          }}
        >
          Auktoriserad service för alla bilmärken
          <br className="hidden sm:block" />
          i Arlandastad, Stockholm
        </p>
        
        <Button
          ref={ctaRef}
          onClick={handleCTAClick}
          variant="hero"
          size="xl"
        >
          Boka tid
        </Button>
      </div>

      {/* Minimal Footer Info */}
      <footer 
        ref={footerRef}
        className="relative z-10 text-xs sm:text-sm text-white border-t border-white/40 pt-6 sm:pt-8 mt-6 sm:mt-8 backdrop-blur-sm bg-black/20 rounded-t-lg"
        style={{
          textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.6)'
        }}
      >
        {/* Mobile Layout - Centered */}
        <div className="flex flex-col items-center space-y-4 sm:hidden">
          <div className="text-center">
            <p className="font-semibold text-white mb-1">Auktoriserad service</p>
            <p className="text-white/95 font-medium">Hyundai • Aixam</p>
          </div>
          
          <div className="text-center">
            <p className="font-semibold text-white mb-1">Arlandastad</p>
            <p className="text-white/95 font-medium">Stockholm • Sverige</p>
          </div>
        </div>

        {/* Desktop Layout - Space Between */}
        <div className="hidden sm:flex sm:flex-row justify-between items-center">
          <div className="text-left">
            <p className="font-semibold text-white mb-1">Auktoriserad service</p>
            <p className="text-white/95 font-medium">Hyundai • Aixam</p>
          </div>
          
          <div className="text-right">
            <p className="font-semibold text-white mb-1">Arlandastad</p>
            <p className="text-white/95 font-medium">Stockholm • Sverige</p>
          </div>
        </div>
      </footer>

      {/* Enhanced Image indicators - clickable for user control (hidden on mobile) */}
      <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 left-1/2 transform -translate-x-1/2 z-10 hidden sm:flex space-x-2">
        {heroImages.map((_, index) => (
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

      {/* Navigation arrows for mobile */}
      <button
        onClick={() => handleImageChange((currentImageIndex - 1 + heroImages.length) % heroImages.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 sm:hidden bg-black/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:bg-black/50"
        aria-label="Föregående bild"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => handleImageChange((currentImageIndex + 1) % heroImages.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 sm:hidden bg-black/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:bg-black/50"
        aria-label="Nästa bild"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </main>
  );
} 