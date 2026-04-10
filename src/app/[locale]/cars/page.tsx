import CarsPage from './Cars';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bilar i Lager - Märsta Bilhus',
  description: 'Se vårt breda utbud av nya och begagnade bilar. Hitta din nästa bil hos oss, med modeller från ledande märken och för alla behov.',
};

const page = () => {
  return (
    <CarsPage />
  )
}

export default page