'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import {
  Car,
  Mail,
  Phone,
  MapPin,
  Clock,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
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
      if (contextError) {
        setError(contextError);
      } else {
        const foundCar = getCarById(carId);
        setCar(foundCar);
        if (!foundCar) {
          setError('Kunde inte hitta bilen.');
        }
      }
    }
  }, [carId, getCarById, loading, contextError]);
  
  const nextImage = useCallback(() => {
    setActiveImageIndex(prev => (prev + 1) % (car?.images.length || 1));
  }, [car?.images.length]);

  const prevImage = useCallback(() => {
    setActiveImageIndex(prev => (prev - 1 + (car?.images.length || 1)) % (car?.images.length || 1));
  }, [car?.images.length]);

  const openFullScreen = () => {
    setIsFullScreen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFullScreen = useCallback(() => {
    setIsFullScreen(false);
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    if (!isFullScreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFullScreen();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isFullScreen, closeFullScreen, nextImage, prevImage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        <span className="ml-4 text-xl text-gray-600">Laddar bilinformation...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-red-50">
        <h2 className="text-2xl font-semibold text-red-700 mb-4">Ett fel uppstod</h2>
        <p className="text-red-600 mb-6">{error}</p>
        <Link href="/cars" className="bg-gray-900 text-white px-8 py-3 hover:bg-gray-800 transition-colors">
          Tillbaka till bilar
        </Link>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-800">Bilen kunde inte hittas</h2>
      </div>
    );
  }
  
  const mainDetails = {
    'Miltal': `${car.mileage} mil`,
    'Växellåda': car.transmission,
    'Bränsle': car.fuelType,
    'Modellår': car.year,
  };

  const otherSpecs = car.specs.filter(spec => !['Miltal', 'Växellåda', 'Bränsle', 'Modellår', 'Märke', 'Modell'].includes(spec.label));

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/cars" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group">
          <ChevronLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Tillbaka till alla bilar
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Image Gallery */}
          <div className="lg:col-span-3">
            <div className="relative mb-4">
              <button onClick={openFullScreen} className="w-full cursor-zoom-in">
                <Image
                  src={car.images[activeImageIndex].url}
                  alt={`${car.brand} ${car.model}`}
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                  priority
                  onError={(e) => { (e.target as HTMLImageElement).src = '/heropics/1.jpg' }}
                />
              </button>
              <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition" aria-label="Previous image">
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition" aria-label="Next image">
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {car.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative w-full aspect-w-1 aspect-h-1 rounded-md overflow-hidden transition-all duration-200 ${activeImageIndex === index ? 'ring-2 ring-offset-2 ring-gray-900' : 'hover:opacity-80'}`}
                >
                  <Image
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Car Info */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">{car.brand} {car.model}</h1>
            <p className="text-xl text-gray-600 mt-2">{car.year} • {car.licensePlate || 'Regnr Okänt'}</p>
            
            <div className="mt-8">
              {car.originalPrice ? (
                <>
                  <span className="text-4xl font-light text-red-600">{car.price} kr</span>
                  <p className="text-lg text-gray-500 line-through mt-1">
                    Ordinarie pris: {car.originalPrice} kr
                  </p>
                  <div className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium mt-2">
                    Rabatt: {(parseInt(car.originalPrice.replace(/\s/g, ''), 10) - parseInt(car.price.replace(/\s/g, ''), 10)).toLocaleString('sv-SE')} kr
                  </div>
                </>
              ) : (
                <span className="text-4xl font-light text-gray-900">{car.price} kr</span>
              )}
              {car.monthlyPayment && (
                <p className="text-lg text-gray-600 mt-4">
                  eller {car.monthlyPayment.toLocaleString('sv-SE')} kr/mån
                  {car.interestRate && (
                    <span className="text-sm text-gray-500 ml-2">({car.interestRate}% ränta)</span>
                  )}
                </p>
              )}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 text-center">
              {Object.entries(mainDetails).map(([label, value]) => (
                <div key={label} className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="text-lg font-semibold text-gray-900">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4">
              <Link 
                href={`/cars/booking?id=${carId}&brand=${encodeURIComponent(car.brand)}&model=${encodeURIComponent(car.model)}&year=${encodeURIComponent(car.year)}`}
                className="w-full border-2 border-gray-900 text-gray-900 py-4 px-6 hover:bg-gray-900 hover:text-white transition-colors duration-300 text-lg font-semibold rounded-md flex items-center justify-center"
              >
                <Car className="w-5 h-5 mr-3" />
                Boka provkörning
              </Link>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Beskrivning</h2>
          <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap">
            {car.description}
          </div>
        </div>

        {/* Specifications */}
        {otherSpecs.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Tekniska specifikationer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {otherSpecs.map((spec, index) => (
                <div key={index} className="flex justify-between border-b border-gray-100 py-2">
                  <span className="text-gray-600">{spec.label}</span>
                  <span className="font-semibold text-gray-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Utrustning</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4">
            {car.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <Check className="w-5 h-5 text-gray-900 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Monthly Payment Calculator */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
                      <MonthlyPaymentCalculator 
            carPrice={parseInt(car.price.replace(/\s/g, ''), 10)}
            suggestedMonthlyPayment={car.monthlyPayment}
            interestRate={car.interestRate || '6.95'}
            carBrand={car.brand}
            carModel={car.model}
          />
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 pt-12 border-t border-gray-200 bg-gray-50 p-10 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Kontakta oss för mer information</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
            <div className="flex items-center">
              <Phone className="w-6 h-6 text-gray-900 mr-4" />
              <div>
                <p className="font-semibold">Telefon</p>
                <a href="tel:0700929433" className="text-gray-700 hover:text-gray-900">0700 92 94 33</a>
              </div>
            </div>
             <div className="flex items-center">
              <Mail className="w-6 h-6 text-gray-900 mr-4" />
              <div>
                <p className="font-semibold">E-post</p>
                <a href="mailto:info@marstabilhus.se" className="text-gray-700 hover:text-gray-900">info@marstabilhus.se</a>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="w-6 h-6 text-gray-900 mr-4" />
              <div>
                <p className="font-semibold">Adress</p>
                <p className="text-gray-700">Maskingatan 12, 195 60 Arlandastad</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="w-6 h-6 text-gray-900 mr-4" />
              <div>
                <p className="font-semibold">Öppettider</p>
                <p className="text-gray-700">Mån-Tor: 09-18, Fre: 09-17, Lör: 11-15</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fullscreen Viewer */}
      {isFullScreen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center animate-fade-in"
          onClick={closeFullScreen}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeFullScreen(); }}
            className="absolute top-5 right-5 text-white z-50 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-white p-3 bg-white/10 rounded-full hover:bg-white/20 transition-transform active:scale-95"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center p-16" onClick={(e) => e.stopPropagation()}>
            <Image
              src={car.images[activeImageIndex].url}
              alt={`${car.brand} ${car.model}`}
              fill
              className="object-contain"
              onError={(e) => { (e.target as HTMLImageElement).src = '/heropics/1.jpg' }}
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-white p-3 bg-white/10 rounded-full hover:bg-white/20 transition-transform active:scale-95"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  );
} 