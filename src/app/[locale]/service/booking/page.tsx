import UnderDevelopment from '@/components/UnderDevelopment';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boka Service - Märsta Bilhus',
  description: 'Boka tid för service eller reparation online. Fyll i dina uppgifter så återkommer vi med en bekräftelse.',
};

export default function BookingPage() {
  return (
    <UnderDevelopment
      title="Boka Tid"
      subtitle="Servicebokning"
      description="Vi arbetar på att få denna sida redo med bokningssystem. Kontakta oss direkt för att boka tid för service."
    />
  );
}