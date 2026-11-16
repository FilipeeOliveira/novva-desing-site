'use client';

// "Lens" da Aceternity UI (ui.aceternity.com/components/lens): lupa que acompanha o mouse.
// Ajustes NOVVA: só em dispositivos com mouse (pointer: fine), sem estado estático, borda da lupa visível,
// o conteúdo ampliado é aria-hidden (não duplica a imagem para leitores de tela); respeita movimento reduzido.
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

export function Lens({ children, zoomFactor = 2, lensSize = 180 }: { children: React.ReactNode; zoomFactor?: number; lensSize?: number }) {
  const [sobre, setSobre] = useState(false);
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const reduzido = useReducedMotion();

  return (
    <div
      className="relative overflow-hidden"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setSobre(true)}
      onPointerLeave={() => setSobre(false)}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
    >
      {children}
      <AnimatePresence>
        {sobre && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: reduzido ? 1 : 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-none absolute inset-0 z-20"
            style={{ maskImage: `radial-gradient(circle ${lensSize / 2}px at ${pos.x}px ${pos.y}px, #000 100%, transparent 100%)`, WebkitMaskImage: `radial-gradient(circle ${lensSize / 2}px at ${pos.x}px ${pos.y}px, #000 100%, transparent 100%)`, transformOrigin: `${pos.x}px ${pos.y}px` }}
          >
            <div className="absolute inset-0" style={{ transform: `scale(${zoomFactor})`, transformOrigin: `${pos.x}px ${pos.y}px` }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {sobre && <span aria-hidden className="pointer-events-none absolute z-30 rounded-full ring-2 ring-white/80" style={{ width: lensSize, height: lensSize, left: pos.x - lensSize / 2, top: pos.y - lensSize / 2 }} />}
    </div>
  );
}
