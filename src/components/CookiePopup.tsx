'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';

export default function CookiePopup() {
  const popupRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    try {
      const cookiesAccepted = localStorage.getItem('cookies-accepted');
      const cookiesRejected = localStorage.getItem('cookies-rejected');

      if (!cookiesAccepted && !cookiesRejected) {
        const timer = setTimeout(() => {
          setIsVisible(true);
          setIsAnimating(true);
        }, 1000);

        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage not available, don't show popup
    }
  }, []);

  useEffect(() => {
    if (isAnimating && isVisible && popupRef.current) {
      gsap.fromTo(popupRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        }
      );
      setIsAnimating(false);
    }
  }, [isAnimating, isVisible]);

  const animateOut = (onComplete: () => void) => {
    gsap.to(popupRef.current, {
      opacity: 0,
      y: 100,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
      onComplete,
    });
  };

  const handleAccept = () => {
    try {
      localStorage.setItem('cookies-accepted', 'true');
    } catch {
      // localStorage not available
    }
    animateOut(() => setIsVisible(false));
  };

  const handleReject = () => {
    try {
      localStorage.setItem('cookies-rejected', 'true');
    } catch {
      // localStorage not available
    }
    animateOut(() => setIsVisible(false));
  };

  const handleClose = () => {
    animateOut(() => setIsVisible(false));
  };

  const handleMoreInfo = () => {
    router.push('/cookies');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Popup */}
      <div ref={popupRef} className="cookie-popup fixed bottom-4 left-4 right-4 md:left-6 md:right-6 lg:left-auto lg:right-6 lg:max-w-md bg-white rounded-xl shadow-2xl z-50 border border-gray-200">
        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Din data, ditt val.
            </h3>
          </div>

          {/* Content */}
          <div className="mb-6">
            <p className="text-gray-700 text-sm leading-relaxed">
              Märsta Bilhus hanterar din data. Vi använder cookies för att skydda din data, samt för att anpassa tjänster, erbjudanden och annonser till dig.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAccept}
              className="flex-1 bg-gray-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Jag förstår
            </button>
            <button
              onClick={handleReject}
              className="flex-1 bg-gray-100 text-gray-900 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Bara nödvändiga
            </button>
            <button
              onClick={handleMoreInfo}
              className="flex-1 text-gray-500 px-4 py-2.5 rounded-lg text-sm font-medium hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Mer information
            </button>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Stäng"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </>
  );
}
