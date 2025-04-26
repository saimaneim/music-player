import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// vite.config.js
export default defineConfig({
	plugins: [
		tailwindcss(),
		react(),
		VitePWA({
			registerType: "autoUpdate",
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
			},
			includeAssets: ["favicon.ico", "apple-touch-icon.png"],
			manifest: {
				orientation: "portrait",
				scope: "/",
				name: "Music Player",
				short_name: "Music Player",
				description: "Reproductor de Audio",
				theme_color: "#09081e",
				start_url: "/",
				id: "",
				background_color: "#09081e",
				display: "standalone",
				icons: [
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "maskable",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
});
