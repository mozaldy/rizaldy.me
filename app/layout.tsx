import type { Metadata } from "next";
import "./globals.css";
import SmoothFollower from "@/components/SmoothFollower";

export const metadata: Metadata = {
	title: "Rizaldy - Engineer",
	description: "Website Portfolio Mohammad Rizaldy Ramadhan",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="antialiased bg-red">
				{children}
				<SmoothFollower />
			</body>
		</html>
	);
}
