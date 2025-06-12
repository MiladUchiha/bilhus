'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import Button from '@/components/Button';
import Navbar from '@/components/Navbar';

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Set initial states
    gsap.set([numberRef.current, titleRef.current, messageRef.current, buttonRef.current], {
      opacity: 0,
      y: 30
    });

    // Animate elements in sequence with luxury timing
    tl.to(numberRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out"
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.6")
    .to(messageRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")
    .to(buttonRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.2");

  }, []);

  return (
    <>
      <Navbar />
      <div 
        ref={containerRef}
        className="min-h-screen bg-white flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-16"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
          {/* Large 404 Number */}
          <h1 
            ref={numberRef}
            className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-light tracking-tight text-black leading-none select-none"
          >
            404
          </h1>
          
          {/* Elegant Title */}
          <h2 
            ref={titleRef}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight text-black leading-tight"
          >
            Sidan kunde inte hittas
          </h2>
          
          {/* Descriptive Message */}
          <p 
            ref={messageRef}
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-gray-600 leading-relaxed max-w-2xl mx-auto"
          >
            Den sida du söker efter finns inte längre eller har flyttats.
            <br className="hidden sm:block" />
            Låt oss hjälpa dig hitta rätt.
          </p>
          
          {/* Call to Action */}
          <div ref={buttonRef} className="pt-4 sm:pt-8">
            <Link href="/" className="inline-block">
              <Button
                variant="primary"
                size="lg"
                className="group hover:scale-105 transform transition-all duration-300"
              >
                Tillbaka hem
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Minimal decorative element */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-16 h-px bg-gray-300"></div>
        </div>
      </div>
    </>
  );
} 