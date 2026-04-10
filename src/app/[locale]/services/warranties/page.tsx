import { Metadata } from 'next';
import WarrantiesPage from './Warranties';


export const metadata: Metadata = {
  title: 'Garantier - Märsta Bilhus',
  description: 'Läs mer om våra garantier för begagnade bilar och servicearbeten. Vi erbjuder trygghet och skydd för ditt bilägande.',
};

const page = () => {
  return (
    <div>
        <WarrantiesPage />
    </div>
  )
}

export default page