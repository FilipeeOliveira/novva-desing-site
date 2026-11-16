'use client';

// "Text Generate Effect" da Aceternity UI: as palavras surgem uma a uma, saindo do desfoque.
// Ajustes NOVVA: dispara quando o texto entra na tela (não ao carregar), texto completo para leitores de tela,
// com movimento reduzido aparece direto; cor herdada.
import { useEffect } from 'react';
import { stagger, useAnimate, useInView, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

export function TextGenerateEffect({ words, className }: { words: string; className?: string }) {
  const [scope, animate] = useAnimate();
  const naTela = useInView(scope, { once: true, margin: '-15% 0px' });
  const reduzido = useReducedMotion();

  useEffect(() => {
    if (naTela) animate('span', { opacity: 1, filter: 'blur(0px)' }, { duration: reduzido ? 0 : 0.5, delay: reduzido ? 0 : stagger(0.06) });
  }, [naTela, reduzido, animate]);

  return (
    <p ref={scope} className={className}>
      <span className="sr-only">{words}</span>
      {words.split(' ').map((w, i) => (
        <span key={w + i} aria-hidden className={cn('inline-block opacity-0 blur-[8px]')}>
          {w}&nbsp;
        </span>
      ))}
    </p>
  );
}
