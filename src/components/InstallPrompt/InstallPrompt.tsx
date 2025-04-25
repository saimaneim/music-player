import { useEffect, useState } from "react";

export default function InstallPrompt() {
	const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
	const [showButton, setShowButton] = useState(false);
	const [status, setStatus] = useState<"Installed" | "Not Installed">(
		"Not Installed",
	);

	useEffect(() => {
		const isInstaled = async () => {
			const relatedApps = await navigator.getInstalledRelatedApps();
			console.log(relatedApps);
		};
		isInstaled();

		window.addEventListener("beforeinstallprompt", (event: Event) => {
			setInstallPrompt(event);
			setShowButton(true);
		});
		window.addEventListener("appinstalled", () => {
			setStatus("Installed");
		});
	}, []);

	const handleInstallClick = async () => {
		if (!installPrompt) return;
		await installPrompt.prompt();
		setInstallPrompt(null);
		setShowButton(false);
	};

	return (
		<button
			disabled={showButton}
			type="button"
			onClick={handleInstallClick}
			className="py-2.5 px-4 bg-primary text-white rounded disabled:bg-primary/40"
		>
			Install App
		</button>
	);
}
