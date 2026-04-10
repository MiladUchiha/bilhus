import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookiePopup from "@/components/CookiePopup";
import { CarProvider } from '../../context/CarContext';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';

import Script from 'next/script';
const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'en' ? 'Märsta Car House' : 'Märsta Bilhus',
    description: locale === 'en' ? 'We sell, buy and trade cars.' : 'Vi säljer, köper och byter bilar.',
  };
}

export default async function RootLayout({
  children,
  params
}: Props) {
  const {locale} = await params;
  // Validate that the incoming `locale` parameter is valid
  const locales = ['en', 'sv'];
  if (!locales.includes(locale)) notFound();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({locale});

  return (
    <html lang={locale}>
      <body className={inter.className}>
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
