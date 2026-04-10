import UnderDevelopment from '@/components/UnderDevelopment';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Allmän Service - Märsta Bilhus',
  description: 'Vi utför service på alla bilmärken enligt tillverkarens rekommendationer. Boka tid för professionell och prisvärd bilservice.',
};

export default function GeneralServicePage() {
  return (
    <UnderDevelopment
      title="Allmän Service"
      subtitle="Service för alla bilmärken"
      description="Vi arbetar på att få denna sida redo med detaljerad information om vår allmänna service. Vi servar alla bilmärken enligt tillverkarens instruktioner."
    />
  );
}