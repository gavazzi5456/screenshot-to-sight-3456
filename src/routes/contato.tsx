import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, VisitInfo, Gallery } from "@/components/casa/editorial";
import { pageHead } from "@/lib/catalog";
export const Route = createFileRoute("/contato")({
  head: () =>
    pageHead(
      "Contato e visita",
      "Encontre a Casa Ocre na Rua Fradique Coutinho, 69, em Pinheiros. Veja horários, WhatsApp, Instagram e como chegar.",
    ),
  component: Contact,
});
function Contact() {
  return (
    <>
      <PageIntro
        number="05 — VAMOS NOS ENCONTRAR"
        title="A casa está de portas"
        italic="abertas."
        description="Um endereço para descobrir, experimentar e se conectar com o design brasileiro. Nos vemos em Pinheiros."
      />
      <section className="wrap inner-section">
        <VisitInfo />
        <h2 className="contact-heading">
          Entre. Descubra. <em>Fique à vontade.</em>
        </h2>
        <p className="gallery-note">Um olhar ilustrativo sobre a experiência que nos inspira.</p>
        <div className="mt-8">
          <Gallery />
        </div>
      </section>
    </>
  );
}
