import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { quests } from "@/constants";

type Props = {
	points: number;
};

export const Quests = ({ points }: Props) => {
	return (
		<div className="border-2 rounded-xl p-4 space-y-4">
			<div className=" flex items-center justify-between w-full">
				<h3 className="font-bold text-lg">Quests</h3>
				<Button asChild size={"sm"} variant={"primaryOutline"}>
					<Link href={"/quests"} className="text-sm text-muted-foreground">
						View all
					</Link>
				</Button>
			</div>
			<ul className="w-full space-y-4">
				{quests.slice(0, 3).map((quest, idx) => {
					const progress = (points / quest.value) * 100;

					return (
						<div
							className="flex items-center w-full pb-4 gap-x-3"
							key={`${idx}-${quest.title}`}
						>
							<Image src={"/points.svg"} alt="Points" width={40} height={40} />
							<div className="flex flex-col gap-y-2 w-full">
								<p className="text-neutral-700 text-sm font-bold">{quest.title}</p>
								<Progress value={progress} className="h-2" />
							</div>
						</div>
					);
				})}
			</ul>
		</div>
	);
};
