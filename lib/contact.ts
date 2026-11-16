import { siteConfig } from '@/site.config';

export const whatsapp = (mensagem = 'Olá! Vim pelo site da NOVVA e quero fazer um orçamento.') =>
  `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(mensagem)}`;

export const telefone = siteConfig.whatsapp.replace(/^55(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
