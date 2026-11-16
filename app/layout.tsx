import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { siteConfig } from '@/site.config';
import './globals.css';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-poppins' });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: 'NOVVA Design & Comunicação | Comunicação visual em Manaus',
  description: 'Fachadas, letreiros em ACM, totens, adesivos, envelopamento e impressões em Manaus. Fale com a NOVVA pelo WhatsApp.',
  alternates: { canonical: '/' },
  icons: { icon: '/img/marca/favicon-32.png', apple: '/img/marca/apple-touch-icon.png' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'NOVVA Design & Comunicação',
    title: 'NOVVA Design & Comunicação',
    description: 'Fachadas, letreiros em ACM, totens, adesivos, envelopamento e impressões em Manaus.',
    url: '/',
    images: [{ url: `${siteConfig.url}/img/og.jpg`, width: 1200, height: 630, alt: 'NOVVA Design & Comunicação' }],
  },
  twitter: { card: 'summary_large_image' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.nome,
  url: siteConfig.url,
  image: `${siteConfig.url}/img/og.jpg`,
  logo: `${siteConfig.url}/img/marca/icone.png`,
  telephone: '+' + siteConfig.whatsapp,
  email: siteConfig.email,
  address: { '@type': 'PostalAddress', addressLocality: 'Manaus', addressRegion: 'AM', addressCountry: 'BR' },
  areaServed: 'Manaus',
  sameAs: [`https://www.instagram.com/${siteConfig.instagram}/`],
};

export const viewport: Viewport = { themeColor: '#04002a' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body className="font-sans antialiased">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
