import QRCode from 'qrcode';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/site.config';
import { telefone, whatsapp } from '@/lib/contact';
import { ContatoForm } from './contato-form';
import { Destaque, TituloSecao } from './secao';

// Contato no padrão da AMPARO: canais em lista com texto grande e a seta que gira no hover. Abaixo, o formulário
// rápido e, no desktop, o QR code do WhatsApp (gerado no build, SVG estático).
export async function Contato() {
  const qr = await QRCode.toString(whatsapp(), { type: 'svg', margin: 1, color: { dark: '#04002a', light: '#ffffff' } });
  const [usuario, dominio] = siteConfig.email.split('@');
  const canais = [
    { rotulo: 'WhatsApp · orçamentos', valor: telefone, href: whatsapp(), aria: `WhatsApp da NOVVA, ${telefone} (abre em nova aba)`, externo: true },
    { rotulo: 'Instagram · novidades e bastidores', valor: `@${siteConfig.instagram}`, href: `https://www.instagram.com/${siteConfig.instagram}/`, aria: `Instagram @${siteConfig.instagram} (abre em nova aba)`, externo: true },
    { rotulo: 'E-mail · envie seu material', valor: <>{usuario}<wbr />@{dominio}</>, href: `mailto:${siteConfig.email}`, aria: `Enviar e-mail para ${siteConfig.email}`, externo: false, longo: true },
  ];

  return (
    <section id="contato" aria-labelledby="contato-titulo" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <TituloSecao id="contato-titulo" numero="06" etiqueta="Contato" titulo={<>Se o assunto é imagem, fale com <Destaque>quem entende!</Destaque></>} apoio="Envie seu material, uma foto do local ou só a ideia. Respondemos pelo WhatsApp." />

        <ul className="mt-14 border-b border-white/12">
          {canais.map((c) => (
            <li key={c.href} className="border-t border-white/12">
              <a href={c.href} {...(c.externo ? { target: '_blank', rel: 'noopener' } : {})} aria-label={c.aria} className="group flex items-center gap-4 py-6 sm:py-8">
                <span className="flex min-w-0 flex-1 flex-col gap-1 transition-transform duration-300 group-hover:translate-x-2">
                  <span className="text-sm font-semibold tracking-[0.18em] text-nevoa/70 uppercase">{c.rotulo}</span>
                  <span className={`${'longo' in c ? 'text-[clamp(1.05rem,0.5rem+3.2vw,2.75rem)]' : 'text-[clamp(1.4rem,0.9rem+2.6vw,3.25rem)]'} leading-tight font-extrabold tracking-tight [overflow-wrap:break-word] transition-colors group-hover:text-magenta`}>
                    {c.valor}
                  </span>
                </span>
                <span className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-full ring-1 ring-white/25 transition-transform duration-300 group-hover:rotate-45 group-hover:ring-transparent sm:size-16">
                  <span aria-hidden className="degrade absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <ArrowUpRight className="relative size-6" aria-hidden />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div className="revelar flex flex-col gap-6">
            <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Quer adiantar o orçamento?</h3>
            <p className="max-w-[44ch] text-lg leading-relaxed text-nevoa">Marque o que você precisa e a mensagem chega pronta no nosso WhatsApp.</p>
            <div className="hidden items-center gap-5 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 lg:flex">
              <div className="size-28 shrink-0 overflow-hidden rounded-xl bg-white" role="img" aria-label="QR code do WhatsApp da NOVVA" dangerouslySetInnerHTML={{ __html: qr }} />
              <p className="text-sm leading-relaxed text-nevoa"><span className="block text-base font-bold text-white">Está no computador?</span>Aponte a câmera do celular para o código e continue a conversa no WhatsApp.</p>
            </div>
          </div>
          <div className="revelar min-w-0">
            <ContatoForm />
          </div>
        </div>
      </div>
    </section>
  );
}
