import ServicePage from './Service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service - Märsta Bilhus',
  description: 'Aixam-service hos Märsta Bilhus i Arlandastad. För service och reparation av andra bilmärken hänvisar vi till Auto Temple i Märsta.',
};

const page = () => {
  return (
    <ServicePage />
  )
}

export default page