import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['en', 'sv'],
  defaultLocale: 'sv',
  localeDetection: false
});
 
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};