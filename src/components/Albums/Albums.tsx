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
import { twMerge } from "tailwind-merge";

const Albums = () => {
	// store
	const { setTrack, togglePlay } = usePlayerStore();
	const { folders } = useFolderStore();
	const { files } = useFilestore();

	const [metaFiles, setMetaFiles] = useState<SongMetadata[]>([]);
	const [selectedTrack, setSelectedTrack] = useState<SongMetadata | null>(null);

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
		if (selectedTrack === file) {
			setSelectedTrack(null);
		} else {
			setSelectedTrack(file);
		}
		setTrack(file);
		togglePlay();
	}

	return (
		<section className="flex flex-col justify-items-center items-center gap-2 h-full overflow-hidden">
			<div className="w-full overflow-x-auto h-40 gap-2 flex">
				{folders
					? folders.map((folder) => {
							return (
								<button
									type="button"
									key={folder?.name}
									className="size-32 active:scale-97 transition-all duration-150 ease-linear"
								>
									<div className="text-center relative bg-gradient-to-b from-secondary to-secondary/40 size-32 rounded-4xl flex justify-center items-center">
										<FolderIcon className="size-18" />
									</div>
									<p className="font-semibold text-center pt-0.5">
										{folder?.name}
									</p>
								</button>
							);
						})
					: null}
			</div>
			{metaFiles.length > 0 && (
				<div
					className="rounded-t-4xl rounded-b-4xl bg-secondary p-6 w-screen flex flex-col gap-4 
					h-[500px] overflow-y-auto
				"
				>
					{metaFiles.map((file) => (
						<button
							onClick={() => handleClick(file)}
							type="button"
							key={file.title}
							className="h-12 active:scale-97 transition-all duration-150 ease-linear flex items-center gap-4 rounded-lg"
						>
							{file.picture ? (
								<img
									src={file.picture}
									alt="track"
									className="rounded-lg size-12 object-cover"
								/>
							) : (
								<div className="bg-gradient-to-b from-secondary to-secondary/40 rounded-2xl flex justify-center items-center">
									<MusicalNoteIcon className="size-22" />
								</div>
							)}
							<span
								className={twMerge(
									"flex flex-col items-start",
									file === selectedTrack ? "text-primary" : " ",
								)}
							>
								<p className="font-semibold text-center text-inherit">
									{truncate(file.title)}
								</p>
								<p className="font-semibold text-center text-inherit">
									{file.artist || "Unknown"}
								</p>
							</span>
						</button>
					))}
				</div>
			)}
		</section>
	);
};

export default Albums;
