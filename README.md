# Screenshot To Sight

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://screenshot-to-sight-3456.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5c7a9149-514a-4a12-b6bf-746f80e487f9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## GitHub Pages

Protótipo não oficial, sem alteração do design. Publicação automática em pushes para `main`:
https://gavazzi5456.github.io/screenshot-to-sight-3456/

```sh
npm ci
npm run test
npm run typecheck
npm run build:pages
npm run preview:pages
```

O modo `pages` gera as seis rotas em HTML estático em `dist/client`, com base `/screenshot-to-sight-3456/`. Apenas esse diretório é publicado; o bundle de servidor não é enviado. Imagens importadas são resolvidas pelo Vite. O build normal do Lovable permanece disponível via `npm run build`.

O workflow `.github/workflows/pages.yml` usa o `GITHUB_TOKEN` temporário e OIDC, sem PAT no repositório. GitHub Pages deve usar a origem **GitHub Actions** (já verificada na configuração remota).

Todas as páginas incluem `noindex, nofollow`. `robots.txt` contém `Disallow: /`; em sites de projeto o arquivo fica no subdiretório, e o controle de indexação efetivo é o meta robots de cada HTML. Essas diretivas dependem da cooperação dos buscadores e não tornam o site privado.

Consulte [a análise de segurança](docs/SECURITY-REVIEW.md) para as vulnerabilidades conhecidas. A auditoria no Actions informa os problemas sem impedir o deploy; testes, TypeScript e verificação do artefato são obrigatórios.
