import { useFolderAccess } from "@/hooks/useFolderAcces";
import { get } from "idb-keyval";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const PermissionPrompt = () => {
	const { pickFolder } = useFolderAccess();
	const [visible, setVisible] = useState(false);
	const isDev = process.env.NODE_ENV === "development";

	const checkAccess = async () => {
		if (!isDev) {
			setVisible(false);
			return;
		}

		try {
			const handle: FileSystemDirectoryHandle = await get("dirHandle");
			// @ts-ignore
			if (!handle || typeof handle.queryPermission !== "function") {
				setVisible(true);
				return;
			}
			// @ts-ignore
			let perm: PermissionState = await handle.queryPermission();
			if (
				perm !== "granted" &&
				// @ts-ignore
				typeof handle.requestPermission === "function"
			) {
				// @ts-ignore
				perm = await handle.requestPermission({ mode: "readwrite" });
			}
			setVisible(perm !== "granted");
		} catch {
			setVisible(true);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		checkAccess();
	}, []);

	const handleAllow = async () => {
		await pickFolder();
		await checkAccess();
	};

	if (!visible) return null;

	return (
		<>
			<div className="absolute inset-0 bg-black/45 h-screen" />
			<div className="absolute gap-6 rounded-xl bg-secondary shadow-md max-w-sm mx-4">
				<div className="p-4 flex items-center flex-col gap-y-8">
					<h2 className="text-xl font-semibold text-text-primary">
						Permission Required
					</h2>
					<p className="text-sm text-muted-foreground text-start">
						We need access to a folder to continue. You can allow or deny access
						below.
					</p>
				</div>

				<div className="flex w-full overflow-hidden divide-x-[0.5px] border-t-[0.5px] divide-border">
					<Link to={"NoFolder"} className="w-1/2 px-4 py-2 text-sm text-center">
						Deny
					</Link>
					<button
						type="button"
						onClick={handleAllow}
						className="w-1/2 px-4 py-2 text-sm font-medium"
					>
						Allow Access
					</button>
				</div>
			</div>
		</>
	);
};

export default PermissionPrompt;
