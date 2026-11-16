// Conteúdo da landing. Textos baseados no portfólio NOVVA 2026 e nos stories enviados pelo cliente (não inventar).

export type Categoria = 'sinalizacao' | 'envelopamento';

// Trabalhos reais do portfólio (fotos em public/img/trabalhos/<id>-<n>.webp)
export const trabalhos: { id: string; cliente: string; servico: string; descricao: string; categoria: Categoria; fotos: number }[] = [
  { id: 'influx', cliente: 'Influx', servico: 'Totem e fachada em ACM', descricao: 'Sinalização externa e fachada em ACM para acompanhar o novo processo de rebranding da marca.', categoria: 'sinalizacao', fotos: 6 },
  { id: 'adidas', cliente: 'Adidas', servico: 'Adesivos e stands de campanha', descricao: 'Aplicação de adesivos e envelopamento de stands de campanha.', categoria: 'envelopamento', fotos: 6 },
  { id: 'taru', cliente: 'Tarú Veículos', servico: 'Fachada em lona brilho', descricao: 'Fachada em lona brilho com impressão digital em alta qualidade.', categoria: 'sinalizacao', fotos: 3 },
  { id: 'midea', cliente: 'Midea Carrier', servico: 'Envelopamento de ambientes', descricao: 'Envelopamento com adesivo automotivo em alta qualidade para ambientes e adesivo jateado para janelas e portas.', categoria: 'envelopamento', fotos: 6 },
  { id: 'adorai', cliente: 'Adorai', servico: 'Revitalização de mini outdoor', descricao: 'Revitalização de mini outdoor, frente e verso, em lona brilho com impressão em alta qualidade.', categoria: 'sinalizacao', fotos: 4 },
  { id: 'najar', cliente: 'Clínica M.Najar', servico: 'Adesivos em portas', descricao: 'Aplicação de adesivos nas portas da clínica.', categoria: 'envelopamento', fotos: 4 },
  { id: 'marques', cliente: 'Drogaria Marques', servico: 'Adesivos em portas', descricao: 'Aplicação de adesivos nas portas da drogaria.', categoria: 'envelopamento', fotos: 3 },
];


// Serviços (cada um com uma foto de trabalho real, quando existe)
export const servicos = [
  {
    id: 'fachadas',
    nome: 'Fachadas e totens em ACM',
    resumo: 'Totens, fachadas e placas de sinalização em vários tamanhos e formatos, para a sua empresa ser encontrada e lembrada.',
    itens: ['Fachadas em ACM', 'Totens de sinalização', 'Placas e letreiros'],
    foto: '/img/trabalhos/influx-2.webp',
    legenda: 'Influx · totem e fachada em ACM',
  },
  {
    id: 'lona',
    nome: 'Lonas e mini outdoor',
    resumo: 'Fachadas em lona brilho e mini outdoor com impressão digital em alta qualidade, inclusive revitalização do que já existe.',
    itens: ['Fachada em lona brilho', 'Mini outdoor frente e verso', 'Revitalização'],
    foto: '/img/trabalhos/adorai-1.webp',
    legenda: 'Adorai · mini outdoor',
  },
  {
    id: 'envelopamento',
    nome: 'Envelopamento de ambientes',
    resumo: 'Transforme paredes, móveis e ambientes com estampas e personalizações exclusivas e realistas, com acabamento moderno e de alto impacto visual.',
    itens: ['Paredes e móveis', 'Adesivo automotivo', 'Ambientes de loja e escritório'],
    foto: '/img/trabalhos/midea-1.webp',
    legenda: 'Midea Carrier · envelopamento',
  },
  {
    id: 'adesivos',
    nome: 'Adesivos em portas e vidros',
    resumo: 'Portas, vitrines e vidros que comunicam: adesivos impressos e jateado para dar identidade e privacidade.',
    itens: ['Portas e vitrines', 'Adesivo jateado', 'Comunicação na fachada'],
    foto: '/img/trabalhos/najar-2.webp',
    legenda: 'Clínica M.Najar · adesivos em portas',
  },
  {
    id: 'campanhas',
    nome: 'Campanhas e pontos de venda',
    resumo: 'Adesivos e envelopamento de stands e expositores para lançar campanhas dentro da loja.',
    itens: ['Stands de campanha', 'Painéis e expositores', 'Adesivos de vitrine'],
    foto: '/img/trabalhos/adidas-2.webp',
    legenda: 'Adidas · stand de campanha',
  },
  {
    id: 'impressoes',
    nome: 'Impressões',
    resumo: 'Seu material representa sua marca. Por isso aplicamos técnica, controle e qualidade em cada etapa da impressão.',
    itens: ['Impressão digital', 'Materiais gráficos', 'Envie seu arquivo'],
    foto: '/img/trabalhos/taru-3.webp',
    legenda: 'Tarú Veículos · impressão em lona',
  },
] as const;

// Lista curta para a faixa em degradê
export const servicosCurtos = ['Fachadas', 'Letreiros em ACM', 'Totens', 'Adesivos', 'Envelopamento', 'Impressões', 'Sinalização'];

// Como funciona. A CONFIRMAR com o cliente: criação da arte e instalação
export const passos = [
  { titulo: 'Conte o que precisa', texto: 'Mande pelo WhatsApp a sua ideia, uma foto do local ou o arquivo pronto. Envie seu material aqui!' },
  { titulo: 'Arte e orçamento', texto: 'Ajustamos ou criamos a arte e enviamos o orçamento para você aprovar antes de produzir.' },
  { titulo: 'Produção', texto: 'Técnica, controle e qualidade em cada etapa da impressão, do conceito à peça final.' },
  { titulo: 'Instalação', texto: 'Fachadas, totens, adesivos e envelopamentos instalados no local, prontos para aparecer.' },
];
