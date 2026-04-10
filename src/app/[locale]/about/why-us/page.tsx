import UnderDevelopment from '@/components/UnderDevelopment';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Varför Oss - Märsta Bilhus',
  description: 'Upptäck varför du ska välja Märsta Bilhus för ditt nästa bilköp eller service. Vi erbjuder expertis, kvalitet och ett starkt kundfokus.',
};

export default function WhyUsPage() {
  return (
    <UnderDevelopment
      title="Varför välja oss"
      subtitle="Våra fördelar"
      description="Vi arbetar på att få denna sida redo med information om våra fördelar. Kontakta oss för att lära dig mer om varför kunder väljer oss."
    />
  );
}