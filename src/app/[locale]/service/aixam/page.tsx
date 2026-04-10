  import AixamOriginalServicePage from './Aixam';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aixam Service - Märsta Bilhus',
  description: 'Auktoriserad service för Aixam mopedbilar. Vi använder originaldelar och specialverktyg för att säkerställa bästa möjliga underhåll.',
};

const page = () => {
  return (
    <AixamOriginalServicePage />
  )
}

export default page