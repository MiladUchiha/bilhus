'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: t('quickLinks.home'), href: '/' },
    { name: t('quickLinks.services'), href: '/service' },
    { name: t('quickLinks.about'), href: '/about' },
    { name: t('quickLinks.contact'), href: '/contact' },
  ];

  const services = [
    { name: t('services.sales'), href: '/cars' },
    { name: t('services.aixam'), href: '/service/aixam' },
    { name: t('services.financing'), href: '/cars/financing' },
    { name: t('services.valuation'), href: '/contact' },
  ];

  return (
    <footer className="bg-ink text-paper">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
        {/* Brand block */}
        <div className="grid grid-cols-12 gap-8 mb-16 sm:mb-20">
          <div className="col-span-12 lg:col-span-7">
            <Link href="/" className="inline-block">
              <span className="font-display text-4xl sm:text-5xl tracking-[-0.025em] text-paper">
                Märsta <span className="italic">Bilhus</span>
              </span>
            </Link>
            <p className="mt-6 text-paper/70 text-base leading-[1.6] max-w-[52ch]">
              {t('company.description')}
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-4 lg:items-end">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50">
              {t('contact.title')}
            </span>
            <div className="space-y-2 lg:text-right">
              <a
                href="tel:+46700929433"
                className="block font-mono text-lg tabular text-paper hover:text-garnet transition-colors duration-200"
              >
                0700 929 433
              </a>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/50">
                {t('contact.carSales')}
              </p>
            </div>
            <a
              href="mailto:kundservice@marstabilhus.se"
              className="mt-2 text-base text-paper hover:text-garnet transition-colors duration-200 lg:text-right"
            >
              kundservice@marstabilhus.se
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-12 gap-8 border-t border-paper/15 pt-12 pb-12 sm:pb-16">
          <FooterCol title={t('address.title')}>
            <address className="not-italic text-base text-paper leading-[1.65]">
              {t('address.street')}<br />
              <span className="font-mono tabular text-sm">{t('address.postal')}</span><br />
              {t('address.country')}
            </address>
          </FooterCol>

          <FooterCol title={t('openingHours.title')}>
            <ul className="space-y-1 text-sm">
              <Row k={t('openingHours.mondayThursday')} v="09:00–18:00" />
              <Row k={t('openingHours.friday')} v="09:00–17:00" />
              <Row k={t('openingHours.saturday')} v="11:00–15:00" />
            </ul>
          </FooterCol>

          <FooterCol title={t('quickLinks.title')}>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-base text-paper/80 hover:text-paper transition-colors duration-200"
                  >
                    <span className="link-underline">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </FooterCol>

          <FooterCol title={t('services.title')}>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.name}>
                  <Link
                    href={s.href}
                    className="text-base text-paper/80 hover:text-paper transition-colors duration-200"
                  >
                    <span className="link-underline">{s.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </FooterCol>
        </div>

        {/* Workshop referral — the workshop is now Auto Temple, a separate company */}
        <div className="grid grid-cols-12 gap-8 border-t border-paper/15 pt-10 pb-10">
          <div className="col-span-12 lg:col-span-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50">
              {t('workshop.title')}
            </span>
          </div>
          <div className="col-span-12 lg:col-span-9 flex flex-wrap items-baseline gap-x-10 gap-y-3 text-sm text-paper/85">
            <span>{t('workshop.text')}</span>
            <a
              href="https://autotemple.se"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-paper hover:text-garnet transition-colors duration-200"
            >
              <span className="link-underline">autotemple.se</span>
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5h5v5M19 5l-9 9" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-paper/15 pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-sm text-paper/60">
            <span>© {currentYear} Märsta Bilhus AB</span>
            <span className="hidden sm:inline text-paper/30">·</span>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link href="/cookies" className="hover:text-paper transition-colors duration-200">
                {t('legal.privacy')}
              </Link>
              <Link href="/cookies" className="hover:text-paper transition-colors duration-200">
                {t('legal.terms')}
              </Link>
              <Link href="/cookies" className="hover:text-paper transition-colors duration-200">
                {t('legal.cookies')}
              </Link>
            </div>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/40">
            {t('companyInfo.orgNumber')}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="col-span-12 sm:col-span-6 lg:col-span-3">
      <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50 mb-5">
        {title}
      </h4>
      <div className="text-paper">{children}</div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <li className="flex items-baseline justify-between gap-3 text-paper/80">
      <span>{k}</span>
      <span className="font-mono tabular text-paper">{v}</span>
    </li>
  );
}
