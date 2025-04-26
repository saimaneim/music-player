import { create } from "zustand";

interface FolderStateProps {
	folders: (FileSystemDirectoryHandle | null)[];
	setFolders: (folders: FolderStateProps["folders"]) => void;
}

const useFolderStore = create<FolderStateProps>((set) => ({
	folders: [],
	setFolders: (folders) => set({ folders }),
}));

export default useFolderStore;
