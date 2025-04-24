import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import AstroPWA from "@vite-pwa/astro";
// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},

	integrations: [
		react(),
		AstroPWA({
			injectRegister: "auto",
			registerType: "autoUpdate",
			workbox: {
				globDirectory: "dist",
				globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
			},
			includeAssets: ["favicon.ico", "apple-touch-icon.png"],
			manifest: {
				name: "Media Player",
				short_name: "Media Player",
				description: "Reproductor de Audio",
				theme_color: "#0f172a",
				start_url: "/",
				background_color: "#0f172a",
				display_override: ["window-controls-overlay", "standalone"],
				id: "/",
				display: "standalone",
				icons: [
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
				],
			},
		}),
	],
});
