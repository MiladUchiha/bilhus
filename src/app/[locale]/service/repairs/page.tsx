import RepairsPage from './Repairs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reparationer - Märsta Bilhus',
  description: 'Vi utför alla typer av bilreparationer, från mindre justeringar till större motorarbeten. Kontakta oss för en offert.',
};

const page = () => {
  return (
    <RepairsPage />
  )
}

export default page