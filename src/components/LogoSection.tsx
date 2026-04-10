import Image from 'next/image';
import Link from 'next/link';

export default function LogoSection() {
  return (
    <section className="py-6 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center space-x-20 opacity-70 hover:opacity-100 transition-opacity duration-300">
          <Link 
            href="/service/hyundai"
            className="group transition-all duration-300 hover:scale-105"
          >
            <Image
              src="/hyundai.png"
              alt="Hyundai Service - Klicka för mer info"
              width={140}
              height={50}
              className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300 cursor-pointer"
            />
          </Link>
          <Link 
            href="/service/aixam"
            className="group transition-all duration-300 hover:scale-105"
          >
            <Image
              src="/aixam.png"
              alt="Aixam Service - Klicka för mer info"
              width={140}
              height={50}
              className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300 cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}