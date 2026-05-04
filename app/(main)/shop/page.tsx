import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";

import { getUserProgress, getUserSubscription } from "@/db/queries";

export const metadata: Metadata = {
	title: "Shop",
	description: "Spend your hard-earned points on power-ups and extra hearts in the Lingo shop.",
};

import { FeedWrapper } from "@/components/feedWrapper";
import { StickyWrapper } from "@/components/stickyWrapper";
import { UserProgress } from "@/components/userProgress";
import { Promo } from "@/components/promo";

import { Items } from "./items";
import { Quests } from "@/components/quests";

const ShopPage = async () => {
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
				<Quests points={userProgress.points} />
			</StickyWrapper>
			<FeedWrapper>
				<div className="w-full flex flex-col items-center">
					<Image src="/shop.svg" alt="Shop" width={90} height={90} />
					<h1 className="text-center font-bold text-neutral-800 text-2xl my-6">Shop</h1>
					<p className="text-muted-foreground text-center text-lg mb-6">
						Spend your points on cool stuff.
					</p>
					<Items
						hearts={userProgress.hearts}
						points={userProgress.points}
						hasActiveSubscription={isUserSubscribed}
					/>
				</div>
			</FeedWrapper>
		</div>
	);
};

export default ShopPage;
