import { create } from "zustand";

interface FiletateProps {
	files: FileSystemFileHandle[];
	setFiles: (File: FileSystemFileHandle[]) => void;
	clearFile: () => void;
}

const useFilestore = create<FiletateProps>((set) => ({
	files: [],
	setFiles: (files) => set({ files }),
	clearFile: () => set({ files: [] }),
}));

export default useFilestore;
