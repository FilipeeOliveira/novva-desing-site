# NOVVA Design & Comunicação - landing page

Landing page da NOVVA, gráfica e comunicação visual em Manaus - AM (cliente vindo da AMPARO). Objetivo: gerar pedidos de orçamento pelo WhatsApp. Material do cliente em `/home/north/Downloads/grafica nova` (portfólio 2026 em PDF, 5 artes de story, logos e o contorno do "N").

## Stack e publicação
- Mesma base da SA Kaizen (`../kaizen_site`): Next.js 16 (App Router) com `output: 'export'` e `distDir: 'dist'`, Tailwind v4, lucide-react, `motion` disponível. TypeScript 5 estrito.
- `npm run dev` para desenvolver, `npm run lint` deve passar sem avisos, `npm run build` gera `dist/` estático.
- Publicação: build LOCAL e enviar o conteúdo de `dist/` para a hospedagem (a Hostinger não roda o SWC do Next 16 no servidor). ATENÇÃO: `dist/dev` é a saída do `next dev` (76 MB) e NÃO vai para o servidor. `npm run pacote` faz o build e gera `novva-site.zip` com o conteúdo de `dist/` sem a pasta `dev` (é esse zip que vai para a hospedagem).
- `AGENTS.md` é gerado pelo `next dev` (regras do Next); pode ir junto nos commits.
- Git local iniciado, ainda sem remoto. Commit/push só quando o usuário pedir.

