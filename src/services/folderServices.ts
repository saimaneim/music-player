// src/services/folderService.ts
import { get, set } from "idb-keyval";

/**
 * Asks the user to pick a music directory, requests permission, and saves it to IndexedDB.
 * @returns FileSystemDirectoryHandle | null if permission is denied
 */
export async function requestMusicDirectory(): Promise<FileSystemDirectoryHandle | null> {
	// @ts-ignore usar showDirectoryPicker
	const handle = await window.showDirectoryPicker({
		mode: "read",
		startIn: "music",
	});

	const permission = await handle.requestPermission({ mode: "read" });
	if (permission !== "granted") {
		console.error("Permission not granted.");
		return null;
	}

	await set("dirHandle", handle);
	return handle;
}

/**
 * Loads the saved directory handle from IndexedDB and checks the permission.
 * @returns FileSystemDirectoryHandle | null if not found or permission is denied
 */
export async function loadSavedDirectory(): Promise<FileSystemDirectoryHandle | null> {
	const handle = await get<FileSystemDirectoryHandle>("dirHandle");
	if (!handle) {
		return null;
	}
	// @ts-ignore
	const permission = await handle.queryPermission({ mode: "read" });
	if (permission !== "granted") {
		console.warn("Permission for stored folder not granted.");
		return null;
	}

	return handle;
}

/**
 * Given a FileSystemDirectoryHandle, returns only the (subdirectories).
 */
export async function listSubfolders(
	handle: FileSystemDirectoryHandle,
): Promise<FileSystemDirectoryHandle[]> {
	const folders: FileSystemDirectoryHandle[] = [];
	// @ts-ignore
	for await (const [, entry] of handle.entries()) {
		if (entry.kind === "directory") {
			folders.push(entry);
		}
	}
	return folders;
}

/**
 * Given a FileSystemDirectoryHandle, returns only the Tracks (files).
 */
export async function listSubFiles(
	handle: FileSystemDirectoryHandle,
	filterExt = [".mp3"],
): Promise<FileSystemFileHandle[]> {
	const files: FileSystemFileHandle[] = [];
	// @ts-ignore
	for await (const [, entry] of handle.entries()) {
		if (entry.kind === "file" && entry.name.endsWith(filterExt)) {
			files.push(entry);
		}
	}
	return files;
}
