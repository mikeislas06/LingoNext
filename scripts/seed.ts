import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
	try {
		console.log("Seeding database...");

		await db.delete(schema.courses);
		await db.delete(schema.userProgress);
		await db.delete(schema.units);
		await db.delete(schema.lessons);
		await db.delete(schema.challenges);
		await db.delete(schema.challengeOptions);
		await db.delete(schema.challengeProgress);

		await db.insert(schema.courses).values([
			{
				id: 1,
				title: "Spanish",
				imageSrc: "/es.svg",
			},
			{
				id: 2,
				title: "Italian",
				imageSrc: "/it.svg",
			},
			{
				id: 3,
				title: "French",
				imageSrc: "/fr.svg",
			},
			{
				id: 4,
				title: "Croatian",
				imageSrc: "/hr.svg",
			},
			{
				id: 5,
				title: "Japanese",
				imageSrc: "/jp.svg",
			},
		]);

		await db.insert(schema.units).values([
			{
				id: 1,
				courseId: 1, // Spanish course
				title: "Unit 1",
				description: "Learn the basics of Spanish",
				order: 1,
			},
		]);

		await db.insert(schema.lessons).values([
			{
				id: 1,
				unitId: 1, // Unit 1
				order: 1,
				title: "Nouns",
			},
		]);

		await db.insert(schema.challenges).values([
			{
				id: 1,
				lessonId: 1, // Nouns lesson
				type: "SELECT",
				order: 1,
				question: 'Which one of this is "the man"?',
			},
		]);

		await db.insert(schema.challengeOptions).values([
			{
				id: 1,
				challengeId: 1, // Challenge 1
				imageSrc: "/man.svg",
				correct: true,
				text: "El hombre",
				audioSrc: "/es_man.mp3",
			},
			{
				id: 2,
				challengeId: 1, // Challenge 1
				imageSrc: "/woman.svg",
				correct: false,
				text: "La mujer",
				audioSrc: "/es_woman.mp3",
			},
			{
				id: 3,
				challengeId: 1, // Challenge 1
				imageSrc: "/robot.svg",
				correct: false,
				text: "El robot",
				audioSrc: "/es_robot.mp3",
			},
		]);

		console.log("Seed data inserted successfully.");
	} catch (error) {
		console.error("Error seeding database:", error);
		throw new Error("Seeding failed");
	}
};

main();
