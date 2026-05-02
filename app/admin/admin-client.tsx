"use client";

import dynamic from "next/dynamic";

const AdminApp = dynamic(() => import("./app"), { ssr: false });

export const AdminClient = () => {
	return <AdminApp />;
};
