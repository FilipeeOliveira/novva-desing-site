import type { Metadata } from 'next';
import Link from 'next/link';
import { whatsapp } from '@/lib/contact';

export const metadata: Metadata = { title: 'Página não encontrada | NOVVA', robots: { index: false } };

export default function NaoEncontrada() {
  return (
    <main className="mx-auto flex min-h-svh max-w-xl flex-col items-start justify-center gap-6 px-6">
      <p className="text-sm font-semibold tracking-[0.2em] text-magenta uppercase">(404)</p>
      <h1 className="text-4xl font-extrabold tracking-tight">Essa página não existe.</h1>
      <p className="text-lg text-nevoa">Mas a sua fachada pode existir. Volte para o início ou fale com a gente.</p>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className="inline-flex h-12 items-center rounded-full px-6 font-semibold ring-1 ring-white/20 hover:bg-white/8">Voltar ao início</Link>
        <a href={whatsapp()} target="_blank" rel="noopener" className="degrade inline-flex h-12 items-center rounded-full px-6 font-semibold">Falar no WhatsApp</a>
      </div>
    </main>
  );
}
