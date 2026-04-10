import UnderDevelopment from '@/components/UnderDevelopment';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inbyte - Märsta Bilhus',
  description: 'Byt in din gamla bil när du köper en ny hos oss. Vi erbjuder en smidig inbytesprocess och rättvis värdering av din nuvarande bil.',
};

export default function TradeInPage() {
  return (
    <UnderDevelopment
      title="Inbyte"
      subtitle="Byt din gamla bil"
      description="Vi arbetar på att få denna sida redo med information om bilbyte. Kontakta oss för att diskutera inbyte av din nuvarande bil."
    />
  );
}