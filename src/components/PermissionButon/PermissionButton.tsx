// hooks
import { useFolderAccess } from "@/hooks/useFolderAcces";

const PermissionButton = () => {
	const { pickFolder } = useFolderAccess();
	return (
		<main className="flex gap-2">
			<button
				type="button"
				onClick={pickFolder}
				className="bg-blue-500 rounded p-4"
			>
				allow access
			</button>
		</main>
	);
};

export default PermissionButton;
