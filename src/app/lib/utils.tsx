"use client"
import { useApiCache } from "../hooks/useApiCache";

type GenreData = [string, number, string];

interface Genre {
	type: string;
	id: number;
	genre: string;
}

const data: GenreData[] = [
	["Movie", 12, "Adventure"],
	["Movie", 14, "Fantasy"],
	["Movie", 16, "Animation"],
	["Movie", 18, "Drama"],
	["Movie", 27, "Horror"],
	["Movie", 28, "Action"],
	["Movie", 35, "Comedy"],
	["Movie", 36, "History"],
	["Movie", 37, "Western"],
	["Movie", 53, "Thriller"],
	["Movie", 80, "Crime"],
	["Movie", 99, "Documentary"],
	["Movie", 878, "Science Fiction"],
	["Movie", 9648, "Mystery"],
	["Movie", 10402, "Music"],
	["Movie", 10749, "Romance"],
	["Movie", 10751, "Family"],
	["Movie", 10752, "War"],
	["Movie", 10770, "TV Movie"],
	["TV", 16, "Animation"],
	["TV", 18, "Drama"],
	["TV", 35, "Comedy"],
	["TV", 37, "Western"],
	["TV", 80, "Crime"],
	["TV", 99, "Documentary"],
	["TV", 9648, "Mystery"],
	["TV", 10751, "Family"],
	["TV", 10759, "Action & Adventure"],
	["TV", 10762, "Kids"],
	["TV", 10763, "News"],
	["TV", 10764, "Reality"],
	["TV", 10765, "Sci-Fi & Fantasy"],
	["TV", 10766, "Soap"],
	["TV", 10767, "Talk"],
	["TV", 10768, "War & Politics"],
];

 const genres: Genre[] = data.map(([type, id, genre]) => ({
	type,
	id,
	genre,
}));

// Helper function to check genres by IDs
export function getGenresByIds(
	genreIds: number[]
) {
	const matchingGenres = [];

	for (const id of genreIds) {
		const genre = genres.find((item) => item.id === id);
		if (genre) {
			matchingGenres.push(genre.genre);
		}
	}

	return matchingGenres;
}
  
export const GetMovieById = <T,>(id: number | string) => {
	const { data: movieDetails, isLoading } = useApiCache<T>(
		`/movie/${id}`
	);
   
	return { movieDetails, isLoading };
};

export function getTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hoursText = hours > 0 ? `${hours}H ` : '';
  const minutesText = remainingMinutes > 0 ? `${remainingMinutes}m` : '';

  return hoursText + minutesText;
}


