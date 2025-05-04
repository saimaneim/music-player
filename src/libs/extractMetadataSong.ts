import * as mm from "music-metadata";

/**
 * Metadata returned by extractMetadataSong
 */
export interface SongMetadata {
	title: string;
	artist?: string;
	album?: string;
	duration?: number; // in seconds
	picture?: string; // data URL
	file: Blob | null;
}

/**
 * Extracts all available metadata from an audio file (e.g. .mp3)
 * @param file - A Blob or File representing the audio track
 * @returns Promise resolving to a SongMetadata object
 */
export async function extractMetadataSong(file: Blob): Promise<SongMetadata> {
	// Parse tags & format
	const metadata = await mm.parseBlob(file);
	const { common, format } = metadata;

	// Base64-encode first picture, if any
	let pictureDataUrl: string | undefined;
	const pic = common.picture?.[0];
	if (pic) {
		const base64 = btoa(String.fromCharCode(...new Uint8Array(pic.data)));
		pictureDataUrl = `data:${pic.format};base64,${base64}`;
	}

	return {
		title: common.title || "Not found",
		artist: common.artist,
		album: common.album,
		duration: Number(format.duration?.toFixed(3)),
		picture: pictureDataUrl,
		file: file,
	};
}
