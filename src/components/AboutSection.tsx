'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const t = useTranslations('about');
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsCountersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set([contentRef.current, imageRef.current], {
        opacity: 0,
        y: 40
      });

      gsap.set(statsRef.current, {
        opacity: 0,
        y: 30
      });

      gsap.set(statsCountersRef.current, {
        opacity: 0,
        scale: 0.8
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
      .to([contentRef.current, imageRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      }, "-=0.2")
      .to(statsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      .to(statsCountersRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.3");

      // Animate counters
      const animateCounter = (element: HTMLElement, target: number) => {
        gsap.to({ value: 0 }, {
          value: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: function() {
            element.textContent = Math.round(this.targets()[0].value).toString();
          },
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        });
      };

      // Set up counter animations
      statsCountersRef.current.forEach((counter, index) => {
        if (counter) {
          const targets = [25, 2, 1000]; // years, brands, customers
          animateCounter(counter, targets[index]);
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-gray-100 py-20 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-transparent to-gray-200"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 mb-6"
          >
            {t('title')}
            <br />
            <span className="font-normal">{t('titleEmphasized')}</span>
          </h2>
          <p 
            ref={subtitleRef}
            className="text-xl sm:text-2xl font-light text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 sm:mb-24">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <div className="space-y-8">
                             <div>
                 <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">
                   {t('expertise.title')}
                 </h3>
                 <p className="text-lg text-gray-600 leading-relaxed">
                   {t('expertise.description')}
                 </p>
               </div>

               <div>
                 <h4 className="text-xl font-medium text-gray-900 mb-3">
                   {t('whyChoose.title')}
                 </h4>
                 <div className="space-y-4">
                   <div className="flex items-start">
                     <div className="w-2 h-2 bg-gray-900 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                     <div>
                       <p className="font-medium text-gray-900">{t('whyChoose.uniqueLocation.title')}</p>
                       <p className="text-gray-600">Lämna bilen för service medan du reser utomlands</p>
                     </div>
                   </div>
                   <div className="flex items-start">
                     <div className="w-2 h-2 bg-gray-900 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                     <div>
                       <p className="font-medium text-gray-900">Bibehållen tillverkargaranti</p>
                       <p className="text-gray-600">Service av alla märken utan att påverka garantin</p>
                     </div>
                   </div>
                   <div className="flex items-start">
                     <div className="w-2 h-2 bg-gray-900 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                     <div>
                       <p className="font-medium text-gray-900">Certifierade tekniker</p>
                       <p className="text-gray-600">Kontinuerlig utbildning inom bilens senaste teknik</p>
                     </div>
                   </div>
                 </div>
               </div>

               {/* CTA Buttons */}
               <div className="flex flex-col sm:flex-row gap-4 pt-8">
                 <Link 
                   href="/contact" 
                   className="group relative px-8 py-3 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 transition-all duration-300 overflow-hidden inline-block text-center"
                 >
                   <span className="relative z-10">Kontakta oss</span>
                   <div className="absolute inset-0 bg-gray-800 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                 </Link>
                 <Link 
                   href="/service" 
                   className="group relative px-8 py-3 text-base font-medium text-gray-900 bg-transparent border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 overflow-hidden inline-block text-center"
                 >
                   <span className="relative z-10">Se våra tjänster</span>
                 </Link>
               </div>
            </div>
          </div>

                     {/* Image */}
           <div ref={imageRef} className="order-1 lg:order-2">
             <div className="relative h-96 sm:h-[500px] lg:h-[600px] bg-gray-200 border border-gray-300 rounded-none overflow-hidden">
               {/* Placeholder for facility image */}
              
              
              
              <Image
                src="/bilhus.jpg"
                alt={`${t('titleEmphasized')} facility`}
                fill
                className="object-cover"
                quality={90}
              />
             
            </div>
          </div>
        </div>

               
        

                 {/* Location Highlight */}
         <div className="bg-white p-8 sm:p-12 lg:p-16 border border-gray-200 rounded-none text-center shadow-sm">
           <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6">
             {t('locationHighlight.title')}
           </h3>
           <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
             Vår unika plats nära Arlanda flygplats gör oss till det perfekta valet för resenärer. 
             Lämna din bil för service medan du är bortrest – vi tar hand om allt medan du är borta.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-gray-500 mb-8">
             <div className="flex items-center justify-center">
               <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
               5 min från Arlanda Terminal
             </div>
             <div className="flex items-center justify-center">
               <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
               30 min från Stockholm City
             </div>
             <div className="flex items-center justify-center">
               <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
               Enkelt att hitta
             </div>
           </div>
           
           
         </div>
      </div>
    </section>
  );
} 