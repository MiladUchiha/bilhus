'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceOffering {
  idx: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  href: string;
  price?: string;
  duration?: string;
}

const services: ServiceOffering[] = [
  {
    idx: '01',
    title: 'Hyundai originalservice',
    description: 'Auktoriserad service med originaldelar och certifierade tekniker enligt Hyundais serviceprogram.',
    features: ['Originaldelar från Hyundai', 'Certifierade tekniker', 'Garantibevarande service', 'Servicehistorik i Hyundai-system', 'Maskindiagnostik', '24 mån garanti på utfört arbete'],
    image: '/1349/original.jpg',
    href: '/service/hyundai',
    price: 'Enligt prislista',
    duration: 'Enligt serviceprogram',
  },
  {
    idx: '02',
    title: 'Allmän bilservice',
    description: 'Service och underhåll för alla bilmärken. Erfarna tekniker, kvalitetsdelar, transparenta priser.',
    features: ['Service alla märken', 'Kvalitetsdelar', 'Erfarna tekniker', 'Transparent prissättning', 'Digital rapport', '12 mån garanti'],
    image: '/1349/verkstad.jpg',
    href: '/service/general',
    price: 'Offert vid kontakt',
    duration: 'Enligt behov',
  },
  {
    idx: '03',
    title: 'Däck & fälgar',
    description: 'Säsongsbyte, balansering, hjulinställning, förvaring och fälgreparation under samma tak.',
    features: ['Däckbyte sommar/vinter', 'Hjulbalansering', 'Hjulinställning', 'Däckförvaring', 'Fälgreparationer', 'Däcktryckskontroll'],
    image: '/1349/SoMe - Hjulskifte Video Höst/Vinter.mp4',
    href: '/service/tires',
    price: 'Från 595 kr',
    duration: 'Snabb service',
  },
  {
    idx: '04',
    title: 'Reparationer & underhåll',
    description: 'Komplett bilverkstad — motor, broms, växellåda, klimat, elektronik. Diagnos och åtgärd från samma plats.',
    features: ['Motorreparationer', 'Bromssystem', 'Växellådor', 'Avgassystem', 'Klimatanläggning', 'Elektriska system'],
    image: '/1349/repair.jpg',
    href: '/service/repairs',
    price: 'Offert vid kontakt',
    duration: 'Varierar',
  },
];

