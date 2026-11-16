import { trabalhos } from '@/content';

// Marcas atendidas (nomes, sem logos de terceiros), correndo devagar
export function Marcas() {
  const nomes = trabalhos.map((t) => t.cliente);
  return (
    <section aria-label="Marcas atendidas" className="border-b border-white/8 py-10">
      <p className="mb-6 text-center text-xs font-semibold tracking-[0.2em] text-nevoa/70 uppercase">Marcas que já estão nas ruas com a NOVVA</p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <p className="sr-only">{nomes.join(', ')}</p>
        <div aria-hidden className="faixa flex w-max [animation-duration:40s]">
          {[0, 1].map((c) => (
            <ul key={c} className="flex shrink-0 items-center">
              {[...nomes, ...nomes].map((n, i) => (
                <li key={i} className="px-8 text-2xl font-extrabold tracking-tight whitespace-nowrap text-white/35 sm:text-3xl">
                  {n}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
