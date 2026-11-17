import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PageIntro, objects } from "@/components/casa/editorial";
import { useFavorites } from "@/components/casa/store";
import { products, brands, filterProducts, money, pageHead, type Product } from "@/lib/catalog";
export const Route = createFileRoute("/colecoes")({
  head: () =>
    pageHead(
      "Coleções e referências",
      "Explore referências de joias, moda, tricô e bolsas autorais com pesquisa, filtros e seleção de favoritos.",
    ),
  component: Collections,
});
function Collections() {
  const [category, setCategory] = useState("Todos");
  const [brand, setBrand] = useState("todas");
  const [query, setQuery] = useState("");
  const [onlySaved, setOnlySaved] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const { favorites, toggle } = useFavorites();
  const results = filterProducts(category, brand, query).filter(
    (p) => !onlySaved || favorites.includes(p.id),
  );
  const selectedBrand = brands.find((b) => b.id === selected?.brand);
  return (
    <>
      <PageIntro
        number="03 — SELEÇÃO AUTORAL"
        title="Peças com"
        italic="personalidade."
        description="Uma seleção de referências para descobrir novos criadores. Escolha o que conversa com você."
      />
      <section className="wrap inner-section">
        <img
          src={objects}
          className="catalog-art"
          alt="Editorial ilustrativo de materiais e objetos artesanais, sem correspondência com produtos do catálogo"
          width={1536}
          height={1024}
        />
        <p className="gallery-note">
          Composição ilustrativa, não são fotos dos produtos abaixo. Preços de referência dos
          catálogos externos; disponibilidade na Casa Ocre não confirmada.
        </p>
        <div className="catalog-toolbar">
          <label className="search-box">
            <Search />
            <input
              aria-label="Pesquisar produtos"
              placeholder="Encontre uma peça, uma marca…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <Select value={brand} onValueChange={setBrand}>
            <SelectTrigger aria-label="Filtrar por marca">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as marcas</SelectItem>
              {brands.map((b) => (
                <SelectItem key={b.id} value={b.id}>
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="filter"
            aria-pressed={onlySaved}
            onClick={() => setOnlySaved(!onlySaved)}
          >
            <Heart />
            Favoritos ({favorites.length})
          </Button>
        </div>
        <div className="filters" aria-label="Filtrar produtos por categoria">
          {["Todos", "Joias", "Moda", "Tricô", "Bolsas"].map((c) => (
            <Button
              variant="filter"
              key={c}
              aria-pressed={c === category}
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>
        <div className="results-line" aria-live="polite">
          <span>{results.length} REFERÊNCIAS ENCONTRADAS</span>
          <span>SELEÇÃO DOS CATÁLOGOS INDEPENDENTES</span>
        </div>
        <div className="product-grid">
          {results.map((p) => (
            <article className="product-card" key={p.id}>
              <div className="product-top">
                <span className="product-index">{String(p.id).padStart(2, "0")}</span>
                <Button
                  variant="navigation"
                  size="icon"
                  aria-label={`${favorites.includes(p.id) ? "Remover" : "Favoritar"} ${p.name}`}
                  title={
                    favorites.includes(p.id) ? "Remover dos favoritos" : "Guardar nos favoritos"
                  }
                  aria-pressed={favorites.includes(p.id)}
                  onClick={() => toggle(p.id)}
                >
                  <Heart className={favorites.includes(p.id) ? "heart-saved" : ""} />
                </Button>
              </div>
              <span className="eyebrow">
                {brands.find((b) => b.id === p.brand)?.name} / {p.category}
              </span>
              <h2>{p.name}</h2>
              <p className="product-price">
                {money(p.price)}
                <small>PREÇO EXTERNO DE REFERÊNCIA</small>
              </p>
              <Button variant="navigation" onClick={() => setSelected(p)}>
                Ver referência
                <ArrowUpRight />
              </Button>
            </article>
          ))}
        </div>
        {results.length === 0 && (
          <div className="empty-state">
            <h2>Nenhuma peça por aqui.</h2>
            <Button
              variant="navigation"
              onClick={() => {
                setCategory("Todos");
                setBrand("todas");
                setQuery("");
                setOnlySaved(false);
              }}
            >
              Limpar filtros
              <ArrowUpRight />
            </Button>
          </div>
        )}
        <p className="gallery-note">
          Valores fornecidos como referências externas, sujeitos a alterações. Este protótipo não
          vende produtos nem informa estoque confirmado.
        </p>
      </section>
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent>
          <span className="eyebrow">
            {selectedBrand?.name} / {selected?.category}
          </span>
          <DialogTitle>{selected?.name}</DialogTitle>
          <DialogDescription>
            Referência do catálogo independente de {selectedBrand?.name}.
          </DialogDescription>
          <p className="product-detail-price">{money(selected?.price ?? 0)}</p>
          <p className="product-disclaimer">
            Preço externo de referência. Valor atual, materiais, tamanhos e disponibilidade devem
            ser consultados diretamente no catálogo da marca. Não é uma confirmação de estoque ou
            venda pela Casa Ocre.
          </p>
          {selectedBrand && (
            <Button variant="editorial" asChild>
              <a href={selectedBrand.url} target="_blank" rel="noopener noreferrer">
                Visitar catálogo da marca
                <ArrowUpRight />
              </a>
            </Button>
          )}
          {selected && (
            <Button variant="navigation" onClick={() => toggle(selected.id)}>
              <Heart className={favorites.includes(selected.id) ? "heart-saved" : ""} />
              {favorites.includes(selected.id) ? "Remover dos favoritos" : "Guardar nos favoritos"}
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
