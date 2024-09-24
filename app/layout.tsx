import '@mantine/core/styles.css';
import '@/app/ui/globals.css';
import { inter } from '@/app/ui/fonts';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Dynamic Briefs",
	description: "Best way to brief your marketing creators",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<ColorSchemeScript />
			</head>
			{/* <body className={`${inter.className} antialiased`}>
				{children}
			</body> */}
			<body>
				<MantineProvider>{children}</MantineProvider>
			</body>
		</html>
	);
}
