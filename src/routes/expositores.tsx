import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/casa/editorial";
import { createInquiry, pageHead, type Inquiry } from "@/lib/catalog";
export const Route = createFileRoute("/expositores")({
  head: () =>
    pageHead(
      "Seja um expositor",
      "Apresente sua marca independente à curadoria da Casa Ocre. Gere uma mensagem comercial para iniciar uma conversa.",
    ),
  component: Exhibitors,
});
function Exhibitors() {
  const [data, setData] = useState<Inquiry>({
    name: "",
    brand: "",
    segment: "",
    instagram: "",
    whatsapp: "",
    presentation: "",
  });
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  function submit(e: FormEvent) {
    e.preventDefault();
    setMessage(createInquiry(data));
    setCopied(false);
    setError("");
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setError("");
    } catch {
      setError("Não foi possível copiar automaticamente. Selecione e copie o texto da mensagem.");
    }
  }
  return (
    <>
      <PageIntro
        number="04 — FAÇA PARTE"
        title="Sua marca merece fazer parte dessa"
        italic="história."
        description="Procuramos olhares próprios. Marcas que valorizam a criação, a autenticidade e a beleza de fazer diferente."
      />
      <section className="wrap inquiry-layout">
        <aside className="inquiry-aside">
          <span className="eyebrow">CRIATIVIDADE ENCONTRA ESPAÇO</span>
          <h2>
            Seu próximo encontro
            <br />
            pode ser <em>aqui.</em>
          </h2>
          <p>
            A Casa Ocre conecta pequenos produtores e um público que valoriza o design autoral.
            Conte à curadoria quem você é e o que faz a sua marca ser única.
          </p>
          <div className="aside-detail">
            <span className="eyebrow">CURADORIA / ADRIANA GAMA</span>
            <p>
              Moda, acessórios, joias, bem-estar, decoração, botânica e papelaria. Diferentes
              expressões, um olhar em comum.
            </p>
            <p>Condições de participação devem ser conversadas diretamente com a Casa Ocre.</p>
          </div>
        </aside>
        <form className="inquiry-form" onSubmit={submit}>
          {(
            [
              {
                key: "name",
                label: "Seu nome",
                placeholder: "Como podemos chamar você?",
                required: true,
              },
              {
                key: "brand",
                label: "Nome da marca",
                placeholder: "Sua identidade autoral",
                required: true,
              },
              {
                key: "segment",
                label: "Segmento",
                placeholder: "Ex.: moda, joias, decoração",
                required: true,
              },
              { key: "instagram", label: "Instagram", placeholder: "@suamarca", required: false },
              {
                key: "whatsapp",
                label: "WhatsApp",
                placeholder: "(11) 99999-9999",
                required: true,
              },
            ] as const
          ).map((f) => (
            <label key={f.key} className={`form-field ${f.key === "whatsapp" ? "full-field" : ""}`}>
              {f.label}
              {f.required ? " *" : ""}
              <input
                value={data[f.key]}
                type={f.key === "whatsapp" ? "tel" : "text"}
                required={f.required}
                placeholder={f.placeholder}
                maxLength={200}
                onChange={(e) => {
                  setData({ ...data, [f.key]: e.target.value });
                  setMessage("");
                }}
              />
            </label>
          ))}
          <label className="form-field full-field">
            Apresentação da marca *
            <textarea
              required
              maxLength={4000}
              value={data.presentation}
              placeholder="Conte sua história, seu processo criativo e o que torna sua marca singular."
              onChange={(e) => {
                setData({ ...data, presentation: e.target.value });
                setMessage("");
              }}
            />
          </label>
          <p className="form-note full-field">
            Seus dados não são enviados nem armazenados. A mensagem é preparada apenas para você
            revisar e copiar.
          </p>
          <div className="full-field">
            <Button variant="editorial" type="submit">
              Preparar minha apresentação
              <ArrowUpRight />
            </Button>
          </div>
          {message && (
            <div className="generated-message full-field">
              <h3>Sua apresentação está pronta.</h3>
              <pre>{message}</pre>
              <div className="message-actions">
                <Button variant="editorial" type="button" onClick={copy}>
                  {copied ? <Check /> : <Copy />}
                  {copied ? "Mensagem copiada" : "Copiar mensagem"}
                </Button>
                <span role="status" className="copy-status">
                  {copied ? "Pronta para você compartilhar quando quiser." : error}
                </span>
              </div>
              <p className="form-note">Nenhum contato foi realizado com a empresa.</p>
            </div>
          )}
        </form>
      </section>
    </>
  );
}
