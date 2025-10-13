export default async function sitemap() {
  const base = 'https://www.rekabetciyayinlari.com';
  const routes = ['', '/denemeler', '/hakkimizda', '/iletisim', '/uye-ol', '/giris-yap']
    .map((route) => ({ url: `${base}${route}`, lastModified: new Date().toISOString() }));

  const denemeRoutes = Array.from({ length: 9 }).map((_, i) => ({
    url: `${base}/deneme/${i + 1}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...denemeRoutes];
}


