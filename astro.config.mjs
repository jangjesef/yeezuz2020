import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'server',
  site: 'https://yeezuz2020.vercel.app/',
  base: '/',
});