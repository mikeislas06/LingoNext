import { redirect } from "next/navigation";
import { FeedWrapper } from "@/components/feedWrapper";
import { StickyWrapper } from "@/components/stickyWrapper";
import { UserProgress } from "@/components/userProgress";
import {
	getCourseProgress,
	getLessonPercentage,
	getUnits,
	getUserProgress,
} from "@/db/queries";
import { lessons, units as unitsSchema } from "@/db/schema";

import { Header } from "./header";
import { Unit } from "./unit";

const LearnPage = async () => {
	const userProgressData = getUserProgress();
	const courseProgressData = getCourseProgress();
	const lessonPercentageData = getLessonPercentage();
	const unitsData = getUnits();

	const [userProgress, courseProgress, lessonPercentage, units] =
		await Promise.all([
			userProgressData,
			courseProgressData,
			lessonPercentageData,
			unitsData,
		]);

	if (!userProgress || !userProgress.activeCourse) redirect("/courses");
	if (!courseProgress) redirect("/courses");

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
