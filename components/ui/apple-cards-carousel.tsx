'use client';

// "Apple Cards Carousel" da Aceternity UI (ui.aceternity.com/components/apple-cards-carousel).
// Ajustes NOVVA: lucide no lugar do tabler, next/image, cores da marca, botões com nome acessível, rolagem com
// snap, volta para o card certo pela posição real (não por larguras fixas), modal com role="dialog", foco no
// botão de fechar, trava a rolagem no <html> e devolve o foco ao card ao fechar; MotionConfig respeita movimento reduzido.
import Image from 'next/image';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { useOutsideClick } from '@/hooks/use-outside-click';

type CardData = { src: string; alt: string; title: string; category: string; content: React.ReactNode };

const CarouselContext = createContext<{ onCardClose: (index: number) => void }>({ onCardClose: () => {} });

export function Carousel({ items }: { items: React.ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [podeEsq, setPodeEsq] = useState(false);
  const [podeDir, setPodeDir] = useState(true);

  const checar = () => {
    const el = ref.current;
    if (!el) return;
    setPodeEsq(el.scrollLeft > 4);
    setPodeDir(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };
  useEffect(checar, []);

  const passo = () => (ref.current?.querySelector<HTMLElement>('[data-card]')?.offsetWidth ?? 300) + 16;
  const onCardClose = (index: number) => {
    const card = ref.current?.querySelectorAll<HTMLElement>('[data-card]')[index];
    if (card && ref.current) ref.current.scrollTo({ left: Math.max(0, card.offsetLeft - parseFloat(getComputedStyle(card.parentElement!).paddingLeft)), behavior: 'smooth' });
  };

  return (
    <CarouselContext.Provider value={{ onCardClose }}>
      <MotionConfig reducedMotion="user">
        <div className="relative w-full">
          <div ref={ref} onScroll={checar} className="flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth py-8 [scrollbar-width:none] md:py-12">
            <div className="flex flex-row gap-4 pr-5 pl-[max(1.25rem,calc((100vw-80rem)/2+2rem))] sm:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
              {items.map((item, i) => (
                <motion.div key={i} data-card initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 * i, ease: 'easeOut' }} className="snap-start rounded-3xl [scroll-margin-left:max(1.25rem,calc((100vw-80rem)/2+2rem))] last:mr-[10vw]">
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mx-auto flex max-w-7xl justify-end gap-2 px-5 sm:px-8">
            <button type="button" aria-label="Trabalhos anteriores" onClick={() => ref.current?.scrollBy({ left: -passo(), behavior: 'smooth' })} disabled={!podeEsq} className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-white/8 ring-1 ring-white/10 transition-colors hover:bg-white/15 disabled:cursor-default disabled:opacity-35">
              <ArrowLeft className="size-5" aria-hidden />
            </button>
            <button type="button" aria-label="Próximos trabalhos" onClick={() => ref.current?.scrollBy({ left: passo(), behavior: 'smooth' })} disabled={!podeDir} className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-white/8 ring-1 ring-white/10 transition-colors hover:bg-white/15 disabled:cursor-default disabled:opacity-35">
              <ArrowRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </MotionConfig>
    </CarouselContext.Provider>
  );
}

export function Card({ card, index }: { card: CardData; index: number }) {
  const [aberto, setAberto] = useState(false);
  const caixa = useRef<HTMLDivElement>(null);
  const fecharBtn = useRef<HTMLButtonElement>(null);
  const gatilho = useRef<HTMLButtonElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  const fechar = useCallback(() => {
    setAberto(false);
    onCardClose(index);
    gatilho.current?.focus({ preventScroll: true });
  }, [index, onCardClose]);

  useEffect(() => {
    if (!aberto) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && fechar();
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', esc);
    fecharBtn.current?.focus();
    return () => {
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', esc);
    };
  }, [aberto, fechar]);

  useOutsideClick(caixa, () => aberto && fechar());

  return (
    <>
      <AnimatePresence>
        {aberto && (
          <div className="fixed inset-0 z-50 h-svh overflow-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-noite/85 backdrop-blur-lg" />
            <motion.div
              ref={caixa}
              role="dialog"
              aria-modal="true"
              aria-label={`${card.title}: ${card.category}`}
              layoutId={`card-${card.title}`}
              className="relative z-[60] mx-auto my-6 h-fit max-w-5xl rounded-3xl bg-noite-2 p-5 ring-1 ring-white/10 md:my-10 md:p-10"
            >
              <button ref={fecharBtn} type="button" onClick={fechar} aria-label="Fechar" className="sticky top-4 z-10 ml-auto flex size-11 cursor-pointer items-center justify-center rounded-full bg-white text-noite">
                <X className="size-5" aria-hidden />
              </button>
              <motion.p layoutId={`category-${card.title}`} className="text-sm font-semibold tracking-[0.16em] text-magenta uppercase">{card.category}</motion.p>
              <motion.p layoutId={`title-${card.title}`} className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">{card.title}</motion.p>
              <div className="pt-8">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        ref={gatilho}
        type="button"
        layoutId={`card-${card.title}`}
        onClick={() => setAberto(true)}
        aria-haspopup="dialog"
        className="group relative z-10 flex h-[26rem] w-64 cursor-pointer flex-col items-start justify-end overflow-hidden rounded-3xl bg-noite-2 text-left ring-1 ring-white/10 md:h-[34rem] md:w-96"
      >
        <Image src={card.src} alt={card.alt} fill sizes="(min-width:768px) 384px, 256px" className="z-0 object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(0deg,rgba(4,0,42,.95),rgba(4,0,42,.15)_55%,transparent)]" />
        <div className="relative z-20 p-6 md:p-8">
          <motion.p layoutId={`category-${card.title}`} className="text-xs font-semibold tracking-[0.16em] text-white/80 uppercase md:text-sm">{card.category}</motion.p>
          <motion.p layoutId={`title-${card.title}`} className="mt-2 text-2xl font-extrabold tracking-tight text-balance md:text-3xl">{card.title}</motion.p>
        </div>
      </motion.button>
    </>
  );
}
