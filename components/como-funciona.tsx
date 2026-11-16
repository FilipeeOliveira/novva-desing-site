import { passos } from '@/content';
import { FitaN } from './fita-n';
import { Destaque, TituloSecao } from './secao';

// 4 passos ligados por uma linha em degradê (no desktop, horizontal; no celular, vertical)
export function ComoFunciona() {
  return (
    <section id="como-funciona" aria-labelledby="como-titulo" className="relative overflow-hidden py-24 lg:py-32">
      <FitaN desenhar={false} className="pointer-events-none absolute -top-40 -right-24 h-[46rem] text-white/[.06]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <TituloSecao id="como-titulo" numero="03" etiqueta="Como funciona" titulo={<>Onde criatividade encontra <Destaque>direção.</Destaque></>} apoio="Do primeiro contato à peça pronta, você acompanha cada etapa." />
        <ol className="relative mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <span aria-hidden className="degrade absolute top-6 right-[calc(25%-2.625rem)] left-6 hidden h-0.5 lg:block" />
          {passos.map((p, i) => (
            <li key={p.titulo} className="revelar relative flex gap-5 lg:flex-col" style={{ animationDelay: `${i * 0.08}s` }}>
              <span className="degrade relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full text-lg font-extrabold shadow-[0_10px_30px_-10px_rgba(247,28,165,.9)]">{i + 1}</span>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold">{p.titulo}</h3>
                <p className="leading-relaxed text-nevoa">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
