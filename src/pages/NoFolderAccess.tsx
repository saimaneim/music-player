const NoFolderAccess = () => {
	return (
		<main className="h-screen flex items-center">
			<div className="flex flex-col items-center justify-center gap-4 rounded-xl border-border bg-muted/30 p-8 text-center max-w-md m-2">
				<span className="text-4xl">📁🚫</span>
				<h2 className="text-lg font-semibold text-muted-foreground">
					No Folder Access
				</h2>
				<p className="text-sm text-muted-foreground">
					We couldn’t access your folder because permission was not granted.
				</p>
			</div>
		</main>
	);
};

export default NoFolderAccess;
