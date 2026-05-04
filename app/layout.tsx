import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/modals/exitModal";
import { HeartsModal } from "@/components/modals/heartsModal";

import "./globals.css";
import { PracticeModal } from "@/components/modals/practiceModal";

const nunito = Nunito({
	variable: "--font-nunito",
	subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
	variable: "--font-nunito-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "Lingo",
		template: "%s | Lingo",
	},
	description:
		"Lingo is a language learning platform where you can learn, practice, and master new languages with fun interactive lessons.",
	keywords: ["language learning", "education", "languages", "lingo", "learn"],
	openGraph: {
		title: "Lingo",
		description:
			"Learn, practice, and master new languages with fun interactive lessons.",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider afterSignOutUrl="/">
			<html lang="en">
				<body className={`${nunito.variable} ${nunitoSans.variable} antialiased`}>
					<Toaster />
					<ExitModal />
					<HeartsModal />
					<PracticeModal />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
