import { registerSW } from "virtual:pwa-register";
if ("serviceWorker" in navigator) {
	registerSW({
		immediate: true,
		onRegisteredSW() {
			console.log("SW registrado");
		},
		onOfflineReady() {
			console.log("Offline listo");
		},
	});
}
