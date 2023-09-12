

const Loading = () => {
    const tiles = [
		{ id: 1, title: "Loading Tile 1" },
		{ id: 2, title: "Loading Tile 2" },
		{ id: 3, title: "Loading Tile 3" },
		{ id: 4, title: "Loading Tile 4" },
		{ id: 5, title: "Loading Tile 5" },
		{ id: 6, title: "Loading Tile 6" },
		{ id: 7, title: "Loading Tile 7" },
		{ id: 8, title: "Loading Tile 8" },
		{ id: 9, title: "Loading Tile 9" },
		{ id: 10, title: "Loading Tile 10" },
		{ id: 11, title: "Loading Tile 11" },
		{ id: 12, title: "Loading Tile 12" },
	];
	return (
		<div className="w-full mx-auto">
			<ul className=" mt-4 space-y-2 grid grid-cols-1 md:grid-cols-3   gap-10 w-[70%] mx-auto justify-center items-center place-items-center">
				{tiles.map((input, index) => {
					return (
						<li
							key={index}
							className="">
							<article
								className=" w-72 h-96 bg-slate-400 dark:bg-gradient-to-tl from-slate-700 to-slate-600 flex flex-col rounded-lg shadow-sm hover:scale-105 hover:shadow-lg hover:bg-slate-200 duration-200 ease-out hover:text-black animate-pulse transition-all "
								style={{
									animationDelay: `${
										index * 0.05
									}s`,
									animationDuration: "1.5s",
								}}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Loading;
