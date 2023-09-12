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
		const updatedIds = [...favoriteIds]; // Create a copy of the current favorite IDs

		// Check if the provided ID is already in the favorite list
		const isAlreadyFavorite = updatedIds.includes(id);

		if (isAlreadyFavorite) {
			// Remove the ID from the favorites list
			const index = updatedIds.indexOf(id);
			if (index !== -1) {
				updatedIds.splice(index, 1);
			}
		} else {
			// Check if the maximum limit of 4 favorites is reached
			if (updatedIds.length >= 4) {
				updatedIds.pop(); // Remove the last ID to make space for the new one
			}
			updatedIds.push(id); // Add the new ID to the favorites list
		}

		setFavoriteIds(updatedIds); // Update the state with the updated IDs
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
