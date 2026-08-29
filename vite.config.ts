import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig(({ command }) => ({
  server: {
  port: 8080,
  allowedHosts: true,
},
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      // src/server.ts wraps the generated server entry with our own
      // error handling, so point TanStack Start at it explicitly.
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
    // Universal Node.js server build — works on any host that can run
    // Node (VPS, Render, Railway, cPanel with Node, etc). Not tied to
    // any single platform. Swap the preset later if you pick a specific
    // host (e.g. "vercel", "netlify", "cloudflare-module").
    ...(command === "build" ? [nitro({ preset: "node-server" })] : []),
    viteReact(),
  ],
}));
