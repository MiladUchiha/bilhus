import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
 
// Can be imported from a shared config
const locales = ['en', 'sv'];
 
export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  const locale = await requestLocale;
 
  // Ensure that the incoming locale is valid
  if (!locale || !locales.includes(locale)) {
    notFound();
  }
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});