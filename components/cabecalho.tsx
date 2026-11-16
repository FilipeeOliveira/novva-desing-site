'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { MessageCircle } from 'lucide-react';
import { whatsapp } from '@/lib/contact';

const links = [
  { nome: 'Serviços', href: '#servicos' },
  { nome: 'Trabalhos', href: '#trabalhos' },
  { nome: 'Como funciona', href: '#como-funciona' },
  { nome: 'Contato', href: '#contato' },
];

// fixo: transparente sobre o hero e com fundo de vidro depois de rolar
export function Cabecalho() {
  const [rolou, setRolou] = useState(false);
  useEffect(() => {
    const f = () => setRolou(window.scrollY > 40);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <header className={cn('fixed inset-x-0 top-0 z-30 transition-[background-color,box-shadow,backdrop-filter] duration-500', rolou && 'bg-noite/75 shadow-[0_10px_40px_-20px_rgba(0,0,0,.8)] backdrop-blur-xl')}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#" aria-label="NOVVA Design & Comunicação, início" className="shrink-0">
          <Image src="/img/marca/logo-horizontal-480.png" alt="" width={480} height={105} priority className="h-8 w-auto sm:h-9" />
        </a>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-sm font-medium text-nevoa">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rounded-full px-4 py-2 transition-colors hover:bg-white/8 hover:text-white">
                  {l.nome}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={whatsapp()} target="_blank" rel="noopener" className="degrade flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(247,28,165,.8)]">
          <MessageCircle className="size-4" aria-hidden />
          <span className="hidden sm:inline">Orçamento no WhatsApp</span>
          <span className="sm:hidden">Orçamento</span>
        </a>
      </div>
    </header>
  );
}
