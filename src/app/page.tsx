"use client";
import { Banner } from "./components/common/Banner";
import Movies from "./(pages)/movie/page";
import Link from "next/link";

export default function Home() {
	return (
		<main>
			<Banner />
			<div className="flex items-center mx-auto w-ful py-10">
				<div className="flex justify-between mx-auto md:w-[73%] w-[90%]">
					<h1 className="font-sans font-semibold text-xl md:text-3xl">
						Featured Movies
					</h1>
					<Link
						href={"/movie "}
						className="font-sans font-normal md;text-lg text-md text-rose-700 hover:text-rose-500  ">
						See More {">"}
					</Link>
				</div>
			</div>
			<Movies seeFull={false} />
		</main>
	);
}
