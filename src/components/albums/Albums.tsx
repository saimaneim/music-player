// store
import { extractMetadataSong } from "@/lib/extractMetadataSong";
import usePlayerStore from "@/store/usePlayerStore";
// libs
import { get, set } from "idb-keyval";

const Albums = () => {
	const { setTrack } = usePlayerStore();

	async function getDir() {
		// @ts-ignore
		const dirHandle = await window.showDirectoryPicker({
			mode: "read",
			startIn: "music",
		});
		const permiso = await dirHandle.requestPermission({ mode: "read" });
		if (permiso === "granted") {
			await set("carpetaHandle", dirHandle);
		} else {
			console.log("Permiso no concedido.");
		}

		for await (const [name, handle] of dirHandle.entries()) {
			if (handle.kind === "file" && name.endsWith(".mp3")) {
				const file = await handle.getFile();
				const url = URL.createObjectURL(file);
				const audio = new Audio(url);
				audio.play();
				break;
			}
		}
	}
	async function obtenerCarpetaGuardada() {
		try {
			const handle = await get("carpetaHandle");
			if (!handle) {
				console.log("No se encontró ninguna carpeta almacenada.");
			} else {
				// @ts-ignore
				const permiso = await handle.queryPermission({ mode: "read" });
				if (permiso !== "granted") {
					alert("Permiso no concedido para la carpeta almacenada");
					console.log("Permiso no concedido para la carpeta almacenada.");
				} else {
					// @ts-ignore
					for await (const [name, handl] of handle.entries()) {
						if (handl.kind === "file" && name.endsWith(".mp3")) {
							const file = await handl.getFile();
							const result = await extractMetadataSong(file);
							setTrack(result);
							const url = URL.createObjectURL(file);
							const audio = new Audio(url);
							audio.play();
							break;
						}
					}
				}
			}
		} catch (error) {
			console.error("Error al obtener la carpeta almacenada:", error);
		}
	}

	return (
		<main className="flex gap-2">
			<button
				type="button"
				onClick={getDir}
				className="bg-blue-500 rounded p-4"
			>
				Obtener permisos
			</button>
			<button
				type="button"
				onClick={obtenerCarpetaGuardada}
				className="bg-blue-500 rounded p-4"
			>
				Obtener carpeta
			</button>
		</main>
	);
};

export default Albums;
