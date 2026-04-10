import UnderDevelopment from '@/components/UnderDevelopment';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bilvärdering - Märsta Bilhus',
  description: 'Få en kostnadsfri och rättvis värdering av din bil. Vi hjälper dig att förstå bilens marknadsvärde inför försäljning eller inbyte.',
};

export default function ValuationPage() {
  return (
    <UnderDevelopment
      title="Värdering"
      subtitle="Bilens värde"
      description="Vi arbetar på att få denna sida redo med information om bilvärdering. Kontakta oss för värdering av din bil."
    />
  );
}