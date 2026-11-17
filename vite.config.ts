// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// Never set ssr.external or resolve.external: the Worker has no runtime module resolution, so
// the build fails. Never add compression (compressPublicAssets, vite-plugin-compression):
// hosting already compresses at the edge.
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { ConfigEnv } from "vite";

export default (env: ConfigEnv) => {
  const isPages = env.mode === "pages";
  const base = isPages ? "/screenshot-to-sight-3456/" : "/";

  return defineConfig({
    vite: { base },
    ...(isPages ? { nitro: false as const, envDefine: false } : {}),
    tanstackStart: {
      ...(isPages
        ? {
            router: { basepath: base },
            prerender: {
              enabled: true,
              failOnError: true,
              autoSubfolderIndex: true,
              crawlLinks: false,
            },
            sitemap: { enabled: false },
          }
        : {}),
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
      // nitro/vite builds from this
      server: { entry: "server" },
    },
  })(env);
};
