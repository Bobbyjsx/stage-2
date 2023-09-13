"use client";
import Image from "next/image";
import React from "react";
import { Input } from "./Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import classNames from "classnames";

const Header = () => {
	const pathName = usePathname();
	const router = useRouter();

	type SubmitProps = {
		search: string;
	};
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SubmitProps>();

	const submit: SubmitHandler<SubmitProps> = (values) => {
		router.push(`/search?search=${values.search}`);
	};
	const isActive = (path: string) => {
		return pathName === path;
	};
	return (
		<header
			className={classNames({
				"mb-0": isActive("/"),
				"mb-10": !isActive("/"),
			})}>
			<div
				className={classNames({
					"flex justify-around items-center mx-auto absolute top-0 left-0 w-full  z-10 bg-white/1 blend text-white backdrop-blur-sm ":
						isActive("/"),
					"flex justify-around items-center mx-auto absolute top-0 left-0 w-full  z-10 bg-rose-900/40 blend text-white backdrop-blur-sm  bg-slate-500-  ":
						!isActive("/"),
				})}>
				<Link
					className="flex gap-2 w-1/4m items-center"
					href={"/"}>
					<Image
						src="/assets/tv.svg"
						width={1000}
						height={1000}
						className="w-12 h-12"
						alt="logo"
					/>
					<p className="s sm:flex hidden">MovieBox</p>
				</Link>
				<form
					className="w-1/3 grid place-self-stretch items-center "
					onSubmit={handleSubmit(submit)}>
					<Input
						placeholder="What do you want to watch?"
						{...register("search", { required: true })}
						className="bg-transparent border-2 border-white w-full"
						trailingIcon={
							<button
								disabled={isSubmitting}
								type="submit"
								title="search">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									className="w-6 h-6">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
									/>
								</svg>
							</button>
						}
					/>
				</form>
				<div className=" grid grid-cols-2 sm:w-56 place-self-center space-x-5">
					<p className="sm:flex hidden">Sign In</p>
					<div className=" flex items-center justify-center bg-rose-800 rounded-full w-8 h-8">
						<Image
							src={"/assets/Menu.svg"}
							width={1000}
							height={1000}
							className="w-7  h-7"
							alt="hamburger"
						/>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
