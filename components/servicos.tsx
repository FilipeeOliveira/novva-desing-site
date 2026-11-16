'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowUpRight, Check, ChevronDown } from 'lucide-react';
import { servicos } from '@/content';
import { whatsapp } from '@/lib/contact';
import { useDesktop } from '@/hooks/use-desktop';
import { Destaque, TituloSecao } from './secao';
import { cn, media } from '@/lib/utils';

// Serviços: lista à esquerda e a foto de um trabalho real à direita (desktop, troca no hover/foco/clique).
// No celular é um acordeão (como na North): começa fechado, um aberto por vez e o título tocado fica parado.

function ancorar(el: HTMLElement) {
  const topo = el.getBoundingClientRect().top;
  const fim = performance.now() + 650;
  let parar = false;
  const soltar = () => (parar = true);
  window.addEventListener('touchstart', soltar, { once: true, passive: true });
  const passo = () => {
    if (parar) return;
    const d = el.getBoundingClientRect().top - topo;
    if (Math.abs(d) > 0.5) window.scrollBy({ top: d, behavior: 'instant' });
    if (performance.now() < fim) return requestAnimationFrame(passo);
    window.removeEventListener('touchstart', soltar);
    if (topo > window.innerHeight * 0.4) window.scrollBy({ top: topo - 96, behavior: 'smooth' });
  };
  requestAnimationFrame(passo);
}

const mensagem = (nome: string) => `Olá! Vim pelo site da NOVVA e quero um orçamento de ${nome.toLowerCase()}.`;

function Itens({ s }: { s: (typeof servicos)[number] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {s.itens.map((i) => (
        <li key={i} className="flex items-center gap-1.5 rounded-full bg-white/6 px-3 py-1.5 text-xs font-medium ring-1 ring-white/10">
          <Check className="size-3.5 text-magenta" aria-hidden />
          {i}
        </li>
      ))}
    </ul>
  );
}

function Cta({ s }: { s: (typeof servicos)[number] }) {
  return (
    <a href={whatsapp(mensagem(s.nome))} target="_blank" rel="noopener" className="degrade inline-flex h-11 w-fit items-center gap-2 rounded-full px-5 text-sm font-semibold">
      Pedir orçamento deste serviço
      <ArrowUpRight className="size-4" aria-hidden />
    </a>
  );
}

export function Servicos() {
  const desktop = useDesktop();
  const [ativo, setAtivo] = useState<number | null>(null);
  const atual = servicos[ativo ?? 0];

  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <TituloSecao id="servicos-titulo" numero="01" etiqueta="Serviços" titulo={<>Fazemos muito mais que <Destaque>placas.</Destaque></>} apoio="Comunicação visual completa para a sua marca aparecer na rua, na loja e em cada material." />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <ol className="revelar flex min-w-0 flex-col border-t border-white/10">
            {servicos.map((s, i) => {
              const aberto = desktop ? i === (ativo ?? 0) : i === ativo;
              return (
                <li key={s.id} className="border-b border-white/10">
                  <button
                    type="button"
                    aria-expanded={aberto}
                    aria-controls={desktop ? 'servico-foto' : `servico-${s.id}`}
                    onMouseEnter={() => desktop && setAtivo(i)}
                    onFocus={() => desktop && setAtivo(i)}
                    onClick={(e) => {
                      if (desktop) return setAtivo(i);
                      ancorar(e.currentTarget);
                      setAtivo(aberto ? null : i);
                    }}
                    className="group relative flex w-full cursor-pointer items-center gap-5 py-6 text-left"
                  >
                    <span aria-hidden className={cn('degrade absolute -top-px left-0 h-0.5 w-full origin-left transition-transform duration-500', aberto ? 'scale-x-100' : 'scale-x-0')} />
                    <span className={cn('font-mono text-sm tabular-nums transition-colors', aberto ? 'text-magenta' : 'text-nevoa/50')}>0{i + 1}</span>
                    <span className={cn('flex-1 text-xl font-bold tracking-tight transition-colors sm:text-2xl', aberto ? 'text-white' : 'text-nevoa/70 group-hover:text-white')}>{s.nome}</span>
                    <ChevronDown className={cn('size-5 shrink-0 transition-transform duration-300 lg:-rotate-90', aberto ? 'rotate-180 text-magenta lg:rotate-0' : 'text-nevoa/50')} aria-hidden />
                  </button>
                  {!desktop && aberto && (
                    <div id={`servico-${s.id}`} className="subir flex flex-col gap-5 pb-8 [animation-duration:.4s]">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                        <Image src={media(s.foto)} alt={s.legenda} fill sizes="92vw" className="object-cover" />
                      </div>
                      <p className="leading-relaxed text-nevoa">{s.resumo}</p>
                      <Itens s={s} />
                      <Cta s={s} />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>

          {/* desktop: foto do serviço ativo e detalhes */}
          <div className="hidden min-w-0 lg:block">
            <div id="servico-foto" className="sticky top-24 overflow-hidden rounded-3xl bg-noite-2 ring-1 ring-white/10">
              <div className="relative aspect-[4/3]">
                {servicos.map((s, i) => (
                  <Image key={s.id} src={media(s.foto)} alt={i === (ativo ?? 0) ? s.legenda : ''} fill sizes="600px" className={cn('object-cover transition-opacity duration-500', i === (ativo ?? 0) ? 'opacity-100' : 'opacity-0')} />
                ))}
                <span className="absolute bottom-4 left-4 rounded-full bg-noite/80 px-3 py-1.5 text-xs font-medium backdrop-blur">{atual.legenda}</span>
              </div>
              <div key={atual.id} className="subir flex flex-col gap-5 p-7 [animation-duration:.4s]">
                <p className="text-lg leading-relaxed text-nevoa">{atual.resumo}</p>
                <Itens s={atual} />
                <Cta s={atual} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
