import HeroSection from '@/components/HeroSection';
import LogoSection from '@/components/LogoSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import CarShowcaseSection from '@/components/CarShowcaseSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import { Metadata } from 'next';
import {getTranslations} from 'next-intl/server';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'meta'});
  
  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
  };
}

export default async function Home() {
  const localBusinessSchema = {
    "@context": "http://schema.org",
    "@type": "LocalBusiness",
    "name": "Märsta Bilhus",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Maskingatan 12",
      "addressLocality": "Arlandastad",
      "postalCode": "195 60",
      "addressCountry": "SE"
    },
    "telephone": "+46859120541",
    "openingHours": ["Mo-Th 09:00-18:00", "Fr 09:00-17:00", "Sa 11:00-15:00"],
    "url": "https://marstabilhus.se"
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <HeroSection />
      <LogoSection />
      <ServicesSection />
      <AboutSection />
      <CarShowcaseSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
