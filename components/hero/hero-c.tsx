'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FitaN } from '@/components/fita-n';
import { BotoesHero } from './botoes';
import { cn } from '@/lib/utils';

// C · "Vitrine": os trabalhos em tela cheia, trocando como stories (barrinhas de progresso), e o texto por cima
const slides = [
  { src: '/img/trabalhos/influx-2.webp', cliente: 'Influx', servico: 'Totem e fachada em ACM' },
  { src: '/img/trabalhos/adidas-2.webp', cliente: 'Adidas', servico: 'Adesivos e stands de campanha' },
  { src: '/img/trabalhos/najar-2.webp', cliente: 'Clínica M.Najar', servico: 'Adesivos em portas' },
  { src: '/img/trabalhos/taru-2.webp', cliente: 'Tarú Veículos', servico: 'Fachada em lona brilho' },
];
const TEMPO = 5000;

export function HeroC() {
  const [atual, setAtual] = useState(0);
  const [parado, setParado] = useState(false);
  const [carregados, setCarregados] = useState([0, 1]);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setAtual((a) => (a + 1) % slides.length), TEMPO);
    return () => clearInterval(t);
  }, []);
  // reinicia a barra de progresso e já pede a foto seguinte
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- efeito da troca de slide
    setParado(false);
    setCarregados((c) => [...new Set([...c, atual, (atual + 1) % slides.length])]);
  }, [atual]);

  return (
    <section className="relative isolate flex min-h-svh items-end overflow-hidden pt-28 pb-14">
      {slides.map((s, i) => (
        <div key={s.src} aria-hidden={i !== atual} className={cn('absolute inset-0 -z-20 transition-opacity duration-1000', i === atual ? 'opacity-100' : 'opacity-0')}>
          {carregados.includes(i) && <Image src={s.src} alt="" fill priority={i === 0} sizes="100vw" className={cn('object-cover', i === atual && 'animate-[zoom_6s_ease-out_both]')} />}
        </div>
      ))}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,0,42,.96)_0%,rgba(4,0,42,.75)_45%,rgba(4,0,42,.2)_100%),linear-gradient(0deg,rgba(4,0,42,.95),transparent_45%)]" />
      <FitaN className="pointer-events-none absolute top-0 right-[6%] -z-10 hidden h-full text-white/25 lg:block" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-end gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_auto]">
        <div className="flex min-w-0 flex-col items-start gap-7">
          <p className="subir text-xs font-semibold tracking-[0.2em] text-nevoa uppercase">Comunicação visual em Manaus</p>
          <h1 className="subir max-w-[14ch] text-[clamp(2.6rem,6.6vw,5.8rem)] leading-[.95] font-extrabold tracking-[-0.03em]" style={{ animationDelay: '.1s' }}>
            Sua marca, do arquivo à <span className="texto-degrade">fachada.</span>
          </h1>
          <p className="subir max-w-[46ch] text-lg leading-relaxed text-nevoa" style={{ animationDelay: '.2s' }}>
            Fachadas, letreiros em ACM, totens, adesivos, envelopamento e impressões. Técnica, controle e qualidade em cada etapa.
          </p>
          <div className="subir w-full sm:w-auto" style={{ animationDelay: '.3s' }}>
            <BotoesHero />
          </div>
        </div>

        {/* legenda do trabalho em tela, com barrinhas como nos stories */}
        <div className="subir w-full max-w-xs rounded-2xl bg-noite/70 p-4 ring-1 ring-white/10 backdrop-blur" style={{ animationDelay: '.5s' }}>
          <div className="mb-3 flex gap-1.5" aria-hidden>
            {slides.map((s, i) => (
              <span key={s.src} className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
                <span className={cn('block h-full origin-left rounded-full bg-white', i < atual ? 'scale-x-100' : i === atual && !parado ? 'animate-[progresso_5s_linear_both]' : 'scale-x-0')} />
              </span>
            ))}
          </div>
          <p className="text-xs text-nevoa">Trabalho NOVVA</p>
          <p className="font-semibold">{slides[atual].cliente}</p>
          <p className="text-sm text-nevoa">{slides[atual].servico}</p>
        </div>
      </div>
    </section>
  );
}
