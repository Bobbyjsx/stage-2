"use client";

import { useIsFavorite } from "@/app/hooks/useFavorite";
import { useMovies } from "@/app/hooks/useMovies";
import { getGenresByIds } from "@/app/lib/utils";
import { HeartIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

type Props = {
	movieDetails: Movie;
};
const MovieCard = ({ movieDetails }: Props) => {
	const {
		poster_path,
		original_title,
		original_language,
		vote_average,
		popularity,
		vote_count,
		release_date,
		genre_ids,
		id,
	} = movieDetails;

	const { Config: imageURL } = useMovies();

	const percentageRating = ((vote_average / 10) * 100).toFixed(0);

	const { isFavorite, toggleFavorite } = useIsFavorite();
	const handleToggle = () => {
		// e.preventDefault();
		toggleFavorite(id);
	};
	return (
		<Link
			href={`/movie/${id}`}
			className="flex flex-col justify-start gap-3 transition-all hover:scale-105 delay-75 duration-200"
			data-testid="movie-card">
			<div className="relative inset-0 overflow-hidden aspect-auto  sm:w-auto w-full flex justify-center items-center">
				<Image
					data-testid="movie-poster"
					src={
						imageURL(`${poster_path}`) ||
						"/assets/sv1.svg"
					}
					width={1000}
					height={1000}
					className="w-72  h-96"
					alt="Banner unavailable"
				/>
				<button
					onClick={handleToggle}
					className="absolute top-10 left-[90%] transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center flex-col gap-3 ">
					{isFavorite(id) ? (
						<HeartIcon className="text-red-500 w-10 h-10 hover:text-red-600" />
					) : (
						<HeartIcon className="text-gray-200 w-10 h-10 hover:text-red-300" />
					)}
				</button>
			</div>

			<div className="w-full flex flex-col justify-start gap-3">
				<span
					className="font-semibold text-xs text-gray-400 font-sans"
					data-testid="movie-release-date">
					{release_date}
				</span>
				<p
					className="w-64 font-semibold text-black font-sans text-md"
					data-testid="movie-title">
					{original_title}
				</p>
				<section className="flex w-full justify-between items-start">
					<div className="grid grid-cols-2 w-1/3 place-items-center">
						<Image
							src="/assets/sv1.svg"
							width={1000}
							height={1000}
							className="w-11 h-8"
							alt="IMDB"
						/>
						<p className="text-xs text-gray-700 font-sans font-normal">
							{popularity.toFixed(2)}
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
						<p className="text-xs text-gray-700 font-sans font-normal">
							{percentageRating}%{" "}
						</p>
					</div>
				</section>
				<p className="text-xs text-gray-400 font-sans font-semibold">
					{getGenresByIds(genre_ids).join(", ")}
				</p>
			</div>
		</Link>
	);
};

export default MovieCard;
