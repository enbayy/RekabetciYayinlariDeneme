export const dynamic = 'force-static';

export default function robots() {
  const host = 'https://www.rekabetciyayinlari.com';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}


