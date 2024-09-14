import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import removeConsole from "vite-plugin-remove-console";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), mode === "production" && removeConsole()].filter(Boolean),
  server: {
    host: true,
    strictPort: true,
    port: 8080,
    proxy: {
      "/api/v1": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Bundle third-party libraries into a separate chunk
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Adjust the chunk size warning limit (in KB)
  }
}));
