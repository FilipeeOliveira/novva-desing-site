import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/site.config';
import { Destaque, TituloSecao } from './secao';

// Instagram: as artes reais dos stories da NOVVA em "telas" 9:16 com as barrinhas de story, levando ao perfil.
// O story com QR e número (STORY2) fica de fora até o cliente confirmar o WhatsApp.
const stories = [
  { src: '/img/stories/fazemos-muito-mais.webp', alt: 'Story: Fazemos muito mais que placas. Envelopamentos, letreiros em ACM, fachadas e totens, impressões.' },
  { src: '/img/stories/onde-criatividade.webp', alt: 'Story: NOVVA, onde criatividade encontra direção.' },
  { src: '/img/stories/o-mundo-com-as-nossas-cores.webp', alt: 'Story: O mundo com as nossas cores.' },
  { src: '/img/stories/seu-material.webp', alt: 'Story: Seu material representa sua marca. Se o assunto é imagem, fale com quem entende!' },
];
const perfil = `https://www.instagram.com/${siteConfig.instagram}/`;

export function Instagram() {
  return (
    <section id="instagram" aria-labelledby="instagram-titulo" className="overflow-hidden py-24 lg:py-32">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-end">
        <TituloSecao id="instagram-titulo" numero="05" etiqueta="Instagram" titulo={<>Acompanhe a NOVVA no <Destaque>Instagram.</Destaque></>} apoio="Novidades, bastidores e trabalhos recém-instalados." />
        <a href={perfil} target="_blank" rel="noopener" className="group revelar inline-flex h-13 shrink-0 items-center gap-3 self-start rounded-full bg-white pr-1.5 pl-6 font-semibold text-noite lg:self-end">
          Seguir @{siteConfig.instagram}
          <span className="degrade grid size-10 place-items-center rounded-full text-white transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="size-5" aria-hidden />
          </span>
        </a>
      </div>

      <ul className="mx-auto mt-12 flex max-w-7xl snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:px-8 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible">
        {stories.map((s, i) => (
          <li key={s.src} className="revelar w-[68vw] max-w-72 shrink-0 snap-start sm:w-64 lg:w-auto lg:max-w-none" style={{ animationDelay: `${i * 0.06}s` }}>
            <a href={perfil} target="_blank" rel="noopener" className="group relative block aspect-[9/16] overflow-hidden rounded-[1.75rem] ring-1 ring-white/12 transition-transform duration-500 hover:-translate-y-2 hover:rotate-[-1deg]">
              <Image src={s.src} alt={s.alt} fill sizes="(min-width:1024px) 280px, 68vw" className="object-cover" />
              {/* topo de story: barrinhas e perfil */}
              <div className="absolute inset-x-0 top-0 flex flex-col gap-2.5 bg-gradient-to-b from-black/45 to-transparent p-3">
                <div aria-hidden className="flex gap-1">
                  {stories.map((_, k) => (
                    <span key={k} className={`h-0.5 flex-1 rounded-full ${k < i ? 'bg-white' : k === i ? 'bg-white/90' : 'bg-white/35'}`} />
                  ))}
                </div>
                <span className="flex items-center gap-2 text-xs font-semibold">
                  <span className="degrade grid size-7 place-items-center rounded-full p-0.5">
                    <Image src="/img/marca/icone-64.png" alt="" width={64} height={64} className="size-full rounded-full bg-noite object-contain p-1" />
                  </span>
                  {siteConfig.instagram}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
