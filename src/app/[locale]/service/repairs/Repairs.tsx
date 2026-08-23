'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RepairsPage() {
  const rootRef = useRef<HTMLDivElement>(null);

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

      gsap.set(['.hero-eyebrow', '.hero-title', '.hero-sub', '.hero-cta'], { opacity: 0, y: 28 });
      const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.0 } });
      tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.6 })
        .to('.hero-title', { opacity: 1, y: 0 }, '-=0.2')
        .to('.hero-sub', { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .to('.hero-cta', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5');
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const systems = [
    { idx: '01', title: 'Motor & transmission', items: ['Motordiagnostik och felsökning', 'Transmissionsreparationer', 'Kopplingsservice', 'Turboservice'] },
    { idx: '02', title: 'Bromssystem', items: ['Bromsbeläggsbyte', 'Skivbromsar', 'Bromsvätskebyte', 'ABS-felsökning'] },
    { idx: '03', title: 'Fjädring & styrning', items: ['Stötdämpare', 'Fjädrar', 'Styrleder', 'Hjulinställning'] },
    { idx: '04', title: 'Elsystem', items: ['Generator & startmotor', 'Batterisystem', 'Belysning', 'Elektronikfelsökning'] },
    { idx: '05', title: 'Klimat & komfort', items: ['AC-service', 'Värmesystem', 'Defrosterfunktion', 'Filterbyte'] },
    { idx: '06', title: 'Kylsystem', items: ['Termostat', 'Kylvätskebyte', 'Vattenpumpsbyte', 'Kylar-reparation'] },
  ];

  const process = [
    { idx: '01', title: 'Initial diagnos', detail: 'Vi börjar med en grundlig genomgång av problemet du upplever.' },
    { idx: '02', title: 'Detaljerad undersökning', detail: 'Avancerad diagnostikutrustning för att hitta exakta felet.' },
    { idx: '03', title: 'Offert', detail: 'Fast pris och tidsplan innan vi sätter igång.' },
    { idx: '04', title: 'Reparation', detail: 'Vi använder kvalitetsdelar och certifierade metoder.' },
  ];

  return (
    <div ref={rootRef} className="bg-paper">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/heropics/5.jpg"
            alt="Reparationer och underhåll"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/90" />
        </div>

        <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 pb-16 sm:pb-20 pt-32">
          <div className="max-w-[1280px] mx-auto">
            <div className="hero-eyebrow flex items-center gap-3 text-paper/80">
              <span className="h-px w-10 bg-paper/60" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                Reparationer & underhåll
              </span>
            </div>
            <h1 className="hero-title mt-6 font-display text-paper text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] tracking-[-0.03em] max-w-[16ch]">
              Vi fixar <span className="italic">det mesta</span>.
            </h1>
            <p className="hero-sub mt-6 font-display italic text-2xl sm:text-3xl text-paper/85 max-w-[34ch] leading-[1.3]">
              Komplett bilverkstad — felsökning och reparation under samma tak.
            </p>
            <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                href="/service/booking"
                className="inline-flex items-center justify-center gap-2 bg-paper px-7 py-4 text-ink font-medium transition-colors duration-200 hover:bg-garnet hover:text-paper"
              >
                Boka reparation
              </Link>
              <a
                href="tel:+46859120541"
                className="inline-flex items-center justify-center gap-2 border border-paper/40 px-7 py-4 text-paper transition-colors duration-200 hover:bg-paper hover:text-ink"
              >
                <span className="font-mono tabular">08 591 205 41</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-paper-2 border-b border-line">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="grid grid-cols-12 gap-8" data-reveal>
            <div className="col-span-12 lg:col-span-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
                Så jobbar vi
              </span>
            </div>
            <div className="col-span-12 lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-8">
              {[
                ['01', 'Fast pris', 'Du får en bindande offert innan vi börjar.'],
                ['02', 'Kvalitetsdelar', 'Originaldelar eller likvärdigt — alltid spårbart.'],
                ['03', '12 mån garanti', 'Allt utfört arbete täcks av vår garanti.'],
              ].map(([n, title, desc]) => (
                <div key={n}>
                  <span className="font-mono text-[10px] tabular text-ink-3">{n}</span>
                  <h3 className="mt-2 font-display text-xl text-ink tracking-[-0.015em]">{title}</h3>
                  <p className="mt-2 text-[13px] text-ink-2 leading-[1.55] max-w-[32ch]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Systems */}
      <section className="py-24 sm:py-32">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-8 mb-16" data-reveal>
            <div className="col-span-12 lg:col-span-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
                Vad vi reparerar
              </span>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.0] tracking-[-0.025em] text-ink max-w-[18ch]">
                Felsökning &amp; reparationer
              </h2>
              <p className="mt-6 font-display italic text-xl text-ink-2 max-w-[48ch] leading-[1.4]">
                Sex bilsystem, en verkstad. Diagnos och åtgärd i en process.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 border-t border-line pt-12" data-reveal>
            {systems.map((s) => (
              <div key={s.idx}>
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="font-mono text-[10px] tabular text-ink-3">{s.idx}</span>
                  <h3 className="font-display text-2xl tracking-[-0.015em] text-ink">{s.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {s.items.map((item, i) => (
                    <li key={i} className="flex items-baseline gap-3 text-[14px] text-ink-2 leading-[1.55]">
                      <span className="font-mono text-[9px] tabular text-ink-3 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-paper-2 py-24 sm:py-32">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-8 mb-16" data-reveal>
            <div className="col-span-12 lg:col-span-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-garnet">
                Process
              </span>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.0] tracking-[-0.025em] text-ink max-w-[18ch]">
                Från diagnos till färdig bil
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 border-t border-line pt-12" data-reveal>
            {process.map((p) => (
              <div key={p.idx}>
                <span className="font-display text-5xl tracking-[-0.02em] text-garnet">
                  {p.idx}
                </span>
                <h3 className="mt-3 font-display text-xl text-ink tracking-[-0.015em]">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-2 leading-[1.55] max-w-[28ch]">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-paper">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-32">
          <div className="grid grid-cols-12 gap-8 items-end" data-reveal>
            <div className="col-span-12 lg:col-span-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50">
                Boka tid
              </span>
              <h2 className="mt-4 font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.0] tracking-[-0.03em] text-paper max-w-[18ch]">
                Bilen krånglar? <span className="italic">Boka tid.</span>
              </h2>
              <p className="mt-6 text-base text-paper/70 max-w-[52ch] leading-[1.6]">
                Vi tar in bilen för diagnos och ger dig en fast offert innan vi sätter igång.
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
        </div>
      </section>
    </div>
  );
}
