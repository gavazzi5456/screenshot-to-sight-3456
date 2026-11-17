# GitHub Pages Implementation Plan

**Goal:** Publicar Casa Ocre Autoral em gavazzi5456/screenshot-to-sight-3456 sem alterar design ou funcionalidades.
**Architecture:** Build Vite em modo pages, TanStack Start com prerender de todas as rotas e Nitro desativado apenas nesse modo. Publicar dist/client via Actions.
**Constraints:** Preservar aviso não oficial, imagens, estilos, rotas independentes e histórico Lovable. Não expor segredos. Execução autônoma solicitada pelo usuário.

- [x] Configurar base /screenshot-to-sight-3456/, basepath do router e recursos públicos.
- [x] Prerenderizar todas as páginas; manter noindex e bloquear rastreamento.
- [x] Auditar dependências e credenciais sem imprimir segredos.
- [x] Criar workflow com npm ci, testes, typecheck, build e deploy automático.
- [ ] Validar HTML, recursos e rotas diretas; commit e push; acompanhar deploy.

**Review focus:** refresh em subrotas, imagens/CSS no subdiretório, noindex no HTML inicial, aviso intacto, ausência de arquivos secretos no artefato.