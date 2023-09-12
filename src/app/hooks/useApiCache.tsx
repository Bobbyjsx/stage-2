"use client";
import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_API_ACCESS_TOKEN;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const headers = {
	"Content-Type": "application/json",
	Authorization: `Bearer ${TMDB_API_KEY}`,
};

const get = async <T,>(path: string) => {
	const url = BASE_URL + path;
	try {
		const response = await axios.get(url, { headers });
		if (response.status !== 200) {
			throw new Error(
				`Request failed with status: ${response.status}`
			);
		}
		return response.data; // Parse response as JSON
	} catch (error) {
		throw error;
	}
};

export const useApiCache = <T,>(url: string, enabled = true) => {
	const queryClient = useQueryClient();

	const { data, error, isLoading } = useQuery({
		enabled,
		queryKey: [url],
		queryFn: () => {
			return get<T>(url);
		},
	});

	const refresh = useCallback(() => {
		queryClient.invalidateQueries([url]);
	}, [queryClient, url]);

	const updateUrl = (newUrl: string) => {
		// Invalidate the old query and update the URL
		queryClient.invalidateQueries([url]);
		// Note: You cannot directly update 'url' as it's a function argument, so you may need to manage it in your component's state.
	};

	return { data, error, isLoading, refresh, updateUrl };
};
