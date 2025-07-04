import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/moviebly/', // MUST match your repo name
  plugins: [
    react(),
    tailwindcss(),
  ],
});