## Onde está cada coisa
- `site.config.ts`: nome, WhatsApp, Instagram (@graficanovva, https://www.instagram.com/graficanovva/), e-mail (atendimento.novvadesign@gmail.com), cidade, domínio.
- `lib/contact.ts`: link do WhatsApp com mensagem pronta e telefone formatado.
- `content.ts`: trabalhos reais do portfólio (cliente, serviço, quantidade de fotos) e a lista curta de serviços da faixa.
- `public/img/trabalhos/<cliente>-<n>.webp`: 32 fotos reais extraídas do PDF do portfólio (até 1600px, WebP 78) e a versão média `-m.webp` (800px, `media()` em `lib/utils.ts`) usada nos cards e no painel de Serviços; a cheia fica no hero e no case aberto (lupa). Clientes: influx (6), taru (3), adorai (4), midea (6), adidas (6), marques (3), najar (4).
- `public/img/marca/`: `logo-horizontal.png` (1200px) e `logo-horizontal-480.png` (usada no menu e rodapé), `logo-vertical.png`, `icone.png` (o N em degradê, usado grande no manifesto), `icone-64.png` (avatar dos stories), `favicon-32.png` e `apple-touch-icon.png`.
- `components/fita-n.tsx`: o "N" como linha (centro do traço sobre o contorno oficial, viewBox 930x2000), desenhado com `.desenhar`; usado no hero e em "Como funciona".
- `components/cabecalho.tsx`, `components/faixa-servicos.tsx` (faixa "✱ SERVIÇO ✱" em degradê, como o topo das páginas do portfólio), `components/hero/`.
- `app/globals.css`: cores da marca no `@theme` e animações.

## Identidade
- Cores (amostradas do material): `noite` #04002a (fundo), `noite-2` #0b0640, `roxo` #5b0fc9, `magenta` #f71ca5, `laranja` #ff7a2e, `nevoa` #c9c4e6 (texto secundário). Degradê roxo → magenta → laranja em `.degrade` (fundos) e `.texto-degrade` (palavra de destaque). Granulado dos stories em `.granulado`.
- Fonte: Poppins (a do subtítulo do logo) em tudo. Se o cliente mandar o arquivo da fonte dos títulos do portfólio, trocar nos títulos.
- Frases da própria marca (usar em vez de inventar): "Onde criatividade encontra direção", "O mundo com as nossas cores", "Fazemos muito mais que placas", "Transforme suas ideias em realidade!", "Seu material representa sua marca. Por isso aplicamos técnica, controle e qualidade em cada etapa da impressão.", "Se o assunto é imagem, fale com quem entende!", "Envie seu material aqui!" e o manifesto "A NOVVA nasce de um novo momento... Aqui, o novo não é apenas estética. É pensamento."

## Hero
- APROVADO: C "Vitrine" (`components/hero/hero-c.tsx`, usado em `app/page.tsx`). Fotos dos trabalhos em tela cheia trocando a cada 5 s com zoom lento e barrinhas de progresso como nos stories, cartão com cliente e serviço, contorno do N passando por trás (desktop), título "Sua marca, do arquivo à fachada." e botões WhatsApp / Ver trabalhos. Para com movimento reduzido.
- As prévias A "Cartaz" e B "Fita" foram apagadas a pedido do usuário (estão só no histórico desta conversa, nunca foram commitadas).

## Seções (app/page.tsx, nesta ordem)
Linha visual mais próxima da AMPARO (rótulos editoriais numerados, contato em lista grande) e diferente da Kaizen (sem barra de WhatsApp no rodapé, sem cartões de contato com ícone).
1. `Cabecalho` (fixo, transparente no hero e com vidro ao rolar; no celular só logo + "Orçamento").
2. `HeroC` (aprovado) e `FaixaServicos`.
3. `Marcas`: nomes dos clientes do portfólio correndo devagar (sem logos de terceiros).
4. `Servicos` (`#servicos`, "(01)"): 6 categorias de `content.ts > servicos`, cada uma com foto de trabalho real, itens e WhatsApp com mensagem do serviço. Desktop: lista + painel fixo com a foto (troca no hover/foco/clique). Celular: acordeão como o da North (começa fechado, seta, um por vez, `ancorar()` mantém o título tocado parado).
5. `Trabalhos` (`#trabalhos`, "(02)"): "Apple Cards Carousel" da Aceternity (`components/ui/apple-cards-carousel.tsx`, adaptado: lucide, next/image, cores, snap, nomes acessíveis, `role="dialog"`, foco e trava de rolagem, primeiro card alinhado com o texto da seção). Cada card abre o case: descrição, "Quero algo parecido" (WhatsApp com o nome do cliente) e todas as fotos com a "Lens" da Aceternity (`components/ui/lens.tsx`, lupa só com mouse) para ver o acabamento.
6. `ComoFunciona` (`#como-funciona`, "(03)"): 4 passos de `content.ts > passos` ligados por linha em degradê.
7. `Manifesto` (`#sobre`, "(04)"): texto do portfólio sobre o degradê granulado; a frase "Aqui, o novo não é apenas estética. É pensamento." usa o "Text Generate Effect" da Aceternity (`components/ui/text-generate-effect.tsx`, adaptado: dispara ao entrar na tela, texto inteiro em `sr-only`).
8. `Instagram` (`#instagram`, "(05)"): as artes reais dos stories (`public/img/stories/`) em telas 9:16 com barrinhas e perfil, levando ao @graficanovva; rolagem lateral no celular, grade de 4 no desktop. O STORY2 (QR + número 99442-2842) ficou de fora até confirmar o WhatsApp. Obs.: o story "Fazemos muito mais que placas" tem "ENVEPOLAMENTOS" escrito errado na arte do cliente.
9. `Contato` (`#contato`, "(06)"): padrão da AMPARO, canais em lista com texto grande e seta que gira (WhatsApp, Instagram, e-mail com `<wbr>` depois do @); abaixo, "Quer adiantar o orçamento?" com o QR code do WhatsApp (desktop, gerado no build com `qrcode`) e o `ContatoForm` (nome, serviços em etiquetas, arte, detalhes; monta a mensagem e abre o WhatsApp).
10. `Rodape` (uma linha, como o da AMPARO, com "Desenvolvido por North Software" linkando https://northsoftware.com.br) e `WhatsAppFloat` (bola em degradê no canto em todos os tamanhos; some do Contato até o fim).
- Componentes avaliados e NÃO usados (para não exagerar): fundos animados da Aceternity (Aurora, Meteors, Beams, Vortex etc.) brigam com as fotos; 3D Marquee, Parallax Scroll, Hero Parallax e Draggable Card pesam e distraem; Focus Cards e Layout Grid ficam piores no celular que o carrossel; Compare precisaria de fotos de antes/depois (não temos).
- SEO: Open Graph com `public/img/og.jpg` (captura do hero em 1200x630 a partir do build, sem o indicador do modo dev), JSON-LD `LocalBusiness`, `robots.ts` e `sitemap.ts` (só a home).
- Capturas para revisão: rolar tela a tela (o hero tem `min-h-svh`; captura de página inteira com viewport gigante distorce o hero).

## Regras e decisões
- NUNCA usar travessão (— ou –) em texto do site, meta tags ou alt. Conferir com `grep -rn "[—–]" app components content.ts site.config.ts lib`.
- Não inventar serviços, prazos, preços, números ou avaliações. Serviços confirmados pelo material: fachadas e totens em ACM, letreiros, placas e sinalização externa, mini outdoor, lona com impressão digital, adesivos, envelopamento (paredes, móveis, portas, vidros, adesivo automotivo, jateado) e impressões.
- Grids: `grid-cols-1` no celular + `min-w-0` nos filhos. Sem rolagem horizontal (testado de 360 a 1024px).
- Animações em CSS (`.subir`, `.desenhar`, `.faixa`), só `transform`/`opacity`, tudo desligado com `prefers-reduced-motion`.

## Pendências com o cliente
- WhatsApp: portfólio diz (92) 99442-2824, story diz 99442-2842. Hoje está 2824 (provisório).
- Se a NOVVA cria a arte e instala: os passos "Arte e orçamento" e "Instalação" e o título "do arquivo à fachada" assumem que sim (A CONFIRMAR).
- Endereço, horário e área atendida; autorização para mostrar as marcas dos clientes (Adidas, Midea Carrier etc.); domínio; avaliações no Google, se houver.
