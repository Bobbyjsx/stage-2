"use client";
import { GetMovieById, getTime } from "@/app/lib/utils";
import { useMovies } from "@/app/hooks/useMovies";
import { SideBar } from "@/app/components/module/movie/sideBar";
import Image from "next/image";
import { useApiCache } from "@/app/hooks/useApiCache";
import Link from "next/link";

const Page = ({ params }: { params: { id: string } }) => {
	//get movie id's
	const { data: movieIds } = useApiCache(
		`/movie/${params.id}/external_ids`
	);

	//fetch movie by imdb id
	const { movieDetails } = GetMovieById<MovieData>(
		movieIds?.imdb_id || movieIds?.id
	);

	const { Config: imageURL } = useMovies();
	const image = imageURL(movieDetails?.backdrop_path, "original");
	const image2 = imageURL(movieDetails?.poster_path, "original");
	const title = movieDetails?.title;
	const description = movieDetails?.overview;
	const percentageRating = (
		(movieDetails?.vote_average / 10) *
		100
	).toFixed(0);

	return (
		<main className="flex w-full mt-2 ">
			<div className="sm:flex hidden mt-2">
				<SideBar id={params?.id} />
			</div>

			<div className="w-full sm:grid grid-rows-2 sm:p-10 sm:h-[95vh] h-screen sm:py-0 py-5 px-2">
				<div className="relative inset-0 overflow-hidden aspect-auto  sm:w-auto w-full flex justify-center items-center mt-1 sm:mt-3">
					<Image
						alt={title || ""}
						className="h-full w-full object-cover object-center rounded-3xl"
						width={1000}
						height={1000}
						src={image || image2 || ""}
					/>
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center flex-col gap-3 ">
						<div className="flex flex-col gap-3 justify-center items-center mx-auto rounded-full bg-white/20 backdrop-blur-sm sm:w-28 sm:h-28 w-14 h-14">
							<Image
								alt={"play"}
								className="sm:h-14 sm:w-14 w-10 h-10 z-20"
								width={1000}
								height={1000}
								src="/assets/Play-copy.svg"
							/>
						</div>
						<p className="text-white font-poppins sm:text-xl text-md bg-white/1 backdrop-blur-sm">
							Watch Trailer
						</p>
					</div>
				</div>
				<div className="flex sm:flex-row flex-col  mt-6 w-full">
					<div className="sm:w-[80%] w-full grid place-self-stretch gap-7">
						<div className="justify-between flex items-start w-full g">
							<div className="flex  gap-1 justify-between items-center text-xs sm:text-lg font-poppins text-gray-800 font-semibold pl-5">
								<p
									className="s"
									data-testid="movie-title">
									{title}
								</p>
								<p className="font-bold text-2xl">
									&#x2022;
								</p>
								<p
									className="s"
									data-testid="movie-release-date">
									{movieDetails?.release_date}
								</p>
								<p className="font-bold text-2xl">
									&#x2022;
								</p>

								<p className="s">
									PG{" "}
									{movieDetails?.adult === false
										? "13+"
										: "18+"}
								</p>
								<p className="font-bold text-2xl">
									&#x2022;
								</p>

								<p
									className="s"
									data-testid="movie-runtime">
									{getTime(movieDetails?.runtime)}
								</p>
								{/* <p className="font-bold text-2xl">
									&#x2022;
								</p> */}

								<p className="font-normal space-x-3 sm:flex hidden">
									{movieDetails?.genres.map(
										(genre: {
											id: number;
											name: string;
										}) => {
											return (
												<button
													className="min-w-[74px] max-w-max h-[30px] rounded-2xl border-2 border-gray-200 text-md text-rose-700"
													key={genre?.id}>
													{genre.name}
												</button>
											);
										}
									)}
								</p>
							</div>
						</div>
						<p className="font-normal space-x-3 flex sm:hidden justify-center items-center mx-auto w-full flex-wrap">
							{movieDetails?.genres.map(
								(genre: {
									id: number;
									name: string;
								}) => {
									return (
										<button
											className="min-w-[54px] max-w-max h-[20px] rounded-xl border-2 border-gray-200 text-xs text-rose-700"
											key={genre?.id}>
											{genre.name}
										</button>
									);
								}
							)}
						</p>
						<p
							data-testid="movie-overview"
							className="text-md w-full flex flex-wrap sm:px-0 ">
							{description}
						</p>
						<div className="flex flex-wrap text-gray-700 sm:text-lg text-md space-x-2 sm:space-x-3 sm:px-0">
							<p className=" flex flex-wrap">
								Production company(s):{" "}
							</p>
							<div className="flex flex-row flex-wrap space-x-2">
								{movieDetails?.production_companies.map(
									(comp: {
										id: number;
										logo_path: string;
										name: string;
									}) => {
										return (
											<span
												className="text-rose-700 text-xs sm:text-lg"
												key={comp.id}>
												{comp.name},
											</span>
										);
									}
								)}
							</div>
						</div>
						<div className="flex flex-wrap text-gray-700 sm:text-lg text-md space-x-2 sm:space-x-3 sm:px-0 w-full">
							<p className=" ">
								Production countries:{" "}
							</p>
							<div className="flex flex-row flex-wrap space-x-2">
								{movieDetails?.production_countries.map(
									(comp: { name: string }) => {
										return (
											<span
												className="text-rose-700 text-xs sm:text-lg"
												key={comp.name}>
												{comp.name},
											</span>
										);
									}
								)}
							</div>
						</div>

						<div className="flex flex-wrap text-gray-700 sm:text-lg text-md space-x-2 sm:space-x-3 sm:px-0 w-full">
							<p className=" ">Spoken language(s): </p>
							<div className="flex flex-row flex-wrap space-x-2">
								{movieDetails?.spoken_languages.map(
									(comp: {
										english_name: string;
									}) => {
										return (
											<span
												className="text-rose-700 text-xs sm:text-lg"
												key={
													comp.english_name
												}>
												{comp.english_name},
											</span>
										);
									}
								)}
							</div>
						</div>

						<p className="bg-rose-800 text-white text-sm w-[253px] h-[55px] rounded-lg sm:flex items-center justify-center hidden">
							Top rated movie #65
						</p>
						<div className="flex gap-5 justify-around items-center w-full sm:hidden mb-7">
							<p className="bg-rose-800 text-white text-sm w-[200px] h-[55px] rounded-lg flex items-center justify-center">
								Top rated movie #65
							</p>
							<div className="flex gap-3 sm:gap-5 ">
								<Image
									alt={"upvotes"}
									className="sm:w-7 sm:h-7 w-5 h-5"
									width={1000}
									height={1000}
									src={"/assets/Star.svg"}
								/>
								<p className="sm:text-md text-sm font-semibold text-gray-900">
									<span className="font-semibold text-gray-500">
										{movieDetails?.vote_average.toFixed(
											1
										)}{" "}
									</span>
									| {movieDetails?.vote_count}
								</p>
							</div>
						</div>
					</div>
					<div className="sm:grid sm:w-[30%]   place-items-center gap-7 flex flex-col  ">
						<div className="sm:flex gap-5 justify-between items-start w-full hidden">
							<div></div>
							<div className="flex gap-5 ">
								<Image
									alt={"upvotes"}
									className="w-7 h-7"
									width={1000}
									height={1000}
									src={"/assets/Star.svg"}
								/>
								<p className="text-md font-semibold text-gray-900">
									<span className="text-md font-semibold text-gray-500">
										{movieDetails?.vote_average.toFixed(
											1
										)}{" "}
									</span>
									| {movieDetails?.vote_count}
								</p>
							</div>
						</div>
						<p className="bg-rose-800 text-white text-sm w-[360px] h-[55px] rounded-lg flex items-center justify-center gap-5">
							<Image
								alt={"upvotes"}
								className="w-5 h-5"
								width={1000}
								height={1000}
								src={"/assets/Tickets.svg"}
							/>
							See showtimes
						</p>
						<Link
							href={"/movie"}
							className="bg-rose-800 bg-opacity-25 text-black text-sm w-[360px] h-[55px] rounded-lg flex items-center justify-center gap-5">
							<Image
								alt={"upvotes"}
								className="w-5 h-5"
								width={1000}
								height={1000}
								src={"/assets/List.svg"}
							/>
							More watch options
						</Link>
						<Image
							alt={"upvotes"}
							className="w-[360px] h-[229px]"
							width={1000}
							height={1000}
							src={"/assets/Rec.png"}
						/>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Page;
