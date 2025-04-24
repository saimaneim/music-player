import { useEffect, useState } from "react";

export default function InstallPrompt() {
	const [deferredPrompt, setDeferredPrompt] = useState(null);
	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		window.addEventListener("beforeinstallprompt", (e) => {
			e.preventDefault();
			setDeferredPrompt(e);
			setShowButton(true);
		});
	}, []);

	const handleInstallClick = async () => {
		if (!deferredPrompt) return;
		deferredPrompt.prompt();
		const result = await deferredPrompt.userChoice;
		console.log("User choice:", result.outcome);
		setDeferredPrompt(null);
		setShowButton(false);
	};

	return showButton ? (
		<button
			type="button"
			onClick={handleInstallClick}
			className="p-2 bg-blue-600 text-white rounded"
		>
			Instalar App
		</button>
	) : null;
}
