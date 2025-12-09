import type { Metadata } from "next";
import "./globals.css";

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
		<html lang="en">
			<body className="antialiased">{children}</body>
		</html>
	);
}