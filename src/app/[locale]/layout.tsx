import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookiePopup from "@/components/CookiePopup";
import { CarProvider } from '../../context/CarContext';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import Script from 'next/script';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ['SOFT', 'WONK', 'opsz'],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'en' ? 'Märsta Bilhus — Used cars & Aixam, Arlandastad' : 'Märsta Bilhus — Begagnade bilar & Aixam, Arlandastad',
    description: locale === 'en' ? 'Family-run car dealership on Thulins Plats in Arlandastad. Used cars, Aixam microcars, financing and trade-in. Since 1979.' : 'Familjeägd bilhandlare på Thulins Plats i Arlandastad. Begagnade bilar, Aixam mopedbilar, finansiering och inbyte. Sedan 1979.',
  };
}

export default async function RootLayout({
  children,
  params
}: Props) {
  const {locale} = await params;
  const locales = ['en', 'sv'];
  if (!locales.includes(locale)) notFound();

  const messages = await getMessages({locale});

  return (
    <html lang={locale} className={`${inter.variable} ${fraunces.variable} ${mono.variable}`}>
      <body className="font-sans bg-paper text-ink antialiased">
        <NextIntlClientProvider messages={messages}>
          <CarProvider>
            <Navbar />
            {children}
            <Footer />
            <CookiePopup />
          </CarProvider>
        </NextIntlClientProvider>
        <Script src="https://app.weply.chat/widget/301e3d6db03e90346604c4c64ef80c3f" strategy="afterInteractive" />
      </body>
    </html>
  );
}
