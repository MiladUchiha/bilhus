import UnderDevelopment from '@/components/UnderDevelopment';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal - Märsta Bilhus',
  description: 'Träffa vårt team av erfarna och engagerade medarbetare. Vi är här för att hjälpa dig med allt som rör ditt bilägande.',
};

export default function StaffPage() {
  return (
    <UnderDevelopment
      title="Vårt Team"
      subtitle="Erfaren personal"
      description="Vi arbetar på att få denna sida redo med information om vårt team. Kontakta oss för att träffa våra medarbetare."
    />
  );
}