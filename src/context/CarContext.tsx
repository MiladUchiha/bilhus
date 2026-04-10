'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface Car {
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

interface CarContextType {
  cars: Car[];
  loading: boolean;
  error: string | null;
  getCarById: (id: string) => Car | undefined;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider = ({ children }: { children: ReactNode }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const RETRY_DELAYS = [5000, 15000, 60000]; // 5s, 15s, 60s
    const SUCCESS_INTERVAL = 5 * 60 * 1000; // 5 minutes
    let timeoutId: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const fetchCars = async (retryCount = 0) => {
      try {
        setLoading(true);
        const response = await fetch('/api/cars', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        const data = await response.json();
        if (data.success) {
          setCars(data.cars);
          setError(null);
          // On success, poll again after 5 minutes
          if (!cancelled) {
            timeoutId = setTimeout(() => fetchCars(0), SUCCESS_INTERVAL);
          }
        } else {
          throw new Error(data.error || 'Failed to fetch cars');
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        // Retry with exponential backoff
        if (!cancelled && retryCount < RETRY_DELAYS.length) {
          timeoutId = setTimeout(() => fetchCars(retryCount + 1), RETRY_DELAYS[retryCount]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCars();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  const getCarById = (id: string) => {
    return cars.find(car => car.id === id);
  };

  return (
    <CarContext.Provider value={{ cars, loading, error, getCarById }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCars = () => {
  const context = useContext(CarContext);
  if (context === undefined) {
    throw new Error('useCars must be used within a CarProvider');
  }
  return context;
}; 