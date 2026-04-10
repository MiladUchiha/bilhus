import { Metadata } from 'next';
import InsurancePage from './Insurance';


export const metadata: Metadata = {
  title: 'Bilförsäkring - Märsta Bilhus',
  description: 'Hitta rätt bilförsäkring för din nya bil. Vi samarbetar med ledande försäkringsbolag för att erbjuda trygga och prisvärda lösningar.',
};


const page = () => {
  return (
    <div>
        <InsurancePage />
    </div>
  )
}

export default page