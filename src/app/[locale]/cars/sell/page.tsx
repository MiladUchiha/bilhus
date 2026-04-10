import UnderDevelopment from '@/components/UnderDevelopment';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sälj Din Bil - Märsta Bilhus',
  description: 'Sälj din bil till oss på Märsta Bilhus. Vi erbjuder en smidig och snabb affär med rättvis värdering och betalning samma dag.',
};

export default function SellCarPage() {
  return (
    <UnderDevelopment
      title="Sälja Din Bil"
      subtitle="Vi köper din bil"
      description="Vi arbetar på att få denna sida redo med information om bilförsäljning till oss. Vi köper bilar och du har pengarna på ditt konto samma dag. Kontakta oss för värdering."
    />
  );
}