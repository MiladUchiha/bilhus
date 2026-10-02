import Statistics from './Statistics';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Om Oss - Märsta Bilhus',
  description: 'Lär känna Märsta Bilhus, familjeägd bilhandlare i Arlandastad sedan 70-talet. Begagnade bilar och auktoriserad Aixam-återförsäljare.',
};

const page = () => {
  return (
    <Statistics />
  )
}

export default page