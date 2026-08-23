'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useCars } from '../context/CarContext';

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
  monthlyPayment?: number;
}

export default function CarShowcaseSection() {
  const t = useTranslations('common');
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const { cars: allCars, loading, error } = useCars();
  const cars = allCars.slice(0, 9);
  const totalSlides = cars.length;
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const update = () => setSlidesToShow(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = Math.max(0, totalSlides - slidesToShow);

  useEffect(() => {
    if (loading || cars.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 24,
          opacity: 0,
          duration: 1.0,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [loading, cars.length]);

  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= slidesToShow) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex, totalSlides, slidesToShow]);

  const nextSlide = () => setCurrentIndex((p) => (p >= maxIndex ? 0 : p + 1));
  const prevSlide = () => setCurrentIndex((p) => (p === 0 ? maxIndex : p - 1));

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const d = touchStart - touchEnd;
    if (d > 50) nextSlide();
    if (d < -50) prevSlide();
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section
      id="cars"
      ref={sectionRef}
      className="bg-paper py-24 sm:py-32 lg:py-40"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-12 gap-8 mb-16 sm:mb-20">
          <div className="col-span-12 lg:col-span-3" data-reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-garnet" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
                {t('currentCars')}
              </span>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6" data-reveal>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.02] tracking-[-0.025em] text-ink max-w-[14ch]">
              {t('qualityChecked').split('.')[0]}.
            </h2>
            <div className="flex items-center gap-3 shrink-0 text-sm text-ink-2">
              <span className="font-mono tabular text-ink">{allCars.length}</span>
              <span>{t('available')}</span>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div ref={trackRef} className="relative" data-reveal>
          {loading && (
            <div className="flex justify-center items-center h-96 gap-4">
              <div className="h-8 w-8 border-2 border-ink-3 border-t-garnet rounded-full animate-spin" />
              <span className="text-ink-2">{t('fetching')}</span>
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-12">
              <p className="text-garnet mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="border border-ink px-6 py-3 text-ink hover:bg-ink hover:text-paper transition-colors duration-200"
              >
                {t('tryAgain')}
              </button>
            </div>
          )}

          {!loading && cars.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-ink-3">{t('noCars')}</p>
            </div>
          )}

          {!loading && cars.length > 0 && (
            <>
              {/* Track */}
              <div className="overflow-hidden -mx-3">
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{
                    transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
                  }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {cars.map((car: Car, index: number) => (
                    <div
                      key={car.id}
                      ref={(el) => { cardsRef.current[index] = el; }}
                      className="shrink-0 px-3"
                      style={{ width: `${100 / slidesToShow}%` }}
                    >
                      <CarCard car={car} t={t} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="mt-10 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <span className="font-mono text-xs tabular text-ink-3">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(maxIndex + 1).padStart(2, '0')}
                  </span>
                  <div className="hidden sm:flex gap-1">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`h-px transition-all duration-500 ease-out ${
                          i === currentIndex ? 'w-10 bg-ink' : 'w-5 bg-ink/25 hover:bg-ink/50'
                        }`}
                        aria-label={`Slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prevSlide}
                    className="flex h-11 w-11 items-center justify-center border border-line text-ink-2 hover:border-ink hover:text-ink transition-colors duration-200"
                    aria-label="Previous"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="flex h-11 w-11 items-center justify-center border border-line text-ink-2 hover:border-ink hover:text-ink transition-colors duration-200"
                    aria-label="Next"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="grid grid-cols-12 gap-8 mt-24 lg:mt-32 pt-16 border-t border-line items-end" data-reveal>
          <div className="col-span-12 lg:col-span-7">
            <h3 className="font-display text-3xl lg:text-4xl tracking-[-0.02em] text-ink leading-[1.1] max-w-[22ch]">
              {t('noMatch')}
            </h3>
            <p className="mt-4 text-base text-ink-2 max-w-[50ch] leading-[1.6]">
              {t('noMatchDesc')}
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5 flex flex-col sm:flex-row gap-3 lg:justify-end">
            <Link
              href="/cars"
              className="inline-flex items-center justify-center gap-2 bg-garnet px-7 py-4 text-paper font-medium transition-colors duration-200 hover:bg-garnet-hover"
            >
              {t('showMore')}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-ink px-7 py-4 text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
            >
              {t('contactUs')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CarCard({ car, t }: { car: Car; t: ReturnType<typeof useTranslations> }) {
  return (
    <Link
      href={`/cars/${car.id}`}
      className="group block bg-paper"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-2 mb-5">
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          onError={(e) => { (e.target as HTMLImageElement).src = '/heropics/1.jpg'; }}
        />
        <div className="absolute top-3 left-3 bg-paper px-2.5 py-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink">
            {car.fuelType}
          </span>
        </div>
        {car.originalPrice && (
          <div className="absolute top-3 right-3 bg-garnet px-2.5 py-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper">
              Erbjudande
            </span>
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h3 className="font-display text-2xl tracking-[-0.015em] text-ink leading-tight transition-colors duration-200 group-hover:text-garnet">
            {car.brand} {car.model}
          </h3>
          <p className="mt-1 font-mono text-xs tabular text-ink-3">
            {car.year} · {car.mileage} {t('miles')}
          </p>
        </div>
        <div className="text-right shrink-0">
          {car.originalPrice ? (
            <>
              <div className="font-mono text-base tabular font-medium text-garnet">{car.price} {t('currency')}</div>
              <div className="font-mono text-xs tabular text-ink-3 line-through">{car.originalPrice}</div>
            </>
          ) : (
            <div className="font-mono text-base tabular font-medium text-ink">{car.price} {t('currency')}</div>
          )}
          {car.monthlyPayment && (
            <div className="font-mono text-xs tabular text-ink-3 mt-0.5">
              {car.monthlyPayment.toLocaleString('sv-SE')} {t('monthly')}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-line pt-3 flex justify-between text-xs text-ink-3 font-mono uppercase tracking-[0.08em]">
        <span>{car.transmission}</span>
        <span className="text-ink-2">→ {t('viewDetails')}</span>
      </div>
    </Link>
  );
}
