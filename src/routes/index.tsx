import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  house,
  fashion,
  objects,
  HouseStory,
  ExhibitorBanner,
  VisitInfo,
} from "@/components/casa/editorial";
import { brands, pageHead } from "@/lib/catalog";
export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "O design brasileiro tem endereço",
      "Um encontro entre moda, arte, criatividade e marcas independentes no coração de Pinheiros. Conheça a Casa Ocre Autoral.",
    ),
  component: Home,
});
function Home() {
  return (
    <>
      <section className="hero">
        <img
          className="hero-photo"
          src={house}
          alt="Interpretação editorial ilustrativa de uma loja de design brasileiro, com roupas, cerâmica e arquitetura em terracota"
          width={1536}
          height={1024}
          fetchPriority="high"
        />
        <div className="hero-content wrap">
          <span className="eyebrow">MODA · ARTE · DESIGN AUTORAL</span>
          <h1>
            O design brasileiro
            <br />
            tem <em>endereço.</em>
          </h1>
          <p>
            Um encontro entre moda, arte, criatividade e marcas independentes no coração de
            Pinheiros.
          </p>
          <div className="hero-actions">
            <Button asChild variant="editorial">
              <Link to="/marcas">
                Explore nossas marcas <ArrowUpRight />
              </Link>
            </Button>
            <Button asChild variant="navigation">
              <Link to="/nossa-casa">
                Conheça nossa casa <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
        <span className="vertical-caption">CURADORIA COM ALMA BRASILEIRA</span>
        <div className="hero-bottom">
          <span>
            <MapPin size={13} /> PINHEIROS, SÃO PAULO
          </span>
          <a href="#essencia" aria-label="Descobrir a essência da Casa Ocre">
            <ArrowDown size={18} />
          </a>
          <span className="image-credit">FOTOGRAFIA EDITORIAL ILUSTRATIVA</span>
        </div>
      </section>
      <div className="ticker">
        <span>DESIGN INDEPENDENTE</span>
        <span>✳</span>
        <span>FEITO COM INTENÇÃO</span>
        <span>✳</span>
        <span>CURADORIA AUTORAL</span>
        <span>✳</span>
        <span>ENCONTROS QUE INSPIRAM</span>
      </div>
      <div id="essencia">
        <HouseStory />
      </div>
      <section className="home-selection wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">OLHARES QUE SE ENCONTRAM</span>
            <h2>
              O extraordinário está no <em>autoral.</em>
            </h2>
          </div>
          <Button asChild variant="navigation">
            <Link to="/colecoes">
              Explore as coleções
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
        <div className="editorial-grid">
          <Link to="/colecoes" className="editorial-tile">
            <img
              src={objects}
              width={1536}
              height={1024}
              loading="lazy"
              alt="Composição ilustrativa de joias, bolsa artesanal e texturas naturais"
            />
            <div className="tile-caption">
              <div>
                <small>MATÉRIAS QUE CONTAM HISTÓRIAS</small>
                <h3>Beleza em cada detalhe.</h3>
              </div>
              <ArrowUpRight />
            </div>
          </Link>
          <Link to="/marcas" className="editorial-tile">
            <img
              src={fashion}
              width={1024}
              height={1536}
              loading="lazy"
              alt="Moda autoral em uma fotografia editorial ilustrativa"
            />
            <div className="tile-caption">
              <div>
                <small>UM JEITO PRÓPRIO DE VESTIR</small>
                <h3>Naturalmente singular.</h3>
              </div>
              <ArrowUpRight />
            </div>
          </Link>
        </div>
        <p className="gallery-note">
          Imagens editoriais ilustrativas. Não correspondem aos produtos dos catálogos.
        </p>
        <div className="brand-line">
          {brands.map((b) => (
            <Link key={b.id} to="/marcas">
              {b.name}
            </Link>
          ))}
        </div>
        <p className="gallery-note">
          Marcas de referência. Vínculos comerciais sujeitos à validação.
        </p>
      </section>
      <ExhibitorBanner />
      <section className="visit-section wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">DO DIGITAL AO ENCONTRO</span>
            <h2>
              Nos vemos em <em>Pinheiros.</em>
            </h2>
          </div>
          <Button asChild variant="navigation">
            <Link to="/contato">
              Encontre a casa
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
        <VisitInfo />
      </section>
    </>
  );
}
