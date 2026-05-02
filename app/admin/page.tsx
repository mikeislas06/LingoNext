import { redirect } from "next/navigation";

import { isAdmin } from "@/lib/admin";
import { AdminClient } from "./admin-client";

const AdminPage = () => {
	if (!isAdmin()) {
		redirect("/");
	}

	return <AdminClient />;
};

export default AdminPage;
