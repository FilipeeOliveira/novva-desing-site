import { ArrowDown, MessageCircle } from 'lucide-react';
import { whatsapp } from '@/lib/contact';

export function BotoesHero() {
  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
      <a href={whatsapp()} target="_blank" rel="noopener" className="degrade inline-flex h-13 items-center justify-center gap-2.5 rounded-full px-7 font-semibold text-white shadow-[0_14px_40px_-12px_rgba(247,28,165,.9)] transition-transform hover:-translate-y-0.5">
        <MessageCircle className="size-5" aria-hidden />
        Pedir orçamento no WhatsApp
      </a>
      <a href="#trabalhos" className="inline-flex h-13 items-center justify-center gap-2 rounded-full px-7 font-medium text-white ring-1 ring-white/20 transition-colors hover:bg-white/8">
        Ver trabalhos
        <ArrowDown className="size-4" aria-hidden />
      </a>
    </div>
  );
}
