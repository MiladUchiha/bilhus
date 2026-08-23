import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function LogoSection() {
  const t = await getTranslations();
  const authorizedFor = t('hero.footer.authorizedService');

  return (
    <section className="bg-paper border-y border-line">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-12">
          <div className="flex items-center gap-3 shrink-0">
            <span className="h-px w-8 bg-line-strong" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
              {authorizedFor}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-12 gap-y-6 sm:justify-end">
            <Link
              href="/service/hyundai"
              className="group inline-flex items-center"
            >
              <Image
                src="/hyundai.png"
                alt="Hyundai"
                width={130}
                height={42}
                style={{ width: 'auto', height: '32px' }}
                className="object-contain opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </Link>
            <Link
              href="/service/aixam"
              className="group inline-flex items-center"
            >
              <Image
                src="/aixam.png"
                alt="Aixam"
                width={130}
                height={42}
                style={{ width: 'auto', height: '32px' }}
                className="object-contain opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
