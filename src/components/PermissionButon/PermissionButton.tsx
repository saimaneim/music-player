// store
import useFolderStore from "@/store/useFolderStore";
// libs
import { get, set } from "idb-keyval";

import { useEffect } from "react";

const PermissionButton = () => {
	const { setFolders } = useFolderStore();

	async function getDir() {
		// @ts-ignore
		const dirHandle = await window.showDirectoryPicker({
			mode: "read",
			startIn: "music",
		});
		const permission = await dirHandle.requestPermission({ mode: "read" });
		if (permission !== "granted") {
			console.error("permission not granted.");
		}
		await set("carpetaHandle", dirHandle);
	}

	useEffect(() => {
		async function getSavedFolder() {
			try {
				const handle = await get("carpetaHandle");
				// @ts-ignore
				const permission = await handle.queryPermission({ mode: "read" });
				if (!handle && permission !== "granted") {
					alert("Permission not granted for the stored folder");
				} else {
					const folders = [];
					// @ts-ignore
					for await (const [, handl] of handle.entries()) {
						handl.kind === "directory"
							? folders.push(handl)
							: console.log("file");
					}
					setFolders(folders);
				}
			} catch (error) {
				console.error("Error getting stored folder:", error);
			}
		}
		getSavedFolder();
	}, [setFolders]);

	return (
		<main className="flex gap-2">
			<button
				type="button"
				onClick={getDir}
				className="bg-blue-500 rounded p-4"
			>
				allow access
			</button>
		</main>
	);
};

export default PermissionButton;
