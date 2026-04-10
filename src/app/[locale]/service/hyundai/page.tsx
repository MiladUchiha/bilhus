import HyundaiOriginalServicePage from './Hyundai';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hyundai Service - Märsta Bilhus',
  description: 'Auktoriserad service för Hyundai. Vi garanterar högsta kvalitet med originaldelar och specialutbildade tekniker.',
};

const page = () => {
  return (
    <HyundaiOriginalServicePage />
  )
}

export default page