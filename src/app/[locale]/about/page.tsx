import Statistics from './Statistics';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Om Oss - Märsta Bilhus',
  description: 'Lär känna Märsta Bilhus, din expert på bilförsäljning och service. Vi är stolta över vår historia och vårt engagemang för kvalitet och kundnöjdhet.',
};

const page = () => {
  return (
    <Statistics />
  )
}

export default page