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
    // "node-server" (default) builds a plain, self-starting Node HTTP
    // server to .output/server/index.mjs — works on hPanel, a VPS, or any
    // host that can run `node`. Set NITRO_PRESET=netlify (e.g. in Netlify's
    // site environment variables) to build Netlify Functions instead, for
    // quick Netlify-hosted testing without changing this file back and
    // forth. Leave it unset for the normal hPanel/VPS build.
    nitro({ preset: (process.env["NITRO_PRESET"] as never) || "node-server" }),
    viteReact(),
  ],
});
