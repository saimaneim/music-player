// components
import Progress from "@/components/PlayerBar/Progress";

// utils
import truncate from "@/utils/truncate";
// Icons
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	PauseIcon,
	PlayIcon,
} from "@heroicons/react/24/outline";

// stores
import usePlayerStore from "@/store/usePlayerStore";
// hooks
import { useEffect } from "react";

const PlayerBar = () => {
	const { togglePlay, isPlaying, track } = usePlayerStore();

	useEffect(() => {
		if (!isPlaying || !track.file) return;
		const audioBlob = new Blob([track.file], { type: "audio/mp3" });
		const audioUrl = URL.createObjectURL(audioBlob);
		const audio = new Audio(audioUrl);
		audio.play();
	}, [track, isPlaying]);

	if (!track.file) return;
	return (
		<section className="fixed bottom-0 left-0 z-50 bg-clip-padding backdrop-filter px-5 py-3 grid grid-row-2 grid-col-1 gap-2 items-center w-screen rounded-t-xl bg-background ">
			<span className="grid grid-row-2 grid-col-2 space-x-2 justify-start items-end">
				<img
					className="row-span-2 rounded-full size-12 object-contain bg-black"
					src={track.picture}
					alt="songIcon"
				/>
				<p className="font-semibold">{truncate(track.title)}</p>
				<p className="col-start-2">{track.artist}</p>
			</span>
			<div className="flex gap-3 place-self-end py-1">
				<button type="button">
					<ArrowLeftIcon />
				</button>
				<button
					onClick={togglePlay}
					type="button"
					className="col-start-2 rounded-full size-10 flex justify-center items-center active:scale-95 transition-transform duration-150"
				>
					{!isPlaying ? <PlayIcon /> : <PauseIcon className="mr-1.5" />}
				</button>
				<button type="button">
					<ArrowRightIcon />
				</button>
			</div>
			<Progress />
		</section>
	);
};

export default PlayerBar;
