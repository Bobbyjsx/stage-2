"use client"
import { useEffect, useRef } from "react";

const useIdRotation = (
	intervalMs: number,
	data: Movie[] | undefined
): number | null => {
	const currentIdRef = useRef<number | null>(null);
	const iterationRef = useRef<number>(0);

	useEffect(() => {
		if (!data) return; // Check if data is undefined

		const intervalId = setInterval(() => {
			const currentObject =
				data[iterationRef.current % data.length];
			const idValue = currentObject.id;
			currentIdRef.current = idValue;
			iterationRef.current += 1;
		}, intervalMs);

		return () => {
			clearInterval(intervalId);
		};
	}, [intervalMs, data]);

	return currentIdRef.current;
};

export default useIdRotation;
