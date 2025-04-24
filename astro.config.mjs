import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import VitePWA from "@vite-pwa/astro";
// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},

	integrations: [
		react(),
		VitePWA({
			injectRegister: "auto",
			registerType: "autoUpdate",
			includeAssets: ["favicon.ico", "apple-touch-icon.png"],
			manifest: {
				name: "Media Player",
				short_name: "App",
				description: "Mi aplicación en Astro con PWA",
				theme_color: "#0f172a",
				start_url: "/",
				background_color: "#ffffff",
				display_override: ["window-controls-overlay", "standalone"],
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
