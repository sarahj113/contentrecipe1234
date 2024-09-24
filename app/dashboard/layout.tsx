import '@mantine/core/styles.css';
import '@/app/ui/globals.css';
import { inter } from '@/app/ui/fonts';
import { ColorSchemeScript, Flex, MantineProvider } from '@mantine/core';
import { NavbarSimple } from './(root)/NavbarSimple';

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
		<>
			<Flex>
				<NavbarSimple />
				<div>
					{children}
				</div>
			</Flex>
		</>
	);
}
