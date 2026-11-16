import { servicosCurtos } from '@/content';

// Faixa tipo letreiro, como o topo das páginas do portfólio ("✱ SINALIZAÇÃO EXTERNA ✱")
export function FaixaServicos() {
  const itens = [...servicosCurtos, ...servicosCurtos];
  return (
    <div className="degrade relative overflow-hidden py-3.5">
      <p className="sr-only">{servicosCurtos.join(', ')}</p>
      <div aria-hidden className="faixa flex w-max">
        {[0, 1].map((c) => (
          <ul key={c} className="flex shrink-0">
            {itens.map((s, i) => (
              <li key={i} className="flex items-center gap-6 pr-6 text-sm font-bold tracking-[0.12em] whitespace-nowrap text-white uppercase sm:text-base">
                <span>✱</span>
                {s}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
