import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, Gallery, VisitInfo, ExhibitorBanner } from "@/components/casa/editorial";
import { pageHead } from "@/lib/catalog";
export const Route = createFileRoute("/nossa-casa")({
  head: () =>
    pageHead(
      "Nossa Casa",
      "Conheça o propósito da Casa Ocre, sua curadoria autoral e o espaço de encontros em Pinheiros.",
    ),
  component: OurHouse,
});
function OurHouse() {
  return (
    <>
      <PageIntro
        number="01 — NOSSA CASA"
        title="Uma casa. Muitas"
        italic="possibilidades."
        description="Um espaço de encontro entre quem cria com identidade e quem escolhe com intenção."
      />
      <section className="wrap inner-section">
        <Gallery />
        <div className="house-manifesto">
          <h2>
            O feito à mão.
            <br />O olhar independente.
            <br />
            <em>O nosso Brasil.</em>
          </h2>
          <div>
            <p>
              A Casa Ocre é uma loja colaborativa que celebra a autenticidade e a qualidade. Aqui,
              criadores independentes compartilham um endereço — e a vontade de ressignificar o
              feito à mão.
            </p>
            <p>
              A curadoria de Adriana Gama aproxima marcas de diferentes regiões do Brasil, reunindo
              moda, acessórios, joias, bem-estar, decoração, botânica e papelaria.
            </p>
            <p>
              Um ambiente autoral, harmonioso e criativo. E, conforme a apresentação institucional,
              pet friendly: um convite para entrar e ficar à vontade.
            </p>
          </div>
        </div>
        <VisitInfo />
      </section>
      <ExhibitorBanner />
    </>
  );
}
