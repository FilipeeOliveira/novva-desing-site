'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { servicos } from '@/content';
import { whatsapp } from '@/lib/contact';
import { cn } from '@/lib/utils';

// Formulário rápido: monta a mensagem do orçamento e abre o WhatsApp (nada é enviado para servidor)
const artes = ['Já tenho a arte', 'Preciso de ajuda com a arte'];
const campo = 'h-12 w-full rounded-xl bg-white/6 px-4 text-[15px] text-white ring-1 ring-white/12 placeholder:text-nevoa/50 focus:ring-2 focus:ring-magenta focus:outline-none';

export function ContatoForm() {
  const [nome, setNome] = useState('');
  const [escolhidos, setEscolhidos] = useState<string[]>([]);
  const [arte, setArte] = useState('');
  const [detalhes, setDetalhes] = useState('');

  const alternar = (s: string) => setEscolhidos((e) => (e.includes(s) ? e.filter((x) => x !== s) : [...e, s]));

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const linhas = ['Olá! Vim pelo site da NOVVA e quero um orçamento.', '', `*Nome:* ${nome}`];
    if (escolhidos.length) linhas.push(`*Serviço:* ${escolhidos.join(', ')}`);
    if (arte) linhas.push(`*Arte:* ${arte}`);
    if (detalhes.trim()) linhas.push(`*Detalhes:* ${detalhes.trim()}`);
    window.open(whatsapp(linhas.join('\n')), '_blank', 'noopener,noreferrer');
  };

  return (
    <form onSubmit={enviar} className="flex flex-col gap-6 rounded-3xl bg-noite-2 p-6 ring-1 ring-white/10 sm:p-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="nome" className="text-sm font-semibold">Seu nome</label>
        <input id="nome" required autoComplete="name" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Como podemos te chamar?" className={campo} />
      </div>
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-sm font-semibold">O que você precisa? <span className="font-normal text-nevoa">(pode marcar mais de um)</span></legend>
        <div className="flex flex-wrap gap-2">
          {servicos.map((s) => (
            <button key={s.id} type="button" aria-pressed={escolhidos.includes(s.nome)} onClick={() => alternar(s.nome)} className={cn('min-h-11 cursor-pointer rounded-full px-4 text-sm font-medium transition-colors', escolhidos.includes(s.nome) ? 'degrade text-white' : 'bg-white/6 text-nevoa ring-1 ring-white/12 hover:text-white')}>
              {s.nome}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-sm font-semibold">E a arte?</legend>
        <div className="flex flex-wrap gap-2">
          {artes.map((a) => (
            <button key={a} type="button" aria-pressed={arte === a} onClick={() => setArte(arte === a ? '' : a)} className={cn('min-h-11 cursor-pointer rounded-full px-4 text-sm font-medium transition-colors', arte === a ? 'bg-white text-noite' : 'bg-white/6 text-nevoa ring-1 ring-white/12 hover:text-white')}>
              {a}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="flex flex-col gap-2">
        <label htmlFor="detalhes" className="text-sm font-semibold">Detalhes <span className="font-normal text-nevoa">(opcional)</span></label>
        <textarea id="detalhes" value={detalhes} onChange={(e) => setDetalhes(e.target.value)} placeholder="Medidas aproximadas, bairro, prazo desejado..." className={cn(campo, 'h-28 resize-none py-3')} />
      </div>
      <button type="submit" className="degrade flex h-13 cursor-pointer items-center justify-center gap-2.5 rounded-full font-semibold shadow-[0_14px_40px_-12px_rgba(247,28,165,.9)]">
        <MessageCircle className="size-5" aria-hidden /> Enviar pelo WhatsApp
      </button>
    </form>
  );
}
