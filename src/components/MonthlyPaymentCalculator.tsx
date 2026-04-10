'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface MonthlyPaymentCalculatorProps {
  carPrice: number;
  suggestedMonthlyPayment?: number;
  interestRate: string;
  carBrand?: string;
  carModel?: string;
  className?: string;
}

export default function MonthlyPaymentCalculator({ 
  carPrice, 
  suggestedMonthlyPayment,
  interestRate,
  carBrand = "",
  carModel = "",
  className = '' 
}: MonthlyPaymentCalculatorProps) {
  const [downPayment, setDownPayment] = useState(Math.round(carPrice * 0.1)); // Default 10%
  const [loanTerm, setLoanTerm] = useState(60); // months
  const rate = parseFloat(interestRate);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Calculate monthly payment
  useEffect(() => {
    if (carPrice > 0 && loanTerm > 0) {
      const principal = Math.max(0, carPrice - downPayment);
      if (principal <= 0) {
        setMonthlyPayment(0);
        return;
      }

      if (rate === 0) {
        // No interest
        setMonthlyPayment(principal / loanTerm);
      } else {
        // Monthly interest rate
        const monthlyRate = rate / 100 / 12;
        // Calculate monthly payment using loan formula
        const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
                       (Math.pow(1 + monthlyRate, loanTerm) - 1);
        setMonthlyPayment(payment);
      }
    } else {
      setMonthlyPayment(0);
    }
  }, [carPrice, downPayment, loanTerm, rate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const downPaymentPercentage = carPrice > 0 ? (downPayment / carPrice) * 100 : 0;
  const maxDownPayment = Math.max(0, carPrice);

  // Handle down payment changes with validation
  const handleDownPaymentChange = (value: string | number) => {
    const numValue = Math.max(0, Math.min(Number(value), carPrice));
    setDownPayment(numValue);
  };

  const setDownPaymentPercentage = (percentage: number) => {
    const amount = Math.round((carPrice * percentage) / 100);
    setDownPayment(amount);
  };

  return (
    <div className={`bg-white border border-gray-200 shadow-sm rounded-lg p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-light text-gray-900 mb-2">
          Beräkna din månadskostnad
        </h3>
        <p className="text-gray-600">
          {carBrand && carModel ? `för ${carBrand} ${carModel}` : 'för detta fordon'}
        </p>
      </div>

      {/* Vehicle and Financing Information */}
      <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600 font-medium">Bilens pris:</p>
            <p className="text-xl font-bold text-gray-900">
              {formatCurrency(carPrice)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">Ränta från WasaKredit:</p>
            <p className="text-xl font-bold text-gray-900">{interestRate}%</p>
          </div>
        </div>
        
        {/* Suggested Payment Display */}
        {suggestedMonthlyPayment && (
          <div className="pt-4 border-t border-gray-300">
            <div className="text-center">
              <p className="text-sm text-gray-600 font-medium">Rekommenderad månadskostnad:</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatCurrency(suggestedMonthlyPayment)}<span className="text-lg font-normal text-gray-600">/mån</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">Beräknat med WasaKredits villkor</p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Down Payment */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700">
              Kontantinsats ({downPaymentPercentage.toFixed(0)}%)
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDownPaymentPercentage(0)}
                className={`text-xs px-3 py-1 rounded transition-colors ${
                  downPaymentPercentage < 5 ? 'bg-gray-900 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                0%
              </button>
              <button
                type="button"
                onClick={() => setDownPaymentPercentage(10)}
                className={`text-xs px-3 py-1 rounded transition-colors ${
                  downPaymentPercentage >= 5 && downPaymentPercentage < 15 ? 'bg-gray-900 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                10%
              </button>
              <button
                type="button"
                onClick={() => setDownPaymentPercentage(20)}
                className={`text-xs px-3 py-1 rounded transition-colors ${
                  downPaymentPercentage >= 15 && downPaymentPercentage < 30 ? 'bg-gray-900 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                20%
              </button>
              <button
                type="button"
                onClick={() => setDownPaymentPercentage(50)}
                className={`text-xs px-3 py-1 rounded transition-colors ${
                  downPaymentPercentage >= 30 ? 'bg-gray-900 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                50%
              </button>
            </div>
          </div>
          <div className="relative">
            <input
              type="number"
              id="downPayment"
              value={downPayment || ''}
              onChange={(e) => handleDownPaymentChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-lg"
              placeholder="0"
              min="0"
              max={maxDownPayment}
              step="1000"
            />
            <span className="absolute right-4 top-3 text-gray-500">kr</span>
          </div>
          <div className="mt-3">
            <input
              type="range"
              min="0"
              max={maxDownPayment}
              value={downPayment}
              onChange={(e) => handleDownPaymentChange(e.target.value)}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #1f2937 0%, #1f2937 ${downPaymentPercentage}%, #e5e7eb ${downPaymentPercentage}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0 kr</span>
              <span>{formatCurrency(maxDownPayment)}</span>
            </div>
          </div>
        </div>

        {/* Loan Term */}
        <div>
          <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700 mb-3">
            Lånetid ({Math.round(loanTerm / 12)} år)
          </label>
          <select
            id="loanTerm"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-lg"
          >
            <option value={12}>1 år (12 månader)</option>
            <option value={24}>2 år (24 månader)</option>
            <option value={36}>3 år (36 månader)</option>
            <option value={48}>4 år (48 månader)</option>
            <option value={60}>5 år (60 månader) - Populärast</option>
            <option value={72}>6 år (72 månader)</option>
            <option value={84}>7 år (84 månader)</option>
            <option value={96}>8 år (96 månader)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Kortare lånetid = lägre totalkostnad</p>
        </div>
      </div>

      {/* Results */}
      <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Lånebelopp</p>
            <p className="text-lg font-bold text-gray-900">
              {formatCurrency(Math.max(0, carPrice - downPayment))}
            </p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Total ränta</p>
            <p className="text-lg font-bold text-gray-900">
              {formatCurrency(Math.max(0, (monthlyPayment * loanTerm) - (carPrice - downPayment)))}
            </p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Total kostnad</p>
            <p className="text-lg font-bold text-gray-900">
              {formatCurrency(monthlyPayment * loanTerm + downPayment)}
            </p>
          </div>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border-2 border-gray-900">
          <p className="text-sm text-gray-600 mb-2">Din månadskostnad:</p>
          <p className="text-4xl font-bold text-gray-900 mb-1">
            {formatCurrency(monthlyPayment)}
          </p>
          <p className="text-sm text-gray-500">per månad i {Math.round(loanTerm / 12)} år</p>
        </div>
      </div>

      {/* Information Box */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Bra att veta:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Bilpriset</strong> och <strong>räntan</strong> är fastställda av oss och WasaKredit</li>
          <li>• Du påverkar månadsbeloppet genom <strong>kontantinsats</strong> och <strong>lånetid</strong></li>
          <li>• Högre kontantinsats = lägre månadskostnad och mindre totalkostnad</li>
          <li>• Kortare lånetid = högre månadskostnad men lägre totalkostnad</li>
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>⚠️ Observera:</strong> Beräkningen är en uppskattning baserad på WasaKredits standardvillkor. 
          Den faktiska månadsbetalningen kan variera beroende på kreditprövning, försäkringsval och andra faktorer. 
          Kontakta oss för en bindande offert.
        </p>
      </div>

      {/* Contact CTA */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/contact/quote"
          className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300 text-center font-medium"
        >
          📞 Få bindande offert
        </Link>
        <Link
          href="/cars/financing"
          className="border-2 border-gray-300 text-gray-900 px-8 py-3 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-colors duration-300 text-center font-medium"
        >
          📖 Läs mer om finansiering
        </Link>
      </div>
    </div>
  );
} 