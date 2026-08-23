'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useCars } from '../../../context/CarContext';

type SortByType = 'price' | 'year' | 'mileage' | 'newest';

export default function CarsPage() {
  const t = useTranslations('common');
  const { cars: allCars, loading, error } = useCars();

  const [sortBy, setSortBy] = useState<SortByType>('newest');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const sortedCars = [...allCars].sort((a, b) => {
    let aValue: number, bValue: number;
    switch (sortBy) {
      case 'price':
        aValue = parseInt(a.price.replace(/\s/g, ''), 10);
        bValue = parseInt(b.price.replace(/\s/g, ''), 10);
        break;
      case 'year':
        aValue = parseInt(a.year, 10);
        bValue = parseInt(b.year, 10);
        break;
      case 'mileage':
        aValue = parseInt(a.mileage.replace(/\s/g, ''), 10);
        bValue = parseInt(b.mileage.replace(/\s/g, ''), 10);
        break;
      case 'newest': {
        const aDate = new Date(a.indatum || '').getTime();
        const bDate = new Date(b.indatum || '').getTime();
        return bDate - aDate;
      }
      default:
        return 0;
    }
    if (isNaN(aValue) || isNaN(bValue)) return 0;
    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    gsap.set([headerRef.current, filtersRef.current, gridRef.current], { opacity: 0, y: 24 });
    tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.9 })
      .to(filtersRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
      .to(gridRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4');
  }, []);

  return (
    <div className="min-h-screen bg-paper pt-20">
      {/* Hero header — editorial */}
      <div ref={headerRef} className="border-b border-line bg-paper">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-3">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-garnet" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
                  {t('currentCars')}
                </span>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <h1 className="font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em] text-ink max-w-[14ch]">
                Våra <span className="italic">bilar</span>
              </h1>
              <p className="mt-8 font-display italic text-xl sm:text-2xl text-ink-2 max-w-[44ch] leading-[1.4]">
                {t('qualityChecked')}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/cars/sell"
                  className="inline-flex items-center justify-center gap-2 bg-garnet px-7 py-4 text-paper font-medium transition-colors duration-200 hover:bg-garnet-hover"
                >
                  {t('sellYourCar')}
                </Link>
                <Link
                  href="/contact/quote"
                  className="inline-flex items-center justify-center gap-2 border border-ink px-7 py-4 text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
                >
                  {t('contactUs')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div
        id="cars-grid"
        ref={filtersRef}
        className="sticky top-16 lg:top-20 z-10 bg-paper/95 backdrop-blur-md border-b border-line"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-5">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-2xl tabular text-ink">
                {loading ? '—' : String(allCars.length).padStart(2, '0')}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                {loading ? t('loading') : t('available')}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3 hidden sm:block">
                {t('sortBy')}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortByType)}
                className="bg-transparent border border-line px-3 py-2 text-sm text-ink focus:border-ink focus:outline-none"
              >
                <option value="newest">{t('newest')}</option>
                <option value="price">{t('price')}</option>
                <option value="year">{t('year')}</option>
                <option value="mileage">{t('mileage')}</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="border border-line w-10 h-10 inline-flex items-center justify-center text-ink-2 hover:border-ink hover:text-ink transition-colors duration-200"
                aria-label="Toggle sort order"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        {error && <p className="text-center text-garnet mb-8">{error}</p>}
        {sortedCars.length === 0 && !loading && !error && (
          <div className="text-center py-24">
            <p className="text-xl text-ink-3">{t('noCars')}</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {sortedCars.map((car) => (
            <Link
              key={car.id}
              href={`/cars/${car.id}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-paper-2 mb-5">
                <Image
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/heropics/1.jpg' }}
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
                <span className="text-ink-2 inline-flex items-center gap-1">
                  → {t('viewDetails')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="bg-ink text-paper">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 lg:col-span-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50">
                {t('contactUs')}
              </span>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-paper max-w-[20ch]">
                {t('didntFind')}
              </h2>
              <p className="mt-4 text-base text-paper/70 max-w-[52ch] leading-[1.6]">
                {t('weHelp')}
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 flex flex-col sm:flex-row gap-3 lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-paper px-7 py-4 text-ink font-medium transition-colors duration-200 hover:bg-garnet hover:text-paper"
              >
                {t('contactUs')}
              </Link>
              <Link
                href="/cars/sell"
                className="inline-flex items-center justify-center gap-2 border border-paper/40 px-7 py-4 text-paper transition-colors duration-200 hover:bg-paper hover:text-ink"
              >
                {t('sellYourCar')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
