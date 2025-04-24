import ArrowLeftIcon from "@/assets/icons/ArrowLeft";
import ArrowRightIcon from "@/assets/icons/ArrowRight";
import PauseIcon from "@/components/PlayerBar/icons/Pause";
// Icons
import PlayIcon from "@/components/PlayerBar/icons/Play";

import { useState } from "react";

const PlayerBar = () => {
	const [play, setPlay] = useState<boolean>(true);

	const handleClick = () => {
		setPlay(!play);
	};

	return (
		<section className="fixed bottom-0 left-0 z-50 bg-clip-padding backdrop-filter px-5 py-3 grid grid-row-2 grid-col-1 gap-2 items-center backdrop-blur-xs bg-secundary/40 bg-opacity-10 w-screen rounded-t-xl">
			<span className="grid grid-row-2 grid-col-2 space-x-2 justify-start items-end">
				<img
					className="row-span-2 rounded-lg"
					src="https://placehold.co/50"
					alt="songIcon"
				/>
				<p className="font-semibold">HUMBLE</p>
				<p className="col-start-2">Kendrick Lamar</p>
			</span>
			<div className="flex gap-3 place-self-end py-1">
				<button type="button">
					<ArrowLeftIcon />
				</button>
				<button
					onClick={handleClick}
					type="button"
					className="col-start-2 rounded-full size-10 flex justify-center items-center active:scale-95 transition-transform duration-150"
				>
					{play ? <PlayIcon /> : <PauseIcon className="mr-1.5" />}
				</button>
				<button type="button">
					<ArrowRightIcon />
				</button>
			</div>

			<div className="bg-primary/30 rounded-2xl h-1 w-full col-span-2">
				<div className="bg-primary rounded-2xl h-1 w-[50%]" />
			</div>
		</section>
	);
};

export default PlayerBar;
