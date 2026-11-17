export const brands = [
  {
    id: "atilio",
    name: "ATILIO",
    category: "Joias e acessórios",
    filter: "Joias",
    description:
      "Formas expressivas, detalhes singulares. Joias e acessórios que acompanham o seu jeito de estar no mundo.",
    url: "https://www.atiliostore.com.br/",
  },
  {
    id: "soullucy",
    name: "SOULLUCY",
    category: "Moda feminina e linho",
    filter: "Moda",
    description:
      "A leveza do linho em uma moda feminina que encontra beleza na naturalidade e no movimento.",
    url: "https://www.soullucy.com/ver-tudo",
  },
  {
    id: "loom",
    name: "LOOM KNITWEAR",
    category: "Tricô e slow fashion",
    filter: "Tricô",
    description: "Texturas para sentir. Tricô e slow fashion em peças que atravessam estações.",
    url: "https://www.loomknitwear.store/shop",
  },
  {
    id: "matulao",
    name: "ESTÚDIO MATULÃO",
    category: "Bolsas artesanais",
    filter: "Bolsas",
    description:
      "O fazer artesanal como linguagem. Bolsas que colocam a matéria-prima e o trabalho manual em primeiro plano.",
    url: "https://estudiomatulao.com.br/bolsas/",
  },
];
export type Product = { id: number; name: string; brand: string; category: string; price: number };
export const products: Product[] = [
  { id: 1, name: "Anel Vega", brand: "atilio", category: "Joias", price: 135 },
  { id: 2, name: "Bracelete Disco", brand: "atilio", category: "Joias", price: 145 },
  { id: 3, name: "Brinco Peplum", brand: "atilio", category: "Joias", price: 170 },
  { id: 4, name: "Top Amélie", brand: "soullucy", category: "Moda", price: 489 },
  { id: 5, name: "Saia Lise", brand: "soullucy", category: "Moda", price: 569 },
  { id: 6, name: "Blazer Celine", brand: "soullucy", category: "Moda", price: 899 },
  { id: 7, name: "Cardigan Mohair", brand: "loom", category: "Tricô", price: 550 },
  { id: 8, name: "Pull Atemporal", brand: "loom", category: "Tricô", price: 790 },
  { id: 9, name: "Bolsa Olívia Carnaúba", brand: "matulao", category: "Bolsas", price: 492 },
  { id: 10, name: "Bolsa Lina Preta", brand: "matulao", category: "Bolsas", price: 699 },
];
export function filterProducts(category: string, brand: string, query: string) {
  const normalize = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  return products.filter(
    (p) =>
      (category === "Todos" || p.category === category) &&
      (brand === "todas" || p.brand === brand) &&
      normalize(p.name + " " + brands.find((b) => b.id === p.brand)?.name).includes(
        normalize(query),
      ),
  );
}
export const money = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
export const business = {
  address: "Rua Fradique Coutinho, 69",
  neighborhood: "Pinheiros, São Paulo · CEP 05416-010",
  weekday: "11h às 19h",
  saturday: "10h às 18h",
  sunday: "Fechado",
  whatsapp: "https://wa.me/5511971852005",
  instagram: "https://www.instagram.com/casa_ocreautoral/",
  maps: "https://www.google.com/maps/search/?api=1&query=Rua+Fradique+Coutinho+69+Pinheiros+Sao+Paulo",
};
export type Inquiry = {
  name: string;
  brand: string;
  segment: string;
  instagram: string;
  whatsapp: string;
  presentation: string;
};
export function createInquiry(d: Inquiry) {
  return `Olá, Casa Ocre! Gostaria de apresentar minha marca à curadoria.\n\nNome: ${d.name}\nMarca: ${d.brand}\nSegmento: ${d.segment}\nInstagram: ${d.instagram}\nWhatsApp: ${d.whatsapp}\n\nApresentação da marca:\n${d.presentation}\n\nGostaria de conhecer as possibilidades de participação. Obrigado(a)!`;
}
export const pageHead = (title: string, description: string) => ({
  meta: [
    { title: `${title} | Casa Ocre Autoral` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} | Casa Ocre Autoral` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "robots", content: "noindex, nofollow" },
  ],
});
