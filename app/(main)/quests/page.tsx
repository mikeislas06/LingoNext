import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";

import { getTopUsers, getUserProgress, getUserSubscription } from "@/db/queries";

export const metadata: Metadata = {
	title: "Quests",
	description: "Complete quests by earning points and unlock rewards on your language learning journey.",
};

import { FeedWrapper } from "@/components/feedWrapper";
import { StickyWrapper } from "@/components/stickyWrapper";
import { UserProgress } from "@/components/userProgress";
import { Progress } from "@/components/ui/progress";
import { Promo } from "@/components/promo";
import { quests } from "@/constants";

const QuestsPage = async () => {
	const userProgressData = getUserProgress();
	const userSubscriptionData = getUserSubscription();

	const [userProgress, userSubscription] = await Promise.all([
		userProgressData,
		userSubscriptionData,
	]);

	if (!userProgress || !userProgress.activeCourse) {
		redirect("/courses");
	}

	const isUserSubscribed = !!userSubscription?.isActive;

	return (
		<div className="flex flex-row-reverse gap-12 px6">
			<StickyWrapper>
				<UserProgress
					activeCourse={userProgress.activeCourse}
					hearts={userProgress.hearts}
					points={userProgress.points}
					hasActiveSubscription={isUserSubscribed}
				/>
				{!isUserSubscribed && <Promo />}
			</StickyWrapper>
			<FeedWrapper>
				<div className="w-full flex flex-col items-center">
					<Image src="/quests.svg" alt="Quests" width={90} height={90} />
					<h1 className="text-center font-bold text-neutral-800 text-2xl my-6">Quests</h1>
					<p className="text-muted-foreground text-center text-lg mb-6">
						Complete quests by earning points.
					</p>
					<ul className="w-full">
						{quests.map((quest, idx) => {
							const progress = (userProgress.points / quest.value) * 100;

							return (
								<div
									className="flex items-center w-full p-4 gap-x-4 border-t-2"
									key={`${idx}-${quest.title}`}
								>
									<Image
										src={"/points.svg"}
										alt="Points"
										width={60}
										height={60}
									/>
									<div className="flex flex-col gap-y-2 w-full">
										<p className="text-neutral-700 text-xl font-bold">
											{quest.title}
										</p>
										<Progress value={progress} className="h-3" />
									</div>
								</div>
							);
						})}
					</ul>
				</div>
			</FeedWrapper>
		</div>
	);
};

export default QuestsPage;
