import Image from 'next/image';
import { TextGenerateEffect } from './ui/text-generate-effect';

// O texto da própria NOVVA (portfólio 2026) sobre o degradê granulado; a frase principal surge palavra a palavra
// (Text Generate Effect, Aceternity) quando entra na tela
export function Manifesto() {
  return (
    <section id="sobre" aria-labelledby="manifesto-titulo" className="px-5 sm:px-8">
      <div className="degrade granulado relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] px-6 py-16 sm:px-12 lg:px-20 lg:py-24">
        <Image src="/img/marca/icone.png" alt="" width={559} height={556} className="pointer-events-none absolute -right-16 -bottom-20 w-72 opacity-25 mix-blend-overlay lg:w-[28rem]" />
        <div className="relative flex max-w-4xl flex-col gap-8">
          <p className="flex items-center gap-3 text-sm font-semibold tracking-[0.2em] uppercase">
            <span className="tabular-nums">(04)</span>
            <span aria-hidden className="h-px w-10 bg-current opacity-50" />
            Sobre a NOVVA
          </p>
          <h2 id="manifesto-titulo" className="sr-only">Sobre a NOVVA</h2>
          <TextGenerateEffect words="Aqui, o novo não é apenas estética. É pensamento." className="text-[clamp(1.9rem,4.4vw,3.6rem)] leading-[1.08] font-extrabold tracking-[-0.02em]" />
          <div className="revelar grid max-w-3xl grid-cols-1 gap-6 text-lg leading-relaxed text-white/90 md:grid-cols-2">
            <p>A NOVVA nasce de um novo momento. Um novo olhar sobre o design, a comunicação e a impressão.</p>
            <p>Mais do que produzir materiais gráficos, acreditamos no poder das ideias bem construídas e da comunicação visual como ferramenta estratégica para marcas que querem se destacar. Cada projeto carrega propósito, criatividade e atenção aos detalhes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
