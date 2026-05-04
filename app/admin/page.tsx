import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { isAdmin } from "@/lib/admin";

export const metadata: Metadata = {
	title: "Admin",
	description: "Lingo admin panel for managing courses, units, lessons, and challenges.",
};
import { AdminClient } from "./admin-client";

const AdminPage = () => {
	if (!isAdmin()) {
		redirect("/");
	}

	return <AdminClient />;
};

export default AdminPage;
