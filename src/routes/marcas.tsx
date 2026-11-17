import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro, ExhibitorBanner } from "@/components/casa/editorial";
import { brands, pageHead } from "@/lib/catalog";
export const Route = createFileRoute("/marcas")({
  head: () =>
    pageHead(
      "Marcas independentes",
      "Descubra Atilio, Soullucy, Loom Knitwear e Estúdio Matulão, referências de moda e design independente.",
    ),
  component: Brands,
});
function Brands() {
  const [category, setCategory] = useState("Todas");
  return (
    <>
      <PageIntro
        number="02 — QUEM CRIA"
        title="Identidade que se"
        italic="reconhece."
        description="Olhares singulares, processos próprios e histórias que merecem ser descobertas. Conheça nossas marcas de referência."
      />
      <section className="wrap inner-section">
        <div className="filters" aria-label="Filtrar marcas">
          {["Todas", "Joias", "Moda", "Tricô", "Bolsas"].map((c) => (
            <Button
              key={c}
              variant="filter"
              aria-pressed={c === category}
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>
        <div className="brand-grid">
          {brands
            .filter((b) => category === "Todas" || b.filter === category)
            .map((b) => (
              <article className="brand-card" key={b.id}>
                <div className="brand-card-top">
                  <span>DESIGN INDEPENDENTE / {b.filter.toUpperCase()}</span>
                  <h2>{b.name}</h2>
                </div>
                <h3>{b.category}</h3>
                <p>{b.description}</p>
                <Button asChild variant="navigation">
                  <a href={b.url} target="_blank" rel="noopener noreferrer">
                    Conhecer o catálogo da marca
                    <ArrowUpRight />
                  </a>
                </Button>
              </article>
            ))}
        </div>
        <p className="gallery-note">
          As marcas são referências dos catálogos independentes. A relação comercial atual com a
          Casa Ocre deverá ser validada antes de qualquer publicação oficial.
        </p>
      </section>
      <ExhibitorBanner />
    </>
  );
}
