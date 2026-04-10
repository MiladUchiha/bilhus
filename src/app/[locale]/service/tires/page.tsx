import UnderDevelopment from '@/components/UnderDevelopment';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Däck & Hjul - Märsta Bilhus',
  description: 'Allt inom däck och fälg. Vi erbjuder däckhotell, hjulskifte och försäljning av nya däck från ledande tillverkare.',
};

export default function TiresPage() {
  return (
    <UnderDevelopment
      title="Däck & Hjul"
      subtitle="Däckservice & Hjulskifte"
      description="Vi arbetar på att få denna sida redo med information om däckservice. Kontakta oss för däckbyte och hjulservice."
    />
  );
}