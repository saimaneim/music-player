import Albums from "@/components/Albums/Albums";
import PermissionPrompt from "@/components/PermissionPrompt/PermissionPrompt";
import PlayerBar from "@/components/PlayerBar/PlayerBar";

export default function Page() {
	return (
		<main className="h-screen flex justify-center items-center pt-4">
			<Albums />
			<PermissionPrompt />
			<PlayerBar />
		</main>
	);
}
