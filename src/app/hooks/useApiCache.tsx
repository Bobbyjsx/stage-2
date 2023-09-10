import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const get = async <T,>(url: string) => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const useApiCache = <T,>(path: string, enabled = true) => {
	const queryClient = useQueryClient();

	const { data, error, isLoading } = useQuery({
		enabled,
		queryFn: () => get<T>(path),
		queryKey: [path],
	});

	const refresh = useCallback(() => {
		queryClient.invalidateQueries([path]);
	}, [queryClient, path]);

	return { data, error, isLoading, refresh };
};
