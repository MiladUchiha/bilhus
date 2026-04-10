import UnderDevelopment from '@/components/UnderDevelopment';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hemleverans - Märsta Bilhus',
  description: 'Köp din bil online och få den levererad direkt till din dörr. Vi erbjuder smidig och säker hemleverans i hela Sverige.',
};

export default function DeliveryPage() {
  return (
    <UnderDevelopment
      title="Hemleverans"
      subtitle="Vi levererar hem till dig"
      description="Vi arbetar på att få denna sida redo med information om leveranstjänster. Kontakta oss för mer information."
    />
  );
}