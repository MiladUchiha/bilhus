import ContactPage from './Contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt - Märsta Bilhus',
  description: 'Kontakta oss på Märsta Bilhus. Här hittar du våra kontaktuppgifter, öppettider och en karta till vår anläggning.',
};

const page = () => {
  return (
    <ContactPage />
  )
}

export default page