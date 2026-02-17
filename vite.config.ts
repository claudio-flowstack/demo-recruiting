import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'demo-pages-middleware',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          // Rewrite /demo-landing, /demo-formular, etc. to their index.html
          const demoRoutes = ['/demo-landing', '/demo-landing-v2', '/demo-formular', '/demo-danke'];
          const match = demoRoutes.find(r => req.url === r || req.url === r + '/');
          if (match) {
            req.url = match + '/index.html';
          }
          next();
        });
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
