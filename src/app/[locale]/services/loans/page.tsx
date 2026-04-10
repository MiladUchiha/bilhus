import { Metadata } from 'next';
import LoansPage from './Loans';


export const metadata: Metadata = {
  title: 'Billån & Finansiering - Märsta Bilhus',
  description: 'Vi erbjuder förmånliga billån och finansieringslösningar för ditt bilköp. Få en skräddarsydd plan som passar din ekonomi.',
};


const page = () => {
  return (
    <div>
        <LoansPage />
    </div>
  )
}

export default page