// libs
import { extractMetadataSong } from "@/libs/extractMetadataSong";
import type { SongMetadata } from "@/libs/extractMetadataSong";
import useFilestore from "@/store/useFilesStore";
import useFolderStore from "@/store/useFolderStore";
import usePlayerStore from "@/store/usePlayerStore";
// utils
import truncate from "@/utils/truncate";
// icons
import { FolderIcon } from "@heroicons/react/24/outline";
import { MusicalNoteIcon } from "@heroicons/react/24/outline";
// hooks
import { useEffect, useState } from "react";

const Albums = () => {
	const { setTrack, togglePlay } = usePlayerStore();
	const { folders } = useFolderStore();
	const { files } = useFilestore();
	const [metaFiles, setMetaFiles] = useState<SongMetadata[]>([]);

	useEffect(() => {
		const metaFilesData = async () => {
			const metadata = await Promise.all(
				files.map(async (file) => {
					const metadata = await extractMetadataSong(await file.getFile());
					return metadata;
				}),
			);
			setMetaFiles(metadata);
		};
		metaFilesData();
	}, [files]);

	function handleClick(file: SongMetadata) {
		setTrack(file);
		togglePlay();
	}

	return (
		<section className="grid grid-cols-2 auto-rows-auto justify-items-center items-center gap-8">
			{folders
				? folders.map((folder) => {
						return (
							<button
								type="button"
								key={folder?.name}
								className="size-48 active:scale-97 transition-all duration-150 ease-linear"
							>
								<div className="text-center relative bg-gradient-to-b from-secundary to-secundary/40 size-48 rounded-4xl flex justify-center items-center">
									<FolderIcon className="size-22" />
								</div>
								<p className="font-semibold text-center">{folder?.name}</p>
							</button>
						);
					})
				: null}
			{metaFiles.map((file) => (
				<button
					onClick={() => handleClick(file)}
					type="button"
					key={file.title}
					className="size-48 active:scale-97 transition-all duration-150 ease-linear"
				>
					{file.picture ? (
						<img src={file.picture} alt="track" className="rounded-4xl " />
					) : (
						<div className="bg-gradient-to-b from-secundary to-secundary/40 rounded-4xl flex justify-center items-center">
							<MusicalNoteIcon className="size-22" />
						</div>
					)}

					<p className="font-semibold text-center">{truncate(file.title)}</p>
				</button>
			))}
		</section>
	);
};

export default Albums;
