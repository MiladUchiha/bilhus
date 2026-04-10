'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface BookingPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingPopup({ isOpen, onClose }: BookingPopupProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Animate popup in
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(popupRef.current, { opacity: 0, scale: 0.9, y: 20 });

      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
      gsap.to(popupRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    // Animate popup out
    gsap.to(popupRef.current, { 
      opacity: 0, 
      scale: 0.9, 
      y: 20, 
      duration: 0.3, 
      ease: "power2.in" 
    });
    gsap.to(overlayRef.current, { 
      opacity: 0, 
      duration: 0.3,
      onComplete: onClose
    });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        ref={popupRef}
        className="bg-white max-w-md w-full p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Stäng"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-light text-gray-900 mb-2">
            Bokningssystem under utveckling
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            Vårt online-bokningssystem är för närvarande under utveckling. 
            Kontakta oss istället för att boka tid.
          </p>
        </div>

        {/* Contact options */}
        <div className="space-y-4">
          <a 
            href="tel:+46859120541"
            className="w-full bg-gray-900 text-white py-3 px-6 hover:bg-gray-800 transition-colors duration-300 text-center block"
          >
            Telefon: 08 591 205 41
          </a>
          
          <a 
            href="mailto:kundservice@marstabilhus.se"
            className="w-full border border-gray-300 text-gray-900 py-3 px-6 hover:border-gray-900 transition-colors duration-300 text-center block"
          >
            E-post: kundservice@marstabilhus.se
          </a>
        </div>
      </div>
    </div>
  );
}