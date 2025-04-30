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

	return (
		<section className="fixed bottom-0 left-0 z-50 bg-clip-padding backdrop-filter px-5 py-3 grid grid-row-2 grid-col-1 gap-2 items-center backdrop-blur-xs bg-secundary/40 bg-opacity-10 w-screen rounded-t-xl">
			<span className="grid grid-row-2 grid-col-2 space-x-2 justify-start items-end">
				<img
					className="row-span-2 rounded-lg"
					src={track.picture}
					alt="songIcon"
					height={50}
					width={50}
				/>
				<p className="font-semibold">{track.title}</p>
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

			<div className="bg-primary/30 rounded-2xl h-1 w-full col-span-2 flex items-center">
				<div className="bg-primary rounded-2xl h-1 w-[10%]" />
				<div className="bg-primary/80 rounded-full size-2" />
			</div>
		</section>
	);
};

export default PlayerBar;
