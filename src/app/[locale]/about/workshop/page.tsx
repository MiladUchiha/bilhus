import UnderDevelopment from '@/components/UnderDevelopment';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verkstad - Märsta Bilhus',
  description: 'Utforska vår moderna verkstad, utrustad med den senaste tekniken för att ge din bil bästa möjliga service och reparation.',
};

export default function WorkshopPage() {
  return (
    <UnderDevelopment
      title="Vår Verkstad"
      subtitle="Modern utrustning & expertis"
      description="Vi arbetar på att få denna sida redo med information om vår verkstad och utrustning. Kontakta oss för att besöka verkstaden."
    />
  );
}