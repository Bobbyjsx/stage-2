"use client";
import classNames from "classnames";
import Image from "next/image";
import { GetMovieById } from "@/app/lib/utils";
import { useMovies } from "@/app/hooks/useMovies";
import useIdRotation from "@/app/hooks/useIdRotation";
import { useApiCache } from "@/app/hooks/useApiCache";
import { LoadingSpinner } from "./LoadingSpinner";
import Link from "next/link";

export const Banner = () => {
	const { data: movieList, isLoading } = useApiCache<MovieList>(
		"/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"
	);
	const id: number | null = useIdRotation(8000, movieList?.results);
	const { movieDetails } = GetMovieById<MovieData>(id || 603692);

	const { Config: imageURL } = useMovies();
	const image = imageURL(movieDetails?.backdrop_path, "w1280");
	const title = movieDetails?.title;
	const description = movieDetails?.overview;
	const percentageRating = (
		(movieDetails?.vote_average / 10) *
		100
	).toFixed(0);

	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<div className="relative sm:h-[800px]">
			{/* Decorative image and overlay */}
			<div
				aria-hidden="true"
				className="absolute inset-0 overflow-hidden">
				<Image
					alt={title || ""}
					className="h-full w-full object-cover object-center"
					width={1000}
					height={1000}
					src={image || ""}
				/>

				<div
					aria-hidden="true"
					className={classNames(
						"absolute inset-0  opacity-50 ",
						{
							"bg-gradient-to-t from-gray-800": !image,
							"bg-gray-900": image,
						}
					)}
				/>
			</div>

			<div className="relative justify-start  gap-7 flex max-w-3xl flex-col items-center px-6 py-16  sm:py-48 lg:px-0 w-full sm:w-[404px] mx-auto sm:mx-44  ">
				<h1 className="bg-white/1 text-5xl font-bold tracking-wide leading-[58px] text-white backdrop-blur-sm ">
					{title}
				</h1>
				<section className="flex w-full justify-start items-center gap-16 text-slate-100">
					<div className="grid grid-cols-2 w-1/3 place-items-center">
						<Image
							src="/assets/sv1.svg"
							width={1000}
							height={1000}
							className="w-12 h-10"
							alt="IMDB"
						/>
						<p className="text-xs font-sans font-normal">
							{movieDetails?.popularity.toFixed(2)}
						</p>
					</div>
					<div className="grid grid-cols-2 w-1/4 place-items-center">
						<Image
							src="/assets/sv2.svg"
							width={1000}
							height={1000}
							className="w-5 h-5"
							alt="rating"
						/>
						<p className="text-xs font-sans font-normal">
							{percentageRating}%{" "}
						</p>
					</div>
				</section>
				<p className="bg-white/1 blend text-white backdrop-blur-sm text-lg">
					{description}
				</p>
				{movieDetails && (
					<div className="w-full items-center-justify-start">
						<Link
							href={`/movie/${movieDetails?.imdb_id}`}
							className="bg-rose-700 py-[6px] px-4 text-white flex items-center justify-center w-[169px] h-[36px]">
							<Image
								src="/assets/play.svg"
								width={1000}
								height={1000}
								className="w-5 h-5"
								alt="trailer"
							/>
							<p>Watch trailer</p>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};
