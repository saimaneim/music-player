import Albums from "@/components/Albums/Albums";
import PermissionButton from "@/components/PermissionButon/PermissionButton";
import PlayerBar from "@/components/PlayerBar/PlayerBar";

export default function Index() {
	return (
		<main>
			<div className="flex flex-col gap-10 p-4">
				<Albums />
				<PermissionButton />
			</div>
			<PlayerBar />
		</main>
	);
}
