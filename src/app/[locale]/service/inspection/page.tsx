import UnderDevelopment from '@/components/UnderDevelopment';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Besiktning - Märsta Bilhus',
  description: 'Information om bilbesiktning och hur vi kan hjälpa dig att förbereda din bil för en smidig och godkänd kontroll.',
};

export default function InspectionPage() {
  return (
    <UnderDevelopment
      title="Bilbesiktning"
      subtitle="Kontrollbesiktning"
      description="Vi arbetar på att få denna sida redo med information om besiktningsservice. Kontakta oss för mer information om bilbesiktning."
    />
  );
}