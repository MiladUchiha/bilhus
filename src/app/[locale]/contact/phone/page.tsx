import Link from 'next/link';
import Button from '@/components/Button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Telefonkontakt - Märsta Bilhus',
  description: 'Ring Märsta Bilhus för bilförsäljning och Aixam-service. Här hittar du vårt telefonnummer och våra telefontider.',
};

export default function ContactPhonePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-light text-gray-900 mb-6">
            Ring <span className="font-normal">Oss</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vi finns tillgängliga för att hjälpa dig med alla dina bilfrågor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main Phone */}
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Telefon</h3>
            <p className="text-gray-600 mb-4">Bilförsäljning & Aixam</p>
            <div className="text-3xl font-bold text-gray-900 mb-4">0700 929 433</div>
            <p className="text-sm text-gray-500 mb-6">Mån-Tor 09:00-18:00, Fre 09:00-17:00, Lör 11:00-15:00</p>
            <a href="tel:+46700929433">
              <Button variant="primary" size="lg" className="w-full">
                Ring nu
              </Button>
            </a>
          </div>

          {/* Workshop — now Auto Temple, a separate company */}
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Verkstad</h3>
            <p className="text-gray-600 mb-4">Auto Temple, Voltgatan 23, Märsta</p>
            <div className="text-3xl font-bold text-gray-900 mb-4">070-092 94 34</div>
            <p className="text-sm text-gray-500 mb-6">Service och reparation av andra bilmärken än Aixam</p>
            <a href="https://autotemple.se" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="w-full">
                autotemple.se
              </Button>
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Behöver du hjälp?</h3>
            <p className="text-blue-700 mb-4">
              Ring oss direkt för snabb hjälp eller <Link href="/contact" className="underline">se alla kontaktvägar</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}