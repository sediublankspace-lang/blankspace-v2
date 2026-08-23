import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://blankspace.ro',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
});