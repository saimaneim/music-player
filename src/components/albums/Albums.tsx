import useFolderStore from "@/store/useFolderStore";
import { MusicalNoteIcon } from "@heroicons/react/16/solid";

const Albums = () => {
	const { folders } = useFolderStore();
	return (
		<section className="p-2 grid grid-cols-2 grid-rows-2 justify-items-center items-center gap-4">
			{folders
				? folders.map((folder) => {
						return (
							<div key={folder?.name}>
								<div className="text-center relative bg-gradient-to-b from-secundary to-secundary/40 size-48 rounded-4xl flex justify-center items-center">
									<MusicalNoteIcon className="size-22" />
								</div>
								<p className="font-semibold text-center">{folder?.name}</p>
							</div>
						);
					})
				: null}
		</section>
	);
};

export default Albums;
