'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesSection() {
  const t = useTranslations('servicesSection');
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const serviceCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set(serviceCardsRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.95
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

      // Animate title first
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      });

      // Then stagger animate service cards with reduced delay
      tl.to(serviceCardsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.2");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: t('service1.title'),
      subtitle: t('service1.subtitle'),
      description: t('service1.description'),
      features: [t('service1.feature1'), t('service1.feature2'), t('service1.feature3')],
      highlight: t('service1.highlight')
    },
    {
      title: t('service2.title'),
      subtitle: t('service2.subtitle'),
      description: t('service2.description'),
      features: [t('service2.feature1'), t('service2.feature2'), t('service2.feature3')],
      highlight: t('service2.highlight')
    },
    {
      title: t('service3.title'),
      subtitle: t('service3.subtitle'),
      description: t('service3.description'),
      features: [t('service3.feature1'), t('service3.feature2'), t('service3.feature3')],
      highlight: t('service3.highlight')
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-white py-20 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16 sm:mb-24">
          <h2 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 mb-6"
          >
            {t('titleEmphasis')}
            <br />
            <span className="font-normal">{t('title')}</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div 
          ref={servicesRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => {
                serviceCardsRef.current[index] = el;
              }}
              className="group relative bg-white border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/30 p-8 sm:p-10 lg:p-12 hover:-translate-y-1"
            >
              {/* Service Number/Highlight */}
              <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                <span className="text-4xl sm:text-5xl font-light text-gray-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Service Header */}
              <div className="mb-8">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full tracking-wide uppercase">
                    {service.highlight}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-lg text-gray-500 font-medium tracking-wide">
                  {service.subtitle}
                </p>
              </div>

              {/* Service Description */}
              <p className="text-gray-600 leading-relaxed mb-8 text-base sm:text-lg">
                {service.description}
              </p>

              {/* Service Features */}
              <div className="space-y-4">
                {service.features.map((feature, featureIndex) => (
                  <div 
                    key={featureIndex}
                    className="flex items-center text-gray-700 group-hover:text-gray-900 transition-colors duration-300"
                  >
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-4 group-hover:bg-gray-900 group-hover:scale-110 transition-all duration-300"></div>
                    <span className="text-sm sm:text-base font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Hover Effect - Subtle left border */}
              <div className="absolute left-0 top-0 w-1 h-0 bg-gray-900 group-hover:h-full transition-all duration-500"></div>
              
              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-0 h-0 border-l-0 border-b-0 border-transparent group-hover:border-l-8 group-hover:border-b-8 group-hover:border-l-gray-100 group-hover:border-b-gray-100 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 sm:mt-24 pt-16 sm:pt-20 border-t border-gray-100">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">45+</div>
            <div className="text-sm sm:text-base text-gray-600 font-medium tracking-wide">År av expertis</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">2</div>
            <div className="text-sm sm:text-base text-gray-600 font-medium tracking-wide">Auktoriserade märken</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">90%</div>
            <div className="text-sm sm:text-base text-gray-600 font-medium tracking-wide">Kundnöjdhet</div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center mt-16 sm:mt-20">
          <div className="max-w-3xl mx-auto mb-8">
            <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">
              {t('cta.title')}
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              {t('cta.description')}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact" 
              className="group relative px-8 sm:px-12 py-4 text-base sm:text-lg font-medium text-white bg-gray-900 hover:bg-gray-800 transition-all duration-300 overflow-hidden inline-block text-center"
            >
              <span className="relative z-10">{t('cta.button')}</span>
              <div className="absolute inset-0 bg-gray-800 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </Link>
            
            <a 
              href="tel:+46700929433" 
              className="group relative px-8 sm:px-12 py-4 text-base sm:text-lg font-medium text-gray-900 bg-transparent border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 overflow-hidden inline-block text-center"
            >
              <span className="relative z-10">Ring oss</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 