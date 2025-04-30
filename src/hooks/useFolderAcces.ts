// services
import * as folderService from "@/services/folderServices";
import useFilestore from "@/store/useFilesStore";
// stores
import useFolderStore from "@/store/useFolderStore";
// hooks
import { useCallback, useEffect } from "react";

export function useFolderAccess() {
	const { setFolders } = useFolderStore();
	const { setFiles } = useFilestore();
	const pickFolder = useCallback(async () => {
		const dir = await folderService.requestMusicDirectory();
		if (!dir) return;
		const subs = await folderService.listSubfolders(dir);
		setFolders(subs);
		const subFile = await folderService.listSubFiles(dir);
		setFiles(subFile);
	}, [setFolders, setFiles]);

	useEffect(() => {
		(async () => {
			const dir = await folderService.loadSavedDirectory();
			if (!dir) return;
			const subs = await folderService.listSubfolders(dir);
			setFolders(subs);
			const subFile = await folderService.listSubFiles(dir);
			setFiles(subFile);
		})();
	}, [setFolders, setFiles]);

	return { pickFolder };
}
