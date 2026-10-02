'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
                  Service
                </span>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-9" data-reveal>
              <h1 className="font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em] text-ink max-w-[14ch]">
                Service &amp; <span className="italic">verkstad</span>
              </h1>
              <p className="mt-8 font-display italic text-xl sm:text-2xl text-ink-2 max-w-[48ch] leading-[1.4]">
                Aixam-service gör vi själva. För service och reparation av andra bilar hänvisar vi till Auto Temple i Märsta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two routes */}
      <section className="py-24 sm:py-32 lg:py-40">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10" data-reveal>
            <div className="flex flex-col border border-line bg-paper p-8 sm:p-12">
              <span className="font-mono text-[10px] tabular uppercase tracking-[0.16em] text-ink-3">
                01 · Hos oss
              </span>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] tracking-[-0.025em] text-ink leading-[1.05]">
                Aixam <span className="italic">mopedbilar</span>
              </h2>
              <p className="mt-5 text-base text-ink-2 leading-[1.65] max-w-[46ch]">
                Service, reparationer och originaldelar för Aixam. Vi säljer och servar mopedbilarna här på Thulins Plats.
              </p>
              <dl className="mt-8 space-y-3 border-t border-line pt-6 text-[15px]">
                <Detail k="Plats" v="Thulins Plats 4D, Arlandastad" />
                <Detail k="Telefon" v="0700 929 433" href="tel:+46700929433" mono />
              </dl>
              <div className="mt-auto pt-10">
                <Link
                  href="/service/aixam"
                  className="inline-flex items-center justify-center gap-2 bg-garnet px-7 py-4 text-paper font-medium transition-colors duration-200 hover:bg-garnet-hover"
                >
                  Om Aixam-service
                  <Arrow />
                </Link>
              </div>
            </div>

            <div className="flex flex-col bg-ink text-paper p-8 sm:p-12">
              <span className="font-mono text-[10px] tabular uppercase tracking-[0.16em] text-paper/50">
                02 · Övriga bilmärken
              </span>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] tracking-[-0.025em] text-paper leading-[1.05]">
                Auto <span className="italic">Temple</span>
              </h2>
              <p className="mt-5 text-base text-paper/75 leading-[1.65] max-w-[46ch]">
                Verkstaden som tidigare låg hos oss drivs nu som eget företag, Auto Temple. Dit vänder du dig för service, felsökning och reparation av din bil.
              </p>
              <dl className="mt-8 space-y-3 border-t border-paper/15 pt-6 text-[15px]">
                <Detail k="Plats" v="Voltgatan 23, Märsta" dark />
                <Detail k="Telefon" v="070-092 94 34" href="tel:+46700929434" mono dark />
              </dl>
              <div className="mt-auto pt-10">
                <a
                  href="https://autotemple.se"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-paper px-7 py-4 text-ink font-medium transition-colors duration-200 hover:bg-garnet hover:text-paper"
                >
                  autotemple.se
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5h5v5M19 5l-9 9" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact band */}
      <section className="bg-paper-2 border-t border-line">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10" data-reveal>
            <FooterMini title="Öppettider" lines={['Mån–Tor 09:00–18:00', 'Fre 09:00–17:00', 'Lör 11:00–15:00']} />
            <FooterMini title="Plats" lines={['Thulins Plats 4D', '195 61 Arlandastad']} />
            <FooterMini title="Kontakt" lines={['0700 929 433', 'info@marstabilhus.se']} mono />
          </div>
        </div>
      </section>
    </div>
  );
}

function Detail({
  k,
  v,
  href,
  mono,
  dark,
}: {
  k: string;
  v: string;
  href?: string;
  mono?: boolean;
  dark?: boolean;
}) {
  const value = <span className={mono ? 'font-mono tabular' : ''}>{v}</span>;
  return (
    <div className="grid grid-cols-12 gap-3 items-baseline">
      <dt className={`col-span-4 font-mono text-[10px] uppercase tracking-[0.14em] ${dark ? 'text-paper/50' : 'text-ink-3'}`}>
        {k}
      </dt>
      <dd className={`col-span-8 ${dark ? 'text-paper' : 'text-ink'}`}>
        {href ? (
          <a href={href} className="hover:text-garnet transition-colors duration-200">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

function Arrow() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function FooterMini({ title, lines, mono }: { title: string; lines: string[]; mono?: boolean }) {
  return (
    <div>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3 block mb-3">
        {title}
      </span>
      <div className={`space-y-1 text-sm ${mono ? 'font-mono tabular' : ''} text-ink`}>
        {lines.map((l, i) => (
          <p key={i}>{l}</p>
        ))}
      </div>
    </div>
  );
}
