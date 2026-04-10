'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import { useCars } from '../../../context/CarContext';

type SortByType = 'price' | 'year' | 'mileage' | 'newest';

export default function CarsPage() {
  const { cars: allCars, loading, error } = useCars();
  
  const [sortBy, setSortBy] = useState<SortByType>('newest');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  

  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const carsGridRef = useRef<HTMLDivElement>(null);


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
      case 'newest':
        // Sort by indatum (newest first)
        const aDate = new Date(a.indatum || '').getTime();
        const bDate = new Date(b.indatum || '').getTime();
        return bDate - aDate; // Newest first
      default:
        return 0;
    }
    
    if (isNaN(aValue) || isNaN(bValue)) return 0;

    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  
  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set([headerRef.current, filtersRef.current, carsGridRef.current], {
      opacity: 0,
      y: 30
    });

    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    })
    .to(filtersRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6")
    .to(carsGridRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4");
  }, []);

  const formatPrice = (price: string) => {
    return `${price} kr`;
  };

  const formatMileage = (mileage: string) => {
    return `${mileage} mil`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Header */}
      <div ref={headerRef} className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
              Våra <span className="font-normal">Bilar</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Upptäck vårt utbud av kvalitetsgranskade fordon.
              Alla våra fordon genomgår noggrann inspektion och kommer med garanti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link href="#cars-grid">
                <Button 
                  variant="primary" 
                  size="lg"
                >
                  Se alla bilar
                </Button>
              </Link>
              <Link href="/contact/quote">
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  Begär offert
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div id="cars-grid" ref={filtersRef} className="bg-white shadow-sm border-b border-gray-200 sticky top-16 lg:top-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">
                {loading ? 'Laddar...' : `${allCars.length} bilar tillgängliga`}
              </span>
            </div>

            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortByType)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="newest">Nyast inkomna bilar</option>
                <option value="price">Sortera efter pris</option>
                <option value="year">Sortera efter år</option>
                <option value="mileage">Sortera efter miltal</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 w-10"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div ref={carsGridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && <p className="text-center text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedCars.length === 0 && !loading && !error && (
            <div className="col-span-full text-center py-16">
              <p className="text-xl text-gray-500">Inga bilar tillgängliga just nu</p>
            </div>
          )}
          {sortedCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              <Link href={`/cars/${car.id}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/heropics/1.jpg' }}
                  />
                  <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    Begagnad
                  </div>
                </div>
              </Link>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      <Link href={`/cars/${car.id}`} className="hover:underline">{car.brand} {car.model}</Link>
                    </h3>
                    <p className="text-gray-600">{car.year}</p>
                  </div>
                  <div className="text-right">
                    {car.originalPrice ? (
                      <>
                        <p className="text-2xl font-bold text-red-600">
                          {formatPrice(car.price)}
                        </p>
                        <p className="text-sm text-gray-500 line-through">
                          {formatPrice(car.originalPrice)}
                        </p>
                      </>
                    ) : (
                      <p className="text-2xl font-bold text-gray-900">
                        {formatPrice(car.price)}
                      </p>
                    )}
                    {car.monthlyPayment && (
                      <p className="text-sm text-gray-600 mt-1">
                        {car.monthlyPayment.toLocaleString('sv-SE')} kr/mån
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
                   <div className="flex items-center gap-2">
                    <span className="font-bold">Miltal:</span>
                    {formatMileage(car.mileage)}
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="font-bold">Bränsle:</span>
                    {car.fuelType}
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="font-bold">Växellåda:</span>
                    {car.transmission}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Link href={`/cars/${car.id}`} className="flex-1">
                    <Button variant="primary" size="md" className="w-full">
                      Visa detaljer
                    </Button>
                  </Link>
                  <Link href="/contact" className="flex-1">
                    <Button variant="outline" size="md" className="w-full">
                      Kontakta oss
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-light mb-6">
            Hittade inte rätt bil?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Vi hjälper dig hitta den perfekta begagnade bilen. Kontakta oss så berättar vi vad vi kan göra för dig.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="hero" size="lg">
                Kontakta oss
              </Button>
            </Link>
            <Link href="/cars/sell">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
                Sälja din bil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}