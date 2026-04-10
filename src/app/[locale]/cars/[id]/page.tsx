import CarDetailsPage from './Car';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bildetaljer - Märsta Bilhus',
  description: 'Detaljerad information om en specifik bil. Utforska specifikationer, funktioner och bilder för att hitta allt du behöver veta.',
};

const page = () => {
  return (
    <CarDetailsPage />
  )
}

export default page