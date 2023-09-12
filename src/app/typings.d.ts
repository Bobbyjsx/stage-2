type Movie = {
	adult: boolean;
	backdrop_path: string | null;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

type MovieList = {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
}

type Collection = {
	id: number;
	name: string;
	poster_path: string;
	backdrop_path: string;
}

type Genre = {
	id: number;
	name: string;
}

type ProductionCompany = {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

type ProductionCountry = {
	iso_3166_1: string;
	name: string;
}

type SpokenLanguage = {
	english_name: string;
	iso_639_1: string;
	name: string;
}

type MovieData = {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: Collection | null;
	budget: number;
	genres: Genre[];
	homepage: string | null;
	id: number;
	imdb_id: string | null;
	original_language: string;
	original_title: string;
	overview: string | null;
	popularity: number;
	poster_path: string;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	release_date: string;
	revenue: number;
	runtime: number | null;
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string | null;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}
