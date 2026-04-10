import ServicePage from './Service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service & Verkstad - Märsta Bilhus',
  description: 'Boka service eller reparation för din bil. Vi är en auktoriserad verkstad för Hyundai och Aixam, och erbjuder expertis för alla bilmärken.',
};

const page = () => {
  return (
    <ServicePage />
  )
}

export default page