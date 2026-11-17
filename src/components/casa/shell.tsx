import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Heart, Menu, X, Instagram, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useFavorites } from "./store";
import { products, brands, money, business } from "@/lib/catalog";
const nav = [
  { to: "/", label: "Início" },
  { to: "/nossa-casa", label: "Nossa Casa" },
  { to: "/marcas", label: "Marcas" },
  { to: "/colecoes", label: "Coleções" },
  { to: "/expositores", label: "Seja um expositor" },
  { to: "/contato", label: "Contato" },
] as const;
export function Logo() {
  return (
    <Link to="/" className="wordmark" aria-label="Casa Ocre Autoral — início">
      <span>
        casa ocre<span className="logo-dot">.</span>
      </span>
      <small>A U T O R A L</small>
    </Link>
  );
}
export function Header() {
  const [menu, setMenu] = useState(false);
  const [saved, setSaved] = useState(false);
  const { favorites, toggle } = useFavorites();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);
  return (
    <>
      <div className="prototype-bar">
        UM OLHAR SOBRE O DESIGN BRASILEIRO <span>PROTÓTIPO PRIVADO · NÃO OFICIAL</span>
      </div>
      <header className="site-header">
        <Logo />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "is-active" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="header-tools">
          <Button
            variant="navigation"
            size="icon"
            onClick={() => setSaved(true)}
            aria-label={`Favoritos (${favorites.length})`}
            title="Favoritos"
          >
            <Heart />
            {favorites.length > 0 && <span className="favorite-count">{favorites.length}</span>}
          </Button>
          <Button asChild variant="navigation" className="header-instagram">
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Casa Ocre"
            >
              <Instagram />
            </a>
          </Button>
          <Button
            variant="navigation"
            size="icon"
            className="mobile-menu-button"
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </Button>
        </div>
      </header>
      {menu && (
        <nav className="mobile-nav" aria-label="Navegação mobile">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setMenu(false)}>
              {n.label}
              <ArrowUpRight />
            </Link>
          ))}
        </nav>
      )}
      <Dialog open={saved} onOpenChange={setSaved}>
        <DialogContent>
          <DialogTitle>Seu olhar, sua seleção.</DialogTitle>
          <DialogDescription>Referências que você guardou nesta visita.</DialogDescription>
          {favorites.length === 0 ? (
            <p className="empty-favorites">Sua seleção ainda está em branco.</p>
          ) : (
            products
              .filter((p) => favorites.includes(p.id))
              .map((p) => (
                <div className="saved-row" key={p.id}>
                  <div>
                    <small>{brands.find((b) => b.id === p.brand)?.name}</small>
                    <h3>{p.name}</h3>
                    <p>{money(p.price)} · referência externa</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Remover favorito"
                    aria-label={`Remover ${p.name}`}
                    onClick={() => toggle(p.id)}
                  >
                    <X />
                  </Button>
                </div>
              ))
          )}
          <Button asChild variant="editorial" onClick={() => setSaved(false)}>
            <Link to="/colecoes">
              Explorar coleções
              <ArrowRight />
            </Link>
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <Logo />
          <p>
            Moda, arte e encontros.
            <br />
            Com alma brasileira.
          </p>
        </div>
        <div>
          <span className="eyebrow">ENCONTRE A CASA</span>
          <p>
            {business.address}
            <br />
            Pinheiros · São Paulo
          </p>
          <a href={business.maps} target="_blank" rel="noopener noreferrer">
            Como chegar <ArrowUpRight size={14} />
          </a>
        </div>
        <div>
          <span className="eyebrow">VAMOS CONVERSAR</span>
          <a href={business.whatsapp} target="_blank" rel="noopener noreferrer">
            (11) 97185-2005 <ArrowUpRight size={14} />
          </a>
          <a href={business.instagram} target="_blank" rel="noopener noreferrer">
            @casa_ocreautoral <ArrowUpRight size={14} />
          </a>
        </div>
        <div>
          <span className="eyebrow">PARA QUEM CRIA</span>
          <Link to="/expositores">
            Sua marca na Casa Ocre
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Casa Ocre Autoral · Design brasileiro, feito de histórias.</span>
        <span>Protótipo privado, não oficial. Fotografias editoriais ilustrativas.</span>
      </div>
    </footer>
  );
}
