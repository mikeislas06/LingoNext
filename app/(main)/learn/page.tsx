import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Learn",
	description: "Continue your language learning journey with interactive lessons and challenges.",
};
import {
	getCourseProgress,
	getLessonPercentage,
	getUnits,
	getUserProgress,
	getUserSubscription,
} from "@/db/queries";
import { lessons, units as unitsSchema } from "@/db/schema";

import { FeedWrapper } from "@/components/feedWrapper";
import { StickyWrapper } from "@/components/stickyWrapper";
import { UserProgress } from "@/components/userProgress";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";

import { Header } from "./header";
import { Unit } from "./unit";

const LearnPage = async () => {
	const userProgressData = getUserProgress();
	const courseProgressData = getCourseProgress();
	const lessonPercentageData = getLessonPercentage();
	const unitsData = getUnits();
	const userSubscriptionData = getUserSubscription();

	const [userProgress, courseProgress, lessonPercentage, units, userSubscription] =
		await Promise.all([
			userProgressData,
			courseProgressData,
			lessonPercentageData,
			unitsData,
			userSubscriptionData,
		]);

	if (!userProgress || !userProgress.activeCourse) redirect("/courses");
	if (!courseProgress) redirect("/courses");

	const isUserSubscribed = !!userSubscription?.isActive;

	return (
		<div className="flex flex-row-reverse gap-12 px-6">
			<StickyWrapper>
				<UserProgress
					activeCourse={userProgress.activeCourse}
					hearts={userProgress.hearts}
					points={userProgress.points}
					hasActiveSubscription={!!userSubscription?.isActive}
				/>
				{!isUserSubscribed && <Promo />}
				<Quests points={userProgress.points} />
			</StickyWrapper>
			<FeedWrapper>
				<Header title={userProgress.activeCourse.title} />
				{units.map((unit) => (
					<div key={unit.id} className="mb-10">
						<Unit
							id={unit.id}
							order={unit.order}
							description={unit.description}
							title={unit.title}
							lessons={unit.lessons}
							activeLesson={
								courseProgress.activeLesson as
									| (typeof lessons.$inferSelect & {
											unit: typeof unitsSchema.$inferSelect;
									  })
									| undefined
							}
							activeLessonPercentage={lessonPercentage}
						/>
					</div>
				))}
			</FeedWrapper>
		</div>
	);
};

export default LearnPage;
