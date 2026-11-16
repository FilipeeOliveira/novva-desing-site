import Image from 'next/image';
import { siteConfig } from '@/site.config';

// Rodapé em uma linha, como o da AMPARO, com o crédito da North Software
export function Rodape() {
  return (
    <footer className="border-t border-white/8 py-10 text-sm text-nevoa/80">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-5 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Image src="/img/marca/logo-horizontal-480.png" alt="NOVVA Design & Comunicação" width={480} height={105} className="h-9 w-auto" />
        <p>© {new Date().getFullYear()} NOVVA Design & Comunicação · {siteConfig.cidade}</p>
        <p>
          Desenvolvido por{' '}
          <a href="https://northsoftware.com.br" target="_blank" rel="noopener" className="inline-block py-2 font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-magenta">
            North Software
          </a>
        </p>
      </div>
    </footer>
  );
}
