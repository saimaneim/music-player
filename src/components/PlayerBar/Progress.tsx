const Progress = () => {
	return (
		<div className="bg-primary/30 rounded-2xl h-1 w-full col-span-2 flex items-center">
			<div className="bg-primary rounded-2xl h-1 w-[10%]" />
			<div className="bg-primary/80 rounded-full size-2" />
		</div>
	);
};

export default Progress;