export default function ServicePage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 1.0,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen bg-paper pt-20">
      {/* Hero */}
      <section className="border-b border-line bg-paper">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-3" data-reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-garnet" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
                  Verkstad
                </span>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-9" data-reveal>
              <h1 className="font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em] text-ink max-w-[14ch]">
                Service &amp; <span className="italic">verkstad</span>
              </h1>
              <p className="mt-8 font-display italic text-xl sm:text-2xl text-ink-2 max-w-[48ch] leading-[1.4]">
                Auktoriserad Hyundai-verkstad i Arlandastad. Vi tar hand om alla bilmärken med samma omsorg som våra egna.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/service/booking"
                  className="inline-flex items-center justify-center gap-2 bg-garnet px-7 py-4 text-paper font-medium transition-colors duration-200 hover:bg-garnet-hover"
                >
                  Boka tid online
                </Link>
                <a
                  href="tel:+46859120541"
                  className="inline-flex items-center justify-center gap-2 border border-ink px-7 py-4 text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-mono tabular">08 591 205 41</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-paper-2 border-b border-line">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8" data-reveal>
            <TrustBlock
              idx="01"
              title="Snabb service"
              detail="Oftast samma dag eller inom 24 timmar för normal service."
            />
            <TrustBlock
              idx="02"
              title="Kvalitetsgaranti"
              detail="12–24 månaders garanti på allt utfört arbete."
            />
            <TrustBlock
              idx="03"
              title="Transparent info"
              detail="Tydlig kommunikation och fast pris innan vi börjar."
            />
          </div>
        </div>
      </section>

      {/* About workshop */}
      <section className="py-24 sm:py-32 lg:py-40">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="col-span-12 lg:col-span-7 order-2 lg:order-1" data-reveal>
              <div className="relative aspect-[5/4] overflow-hidden bg-paper-2">
                <Image
                  src="/1349/original.jpg"
                  alt="Märsta Bilhus verkstad"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  quality={92}
                />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 order-1 lg:order-2" data-reveal>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
                Verkstaden
              </span>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] tracking-[-0.025em] text-ink leading-[1.05] max-w-[18ch]">
                Modern utrustning, tekniker med yrkesår bakom sig.
              </h2>
              <p className="mt-6 text-base text-ink-2 leading-[1.65] max-w-[52ch]">
                Vår verkstad är utrustad med den senaste tekniken och våra tekniker har mångårig erfarenhet av bilreparationer. Vi arbetar med alla bilmärken och är auktoriserade för Hyundai originalservice.
              </p>

              <dl className="mt-8 space-y-4 border-t border-line pt-8">
                {[
                  'Auktoriserad Hyundai-verkstad',
                  'Certifierade tekniker',
                  'Modern utrustning och diagnosverktyg',
                  'Miljövänliga arbetsmetoder',
                ].map((item, i) => (
                  <div key={i} className="grid grid-cols-12 gap-3 items-baseline">
                    <span className="col-span-1 font-mono text-[10px] tabular text-ink-3">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="col-span-11 text-[15px] text-ink">{item}</span>
                  </div>
                ))}
              </dl>

              <Link
                href="/about/workshop"
                className="mt-10 inline-flex items-center gap-2 text-ink hover:text-garnet transition-colors duration-200"
              >
                <span className="link-underline">Se mer från verkstaden</span>
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services list */}
      <section className="bg-paper-2 py-24 sm:py-32 lg:py-40">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-8 mb-16 sm:mb-20">
            <div className="col-span-12 lg:col-span-3" data-reveal>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
                Tjänster
              </span>
            </div>
            <div className="col-span-12 lg:col-span-9" data-reveal>
              <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.0] tracking-[-0.025em] text-ink max-w-[18ch]">
                Allt din bil behöver
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-16" data-reveal>
            {services.map((s) => (
              <Link
                key={s.idx}
                href={s.href}
                className="group block"
              >
                <div className="relative aspect-[5/3] overflow-hidden bg-paper mb-6">
                  {s.image.endsWith('.mp4') ? (
                    <video
                      src={s.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  )}
                  <div className="absolute top-4 left-4 bg-paper px-2.5 py-1">
                    <span className="font-mono text-[10px] tabular uppercase tracking-[0.14em] text-ink">
                      {s.idx}
                    </span>
                  </div>
                </div>

                <h3 className="font-display text-3xl tracking-[-0.02em] text-ink transition-colors duration-200 group-hover:text-garnet">
                  {s.title}
                </h3>
                <p className="mt-3 text-base text-ink-2 leading-[1.6] max-w-[52ch]">
                  {s.description}
                </p>

                <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 max-w-[52ch]">
                  {s.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="text-sm text-ink-2 flex items-baseline gap-3">
                      <span className="font-mono text-[10px] tabular text-ink-3 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                  <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
                    {s.price && <span>{s.price}</span>}
                    {s.duration && <span>{s.duration}</span>}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm text-ink group-hover:text-garnet transition-colors duration-200">
                    <span className="link-underline">Läs mer</span>
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA — dark band */}
      <section className="bg-ink text-paper">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="grid grid-cols-12 gap-8 items-end" data-reveal>
            <div className="col-span-12 lg:col-span-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50">
                Boka tid
              </span>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-paper max-w-[22ch]">
                Behöver din bil <span className="italic">service?</span>
              </h2>
              <p className="mt-4 text-base text-paper/70 max-w-[52ch] leading-[1.6]">
                Boka tid online eller ring oss direkt. Vi har flexibla tider och kan ofta ta in din bil samma dag.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 flex flex-col sm:flex-row gap-3 lg:justify-end">
              <Link
                href="/service/booking"
                className="inline-flex items-center justify-center gap-2 bg-paper px-7 py-4 text-ink font-medium transition-colors duration-200 hover:bg-garnet hover:text-paper"
              >
                Boka online
              </Link>
              <a
                href="tel:+46859120541"
                className="inline-flex items-center justify-center gap-2 border border-paper/40 px-7 py-4 text-paper transition-colors duration-200 hover:bg-paper hover:text-ink"
              >
                <span className="font-mono tabular">08 591 205 41</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-16 pt-12 border-t border-paper/15" data-reveal>
            <FooterMini title="Öppettider" lines={['Mån–Fre 07:30–16:30', 'Lör–Sön stängt']} />
            <FooterMini title="Plats" lines={['Maskingatan 12', '195 60 Arlandastad', '3 mil från Stockholm']} />
            <FooterMini title="Kontakt" lines={['Verkstad 08 591 205 41', 'Försäljning 0700 929 433', 'info@marstabilhus.se']} mono />
          </div>
        </div>
      </section>
    </div>
  );
}

function TrustBlock({ idx, title, detail }: { idx: string; title: string; detail: string }) {
  return (
    <div className="grid grid-cols-12 gap-3">
      <span className="col-span-1 font-mono text-[10px] tabular text-ink-3 pt-1">
        {idx}
      </span>
      <div className="col-span-11">
        <h3 className="font-display text-xl text-ink tracking-[-0.015em]">
          {title}
        </h3>
        <p className="mt-1 text-sm text-ink-2 leading-[1.55] max-w-[40ch]">{detail}</p>
      </div>
    </div>
  );
}

function FooterMini({ title, lines, mono }: { title: string; lines: string[]; mono?: boolean }) {
  return (
    <div>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/50 block mb-3">
        {title}
      </span>
      <div className={`space-y-1 text-sm ${mono ? 'font-mono tabular' : ''} text-paper`}>
        {lines.map((l, i) => (
          <p key={i}>{l}</p>
        ))}
      </div>
    </div>
  );
}
