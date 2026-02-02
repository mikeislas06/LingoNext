"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
	label: string;
	iconSrc: string;
	href: string;
};

export const SidebarItem = ({ label, iconSrc, href }: Props) => {
	const pathname = usePathname();
	const active = pathname === href;

	return (
		<Button
			variant={active ? "sidebarOutline" : "sidebar"}
			className="justify-start h-13"
			asChild
		>
			<Link href={href}>
				<Image src={iconSrc} alt={label} width={32} height={32} />
				{label}
			</Link>
		</Button>
	);
};
