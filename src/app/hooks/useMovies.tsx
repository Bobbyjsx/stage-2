import { useApiCache } from "./useApiCache"


interface TMDBConfig {
	images: {
		base_url: string;
		secure_base_url: string;
		backdrop_sizes: string[];
		logo_sizes: string[];
		poster_sizes: string[];
		profile_sizes: string[];
		still_sizes: string[];
	};
	change_keys: string[];
}

export const useMovies = () => {
    const Config = (filePath: string, w?:string|undefined) => {  
        const { data, isLoading } = useApiCache<TMDBConfig>("/configuration");
        if(isLoading){
            return
        }
		const baseURL = data?.images?.base_url;
		const posterSize = data?.images.poster_sizes.includes("w500")
			? "w500"
			: data?.images.poster_sizes[2];
		const imageURL = `${baseURL}/${w || posterSize}${filePath}`;
		return imageURL;
	};
  return {Config}
}
