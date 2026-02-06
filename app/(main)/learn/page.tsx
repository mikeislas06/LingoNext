import { FeedWrapper } from "@/components/feedWrapper";
import { StickyWrapper } from "@/components/stickyWrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/userProgress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

const LearnPage = async () => {
	const userProgressData = getUserProgress();

	const [userProgress] = await Promise.all([userProgressData]);

	if (!userProgress || !userProgress.activeCourse) redirect("/courses");

	return (
		<div className="flex flex-row-reverse gap-12 px-6">
			<StickyWrapper>
				<UserProgress
					activeCourse={userProgress.activeCourse}
					hearts={userProgress.hearts}
					points={userProgress.points}
					hasActiveSubscription={false}
				/>
			</StickyWrapper>
			<FeedWrapper>
				<Header title={userProgress.activeCourse.title} />
			</FeedWrapper>
		</div>
	);
};

export default LearnPage;
