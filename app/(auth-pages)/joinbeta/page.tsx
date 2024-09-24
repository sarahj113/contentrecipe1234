'use client';

import classes from '../custom.module.css';
import Link from "next/link";
import {
	TextInput,
	Anchor,
	Paper,
	Title,
	Text,
	Container,
	Button,
} from '@mantine/core';
import { useForm } from "@mantine/form";
import { joinBetaAction } from "@/app/actions";
import { useDisclosure } from "@mantine/hooks";

export default function JoinBeta() {
	const [loading, { toggle }] = useDisclosure(false);

	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			company: '',
			email: '',
		},
		validate: {
			company: (value) => (/^.+$/.test(value) ? null : 'Invalid company name'),	
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		},
	});

	const handleSubmit = (values: typeof form.values) => {
		console.log(values);
		let data = new FormData();
		for (const [key, value] of Object.entries(values)) {
			data.append(key, value);
		}
		joinBetaAction(data);
	};

	return (
		<Container size={420} my={100}>
			<Title ta="center" className={classes.title}>
				Join the beta!
			</Title>
			
			<Text c="dimmed" size="sm" ta="center" mt={5}>
				Already have an account?{' '}
				<Anchor size="sm" component={Link} href="/sign-in">
					Sign in
				</Anchor>
			</Text>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput
						{...form.getInputProps('company')}
						key={form.key('company')}
						label="Company Name"
						required
					/>
					<TextInput
						{...form.getInputProps('email')}
						key={form.key('email')}	
						label="Email"
						required
						mt="md"
					/>

					<Button type="submit" loading={loading} fullWidth color="black" mt="xl">
						Register!
					</Button>
				</form>
			</Paper>

		</Container>
	);
}