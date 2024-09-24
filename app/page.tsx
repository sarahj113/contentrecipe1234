import AuthButton from "@/app/ui/landing/auth-button";
import { createClient } from "@/utils/supabase/server";
import Header from "@/app/ui/landing/header";
import { Center, Container, Stack } from "@mantine/core";

export default async function Index() {
	const canInitSupabaseClient = () => {
		// This function is just for the interactive tutorial.
		// Feel free to remove it once you have Supabase connected.
		try {
			createClient();
			return true;
		} catch (e) {
			return false;
		}
	};

	const isSupabaseConnected = canInitSupabaseClient();

	return (
		<Container mt="md">
			<Center bg="var(--mantine-color-gray-light)">
				<Header />
			</Center>
		</Container>
	);
}
