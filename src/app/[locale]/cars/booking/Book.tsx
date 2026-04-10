'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Car, Phone, Mail, Clock, Calendar } from 'lucide-react';

// Separate component that uses useSearchParams
function BookingInfo() {
  const searchParams = useSearchParams();
  
  // Get car details from URL parameters
  const carBrand = searchParams.get('brand') || '';
  const carModel = searchParams.get('model') || '';
  const carYear = searchParams.get('year') || '';
  const carId = searchParams.get('id') || '';

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link 
          href={`/cars/${carId}`} 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group"
        >
          <ChevronLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Tillbaka till bil
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Boka provkörning</h1>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-2">
              <Car className="w-5 h-5 text-gray-600 mr-2" />
              <span className="text-lg font-semibold text-gray-900">
                {carBrand} {carModel} ({carYear})
              </span>
            </div>
            <p className="text-gray-600">
              Ring oss direkt för att boka en provkörning. Vi hjälper dig att hitta en tid som passar dig.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Phone Contact */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Ring oss direkt</h2>
            <p className="text-gray-600 mb-4">Snabbaste sättet att boka provkörning</p>
            <div className="text-2xl font-bold text-gray-900 mb-4">0700 92 94 33</div>
            <p className="text-sm text-gray-500 mb-6">Mån-Fre 09:00-18:00, Lör 11:00-15:00</p>
            <a href="tel:0700929433">
              <button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors">
                Ring nu
              </button>
            </a>
          </div>

          {/* Email Contact */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Skicka e-post</h2>
            <p className="text-gray-600 mb-4">Vi svarar inom 24 timmar</p>
            <div className="text-lg font-medium text-gray-900 mb-4">Info@marstabilhus.se</div>
            <p className="text-sm text-gray-500 mb-6">Inkludera bil-ID och önskad tid</p>
            <a href="mailto:Info@marstabilhus.se?subject=Provkörning - {carBrand} {carModel} ({carYear})&body=Hej,%0D%0A%0D%0AJag skulle vilja boka en provkörning av {carBrand} {carModel} ({carYear}).%0D%0A%0D%0AMed vänliga hälsningar">
              <button className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors">
                Skicka e-post
              </button>
            </a>
          </div>
        </div>

        <div className="mt-12">
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Information om provkörning</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <Clock className="w-5 h-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">Tillgängliga tider</h4>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Måndag - Torsdag: 09:00 - 18:00</li>
                  <li>• Fredag: 09:00 - 17:00</li>
                  <li>• Lördag: 11:00 - 15:00</li>
                  <li>• Söndag: Stängt</li>
                  <li>• Provkörning tar ca 30-45 minuter</li>
                </ul>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <Calendar className="w-5 h-5 text-green-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">Vad du behöver</h4>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Giltigt körkort</li>
                  <li>• Legitimation</li>
                  <li>• Bekväma kläder och skor</li>
                  <li>• Vi förbereder bilen åt dig</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-2">Behöver du hjälp?</h4>
            <p className="text-blue-700 mb-4">
              Ring oss direkt så hjälper vi dig att hitta rätt bil och boka en tid som passar dig.
            </p>
            <div className="space-x-4">
              <Link href={`/cars/${carId}`}>
                <button className="px-6 py-2 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-100 transition-colors">
                  Tillbaka till bil
                </button>
              </Link>
              <Link href="/cars">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Se fler bilar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading fallback component
function BookingInfoLoading() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-32 mb-8"></div>
          <div className="h-8 bg-gray-300 rounded w-48 mb-4"></div>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <div className="h-6 bg-gray-300 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-96"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-64 bg-gray-300 rounded"></div>
            <div className="h-64 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function BookingPage() {
  return (
    <Suspense fallback={<BookingInfoLoading />}>
      <BookingInfo />
    </Suspense>
  );
} 