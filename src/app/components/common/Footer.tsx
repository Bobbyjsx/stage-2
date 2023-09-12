"use client";
import classNames from "classnames";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer = () => {
	const pathName = usePathname();

	const isActive = (path: string) => {
		return pathName === path;
	};

	return (
		<footer
			className={classNames({
				"w-full h-[200px] flex flex-col justify-center items-center py-6 border-t-2 gap-7 bg-white mt-10":
					isActive("/"),
				hidden: !isActive("/"),
			})}>
			<div className="w-full flex gap-4 justify-center items-center">
				<Image
					height={1000}
					width={1000}
					className="w-[200px] h-[20px]"
					alt="socials"
					src="/assets/Social.png"
				/>
			</div>
			<div className="w-full flex gap-4 justify-center items-center">
				<p className="text-sm text-gray-800 font-semibold">
					Conditions of Use
				</p>
				<p className="text-sm text-gray-800 font-semibold">
					Privacy & Policy
				</p>
				<p className="text-sm text-gray-800 font-semibold">
					Press Room
				</p>
			</div>
			<p className="text-xs text-gray-500">&copy; 2023 MovieBox by Godswill Ezeala</p>
		</footer>
	);
};

export default Footer;
