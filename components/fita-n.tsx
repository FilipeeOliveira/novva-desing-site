import { cn } from '@/lib/utils';

// O "N" da NOVVA como linha: centro do traço sobre o contorno oficial (CONTORNO NOVVA, 930x2000), desenhado
// com `.desenhar` (stroke-dashoffset com pathLength=1). Usado no hero e em "Como funciona".
const CAMINHO_N =
  'M195,1990 L100,800 C92,690 140,605 205,608 C270,611 300,660 330,720 L600,1270 C640,1350 690,1385 735,1375 C800,1362 838,1300 830,1215 L713,14';

export function FitaN({ className, desenhar = true }: { className?: string; desenhar?: boolean }) {
  return (
    <svg viewBox="0 0 930 2000" fill="none" aria-hidden className={cn('overflow-visible', className)}>
      <path d={CAMINHO_N} pathLength={1} stroke="currentColor" strokeWidth={4} className={desenhar ? 'desenhar' : undefined} />
    </svg>
  );
}
