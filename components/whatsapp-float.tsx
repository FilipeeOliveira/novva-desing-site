'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { whatsapp } from '@/lib/contact';
import { cn } from '@/lib/utils';

// Bola em degradê no canto (celular e desktop, diferente da barra da Kaizen); aparece depois do hero e some do Contato até o fim
export function WhatsAppFloat() {
  const [visivel, setVisivel] = useState(false);
  useEffect(() => {
    const contato = document.getElementById('contato');
    const f = () => {
      const r = contato?.getBoundingClientRect();
      setVisivel(window.scrollY > window.innerHeight * 0.8 && !(r && r.top < window.innerHeight * 0.6));
    };
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  return (
    <a
      href={whatsapp()}
      target="_blank"
      rel="noopener"
      tabIndex={visivel ? 0 : -1}
      aria-hidden={!visivel || undefined}
      className={cn(
        'degrade fixed right-4 bottom-4 z-40 flex size-14 items-center justify-center rounded-full shadow-[0_14px_40px_-10px_rgba(247,28,165,.9)] ring-4 ring-noite/40 transition-[transform,opacity] duration-300 hover:scale-105 sm:right-6 sm:bottom-6 sm:size-16',
        visivel ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0',
      )}
    >
      <MessageCircle className="size-6 sm:size-7" aria-hidden />
      <span className="sr-only">Pedir orçamento no WhatsApp</span>
    </a>
  );
}
