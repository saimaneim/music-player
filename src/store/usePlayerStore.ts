import { create } from "zustand";

interface Track {
	title?: string;
	artist?: string;
	album?: string;
	duration?: number;
	picture?: string;
}

interface PlayerState {
	isPlaying: boolean;
	track: Track;
	currentTime: number;

	togglePlay: () => void;
	setTrack: (track: Track) => void;
}

const usePlayerStore = create<PlayerState>((set) => ({
	isPlaying: false,
	currentTime: 0,
	track: {
		picture: "https://placehold.co/50",
		album: "",
		artist: "",
		duration: 0,
		title: "",
	},

	togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
	setTrack: (track) => set({ track: track }),
}));

export default usePlayerStore;
