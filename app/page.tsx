import { Cabecalho } from '@/components/cabecalho';
import { ComoFunciona } from '@/components/como-funciona';
import { Contato } from '@/components/contato';
import { FaixaServicos } from '@/components/faixa-servicos';
import { HeroC } from '@/components/hero/hero-c';
import { Instagram } from '@/components/instagram';
import { Manifesto } from '@/components/manifesto';
import { Marcas } from '@/components/marcas';
import { Rodape } from '@/components/rodape';
import { Servicos } from '@/components/servicos';
import { Trabalhos } from '@/components/trabalhos';
import { WhatsAppFloat } from '@/components/whatsapp-float';

// Landing page da NOVVA. Hero aprovado: C "Vitrine".
export default function Home() {
  return (
    <>
      <Cabecalho />
      <main>
        <HeroC />
        <FaixaServicos />
        <Marcas />
        <Servicos />
        <Trabalhos />
        <ComoFunciona />
        <Manifesto />
        <Instagram />
        <Contato />
      </main>
      <Rodape />
      <WhatsAppFloat />
    </>
  );
}
