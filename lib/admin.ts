import { auth } from "@clerk/nextjs/server";

const adminIds = ["user_38v8dEW7QOeSuLGm5NS9jf4z1gg"];

export const isAdmin = async () => {
	const { userId } = await auth();

	if (!userId) {
		return false;
	}

	return adminIds.indexOf(userId) !== -1;
};
