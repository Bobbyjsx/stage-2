"use client"
import { useEffect, useState } from "react";

// Custom hook for managing favorite IDs
export const useIsFavorite = () => {
	// Initialize the favorite IDs from local storage
	const storedFavoriteIds = localStorage.getItem("favoriteIds");
	const initialFavoriteIds: number[] = storedFavoriteIds
		? JSON.parse(storedFavoriteIds)
		: [];

	const [favoriteIds, setFavoriteIds] = useState<number[]>(
		initialFavoriteIds
	);

	// Check if the provided ID exists in the favorite IDs array
	const isFavorite = (id: number) => favoriteIds.includes(id);

	// Toggle favorite status
	const toggleFavorite = (id: number) => {
		if (isFavorite(id)) {
			// Remove the ID from the favorites list
			const updatedIds = favoriteIds.filter(
				(favoriteId) => favoriteId !== id
			);
			setFavoriteIds(updatedIds);
		} else {
			// Add the ID to the favorites list
			setFavoriteIds([...favoriteIds, id]);
		}
	};

	// Store favorite IDs in localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem(
			"favoriteIds",
			JSON.stringify(favoriteIds)
		);
	}, [favoriteIds]);

	return { isFavorite, toggleFavorite, favoriteIds };
};
