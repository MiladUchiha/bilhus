'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { useCars } from '../../../../context/CarContext';
import MonthlyPaymentCalculator from '@/components/MonthlyPaymentCalculator';

interface CarDetails {
  id: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  originalPrice?: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  images: Array<{ url: string }>;
  features: string[];
  shareUrl: string;
  licensePlate?: string;
  description: string;
  specs: Array<{ label: string; value: string }>;
  monthlyPayment?: number;
  interestRate?: string;
}

export default function CarDetailsPage() {
  const params = useParams();
  const carId = params.id as string;

  const { getCarById, loading, error: contextError } = useCars();

  const [car, setCar] = useState<CarDetails | null | undefined>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (contextError) setError(contextError);
      else {
        const found = getCarById(carId);
        setCar(found);
        if (!found) setError('Kunde inte hitta bilen.');
      }
    }
  }, [carId, getCarById, loading, contextError]);

  const nextImage = useCallback(() => {
    setActiveImageIndex((p) => (p + 1) % (car?.images.length || 1));
  }, [car?.images.length]);

  const prevImage = useCallback(() => {
    setActiveImageIndex((p) => (p - 1 + (car?.images.length || 1)) % (car?.images.length || 1));
  }, [car?.images.length]);

  const closeFullScreen = useCallback(() => {
    setIsFullScreen(false);
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    if (!isFullScreen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFullScreen();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isFullScreen, closeFullScreen, nextImage, prevImage]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper gap-4">
        <div className="h-8 w-8 border-2 border-ink-3 border-t-garnet rounded-full animate-spin" />
        <span className="text-ink-2">Hämtar bilinformation…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-paper text-center px-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet mb-4">Fel</span>
        <h2 className="font-display text-3xl text-ink mb-3">Ett fel uppstod</h2>
        <p className="text-ink-2 mb-8 max-w-md">{error}</p>
        <Link href="/cars" className="inline-flex items-center gap-2 bg-ink text-paper px-7 py-4 hover:bg-garnet transition-colors duration-200">
          ← Tillbaka till bilar
        </Link>
      </div>
    );
  }

  if (!car) return null;

  const mainSpecs: [string, string][] = [
    ['Miltal', `${car.mileage} mil`],
    ['Växellåda', car.transmission],
    ['Bränsle', car.fuelType],
    ['Modellår', car.year],
  ];

  const skipKeys = new Set(['Miltal', 'Växellåda', 'Bränsle', 'Modellår', 'Märke', 'Modell']);
  const otherSpecs = car.specs.filter((s) => !skipKeys.has(s.label));

  const discountAmount = car.originalPrice
    ? parseInt(car.originalPrice.replace(/\s/g, ''), 10) - parseInt(car.price.replace(/\s/g, ''), 10)
    : 0;

  return (
    <div className="bg-paper min-h-screen pt-20">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
        <Link
          href="/cars"
          className="group inline-flex items-center gap-2 text-sm text-ink-2 hover:text-ink transition-colors duration-200 mb-12"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="link-underline">Tillbaka till alla bilar</span>
        </Link>

        {/* Header row — brand, model, license plate */}
        <div className="grid grid-cols-12 gap-8 mb-10">
          <div className="col-span-12 lg:col-span-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
              {car.year}
            </span>
            <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] tracking-[-0.025em] text-ink">
              {car.brand} <span className="italic">{car.model}</span>
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:text-right flex flex-col lg:items-end gap-1">
            {car.licensePlate && (
              <div className="inline-flex items-center gap-2 self-start lg:self-end border border-ink px-3 py-1.5 bg-paper">
                <span className="font-mono text-base tabular tracking-[0.08em] font-medium text-ink">
                  {car.licensePlate.toUpperCase()}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">SE</span>
              </div>
            )}
          </div>
        </div>

        {/* Gallery + summary */}
        <div className="grid grid-cols-12 gap-8 mb-20">
          {/* Gallery */}
          <div className="col-span-12 lg:col-span-8">
            <div className="relative aspect-[16/10] overflow-hidden bg-paper-2 mb-3">
              <button onClick={() => { setIsFullScreen(true); document.body.style.overflow = 'hidden'; }} className="block h-full w-full cursor-zoom-in">
                <Image
                  src={car.images[activeImageIndex].url}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  priority
                  onError={(e) => { (e.target as HTMLImageElement).src = '/heropics/1.jpg'; }}
                />
              </button>
              {car.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 inline-flex items-center justify-center bg-paper/90 border border-line text-ink hover:bg-paper transition-colors duration-200"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 inline-flex items-center justify-center bg-paper/90 border border-line text-ink hover:bg-paper transition-colors duration-200"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
              <div className="absolute bottom-3 left-3 bg-paper px-2.5 py-1">
                <span className="font-mono text-[10px] tabular uppercase tracking-[0.14em] text-ink">
                  {String(activeImageIndex + 1).padStart(2, '0')} / {String(car.images.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-8 gap-2">
              {car.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative aspect-square overflow-hidden bg-paper-2 transition-opacity duration-200 ${
                    activeImageIndex === index ? 'opacity-100 outline outline-1 outline-ink outline-offset-1' : 'opacity-60 hover:opacity-90'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Summary panel */}
          <div className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-8">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
                  Pris
                </span>
                {car.originalPrice ? (
                  <div className="mt-3">
                    <div className="font-display text-5xl tracking-[-0.02em] text-garnet">
                      <span className="tabular">{car.price}</span> <span className="text-3xl">kr</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-3">
                      <span className="font-mono text-sm tabular text-ink-3 line-through">{car.originalPrice} kr</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-garnet">
                        − {discountAmount.toLocaleString('sv-SE')} kr
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 font-display text-5xl tracking-[-0.02em] text-ink">
                    <span className="tabular">{car.price}</span> <span className="text-3xl">kr</span>
                  </div>
                )}
                {car.monthlyPayment && (
                  <p className="mt-3 text-sm text-ink-2">
                    eller{' '}
                    <span className="font-mono tabular text-ink">
                      {car.monthlyPayment.toLocaleString('sv-SE')} kr/mån
                    </span>
                    {car.interestRate && (
                      <span className="text-ink-3"> · {car.interestRate}% ränta</span>
                    )}
                  </p>
                )}
              </div>

              <dl className="border-t border-line divide-y divide-line">
                {mainSpecs.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-12 gap-3 py-4 items-baseline">
                    <dt className="col-span-5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
                      {k}
                    </dt>
                    <dd className="col-span-7 font-mono tabular text-sm text-ink">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-col gap-3">
                <Link
                  href={`/cars/booking?id=${carId}&brand=${encodeURIComponent(car.brand)}&model=${encodeURIComponent(car.model)}&year=${encodeURIComponent(car.year)}`}
                  className="inline-flex items-center justify-center gap-2 bg-garnet px-7 py-4 text-paper font-medium transition-colors duration-200 hover:bg-garnet-hover"
                >
                  Boka provkörning
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <a
                  href="tel:+46700929433"
                  className="inline-flex items-center justify-center gap-2 border border-ink px-7 py-4 text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-mono tabular">0700 929 433</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <section className="border-t border-line pt-16 mb-20">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
                Om bilen
              </span>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <div className="text-lg text-ink leading-[1.65] max-w-[68ch] whitespace-pre-wrap">
                {car.description}
              </div>
            </div>
          </div>
        </section>

        {/* Specifications */}
        {otherSpecs.length > 0 && (
          <section className="border-t border-line pt-16 mb-20">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
                  Tekniska specifikationer
                </span>
              </div>
              <div className="col-span-12 lg:col-span-9">
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 divide-y divide-line border-y border-line">
                  {otherSpecs.map((spec, index) => (
                    <div key={index} className="grid grid-cols-12 gap-3 py-4 items-baseline first:md:border-t-0">
                      <dt className="col-span-7 text-sm text-ink-2 font-mono uppercase tracking-[0.08em]">
                        {spec.label}
                      </dt>
                      <dd className="col-span-5 font-mono tabular text-sm text-ink text-right">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>
        )}

        {/* Equipment */}
        <section className="border-t border-line pt-16 mb-20">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
                Utrustning
              </span>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                {car.features.map((feature, index) => (
                  <li key={index} className="flex items-baseline gap-3 text-[15px] text-ink leading-[1.5]">
                    <span className="font-mono text-[10px] tabular text-ink-3 shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="border-t border-line pt-16 mb-20">
          <div className="max-w-[900px] mx-auto">
            <MonthlyPaymentCalculator
              carPrice={parseInt(car.price.replace(/\s/g, ''), 10)}
              suggestedMonthlyPayment={car.monthlyPayment}
              interestRate={car.interestRate || '6.95'}
              carBrand={car.brand}
              carModel={car.model}
            />
          </div>
        </section>

        {/* Contact */}
        <section className="bg-paper-2 -mx-5 sm:-mx-8 lg:-mx-12 px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
                Frågor?
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl tracking-[-0.02em] text-ink leading-[1.1] max-w-[20ch]">
                Hör av dig så hjälper vi dig vidare.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
              <ContactItem
                label="Telefon"
                value="0700 929 433"
                detail="Bilförsäljning"
                href="tel:+46700929433"
                mono
              />
              <ContactItem
                label="E-post"
                value="info@marstabilhus.se"
                detail="Vi svarar inom 24 h"
                href="mailto:info@marstabilhus.se"
              />
              <ContactItem
                label="Adress"
                value="Maskingatan 12"
                detail="195 60 Arlandastad"
              />
              <ContactItem
                label="Öppet"
                value="Mån–Tor 09–18"
                detail="Fre 09–17 · Lör 11–15"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Fullscreen viewer */}
      {isFullScreen && (
        <div
          className="fixed inset-0 bg-ink/95 z-50 flex items-center justify-center"
          onClick={closeFullScreen}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeFullScreen(); }}
            className="absolute top-5 right-5 text-paper/80 hover:text-paper p-2 transition-colors duration-200"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {car.images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-paper/80 hover:text-paper p-3 transition-colors duration-200"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-paper/80 hover:text-paper p-3 transition-colors duration-200"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}

          <div className="relative w-full h-full flex items-center justify-center p-12" onClick={(e) => e.stopPropagation()}>
            <Image
              src={car.images[activeImageIndex].url}
              alt={`${car.brand} ${car.model}`}
              fill
              sizes="100vw"
              className="object-contain"
              onError={(e) => { (e.target as HTMLImageElement).src = '/heropics/1.jpg'; }}
            />
          </div>

          <div className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.16em] tabular text-paper/60">
            {String(activeImageIndex + 1).padStart(2, '0')} / {String(car.images.length).padStart(2, '0')}
          </div>
        </div>
      )}
    </div>
  );
}

function ContactItem({
  label,
  value,
  detail,
  href,
  mono,
}: {
  label: string;
  value: string;
  detail?: string;
  href?: string;
  mono?: boolean;
}) {
  const valueClass = `text-lg ${mono ? 'font-mono tabular' : ''} text-ink`;
  return (
    <div>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3 block mb-2">
        {label}
      </span>
      {href ? (
        <a href={href} className={`${valueClass} hover:text-garnet transition-colors duration-200`}>
          {value}
        </a>
      ) : (
        <span className={valueClass}>{value}</span>
      )}
      {detail && (
        <span className="block mt-1 text-sm text-ink-2">{detail}</span>
      )}
    </div>
  );
}
