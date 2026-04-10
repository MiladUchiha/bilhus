import UnderDevelopment from '@/components/UnderDevelopment';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auktorisering - Märsta Bilhus',
  description: 'Information om våra auktoriseringar och certifieringar. Vi är en auktoriserad serviceverkstad för Hyundai och Aixam, vilket garanterar högsta kvalitet på vårt arbete.',
};

export default function AuthorizationPage() {
  return (
    <UnderDevelopment
      title="Auktoriseringar"
      subtitle="Certifieringar & Godkännanden"
      description="Vi arbetar på att få denna sida redo med information om våra auktoriseringar. Vi är auktoriserad serviceverkstad för Hyundai och Aixam."
    />
  );
}