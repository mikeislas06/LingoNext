"use client";

import { useState, useTransition, useEffect } from "react";
import { useAudio, useWindowSize } from "react-use";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Confetti from "react-confetti";

import { challengeOptions, challenges } from "@/db/schema";
import { upsertChallengeProgress } from "@/actions/challenge-progress";

import { Header } from "./header";
import { QuestionBubble } from "./questionBubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { reduceHearts } from "@/actions/user-progress";
import { ResultCard } from "./ResultCard";

type Props = {
	initialPercentage: number;
	initialHearts: number;
	initialLessonId: number;
	initialLessonChallenges: (typeof challenges.$inferSelect & {
		completed: boolean;
		challengeOptions: (typeof challengeOptions.$inferSelect)[];
	})[];
	userSubscription: any; // TODO: replace with subcsription type
};

export const Quiz = ({
	initialPercentage,
	initialHearts,
	initialLessonId,
	initialLessonChallenges,
	userSubscription,
}: Props) => {
	const { width, height } = useWindowSize();
	const router = useRouter();
	const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" });
	const [incorrectAudio, _i, incorrectControls] = useAudio({ src: "/incorrect.wav" });
	const [finishAudio, _f, finishControls] = useAudio({ src: "/finish.mp3" });
	const [pending, startTransition] = useTransition();
	const [lessonId] = useState(initialLessonId);
	const [hearts, setHearts] = useState(initialHearts);
	const [percentage, setPercentage] = useState(initialPercentage);
	const [challenges] = useState(initialLessonChallenges);
	const [activeIndex, setActiveIndex] = useState(() => {
		const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
		return uncompletedIndex === -1 ? 0 : uncompletedIndex;
	});

	const [selectedOption, setSelectedOption] = useState<number>();
	const [status, setStatus] = useState<"correct" | "incorrect" | "unanswered">("unanswered");

	const currentChallenge = challenges[activeIndex];
	const options = currentChallenge?.challengeOptions || [];

	useEffect(() => {
		if (!currentChallenge) {
			finishControls.play();
		}
	}, [currentChallenge]);

	const onNext = () => {
		setActiveIndex((prev) => prev + 1);
	};

	const onSelect = (id: number) => {
		if (status !== "unanswered") return;

		setSelectedOption(id);
	};

	const onContinue = () => {
		if (!selectedOption) return;

		if (status === "incorrect") {
			setStatus("unanswered");
			setSelectedOption(undefined);
			return;
		}

		if (status === "correct") {
			onNext();
			setStatus("unanswered");
			setSelectedOption(undefined);
			return;
		}

		const correctOption = options.find((option) => option.correct);

		if (!correctOption) {
			return;
		}

		if (correctOption && correctOption.id === selectedOption) {
			startTransition(() => {
				upsertChallengeProgress(currentChallenge.id)
					.then((response) => {
						if (response?.error === "hearts") {
							console.error("Missing hearts");
							return;
						}

						correctControls.play();
						setStatus("correct");
						setPercentage((prev) => prev + 100 / challenges.length);

						// This is a practice
						if (initialPercentage === 100) {
							setHearts((prev) => Math.min(prev + 1, 5));
						}
					})
					.catch(() =>
						toast.error(
							"An error occurred while updating your progress. Please try again.",
						),
					);
			});
		} else {
			startTransition(() => {
				reduceHearts(currentChallenge.id)
					.then((response) => {
						if (response?.error === "hearts") {
							console.error("Missing hearts");
							return;
						}

						incorrectControls.play();
						setStatus("incorrect");

						if (!response?.error) {
							setHearts((prev) => Math.max(prev - 1, 0));
						}
					})
					.catch(() =>
						toast.error(
							"An error occurred while updating your progress. Please try again.",
						),
					);
			});
		}
	};

	if (!currentChallenge) {
		return (
			<>
				{finishAudio}
				<Confetti
					recycle={false}
					numberOfPieces={500}
					tweenDuration={10000}
					width={width}
					height={height}
				/>
				<div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
					<Image
						src="/finish.svg"
						alt="Finish"
						className="hideen lg:block"
						width={100}
						height={100}
					/>
					<Image
						src="/finish.svg"
						alt="Finish"
						className="block lg:hidden"
						width={50}
						height={50}
					/>
					<h1 className="text-lg lg:text-3xl font-bold text-neutral-700">
						Great job! <br /> You&apos;ve completed the lesson.
					</h1>
					<div className="flex items-center gap-x-4 w-full">
						<ResultCard variant="points" value={challenges.length * 10} />
						<ResultCard variant="hearts" value={hearts} />
					</div>
				</div>
				<Footer
					lessonId={lessonId}
					status="completed"
					onCheck={() => router.push("/learn")}
				/>
			</>
		);
	}

	const title =
		currentChallenge.type === "ASSIST"
			? "Select the correct meaning"
			: currentChallenge.question;

	return (
		<>
			{incorrectAudio}
			{correctAudio}
			<Header
				hearts={hearts}
				percentage={percentage}
				hasActiveSubscription={!!userSubscription?.isActive}
			/>
			<div className="flex-1">
				<div className="h-full flex items-center justify-center">
					<div className="lg:min-h-87.5 lg:w-150 w-full px-6 lg:px-0 flex flex-col gap-y-12">
						<h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
							{title}
						</h1>
						<div className="">
							{currentChallenge.type === "ASSIST" && (
								<QuestionBubble question={currentChallenge.question} />
							)}
							<Challenge
								options={options}
								onSelect={onSelect}
								status={status}
								selectedOption={selectedOption}
								disabled={pending}
								type={currentChallenge.type}
							/>
						</div>
					</div>
				</div>
			</div>
			<Footer disabled={pending || !selectedOption} status={status} onCheck={onContinue} />
		</>
	);
};
