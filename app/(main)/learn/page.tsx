import { FeedWrapper } from "@/components/feedWrapper";
import { StickyWrapper } from "@/components/stickyWrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/userProgress";

const LearnPage = () => {
	return (
		<div className="flex flex-row-reverse gap-12 px-6">
			<StickyWrapper>
				<UserProgress
					activeCourse={{
						title: "Spanish",
						imgSrc: "/es.svg",
					}}
					hearts={5}
					points={100}
					hasActiveSubscription={false}
				/>
			</StickyWrapper>
			<FeedWrapper>
				<Header title="Spanish" />
			</FeedWrapper>
		</div>
	);
};

export default LearnPage;
