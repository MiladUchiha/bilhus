import Link from 'next/link';
import Button from '@/components/Button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hitta Oss - Märsta Bilhus',
  description: 'Hitta till vår anläggning i Arlandastad. Adress, karta och vägbeskrivning för att enkelt nå oss med bil eller kollektivtrafik.',
};

export default function FindUsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-light text-gray-900 mb-6">
            Hitta <span className="font-normal">Till Oss</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vi ligger strategiskt placerade i Arlandastad, lätt att nå från hela Stockholmsområdet.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Address Info */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Vår adress</h2>
            <div className="space-y-2 mb-6">
              <p className="text-xl font-medium text-gray-900">Märsta Bilhus</p>
              <p className="text-gray-600">Maskingatan 12</p>
              <p className="text-gray-600">195 60 Arlandastad</p>
            </div>
            <div className="space-y-2 text-sm text-gray-500 mb-6">
              <p>• 3 mil från Stockholm</p>
              <p>• Nära Arlanda flygplats</p>
              <p>• Gratis parkering</p>
              <p>• Lättillgängligt med kollektivtrafik</p>
            </div>
            <a href="https://maps.google.com/?q=Maskingatan+12,+195+60+Arlandastad" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg" className="w-full">
                Öppna i Google Maps
              </Button>
            </a>
          </div>

          {/* Directions */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0V7m0 2l-6-3" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Vägbeskrivning</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Med bil från Stockholm:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Ta E4 norrut mot Arlanda</li>
                  <li>• Avfart 183 mot Märsta/Arlandastad</li>
                  <li>• Följ skyltarna till Arlandastad</li>
                  <li>• Sväng in på Maskingatan</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Kollektivtrafik:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Pendeltåg till Märsta station</li>
                  <li>• Buss 583 mot Arlandastad</li>
                  <li>• Kliv av vid Maskingatan</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Öppettider</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium text-blue-900">Måndag - Fredag</p>
                <p className="text-blue-700">09:00 - 18:00</p>
              </div>
              <div>
                <p className="font-medium text-blue-900">Lördag</p>
                <p className="text-blue-700">11:00 - 15:00</p>
              </div>
              <div>
                <p className="font-medium text-blue-900">Söndag</p>
                <p className="text-blue-700">Stängt</p>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Se alla kontaktvägar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 