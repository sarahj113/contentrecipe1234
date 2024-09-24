'use client';

import classes from '../custom.module.css';
import Link from "next/link";
import {
	TextInput,
	PasswordInput,
	Checkbox,
	Anchor,
	Paper,
	Title,
	Text,
	Container,
	Group,
	Button,
} from '@mantine/core';
import { useForm } from "@mantine/form";
import { signInAction } from "@/app/actions";
import { useDisclosure } from "@mantine/hooks";

export default function SignIn() {
	const [loading, { toggle }] = useDisclosure(false);

	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			email: '',
			password: '',
		},
		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
			password: (value) => (/^.{3,}$/.test(value) ? null : 'Invalid password'),
		},
	});

	const handleSubmit = (values: typeof form.values) => {
		let data = new FormData();
		for (const [key, value] of Object.entries(values)) {
			data.append(key, value);
		}
		signInAction(data);
	};

	return (
		<Container size={420} my={100}>
			<Title ta="center" className={classes.title}>
				Welcome back!
			</Title>
			
			<Text c="dimmed" size="sm" ta="center" mt={5}>
				Do not have an account yet?{' '}
				<Anchor size="sm" component={Link} href="/joinbeta">
					Join the beta
				</Anchor>
			</Text>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput
						{...form.getInputProps('email')}
						key={form.key('email')}
						label="Email"
						placeholder="test@test.com"
						required />
					<PasswordInput
						{...form.getInputProps('password')}
						key={form.key('password')}	
						label="Password"
						placeholder="test123"
						required
						mt="md" />

					<Group justify="space-between" mt="lg">
						<Checkbox label="Remember me" />
						<Anchor component={Link} href="/forgot-password" size="sm">
							Forgot password?
						</Anchor>
					</Group>

					<Button type="submit" loading={loading} fullWidth color="black" mt="xl">
						Sign in
					</Button>
				</form>
			</Paper>

		</Container>
	);
}