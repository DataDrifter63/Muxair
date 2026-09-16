import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
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
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
    // "node-server" builds a plain, self-starting Node HTTP server to
    // .output/server/index.mjs (matches `npm start`) — works on hPanel, a
    // VPS, or any host that can run `node`, unlike the old Netlify-only
    // Functions build.
    nitro({ preset: "node-server" }),
    viteReact(),
  ],
});
