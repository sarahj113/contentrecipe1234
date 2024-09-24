'use client';

import { useField } from '@mantine/form';
import { Button, Flex, Group, Text, Title, TextInput, Stack, Container } from '@mantine/core';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import classes from './custom.module.css';

export default function Header() {
	const router = useRouter();

	const validateField = function(value: string) {
		if (value.trim().length < 2) {
			return 'Enter a valid url';
		}
		else {
			router.push(`/test?brand=${value.trim()}`);
			return null;
		}
	};

	const field = useField({
		initialValue: '',
		validateOnBlur: false,
		validate: validateField,
	});

	return (
		<Stack h='300' align='center' justify='center'>
			<Title size="h1" className={classes.title}>Ditch the PDF: Get Dynamic Creator Briefs Instantly</Title>

			{/* <Text size="xl" c="gray">Enter your brand's website</Text>
			<TextInput
				{...field.getInputProps()}
				label=""
				inputContainer={(children) => (
					<Group align="flex-start">
						{children}
						<Button
							onClick={field.validate}
							variant="filled"
							color="black"
						>
							Get started
						</Button>
					</Group>
				)}
			/> */}

			<Button variant="light" color="black" component={Link} href="/sign-in">
				Sign in
			</Button>
			<Button variant="filled" color="black" component={Link} href="/joinbeta">
				Join Beta
			</Button>
		</Stack>
	);
}
