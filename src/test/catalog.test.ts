import { describe, expect, it } from "vitest";
import { products, filterProducts, business, createInquiry } from "@/lib/catalog";
describe("Catalog external reference prices", () => {
  const references = [
    ["Anel Vega", 135],
    ["Bracelete Disco", 145],
    ["Brinco Peplum", 170],
    ["Top Amélie", 489],
    ["Saia Lise", 569],
    ["Blazer Celine", 899],
    ["Cardigan Mohair", 550],
    ["Pull Atemporal", 790],
    ["Bolsa Olívia Carnaúba", 492],
    ["Bolsa Lina Preta", 699],
  ] as const;
  it.each(references)("%s uses the supplied external price", (name, price) => {
    expect(products.find((p) => p.name === name)?.price).toBe(price);
  });
});
describe("Catalog selection", () => {
  it("intersects category, brand and accent-insensitive search", () => {
    expect(filterProducts("Moda", "soullucy", "amelie").map((p) => p.name)).toEqual(["Top Amélie"]);
  });
  it("never ignores a conflicting brand filter", () => {
    expect(filterProducts("Moda", "atilio", "")).toEqual([]);
  });
});
describe("Business facts", () => {
  it("keeps weekday hours 11h–19h", () => expect(business.weekday).toBe("11h às 19h"));
  it("keeps Saturday hours 10h–18h", () => expect(business.saturday).toBe("10h às 18h"));
  it("keeps Sunday closed", () => expect(business.sunday).toBe("Fechado"));
  it("uses the supplied WhatsApp number", () =>
    expect(business.whatsapp).toBe("https://wa.me/5511971852005"));
  it("uses the supplied street address", () =>
    expect(business.address).toBe("Rua Fradique Coutinho, 69"));
});
describe("Exhibitor message", () => {
  it("includes each entered field", () => {
    const values = {
      name: "Ana",
      brand: "Ateliê Raiz",
      segment: "Cerâmica",
      instagram: "@atelieraiz",
      whatsapp: "11988887777",
      presentation: "Cerâmica feita à mão em São Paulo.",
    };
    const message = createInquiry(values);
    for (const value of Object.values(values)) expect(message).toContain(value);
  });
});
