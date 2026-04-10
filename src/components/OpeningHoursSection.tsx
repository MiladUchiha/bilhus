'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './Button';
import Link from 'next/link';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface OpeningHour {
  day: string;
  hours: string;
  isToday?: boolean;
  isOpen?: boolean;
}

const openingHours: OpeningHour[] = [
  { day: 'Måndag', hours: '09:00 - 18:00' },
  { day: 'Tisdag', hours: '09:00 - 18:00' },
  { day: 'Onsdag', hours: '09:00 - 18:00' },
  { day: 'Torsdag', hours: '09:00 - 18:00' },
  { day: 'Fredag', hours: '09:00 - 17:00' },
  { day: 'Lördag', hours: '11:00 - 15:00' },
  { day: 'Söndag', hours: 'Stängt' }
];

export default function OpeningHoursSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Get current day and check if we're open
  const getCurrentDayInfo = () => {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour + currentMinute / 60;

    // Map to our opening hours array (Monday = 0 in our array)
    const dayIndex = currentDay === 0 ? 6 : currentDay - 1;
    
    const today = openingHours[dayIndex];
    let isOpen = false;
    
    if (today.hours !== 'Stängt') {
      const [start, end] = today.hours.split(' - ');
      const [startHour, startMin] = start.split(':').map(Number);
      const [endHour, endMin] = end.split(':').map(Number);
      
      const startTime = startHour + startMin / 60;
      const endTime = endHour + endMin / 60;
      
      isOpen = currentTime >= startTime && currentTime <= endTime;
    }

    return {
      currentDayIndex: dayIndex,
      isOpen,
      today
    };
  };

  const { currentDayIndex, isOpen, today } = getCurrentDayInfo();

  // Update opening hours with current day info
  const updatedHours = openingHours.map((hour, index) => ({
    ...hour,
    isToday: index === currentDayIndex,
    isOpen: index === currentDayIndex ? isOpen : false
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([contentRef.current, hoursRef.current, contactRef.current], {
        opacity: 0,
        y: 30
      });

      // Create scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate elements in sequence
      tl.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      })
      .to(hoursRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      .to(contactRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.2");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getNextOpenTime = () => {
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // If we're currently open, show when we close
    if (isOpen) {
      const [, end] = today.hours.split(' - ');
      return `Stänger ${end}`;
    }

    // Find next opening time
    for (let i = 0; i < 7; i++) {
      const checkDay = (currentDay + i) % 7;
      const dayIndex = checkDay === 0 ? 6 : checkDay - 1;
      const dayInfo = openingHours[dayIndex];

      if (dayInfo.hours !== 'Stängt') {
        const [start] = dayInfo.hours.split(' - ');
        
        if (i === 0) {
          // Today - check if opening time is in the future
          const [startHour, startMin] = start.split(':').map(Number);
          if (currentHour < startHour || (currentHour === startHour && currentMinute < startMin)) {
            return `Öppnar ${start} idag`;
          }
        } else {
          // Future day
          const dayName = dayInfo.day.toLowerCase();
          return `Öppnar ${start} på ${dayName}`;
        }
      }
    }

    return 'Se öppettider';
  };

  return (
    <section 
      ref={sectionRef}
      className="bg-gray-900 text-white py-16 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Opening Hours */}
          <div ref={hoursRef} className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-light mb-2">Öppettider</h3>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-sm text-gray-300">
                    {isOpen ? 'Öppet nu' : 'Stängt nu'}
                  </span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-300">
                    {getNextOpenTime()}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {updatedHours.map((hour, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center py-2 px-3 rounded ${
                    hour.isToday 
                      ? 'bg-white/10 border border-white/20' 
                      : 'hover:bg-white/5'
                  } transition-colors duration-200`}
                >
                  <span className={`${hour.isToday ? 'font-medium' : ''}`}>
                    {hour.day}
                    {hour.isToday && ' (idag)'}
                  </span>
                  <span className={`${
                    hour.hours === 'Stängt' 
                      ? 'text-red-300' 
                      : hour.isToday 
                        ? 'font-medium' 
                        : 'text-gray-300'
                  }`}>
                    {hour.hours}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded">
              <p className="text-sm text-gray-300">
                <strong>Lunch:</strong> 12:00 - 13:00 vardagar
              </p>
              <p className="text-sm text-gray-300 mt-1">
                <strong>Akuta ärenden:</strong> Ring för specialtider
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div ref={contactRef} className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-light">Kontakt</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Telefon</h4>
                <a 
                  href="tel:08-59120541" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 block"
                >
                  08-59 120 541
                </a>
                <a 
                  href="tel:0700929433" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 block"
                >
                  0700 92 94 33
                </a>
              </div>

              <div>
                <h4 className="font-medium mb-2">E-post</h4>
                <a 
                  href="mailto:info@marstabilhus.se" 
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  info@marstabilhus.se
                </a>
              </div>

              <div>
                <h4 className="font-medium mb-2">Adress</h4>
                <div className="text-gray-300">
                  Maskingatan 12<br />
                  195 60 Arlandastad<br />
                  Stockholm, Sverige
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href="tel:08-59120541">
                <Button variant="hero" size="sm" className="w-full sm:w-auto">
                  Ring nu
                </Button>
              </a>
              <a href="mailto:info@marstabilhus.se">
                <Button variant="outline" size="sm" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900">
                  Skicka mail
                </Button>
              </a>
            </div>
          </div>

          {/* Location & Services */}
          <div ref={contentRef} className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-light">Plats & Service</h3>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Strategiskt läge</p>
                  <p className="text-gray-300 text-sm">3 mil från Stockholm, 5 min från Arlanda</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Perfekt för resenärer</p>
                  <p className="text-gray-300 text-sm">Lämna bilen medan du flyger utomlands</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Auktoriserad service</p>
                  <p className="text-gray-300 text-sm">Hyundai & Aixam + alla märken</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Gratis parkering</p>
                  <p className="text-gray-300 text-sm">Inga parkeringsavgifter</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded p-4">
              <h4 className="font-medium mb-2">Dagens specialerbjudande</h4>
              <p className="text-sm text-gray-300 mb-3">
                Gratis kontroll av bromsbelägg och batteristatus vid ordinarie service.
              </p>
              <Link href="/contact">
                <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-gray-900">
                  Boka idag
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}