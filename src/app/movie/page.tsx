"use client"
import { useApiCache } from '../hooks/useApiCache';
import Loading from "@/app/loading";
import MovieCard from "../components/common/MovieCard";

type Props = {
    seeFull:boolean
}

const Movies = ({seeFull = true}: Props) => {
    let path;

   seeFull
		? (path = "/movie/popular")
		: (path = "/movie/top_rated");

    
    const { data: movieList, isLoading } = useApiCache<MovieList>(`${path}`); 
    
    if (isLoading) {
		return (
			<>
				<Loading />
			</>
		);
	}
    if (seeFull) {
        return (
			<main className="flex flex-col justify-center items-center w-full mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-4 place-items-center gap-20">
					{movieList?.results
						.map((tile: Movie) => {
							return (
								<div
									className="w-full mx-auto"
									key={tile.id}>
									<MovieCard movieDetails={tile} />
								</div>           
							);
						})}
				</div>
			</main>
		);
    }
  return (
		<main className="flex flex-col justify-center items-center w-full mx-auto">
			<div className="grid grid-cols-1 md:grid-cols-4 place-items-center gap-20">
				{movieList?.results
					.slice(0, 10)
					.map((tile: Movie) => {
						return (
							<div
								className="w-full mx-auto"
								key={tile.id}>
								<MovieCard movieDetails={tile} />
							</div>
						);
					})}
			</div>
		</main>
  );
}

export default Movies;