import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { trabalhos } from '@/content';
import { whatsapp } from '@/lib/contact';
import { media } from '@/lib/utils';
import { Card, Carousel } from './ui/apple-cards-carousel';
import { Lens } from './ui/lens';
import { Destaque, TituloSecao } from './secao';

// Trabalhos reais em cards grandes que deslizam (Apple Cards Carousel, Aceternity). Ao abrir, o card vira o case:
// descrição, todas as fotos (com lupa no desktop para ver o acabamento) e um WhatsApp "quero algo parecido".
const foto = (id: string, n: number) => `/img/trabalhos/${id}-${n}.webp`;

export function Trabalhos() {
  const cards = trabalhos.map((t, i) => (
    <Card
      key={t.id}
      index={i}
      card={{
        src: media(foto(t.id, 1)),
        alt: `${t.cliente}: ${t.servico}`,
        title: t.cliente,
        category: t.servico,
        content: (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <p className="max-w-[56ch] text-lg leading-relaxed text-nevoa">{t.descricao}</p>
              <a href={whatsapp(`Olá! Vi o trabalho da ${t.cliente} no site da NOVVA e quero algo parecido.`)} target="_blank" rel="noopener" className="degrade inline-flex h-12 shrink-0 items-center gap-2 self-start rounded-full px-6 text-sm font-semibold">
                Quero algo parecido
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Array.from({ length: t.fotos }, (_, k) => k + 1).map((n) => (
                <li key={n} className="overflow-hidden rounded-2xl ring-1 ring-white/10">
                  <Lens>
                    <Image src={foto(t.id, n)} alt={`${t.cliente}, foto ${n} de ${t.fotos}`} width={1200} height={900} sizes="(min-width:640px) 460px, 90vw" className="aspect-[4/3] w-full object-cover" />
                  </Lens>
                </li>
              ))}
            </ul>
            <p className="hidden text-sm text-nevoa/70 [@media(pointer:fine)]:block">Passe o mouse sobre as fotos para ver os detalhes de perto.</p>
          </div>
        ),
      }}
    />
  ));

  return (
    <section id="trabalhos" aria-labelledby="trabalhos-titulo" className="bg-noite-2/60 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <TituloSecao id="trabalhos-titulo" numero="02" etiqueta="Trabalhos" titulo={<>Transforme suas ideias em <Destaque>realidade.</Destaque></>} apoio="Projetos entregues pela NOVVA em Manaus. Deslize e abra um trabalho para ver todas as fotos." />
      </div>
      <Carousel items={cards} />
    </section>
  );
}
