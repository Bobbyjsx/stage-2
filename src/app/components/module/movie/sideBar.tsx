import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import classNames from "classnames";

type Props = {
	id?: string;
};

export const SideBar = ({ id }: Props) => {
	const pathName = usePathname();

	const isActive = (path: string | undefined) => {
		return pathName?.split("/").pop() === path;
	};
	const navItems = [
		{ href: "/", icon: "/assets/Home.svg", id: 1, title: "Home" },
		{
			href: `/movie/${id}`,
			icon: "/assets/Movie.svg",
			id: 2,
			title: "Movies",
		},
		{
			href: "#",
			icon: "/assets/TV-Show.svg",
			id: 3,
			title: "Tv Series",
		},
		{
			href: "#",
			icon: "/assets/Calendar.svg",
			id: 4,
			title: "Upcoming",
		},
	];
	return (
		<main className="w-56 relative left-0 bg-white border-2 border-slate-800 rounded-tr-[45px] rounded-br-[45px] h-[95vh] mt-- flex flex-col justify-between  items-center">
			<Link
				className="flex gap-5 w-full justify-center items-center"
				href={"/"}>
				<Image
					src="/assets/tv.svg"
					width={1000}
					height={1000}
					className="w-12 h-12"
					alt="logo"
				/>
				<p className="s">MovieBox</p>
			</Link>
			<div className="w-full flex flex-col  items-center">
				{navItems.map((item) => {
					return (
						<Link
							key={item.id}
							className={classNames({
								"bg-rose-700 bg-opacity-25 flex gap-5 w-full border-r-4 pl-[30px] h-[86px] border-rose-900 items-center ":
									isActive(
										item.href.split("/").pop()
									),
								"text-slate-700 flex gap-5 w-full  items-center h-[86px] pl-[30px]":
									!isActive(
										item.href.split("/").pop()
									),
							})}
							href={item.href}>
							<Image
								src={item.icon}
								width={1000}
								height={1000}
								className="w-6 h-6 "
								alt="icon"
							/>
							<p
								className={classNames({
									"text-rose-700 font-bold text-xl":
										isActive(
											item.href.split("/").pop()
										),
									"text-slate-700 font-bold text-xl":
										!isActive(
											item.href.split("/").pop()
										),
								})}>
								{item.title}
							</p>
						</Link>
					);
				})}
				
			</div><div className="w-[170px] h-[210px] flex-shrink-0 rounded-[20px] border border-rose-900 bg-rose-300  bg-opacity-20 flex flex-col justify-center items-center px-3 py-7 gap-5">
					<p className="text-md text-gray-500 font-bold">
						Play movie quizes and earn free tickets
					</p>
					<p className="text-xs text-gray-500">
						50k people are playing now
					</p>
					<button className="bg-rose-700 bg-opacity-25 text-rose-700 text-xs font-semibold px-5 py-1 rounded-l-full rounded-r-full">
						Start Playing
					</button>
				</div>
				<div className="text-slate-700 flex gap-5 w-full  items-center h-[86px] pl-[30px]">
					<Image
						src={"/assets/Logout.svg"}
						width={1000}
						height={1000}
						className="w-6 h-6 text-black font-bold fill-black "
						alt="icon"
					/>
					<p className="text-slate-700 font-bold text-xl">
						Log out
					</p>
				</div>
		</main>
	);  
};
