import BookingPage from './Book';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boka Provkörning - Märsta Bilhus',
  description: 'Boka en provkörning av din drömbil. Fyll i formuläret så kontaktar vi dig för att bekräfta tiden.',
};

const page = () => {
  return (
    <BookingPage />
  )
}

export default page