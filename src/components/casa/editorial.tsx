import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Clock,
  Instagram,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import house from "@/assets/casa-editorial.jpg";
import fashion from "@/assets/moda-editorial.jpg";
import objects from "@/assets/objetos-editorial.jpg";
import { business } from "@/lib/catalog";
export { house, fashion, objects };
export function PageIntro({
  number,
  title,
  italic,
  description,
}: {
  number: string;
  title: string;
  italic?: string;
  description: string;
}) {
  return (
    <div className="page-intro wrap">
      <span className="eyebrow">CASA OCRE AUTORAL / {number}</span>
      <h1>
        {title} {italic && <em>{italic}</em>}
      </h1>
      <p>{description}</p>
    </div>
  );
}
export function HouseStory() {
  return (
    <section className="house-story wrap">
      <div className="story-photo">
        <img
          src={fashion}
          alt="Editorial ilustrativo de moda em linho e bolsa artesanal"
          width={1024}
          height={1536}
          loading="lazy"
        />
        <span className="image-caption">MATÉRIA, FORMA & IDENTIDADE · IMAGEM ILUSTRATIVA</span>
        <span className="photo-index">01 — ESSÊNCIA</span>
      </div>
      <div className="story-copy">
        <span className="eyebrow">MAIS QUE UMA LOJA. UM ENCONTRO.</span>
        <h2>
          Uma casa de
          <br />
          muitas <em>histórias.</em>
        </h2>
        <p>
          Acreditamos no que tem origem. No desenho que nasce de um olhar próprio. Na beleza de uma
          peça feita com tempo, intenção e identidade.
        </p>
        <p>
          A Casa Ocre reúne marcas independentes em um espaço de descoberta e conexão. Moda, arte e
          design autoral, sob a curadoria de Adriana Gama, no coração de Pinheiros.
        </p>
        <Button asChild variant="navigation">
          <Link to="/nossa-casa">
            Entre. A casa é sua. <ArrowUpRight />
          </Link>
        </Button>
        <div className="story-signature">Feito por mãos. Escolhido com alma.</div>
      </div>
    </section>
  );
}
export function ExhibitorBanner() {
  return (
    <section className="exhibitor-band">
      <div className="wrap exhibitor-inner">
        <div>
          <span className="eyebrow">UM ESPAÇO PARA QUEM CRIA</span>
          <h2>
            Sua marca merece
            <br />
            fazer parte dessa <em>história.</em>
          </h2>
        </div>
        <div>
          <p>
            Autoral na essência. Brasileira no encontro.
            <br />
            Apresente sua marca à curadoria da Casa Ocre.
          </p>
          <Button variant="hero" asChild>
            <Link to="/expositores">
              Seja um expositor <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
export function VisitInfo() {
  return (
    <div className="visit-info">
      <div>
        <MapPin />
        <span className="eyebrow">NO CORAÇÃO DE PINHEIROS</span>
        <h3>{business.address}</h3>
        <p>{business.neighborhood}</p>
        <Button asChild variant="navigation">
          <a href={business.maps} target="_blank" rel="noopener noreferrer">
            Traçar meu caminho <ArrowUpRight />
          </a>
        </Button>
      </div>
      <div>
        <Clock />
        <span className="eyebrow">PORTAS ABERTAS</span>
        <dl>
          <div>
            <dt>Segunda a sexta</dt>
            <dd>{business.weekday}</dd>
          </div>
          <div>
            <dt>Sábado</dt>
            <dd>{business.saturday}</dd>
          </div>
          <div>
            <dt>Domingo</dt>
            <dd>{business.sunday}</dd>
          </div>
        </dl>
        <small>
          Horários conforme cadastro comercial. Estacionamento divulgado pela loja; condições a
          confirmar.
        </small>
      </div>
      <div>
        <MessageCircle />
        <span className="eyebrow">CONVERSAS QUE APROXIMAM</span>
        <h3>Vamos nos conhecer?</h3>
        <Button asChild variant="navigation">
          <a href={business.whatsapp} target="_blank" rel="noopener noreferrer">
            Conversar no WhatsApp <ArrowUpRight />
          </a>
        </Button>
        <Button asChild variant="navigation">
          <a href={business.instagram} target="_blank" rel="noopener noreferrer">
            <Instagram /> @casa_ocreautoral <ArrowUpRight />
          </a>
        </Button>
      </div>
    </div>
  );
}
const gallery = [
  {
    src: house,
    label: "O encontro",
    description: "Um olhar ilustrativo para o espaço da Casa Ocre.",
  },
  {
    src: objects,
    label: "A matéria",
    description: "Objetos autorais em uma composição editorial ilustrativa.",
  },
  {
    src: fashion,
    label: "O movimento",
    description: "Moda em uma fotografia editorial ilustrativa.",
  },
];
export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const active = index === null ? undefined : gallery[index];
  return (
    <>
      <div className="gallery-grid">
        {gallery.map((g, i) => (
          <Button
            variant="navigation"
            className="gallery-item"
            key={g.label}
            onClick={() => setIndex(i)}
            aria-label={`Ampliar ${g.label}`}
          >
            <img
              src={g.src}
              alt={g.description}
              loading="lazy"
              width={i === 2 ? 1024 : 1536}
              height={i === 2 ? 1536 : 1024}
            />
            <span>
              {String(i + 1).padStart(2, "0")} / {g.label}
              <ArrowUpRight />
            </span>
          </Button>
        ))}
      </div>
      <p className="gallery-note">
        Galeria ilustrativa criada para este protótipo. Não representa fotografias oficiais do
        estabelecimento ou dos produtos.
      </p>
      <Dialog
        open={index !== null}
        onOpenChange={(open) => {
          if (!open) setIndex(null);
        }}
      >
        <DialogContent className="gallery-dialog">
          <DialogTitle>{active?.label}</DialogTitle>
          <DialogDescription>{active?.description}</DialogDescription>
          {active && <img src={active.src} alt={active.description} />}
          <div className="gallery-controls">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Imagem anterior"
              onClick={() => setIndex((i) => ((i ?? 0) + 2) % 3)}
            >
              <ChevronLeft />
            </Button>
            <span>{(index ?? 0) + 1} / 3 · Imagem ilustrativa</span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Próxima imagem"
              onClick={() => setIndex((i) => ((i ?? 0) + 1) % 3)}
            >
              <ChevronRight />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
