import { NextResponse } from 'next/server';

// Force dynamic rendering - never cache this route
export const dynamic = 'force-dynamic';


// Data validation and sanitization helpers
function sanitizeString(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/[<>"'&]/g, '');
}

function sanitizeNumber(value: unknown): number {
  if (typeof value === 'number' && !isNaN(value)) return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return !isNaN(parsed) ? parsed : 0;
  }
  return 0;
}

function validateCarData(car: unknown): car is LagerimportCar {
  if (!car || typeof car !== 'object' || car === null) {
    return false;
  }
  
  const carObj = car as Record<string, unknown>;
  
  return (
    typeof carObj.ID === 'number' &&
    typeof carObj.marke === 'string' &&
    typeof carObj.modell === 'string' &&
    (typeof carObj.begartpris === 'number' || typeof carObj.begartpris === 'string')
  );
}

interface LagerimportCar {
  ID: number;
  indatum: string;
  fordontyp: string;
  regnr: string;
  marke: string;
  modell: string;
  modellbeteckning: string;
  kaross: string;
  amod: string;
  mil: number;
  fabriksny: string;
  cnr: string;
  farg: string;
  drivmedel: string;
  vaxel: string;
  begartpris: number;
  nedsattpris: number | null;
  regyear: string;
  regmonth: string;
  effektkw: string;
  effekthp: string;
  antbadd: string;
  langd: string;
  totvikt: string;
  transportfordon_Nm: string;
  transportfordon_bredd: string;
  transportfordon_hojd: string;
  mc_motortyp: string;
  mc_cc: string;
  mc_timmar: string;
  utr: string;
  beskrivning: string;
  planlosningar: unknown[];
  finansbolag: string;
  ranta: string;
  manadskostnad: number;
  antalbilder: number;
  bilder: string[];
}

interface TransformedCar {
  id: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  originalPrice?: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  image: string;
  images: Array<{ url: string }>;
  features: string[];
  shareUrl: string;
  licensePlate?: string;
  description: string;
  specs: Array<{ label: string; value: string }>;
  monthlyPayment?: number;
  interestRate?: string;
  financingCompany?: string;
  indatum?: string;
}

// Helper function to parse features from the equipment description
function parseFeatures(utr: string): string[] {
  if (!utr) return [];
  
  // Split by common delimiters and clean up
  const features = utr
    .split(/[,\n\r]+/)
    .map(feature => feature.trim())
    .filter(feature => 
      feature.length > 2 && 
      !feature.includes('Välkommen till') &&
      !feature.includes('WWW.MARSTABILHUS.SE') &&
      !feature.includes('kontakta oss') &&
      !feature.includes('0700 92 94 33') &&
      !feature.includes('08 591 205 41') &&
      !feature.includes('PAYDRIVE') &&
      !feature.toLowerCase().includes('försäkring') &&
      !feature.toLowerCase().includes('finans') &&
      !feature.toLowerCase().includes('inbyte')
    )
    .slice(0, 15); // Limit to reasonable number of features
  
  return features;
}

// Helper function to create specs array
function createSpecs(car: LagerimportCar): Array<{ label: string; value: string }> {
  const specs = [];
  
  if (car.effekthp) specs.push({ label: 'Effekt', value: `${car.effekthp} hk` });
  if (car.effektkw) specs.push({ label: 'Effekt', value: `${car.effektkw} kW` });
  if (car.farg) specs.push({ label: 'Färg', value: car.farg });
  if (car.kaross) specs.push({ label: 'Kaross', value: car.kaross });
  if (car.regyear && car.regmonth) {
    specs.push({ label: 'Registrerad', value: `${car.regyear}-${car.regmonth.padStart(2, '0')}` });
  }
  if (car.cnr) specs.push({ label: 'Chassinummer', value: car.cnr });
  if (car.finansbolag) specs.push({ label: 'Finansbolag', value: car.finansbolag });
  if (car.ranta) specs.push({ label: 'Ränta', value: `${car.ranta}%` });
  
  return specs;
}

export async function GET() {
  try {
    const apiUrl = process.env.LAGERIMPORT_API_URL || 'https://lagerimport.appdata.se/556631-7201.json';
    const response = await fetch(
      apiUrl,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'MerstaBilhus/1.0',
        },
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Lagerimport API error: ${response.status}`, errorText);
      throw new Error(`Lagerimport API error: ${response.status} - ${errorText}`);
    }

    const data: LagerimportCar[] = await response.json();
    console.log('Lagerimport API response:', { total: data?.length });
    
    // Validate and transform Lagerimport data to our format
    const transformedCars = data
      .filter(validateCarData)
      .map((car: LagerimportCar): TransformedCar | null => {
        try {
        // Parse features from equipment description
        const features = parseFeatures(car.utr);
        
        // Create images array
        const images = car.bilder.map(url => ({ url }));
        
        // Create specifications
        const specs = createSpecs(car);
        
        // Format transmission
        const transmission = car.vaxel === 'Automat' ? 'Automatisk' : 
                           car.vaxel === 'Manuell' ? 'Manuell' : car.vaxel;
        
        // Format fuel type
        const fuelType = car.drivmedel;
        
        // Create description from beskrivning, cleaning up promotional text
        const description = car.beskrivning
          .replace(/Välkommen till Märsta Bilhus[\s\S]*?WWW\.MARSTABILHUS\.SE/g, '')
          .replace(/VI ERBJUDER[\s\S]*?FÖRETAGET,/g, '')
          .replace(/\r\n/g, ' ')
          .trim();

          return {
            id: sanitizeString(car.ID?.toString()),
            brand: sanitizeString(car.marke),
            model: sanitizeString(car.modell),
            year: sanitizeString(car.amod),
            price: sanitizeNumber(car.nedsattpris || car.begartpris).toLocaleString('sv-SE'),
            originalPrice: car.nedsattpris ? sanitizeNumber(car.begartpris).toLocaleString('sv-SE') : undefined,
            mileage: sanitizeNumber(car.mil).toLocaleString('sv-SE'),
            fuelType: sanitizeString(fuelType),
            transmission: sanitizeString(transmission),
            image: images[0]?.url || '/heropics/1.jpg', // Fallback to placeholder
            images,
            features,
            shareUrl: `https://marstabilhus.se/cars/${sanitizeString(car.ID?.toString())}`,
            licensePlate: sanitizeString(car.regnr),
            description: sanitizeString(description) || `${sanitizeString(car.marke)} ${sanitizeString(car.modell)} från ${sanitizeString(car.amod)}`,
            specs,
            monthlyPayment: sanitizeNumber(car.manadskostnad),
            interestRate: sanitizeString(car.ranta),
            financingCompany: sanitizeString(car.finansbolag),
            indatum: sanitizeString(car.indatum),
          };
        } catch (error) {
          console.error(`Error processing car ${car.ID}:`, error);
          return null;
        }
      })
      .filter((car): car is TransformedCar => car !== null);

    return NextResponse.json({
      success: true,
      cars: transformedCars,
      total: transformedCars.length,
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Access-Control-Allow-Origin': 'https://marstabilhus.se',
      },
    });

  } catch (error) {
    console.error('Error fetching cars from Lagerimport:', error);
    
    // Return fallback data in case of API failure
    return NextResponse.json({
      success: false,
      error: 'Kunde inte hämta bilar just nu',
      cars: [],
      total: 0,
    }, {
      status: 500,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Access-Control-Allow-Origin': 'https://marstabilhus.se',
      },
    });
  }
} 