# Análise de segurança — 2026-11-17

## Credenciais

Varredura de arquivos versionados e de todos os três commits existentes: nenhum padrão detectado de chave privada, token GitHub, chave AWS, chave de pagamento/OpenAI ou segredo atribuído literalmente. A verificação é heurística e não garante ausência de todo segredo. `.env` e `.env.*` foram adicionados ao `.gitignore`. Nenhuma credencial local foi escrita no projeto ou nos logs. O build Pages desativa a injeção extra de variáveis do wrapper Lovable; não definir segredos com prefixo VITE_, pois o Vite os trata como públicos.

## Dependências

`npm audit` inicial: 21 ocorrências altas, zero críticas. Vite atualizado de 8.1.5 para 8.3.8, removendo os avisos diretos de launch-editor, middleware e acesso a arquivos. Auditoria final: 22 ocorrências altas, zero críticas. O total inclui pacotes afetados por dependências transitivas, não 22 falhas independentes.

Causas restantes:

- **picomatch <=4.0.7**: ReDoS por padrões extglob repetidos, [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf). Propaga-se por tinyglobby, fdir, Vite, Vitest, TanStack e ferramentas de lint. A versão mais recente disponível no registro consultado foi 4.0.7, sem patch compatível disponível. Não aceitar padrões de build não confiáveis. Esse código de ferramentas não é executado pelo servidor GitHub Pages.
- **Zod 3.25.76**: consumo excessivo de memória na validação de coleções grandes, [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5). A correção sugerida exige migrar para Zod >=4.6.6. Não há importações de Zod no código `src`; ele permanece como dependência declarada. Não foi feita migração de versão principal neste ajuste de publicação.

Não foi usado `npm audit fix --force`: o próprio audit sugere também downgrades incompatíveis para TanStack/Vite/Vitest. O workflow registra o audit como aviso e permite publicar o protótipo estático com as limitações acima documentadas.

## Publicação

Somente `dist/client` é enviado. Nenhum runtime Nitro/SSR ou arquivo `.env` integra o artefato. O aviso de protótipo não oficial permanece intacto. `noindex, nofollow` é emitido no HTML inicial de todas as seis páginas; robots.txt bloqueia rastreamento cooperativo, sem oferecer controle de acesso.
