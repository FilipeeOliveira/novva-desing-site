import { cn } from '@/lib/utils';

// Cabeçalho das seções no padrão editorial da AMPARO: "(01) + linha + Serviços", título com uma palavra em degradê e apoio
export function TituloSecao({ id, numero, etiqueta, titulo, apoio, claro = false, className }: { id: string; numero: string; etiqueta: string; titulo: React.ReactNode; apoio?: string; claro?: boolean; className?: string }) {
  return (
    <div className={cn('revelar flex max-w-3xl flex-col gap-6', className)}>
      <p className={cn('flex items-center gap-3 text-sm font-semibold tracking-[0.2em] uppercase', claro ? 'text-white' : 'text-magenta')}>
        <span className="tabular-nums">({numero})</span>
        <span aria-hidden className="h-px w-10 bg-current opacity-50" />
        {etiqueta}
      </p>
      <h2 id={id} className="text-[clamp(2rem,4.6vw,3.6rem)] leading-[1] font-extrabold tracking-[-0.03em] text-balance">
        {titulo}
      </h2>
      {apoio && <p className="max-w-[56ch] text-lg leading-relaxed text-nevoa">{apoio}</p>}
    </div>
  );
}

export const Destaque = ({ children }: { children: React.ReactNode }) => <span className="texto-degrade">{children}</span>;
