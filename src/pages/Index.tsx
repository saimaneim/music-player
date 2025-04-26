import Albums from "@/components/Albums/Albums";
import PermissionButton from "@/components/PermissionButon/PermissionButton";
import PlayerBar from "@/components/PlayerBar/PlayerBar";

export default function Index() {
	return (
		<main>
			<Albums />
			<PermissionButton />
			<PlayerBar />
		</main>
	);
}
