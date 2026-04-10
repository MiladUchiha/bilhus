'use client';

import Link from 'next/link';
import Button from './Button';

interface UnderDevelopmentProps {
  title: string;
  subtitle?: string;
  description?: string;
  showContactButton?: boolean;
}

export default function UnderDevelopment({ 
  title, 
  subtitle, 
  description = "Vi arbetar på att få denna sida redo. Kontakta oss för mer information om våra tjänster.",
  showContactButton = true 
}: UnderDevelopmentProps) {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-8">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
            {title}
          </h1>
          
          {subtitle && (
            <h2 className="text-xl sm:text-2xl font-light text-gray-600 mb-8">
              {subtitle}
            </h2>
          )}
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 sm:p-12 mb-8">
            <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Sidan är under arbete
            </h3>
            
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          </div>
          
          {showContactButton && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Kontakta oss
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg">
                  Tillbaka till startsidan
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Contact Info */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Ring oss</h4>
              <div className="space-y-1">
                <a href="tel:+46700929433" className="block text-gray-600 hover:text-gray-900">
                  0700 929 433 (Bilförsäljning)
                </a>
                <a href="tel:+46859120541" className="block text-gray-600 hover:text-gray-900">
                  08 591 205 41 (Verkstad)
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">E-post</h4>
              <a href="mailto:kundservice@marstabilhus.se" className="text-gray-600 hover:text-gray-900">
                kundservice@marstabilhus.se
              </a>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Besök oss</h4>
              <p className="text-gray-600">
                Maskingatan 12<br />
                195 60 Märsta, Arlandastad
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}