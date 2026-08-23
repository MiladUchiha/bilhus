'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

interface DropdownItem {
  name: string;
  href: string;
  description?: string;
}

interface NavItem {
  name: string;
  href: string;
  dropdown?: DropdownItem[];
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pathname = usePathname();
  const t = useTranslations();

  // Only these routes open with a dark/photographic hero — everywhere else the
  // top of the page is paper, so the navbar must render in ink with a paper bg.
  const stripLocale = (p: string) => p.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';
  const path = stripLocale(pathname);
  const darkHeroPages = ['/', '/service/hyundai', '/service/aixam', '/service/repairs'];
  const onDarkHero = darkHeroPages.some((p) =>
    p === '/' ? path === '/' : path.startsWith(p)
  );
  const onDarkSurface = !isScrolled && onDarkHero;
  const onLight = !onDarkSurface;

  // Color helpers
  const text = onDarkSurface ? 'text-paper' : 'text-ink';
  const textMuted = onDarkSurface ? 'text-paper/70' : 'text-ink-2';
  const textHover = onDarkSurface ? 'hover:text-paper' : 'hover:text-garnet';

  const navItems: NavItem[] = [
    { name: t('navigation.home'), href: '/' },
    {
      name: t('navigation.cars'),
      href: '/cars',
      dropdown: [
        { name: t('cars.dropdown.allCars'), href: '/cars', description: t('cars.dropdown.allCarsDescription') },
        { name: t('cars.dropdown.aixamCars'), href: 'https://marstabilhus.aixam-mopedbil.se/', description: t('cars.dropdown.aixamCarsDescription') },
        { name: t('cars.dropdown.financing'), href: '/cars/financing', description: t('cars.dropdown.financingDescription') },
        { name: t('cars.dropdown.sellCar'), href: '/cars/sell', description: t('cars.dropdown.sellCarDescription') },
      ],
    },
    {
      name: t('navigation.service'),
      href: '/service',
      dropdown: [
        { name: t('service.dropdown.allServices'), href: '/service', description: t('service.dropdown.allServicesDescription') },
        { name: t('service.dropdown.hyundaiService'), href: '/service/hyundai', description: t('service.dropdown.hyundaiServiceDescription') },
        { name: t('service.dropdown.aixamService'), href: '/service/aixam', description: t('service.dropdown.aixamServiceDescription') },
        { name: t('service.dropdown.generalService'), href: '/service/general', description: t('service.dropdown.generalServiceDescription') },
        { name: t('service.dropdown.inspection'), href: '/service/inspection', description: t('service.dropdown.inspectionDescription') },
        { name: t('service.dropdown.tires'), href: '/service/tires', description: t('service.dropdown.tiresDescription') },
        { name: t('service.dropdown.repairs'), href: '/service/repairs', description: t('service.dropdown.repairsDescription') },
        { name: t('service.dropdown.booking'), href: '/service/booking', description: t('service.dropdown.bookingDescription') },
      ],
    },
    {
      name: t('navigation.services'),
      href: '/services',
      dropdown: [
        { name: t('services.dropdown.loans'), href: '/services/loans', description: t('services.dropdown.loansDescription') },
        { name: t('services.dropdown.insurance'), href: '/services/insurance', description: t('services.dropdown.insuranceDescription') },
        { name: t('services.dropdown.valuation'), href: '/services/valuation', description: t('services.dropdown.valuationDescription') },
        { name: t('services.dropdown.delivery'), href: '/services/delivery', description: t('services.dropdown.deliveryDescription') },
        { name: t('services.dropdown.warranties'), href: '/services/warranties', description: t('services.dropdown.warrantiesDescription') },
        { name: t('services.dropdown.tradeIn'), href: '/services/trade-in', description: t('services.dropdown.tradeInDescription') },
      ],
    },
    {
      name: t('navigation.about'),
      href: '/about',
      dropdown: [
        { name: t('about.dropdown.company'), href: '/about', description: t('about.dropdown.companyDescription') },
        { name: t('about.dropdown.workshop'), href: '/about/workshop', description: t('about.dropdown.workshopDescription') },
        { name: t('about.dropdown.authorization'), href: '/about/authorization', description: t('about.dropdown.authorizationDescription') },
        { name: t('about.dropdown.staff'), href: '/about/staff', description: t('about.dropdown.staffDescription') },
        { name: t('about.dropdown.whyUs'), href: '/about/why-us', description: t('about.dropdown.whyUsDescription') },
      ],
    },
    {
      name: t('navigation.contact'),
      href: '/contact',
      dropdown: [
        { name: t('contact.dropdown.contactUs'), href: '/contact', description: t('contact.dropdown.contactUsDescription') },
        { name: t('contact.dropdown.location'), href: '/contact/location', description: t('contact.dropdown.locationDescription') },
        { name: t('contact.dropdown.hours'), href: '/contact/hours', description: t('contact.dropdown.hoursDescription') },
        { name: t('contact.dropdown.phone'), href: '/contact/phone', description: t('contact.dropdown.phoneDescription') },
        { name: t('contact.dropdown.quote'), href: '/contact/quote', description: t('contact.dropdown.quoteDescription') },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock for mobile menu
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // Close on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isMenuOpen]);

  const openDropdown = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(name);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 180);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setMobileActiveDropdown(null);
  };

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-400 ease-out ${
          onDarkSurface
            ? 'bg-transparent border-b border-transparent'
            : isScrolled
              ? 'bg-paper/95 backdrop-blur-md border-b border-line'
              : 'bg-paper border-b border-line'
        }`}
        onMouseLeave={scheduleClose}
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex h-16 lg:h-20 items-center justify-between gap-8">
            {/* Logo */}
            <Link
              href="/"
              className={`shrink-0 ${text} transition-colors duration-200`}
              onClick={handleLinkClick}
            >
              <span className="font-display text-xl sm:text-2xl tracking-[-0.02em] leading-none">
                Märsta <span className="italic">Bilhus</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-9 xl:gap-11">
              {navItems.map((item) => (
                <li
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && openDropdown(item.name)}
                  onMouseLeave={scheduleClose}
                >
                  {item.dropdown ? (
                    <button
                      className={`flex items-center gap-1.5 py-2 text-[14px] font-medium ${text} ${textHover} transition-colors duration-200`}
                      aria-expanded={activeDropdown === item.name}
                    >
                      {item.name}
                      <svg
                        className={`h-3 w-3 transition-transform duration-300 ease-out ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      className={`py-2 text-[14px] font-medium ${text} ${textHover} transition-colors duration-200`}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Right side: language + mobile menu */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden lg:block">
                <LanguageSwitcher isScrolled={isScrolled} hasLightBackground={onLight} />
              </div>

              <button
                onClick={() => setIsMenuOpen((v) => !v)}
                aria-label="Menu"
                className={`lg:hidden flex h-10 w-10 flex-col items-center justify-center gap-[5px] ${text}`}
              >
                <span className={`block h-[1.5px] w-6 bg-current transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
                <span className={`block h-[1.5px] w-6 bg-current transition-opacity duration-200 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-[1.5px] w-6 bg-current transition-transform duration-300 ease-out ${isMenuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mega panel — full width below navbar, paper background */}
        {activeDropdown && (
          <div
            className="absolute inset-x-0 top-full border-t border-line bg-paper text-ink shadow-[0_24px_60px_-30px_oklch(0.18_0.012_60_/_0.25)]"
            onMouseEnter={() => openDropdown(activeDropdown)}
            onMouseLeave={scheduleClose}
          >
            <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-12">
              {(() => {
                const item = navItems.find((i) => i.name === activeDropdown);
                if (!item?.dropdown) return null;
                const headerKey = item.name === t('navigation.cars') ? 'cars'
                  : item.name === t('navigation.service') ? 'service'
                  : item.name === t('navigation.services') ? 'services'
                  : item.name === t('navigation.about') ? 'about'
                  : 'contact';
                return (
                  <div className="grid grid-cols-12 gap-8 lg:gap-12">
                    {/* Header column */}
                    <div className="col-span-12 lg:col-span-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
                        {t(`dropdownHeaders.${headerKey}` as never)}
                      </span>
                      <h3 className="mt-3 font-display text-3xl tracking-[-0.02em] text-ink">
                        {item.name}
                      </h3>
                      <Link
                        href={item.href}
                        onClick={handleLinkClick}
                        className="mt-6 inline-flex items-center gap-2 text-sm text-garnet hover:text-garnet-hover transition-colors duration-200"
                      >
                        <span className="link-underline">{t('common.viewAll')}</span>
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>

                    {/* Items grid */}
                    <div className="col-span-12 lg:col-span-9 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-6">
                      {item.dropdown.map((di) => {
                        const isExternal = di.href.startsWith('http');
                        const linkProps = isExternal
                          ? { href: di.href, target: '_blank', rel: 'noopener noreferrer' }
                          : { href: di.href };
                        const Tag = isExternal ? 'a' : Link;
                        return (
                          <Tag
                            key={di.name}
                            {...linkProps}
                            onClick={handleLinkClick}
                            className="group block"
                          >
                            <div className="flex items-baseline gap-2">
                              <span className="text-[15px] font-medium text-ink transition-colors duration-200 group-hover:text-garnet">
                                {di.name}
                              </span>
                              {isExternal && (
                                <svg className="h-3 w-3 text-ink-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M14 5h5v5M19 5l-9 9M5 19v-7" />
                                </svg>
                              )}
                            </div>
                            {di.description && (
                              <p className="mt-1 text-[13px] text-ink-2 leading-[1.55] max-w-[36ch]">
                                {di.description}
                              </p>
                            )}
                          </Tag>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden bg-paper transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-5 pt-20 pb-6 border-b border-line">
            <span className="font-display text-2xl tracking-[-0.02em] text-ink">
              Märsta <span className="italic">Bilhus</span>
            </span>
            <LanguageSwitcher />
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-8 custom-scrollbar">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name} className="border-b border-line/60 last:border-0">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => setMobileActiveDropdown(mobileActiveDropdown === item.name ? null : item.name)}
                        className="w-full flex items-center justify-between py-5 text-left"
                      >
                        <span className="font-display text-2xl tracking-[-0.02em] text-ink">
                          {item.name}
                        </span>
                        <svg
                          className={`h-4 w-4 text-ink-2 transition-transform duration-300 ${mobileActiveDropdown === item.name ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                      <div
                        className={`overflow-hidden transition-[max-height,opacity] duration-400 ease-out ${
                          mobileActiveDropdown === item.name ? 'max-h-[800px] opacity-100 pb-5' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <ul className="space-y-3 pl-1">
                          {item.dropdown.map((di) => {
                            const isExternal = di.href.startsWith('http');
                            const linkProps = isExternal
                              ? { href: di.href, target: '_blank', rel: 'noopener noreferrer' }
                              : { href: di.href };
                            const Tag = isExternal ? 'a' : Link;
                            return (
                              <li key={di.name}>
                                <Tag {...linkProps} onClick={handleLinkClick} className="block py-2">
                                  <span className="text-base font-medium text-ink">{di.name}</span>
                                  {di.description && (
                                    <span className="mt-1 block text-[13px] text-ink-2 leading-[1.5]">
                                      {di.description}
                                    </span>
                                  )}
                                </Tag>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      className="block py-5 font-display text-2xl tracking-[-0.02em] text-ink"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-line px-5 py-6 space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
              {t('hero.footer.authorizedService')}
            </p>
            <p className="text-sm text-ink">{t('hero.footer.brands')}</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
              <a href="tel:0859120541" className="font-mono text-sm tabular text-ink-2 hover:text-garnet transition-colors duration-200">
                08-59 120 541
              </a>
              <span className="text-ink-3">·</span>
              <a href="mailto:info@marstabilhus.se" className="text-sm text-ink-2 hover:text-garnet transition-colors duration-200">
                info@marstabilhus.se
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
