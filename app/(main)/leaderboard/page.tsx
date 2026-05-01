import { redirect } from "next/navigation";
import Image from "next/image";

import { getTopUsers, getUserProgress, getUserSubscription } from "@/db/queries";

import { FeedWrapper } from "@/components/feedWrapper";
import { StickyWrapper } from "@/components/stickyWrapper";
import { UserProgress } from "@/components/userProgress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const LeaderboardPage = async () => {
	const userProgressData = getUserProgress();
	const userSubscriptionData = getUserSubscription();
	const leaderboardData = getTopUsers();

	const [userProgress, userSubscription, leaderboard] = await Promise.all([
		userProgressData,
		userSubscriptionData,
		leaderboardData,
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
			</StickyWrapper>
			<FeedWrapper>
				<div className="w-full flex flex-col items-center">
					<Image src="/leaderboard.svg" alt="Leaderboard" width={90} height={90} />
					<h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
						Leaderboard
					</h1>
					<p className="text-muted-foreground text-center text-lg mb-6">
						See how you rank against your peers in the community.
					</p>
					<Separator className="mb-4 h-0.5 rounded-full" />
					{leaderboard.map((user, index) => (
						<div
							key={user.userId}
							className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
						>
							<p className="font-bold text-lime-700 mr-4">{index + 1}</p>
							<Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
								<AvatarImage src={user.userImageSrc} className=" object-cover" />
							</Avatar>
							<p className="font-bold text-neutral-800 flex-1">{user.userName}</p>
							<p className="text-muted-foreground">{user.points} XP</p>
						</div>
					))}
				</div>
			</FeedWrapper>
		</div>
	);
};

export default LeaderboardPage;
