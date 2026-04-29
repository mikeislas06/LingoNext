import { redirect } from "next/navigation";

import { getUserProgress } from "@/db/queries";

import { FeedWrapper } from "@/components/feedWrapper";
import { StickyWrapper } from "@/components/stickyWrapper";
import { UserProgress } from "@/components/userProgress";
import Image from "next/image";

import { Items } from "./items";

const ShopPage = async () => {
	const userProgressData = getUserProgress();

	const [userProgress] = await Promise.all([userProgressData]);

	if (!userProgress || !userProgress.activeCourse) {
		redirect("/courses");
	}

	return (
		<div className="flex flex-row-reverse gap-12 px6">
			<StickyWrapper>
				<UserProgress
					activeCourse={userProgress.activeCourse}
					hearts={userProgress.hearts}
					points={userProgress.points}
					hasActiveSubscription={false}
				/>
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
						hasActiveSubscription={false} // TODO: Add subscription status
					/>
				</div>
			</FeedWrapper>
		</div>
	);
};

export default ShopPage;
