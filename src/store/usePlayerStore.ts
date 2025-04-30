import type { SongMetadata } from "@/libs/extractMetadataSong";
import { create } from "zustand";

interface PlayerStateProps {
	isPlaying: boolean;
	track: SongMetadata;
	currentTime: number;
	togglePlay: () => void;
	setTrack: (track: SongMetadata) => void;
}

const usePlayerStore = create<PlayerStateProps>((set) => ({
	isPlaying: false,
	currentTime: 0,
	track: {
		picture: "https://placehold.co/50",
		album: "",
		artist: "",
		duration: 0,
		title: "",
		file: null,
	},

	togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
	setTrack: (track) => set({ track: track }),
}));

export default usePlayerStore;
