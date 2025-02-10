import glsl from 'vite-plugin-glsl';
import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from "rollup-plugin-visualizer";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), glsl(), visualizer() as PluginOption, tailwindcss(),],
    base: '/home/',
});
