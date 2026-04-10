'use client';

import { useState, useEffect, useMemo } from 'react';

interface ServicePrice {
  name: string;
  basePrice: number;
  timeHours: number;
  description: string;
}

export default function ServiceCalculator() {
  const [selectedService, setSelectedService] = useState('');
  const [carAge, setCarAge] = useState(5);
  const [complexity, setComplexity] = useState('standard');
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);

  const services: Record<string, ServicePrice> = useMemo(() => ({
    'basic-service': {
      name: 'Grundservice',
      basePrice: 1500,
      timeHours: 2,
      description: 'Oljebyte, filter, grundkontroll'
    },
    'major-service': {
      name: 'Fullservice',
      basePrice: 2800,
      timeHours: 4,
      description: 'Omfattande service enligt serviceschema'
    },
    'brake-service': {
      name: 'Bromservice',
      basePrice: 2200,
      timeHours: 3,
      description: 'Bromsbelägg, skivor, bromsvätska'
    },
    'tire-change': {
      name: 'Däckbyte',
      basePrice: 450,
      timeHours: 0.5,
      description: 'Byte mellan säsongsdäck'
    },
    'inspection': {
      name: 'Besiktning',
      basePrice: 695,
      timeHours: 1,
      description: 'Kontrollbesiktning'
    },
    'ac-service': {
      name: 'AC-service',
      basePrice: 1200,
      timeHours: 1.5,
      description: 'Rengöring och påfyllning av kylmedel'
    }
  }), []);

  const additionalOptions = useMemo(() => [
    { id: 'wash', name: 'Biltvätt', price: 200 },
    { id: 'pickup', name: 'Hämtning/lämning', price: 300 },
    { id: 'rental', name: 'Lånefordon', price: 450 },
    { id: 'express', name: 'Expresshantering', price: 500 }
  ], []);

  useEffect(() => {
    if (selectedService && services[selectedService]) {
      const service = services[selectedService];
      const baseCost = service.basePrice;
      const baseTime = service.timeHours;

      // Age multiplier
      const ageMultiplier = carAge > 10 ? 1.2 : carAge > 5 ? 1.1 : 1.0;
      
      // Complexity multiplier
      const complexityMultiplier = complexity === 'complex' ? 1.4 : complexity === 'simple' ? 0.8 : 1.0;
      
      // Calculate base cost with multipliers
      const adjustedCost = baseCost * ageMultiplier * complexityMultiplier;
      const adjustedTime = baseTime * complexityMultiplier;

      // Add additional services
      const additionalCost = additionalServices.reduce((sum, serviceId) => {
        const option = additionalOptions.find(opt => opt.id === serviceId);
        return sum + (option?.price || 0);
      }, 0);

      setTotalCost(Math.round(adjustedCost + additionalCost));
      setEstimatedTime(adjustedTime);
    } else {
      setTotalCost(0);
      setEstimatedTime(0);
    }
  }, [selectedService, carAge, complexity, additionalServices, services, additionalOptions]);

  const handleAdditionalServiceChange = (serviceId: string) => {
    setAdditionalServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const formatTime = (hours: number): string => {
    if (hours < 1) {
      return `${Math.round(hours * 60)} min`;
    } else if (hours === Math.floor(hours)) {
      return `${hours} timme${hours > 1 ? 'r' : ''}`;
    } else {
      const wholeHours = Math.floor(hours);
      const minutes = Math.round((hours - wholeHours) * 60);
      return `${wholeHours}h ${minutes}min`;
    }
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-8 sm:p-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
          Servicekalkylator
        </h2>
        <p className="text-lg text-gray-600">
          Beräkna ungefärlig kostnad för din service
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Service Selection */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Välj tjänst
              </label>
              <div className="space-y-3">
                {Object.entries(services).map(([key, service]) => (
                  <label key={key} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="service"
                      value={key}
                      checked={selectedService === key}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="mt-1 w-4 h-4 text-gray-900 focus:ring-gray-900"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{service.name}</div>
                      <div className="text-sm text-gray-600">{service.description}</div>
                      <div className="text-sm text-gray-500">
                        Från {service.basePrice.toLocaleString('sv-SE')} kr • {formatTime(service.timeHours)}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Bilens ålder: {carAge} år
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={carAge}
                onChange={(e) => setCarAge(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>1 år</span>
                <span>20 år</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Komplexitet
              </label>
              <div className="space-y-2">
                {[
                  { value: 'simple', label: 'Enkel', desc: 'Grundläggande service, inga problem' },
                  { value: 'standard', label: 'Standard', desc: 'Normal service enligt schema' },
                  { value: 'complex', label: 'Komplex', desc: 'Extra kontroller eller reparationer' }
                ].map((option) => (
                  <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="complexity"
                      value={option.value}
                      checked={complexity === option.value}
                      onChange={(e) => setComplexity(e.target.value)}
                      className="mt-1 w-4 h-4 text-gray-900 focus:ring-gray-900"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Additional Services & Result */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Tilläggstjänster
              </label>
              <div className="space-y-3">
                {additionalOptions.map((option) => (
                  <label key={option.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={additionalServices.includes(option.id)}
                        onChange={() => handleAdditionalServiceChange(option.id)}
                        className="w-4 h-4 text-gray-900 focus:ring-gray-900"
                      />
                      <span className="text-gray-900">{option.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      +{option.price.toLocaleString('sv-SE')} kr
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Result */}
            {selectedService && (
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Kostnadsuppskattning
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Grundpris:</span>
                    <span className="text-gray-900">
                      {services[selectedService].basePrice.toLocaleString('sv-SE')} kr
                    </span>
                  </div>
                  
                  {carAge > 5 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Ålderstillägg:</span>
                      <span className="text-gray-600">
                        +{carAge > 10 ? '20' : '10'}%
                      </span>
                    </div>
                  )}
                  
                  {complexity !== 'standard' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Komplexitetstillägg:</span>
                      <span className="text-gray-600">
                        {complexity === 'complex' ? '+40%' : '-20%'}
                      </span>
                    </div>
                  )}
                  
                  {additionalServices.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tilläggstjänster:</span>
                      <span className="text-gray-600">
                        +{additionalServices.reduce((sum, serviceId) => {
                          const option = additionalOptions.find(opt => opt.id === serviceId);
                          return sum + (option?.price || 0);
                        }, 0).toLocaleString('sv-SE')} kr
                      </span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Total kostnad:</span>
                      <span className="text-2xl font-light text-gray-900">
                        {totalCost.toLocaleString('sv-SE')} kr
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600">Beräknad tid:</span>
                      <span className="text-sm text-gray-600">
                        {formatTime(estimatedTime)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-3">För att boka denna service:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <a 
                        href="tel:08-59120541" 
                        className="inline-flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Ring 08-59 120 541
                      </a>
                      <a 
                        href="mailto:kundservice@marstabilhus.se?subject=Servicebokning&body=Jag skulle vilja boka service enligt kalkylatorn." 
                        className="inline-flex items-center justify-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        Skicka e-post
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {selectedService && (
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Observera:</strong> Detta är en ungefärlig kostnadsberäkning. 
              Slutlig kostnad kan variera beroende på bilens skick och eventuella extra åtgärder som behövs.
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #111827;
          cursor: pointer;
        }
        
        input[type="range"]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #111827;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}