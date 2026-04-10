import Link from 'next/link';
import Button from '@/components/Button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Öppettider - Märsta Bilhus',
  description: 'Våra öppettider för bilförsäljning och verkstad. Se när du kan besöka oss eller kontakta oss för service.',
};

export default function ContactHoursPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-light text-gray-900 mb-6">
            Våra <span className="font-normal">Öppettider</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vi strävar efter att vara tillgängliga när du behöver oss mest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Regular Hours */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Allmänna öppettider</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Måndag - Fredag</span>
                <span className="font-semibold text-gray-900">09:00 - 18:00</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Lördag</span>
                <span className="font-semibold text-gray-900">11:00 - 15:00</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Söndag</span>
                <span className="font-semibold text-red-600">Stängt</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Lunch:</strong> 12:00 - 13:00 vardagar
              </p>
            </div>
          </div>

          {/* Service Hours */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Verkstad & Service</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Måndag - Fredag</span>
                <span className="font-semibold text-gray-900">07:30 - 16:30</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Lördag</span>
                <span className="font-semibold text-red-600">Stängt</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Söndag</span>
                <span className="font-semibold text-red-600">Stängt</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Notering:</strong> Boka tid i förväg för service
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Kontakta oss direkt</h3>
            <p className="text-blue-700 mb-6">
              Ring oss för att boka tid eller om du har frågor om våra öppettider.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="tel:08-59120541">
                <Button variant="primary" size="lg" className="w-full">
                  Ring 08-59 120 541
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full">
                  Alla kontaktvägar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}