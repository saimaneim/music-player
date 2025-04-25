import PlayerBar from "@/components/PlayerBar/PlayerBar";
import Albums from "@/components/albums/Albums";

export default function Index() {
	return (
		<main className="p-2 grid grid-cols-2 grid-rows-2 justify-items-center items-center gap-2">
			<span className="text-center">
				<img
					src="https://placehold.co/50"
					alt="album"
					className="rounded-xl size-40"
				/>
				<p>Freestyle</p>
			</span>
			<span className="text-center">
				<img
					src="https://placehold.co/50"
					alt="album"
					className="rounded-xl size-40"
				/>
				<p>Hip Hop</p>
			</span>
			<span className="text-center">
				<img
					src="https://placehold.co/50"
					alt="album"
					className="rounded-xl size-40"
				/>
				<p>Vallenato</p>
			</span>
			<span className="text-center">
				<img
					src="https://placehold.co/50"
					alt="album"
					className="rounded-xl size-40"
				/>
				<p>Pop</p>
			</span>
			<span className="text-center">
				<img
					src="https://placehold.co/50"
					alt="album"
					className="rounded-xl size-40"
				/>
				<p>Rap</p>
			</span>

			<span className="text-center">
				<img
					src="https://placehold.co/50"
					alt="album"
					className="rounded-xl size-40"
				/>
				<p>Phonk</p>
			</span>
			<Albums />
			<PlayerBar />
		</main>
	);
}
